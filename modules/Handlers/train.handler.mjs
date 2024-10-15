import trainFileJSONL from "../../chat/functions.chat.mjs";

/**
 * Handler del evento "train". Esta función llama a "trainFileJSONL"
 * @description Entrena un archivo JSONL subido a la plataforma de GPT con un finetuning.
 * @param {Object} data - Un objeto con dos propiedades:
 *   - {Object} payload - Un objeto con dos propiedades:
 *     - {String} token - Un token de autenticación.
 *     - {String} signature - La firma digital del token.
 *   - {Object} body - El archivo JSONL con los datos de entrenamiento.
 * @returns {Promise<Object>} - Un objeto con los siguientes campos:
 *   - {String} file_id - El ID del archivo subido.
 *   - {String} job_id - El ID del trabajo de finetuning.
 *   - {String} status - El estado del trabajo de finetuning.
 *   - {Number} estimated_finish - La fecha estimada de finalización del trabajo.
 * @throws {Error} Si el payload no es válido o no se puede desencriptar.
 * @throws {Error} Si el archivo no se puede subir o no se puede crear el trabajo de finetuning.
 * @throws {Error} Si el trabajo de finetuning no se puede crear o no se puede verificar su estado.
 */
export const handleTrain = async (body) => {
  try {
    const { status, ...data } = await trainFileJSONL(body);
    return { status, event: "train", ...data };
  } catch (error) {
    return { status: error.statusCode || 500, message: error.message };
  }
};
