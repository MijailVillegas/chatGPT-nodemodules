import gptInstance from "../Axios/axiosDefaultConf.mjs";

export async function CreateFineTuning(fileID) {
  try {
    const response = await gptInstance.post(`/fine_tuning/jobs`, {
      training_file: fileID,
      model: "gpt-4o-mini-2024-07-18",
    });
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
  const fileID = "file-eDs8jqfdTaEXdz9IHEDISGID";
  try {
    const fineTuning = await CreateFineTuning(fileID);
    console.log("Respuesta de FineTuning:", fineTuning);
  } catch (error) {
    console.error("Error en la creación de FineTuning:", error.message);
  }
})();
 */