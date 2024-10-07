import { payloadToken } from "../modules/Libraries/cryptography/Client/token.cryp.mjs";
import { payloadDecrypt } from "../modules/Libraries/cryptography/Host/cryptoService.mjs";
import conversation from "../Treainer/training-data.jsonl.mjs";
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
    console.log("FineTuning creado:", tuningResponse);
    
    const checkTuning = await checkFineTuning(tuningResponse.id);
    if (checkTuning.error) {
      throw new Error(checkTuning.error);
    }    
   console.log("FineTuning verificado:", checkTuning);

   const digest = {
     file_id: fileId,
     model_id: tuningResponse.id,
     status: tuningResponse.status,
   };
   console.log(digest)
    return digest;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    throw error;
  }
}

