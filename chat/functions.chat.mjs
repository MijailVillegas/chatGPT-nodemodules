import { payloadToken } from "../modules/Libraries/cryptography/Client/token.cryp.mjs";
import { payloadDecrypt } from "../modules/Libraries/cryptography/Host/cryptoService.mjs";
import conversation_incomplete from "../Treainer/training-incomplete-data.jsonl.mjs";
import { UploadJSONLFile } from "./1-upload-file.chat.mjs";
import { CreateFineTuning } from "./2-create-finetuning.chat.mjs";
import { checkFineTuning } from "./3-check-finetuning.chat.mjs";

function isAuthenticated(payload) {
  const { valid } = payloadDecrypt(payload);
  return valid;
}

export async function trainFileJSONL(data) {
  try {
    if (!isAuthenticated(data.payload)) {
      throw new Error("unauthorized");
    }
    console.log("Payload desencriptado y verificado");

    const fileResponse = await UploadJSONLFile(data.body);
    const { id: fileId } = fileResponse;
    console.log(`Archivo subido: ${fileId}`);

    const tuningResponse = await CreateFineTuning(fileId);
    if (tuningResponse.error) {
      throw new Error(tuningResponse.error);
    }
    console.log("FineTuning creado:", tuningResponse.id);

    const checkTuning = await checkFineTuning(tuningResponse.id);
    if (checkTuning.error) {
      throw new Error(checkTuning.error);
    }

    return {
      file_id: fileId,
      model_id: tuningResponse.id,
      tunning_job_id: checkTuning.id,
      estimated_finish: checkTuning.estimated_finish,
      status: checkTuning.status,
    };
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    throw error;
  }
}

(async () => {
  try {
    const data = {
      event: "train",
      payload: payloadToken(),
      body: conversation_incomplete,
    };
    const response = await trainFileJSONL(data);
    console.log(JSON.stringify(response, null, 2));
  } catch (error) {
    console.error(error.message);
  }
})();