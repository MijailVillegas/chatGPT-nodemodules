import FormData from "form-data";
import gptInstance from "../Axios/axiosDefaultConf.mjs";
export const convertToJSONL = (data) => {
  return data.map((item) => JSON.stringify(item)).join("\n");
};

/**
 * Uploads a JSONL file containing a conversation to a specified endpoint.
 *
 * @param {Array} conversation - An array of conversation objects to be converted to JSONL format.
 * @returns {Promise<Object|Error>} - A Promise that resolves with the server response data or rejects with an error.
 *
 * @example
 * const conversation = [
 *   { user: "Alice", message: "Hello!" },
 *   { user: "Bob", message: "Hi Alice!" },
 * ];
 *
 * (async () => {
 *   try {
 *     const filedata = await UploadJSONLFile(conversation);
 *     console.log("Archivo subido :", filedata);
 *   } catch (error) {
 *     console.error("Error subiendo archivo:", error);
 *   }
 * })();
 */
export async function UploadJSONLFile(conversation) {
  const jsonData = convertToJSONL(conversation);
  const buffer = Buffer.from(jsonData, "utf-8");
  const formData = new FormData();
  formData.append("purpose", "fine-tune");
  formData.append("file", buffer, "conversation.jsonl");

  try {
    const response = await gptInstance.post("files", formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    throw error;
  }
}

/* 
(async () => {
  try {
    const filedata = await UploadJSONLFile(conversation);
    console.log("Archivo subido :", filedata);
  } catch (error) {
    console.error("Error subiendo archivo:", error);
  }
})();
 */