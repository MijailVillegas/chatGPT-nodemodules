import axios from "axios";
import FormData from "form-data";
import conversation from "../Treainer/training-data.jsonl.mjs";
const convertToJSONL = (data) => {
  return data.map((item) => JSON.stringify(item)).join("\n");
};

async function UploadJSONLFile(conversation) {
  const jsonData = convertToJSONL(conversation);
  /* console.log("Type", typeof(jsonData),"JSONL",jsonData); */
  const buffer = Buffer.from(jsonData, "utf-8");
  console.log("Buffer:", buffer);
  const formData = new FormData();
  formData.append("purpose", "fine-tune");

  formData.append("file", buffer, "conversation.jsonl");

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/files",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );
    /* console.log("Archivo subido", response.data); */
    return response.data;
  } catch (error) {
    console.error(
      "Error subiendo archivo:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

(async () => {
  try {
    const filedata = await UploadJSONLFile(conversation);
    console.log("Archivo subido :", filedata);
  } catch (error) {
    console.error("Error subiendo archivo:", error);
  }
})();
