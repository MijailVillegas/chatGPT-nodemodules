import { financeIP } from "../Bot/Instructions/IP-finance.prompt.mjs";
import { marketingIP } from "../Bot/Instructions/IP-marketing.prompt.mjs";
import { rrhhIP } from "../Bot/Instructions/IP-rrhh.prompt.mjs";
import { strategyIP } from "../Bot/Instructions/IP-strategy.prompt.mjs";
import { payloadDecrypt } from "../modules/Libraries/cryptography/Host/cryptoService.mjs";
import { UploadJSONLFile } from "./1-upload-file.chat.mjs";
import { CreateFineTuning } from "./2-create-finetuning.chat.mjs";
import { checkFineTuningJob } from "./3-check-finetuning.chat.mjs";
import { CreateChatBot } from "./4-crear-bot.chat.mjs";
import { CreateThread } from "./5-create-thread.chat.mjs";
import { sendMsgToThread } from "./6-chat-thread-bot.chat.mjs";
import { ChatBotWithThreading } from "./7-attachbot-thread.chat.mjs";
import { listMsgFromThread, retrieveRunFromThread } from "./9-retrieve-msg.chat.mjs";

/**
 * @function isAuthenticated
 * @description Verifica si el payload es válido y ha sido desencriptado correctamente.
 * @param {Object} payload - Un objeto con dos propiedades:
 *   - {String} token - Un token de autenticación.
 *   - {String} signature - La firma digital del token.
 * @returns {Boolean} - True si el payload es válido, false de lo contrario.
 */
export function isAuthenticated(payload) {
  const { valid } = payloadDecrypt(payload);
  return valid;
}

/**
 * @function trainFileJSONL
 * @description Entrena un archivo JSONL subido a la plataforma de GPT con un finetuning.
 * @param {Object} data - Un objeto con dos propiedades:
 *   - {Object} payload - Un objeto con dos propiedades:
 *     - {String} token - Un token de autenticación.
 *     - {String} signature - La firma digital del token.
 *   - {Object} body - Un objeto con dos propiedades:
 *      - {String} jsonl - El archivo JSONL con los datos de entrenamiento.
 * @returns {Promise<Object>} - Un objeto con los siguientes campos:
 *   - {String} file_id - El ID del archivo subido.
 *   - {String} job_id - El ID del trabajo de finetuning.
 *   - {String} status - El estado del trabajo de finetuning.
 *   - {Number} estimated_finish - La fecha estimada de finalización del trabajo.
 * @throws {Error} Si el payload no es válido o no se puede desencriptar.
 * @throws {Error} Si el archivo no se puede subir o no se puede crear el trabajo de finetuning.
 * @throws {Error} Si el trabajo de finetuning no se puede crear o no se puede verificar su estado.
 */
export default async function trainFileJSONL(data) {
  try {
    const fileResponse = await UploadJSONLFile(data.body.jsonl);
    const { id: fileId } = fileResponse;

    const tuningResponse = await CreateFineTuning(fileId);
    if (tuningResponse.error.type) {
      throw new Error(tuningResponse.error);
    }
   
    const checkTuning = await checkFineTuning(tuningResponse.id);
    if (checkTuning.error.type) {
      throw new Error(checkTuning.error);
    }    

    return {
     file_id: fileId,
     job_id: tuningResponse.id,
     status: tuningResponse.status,
     estimated_finish: tuningResponse.estimated_finish ? tuningResponse.estimated_finish : Date.now() + (30 * 60 * 1000),
   };
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    throw error;
  }
}

/**
 * Verifica el estado de un trabajo de finetuning.
 * @param {String} id - El ID del trabajo de finetuning.
 * @returns {Object} Un objeto con la siguiente estructura:
 *   - {String} status - El estado del trabajo de finetuning.
 *   - {String} model - El ID del modelo de finetuning.
 *   - {Number} estimated_finish - La fecha estimada de finalización del trabajo.
 * @throws {Error} Si el payload no es válido o no se puede desencriptar.
 * @throws {Error} Si el trabajo de finetuning no se puede crear o no se puede verificar su estado.
 */
export async function checkFineTuning(id) {
  try {
    const checkTuning = await checkFineTuningJob(id);
    if (checkTuning.error.type) {
      throw new Error(checkTuning.error);
    }

    if (checkTuning.status === "succeeded") {
      return {
        status: checkTuning.status,
        model: checkTuning.fine_tuned_model,
      };
    }

    return {
      status: checkTuning.status,
      estimated_finish: checkTuning.estimated_finish ? checkTuning.estimated_finish : Date.now() + (30 * 60 * 1000),
    };

  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    throw error;
  }
}

/**
 * Crea un bot y un thread para una IP y devuelve un objeto con los IDs de
 * ambos.
 * @param {Object} param - Un objeto con los siguientes campos:
 *   - {String} name - El nombre del bot.
 *   - {String} instructions - Las instrucciones del bot.
 *   - {String} modelID - El ID del modelo de lenguaje.
 * @returns {Object} Un objeto con los siguientes campos:
 *   - {String} bot_id - El ID del bot.
 *   - {String} thread_id - El ID del thread.
 * @throws {Error} Si el bot o el thread no se pueden crear.
 */
export async function makeBot(param) {
  try {
    const bot = await CreateChatBot(
      param.name,
      param.instructions,
      param.modelID
    );

    const thread = await CreateThread();

    return {
      bot_id: bot.id,
      thread_id: thread.id,
    };
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    throw error;
  }
}
/**
 * Crea un bot para cada una de las IPs (finanzas, marketing, RRHH y estrategia)
 * y devuelve un objeto con los IDs de los bots y threads.
 * @param {String} modelID - El ID del modelo de lenguaje.
 * @returns {Object} Un objeto con los siguientes campos:
 *   - {Object} marketing - Un objeto con los campos bot_id y thread_id.
 *   - {Object} finance - Un objeto con los campos bot_id y thread_id.
 *   - {Object} rrhh - Un objeto con los campos bot_id y thread_id.
 *   - {Object} strategy - Un objeto con los campos bot_id y thread_id.
 * @throws {Error} Si la rutina no se pueden crear.
 */
export async function makeBotsRoutine(modelID) {
  try {
    const finance = await makeBot({
      name: "Finanzas",
      instructions: financeIP.instructions,
      modelID: modelID,
    });

    const marketing = await makeBot({
      name: "Marketing",
      instructions: marketingIP.instructions,
      modelID: modelID,
    });

    const rrhh = await makeBot({
      name: "RRHH",
      instructions: rrhhIP.instructions,
      modelID: modelID,
    });

    const strategy = await makeBot({
      name: "Estrategia",
      instructions: strategyIP.instructions,
      modelID: modelID,
  });

    return {
      marketing: marketing,
      finance: finance,
      rrhh: rrhh,
      strategy: strategy,
    }

  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    throw error;
  }
}

/**
 * Envía un mensaje a un hilo y espera a que el bot termine su tarea.
 * @param {String} threadID - El ID del hilo.
 * @param {String} botID - El ID del bot.
 * @param {String} message - El mensaje a enviar.
 * @returns {Promise<String>} - La respuesta del bot.
 */
export async function msgFromThread(threadID, botID, message) {
  try {
    const sent = await sendMsgToThread(threadID, message);
    let run = await ChatBotWithThreading(threadID,botID);
    if (run.error?.type) throw run;
    while (run.status !== "completed" && run.status !== "failed") {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      run = await retrieveRunFromThread(threadID, run.id);
      if(run.error?.type) throw run;
    }
    const messages = await listMsgFromThread(threadID, "desc", 1);
    return {message: messages.data[0].content[0].text.value};
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    throw error;
  }
}
