import gptInstance from "../Axios/axiosDefaultConf.mjs";

async function CreateFineTuning(fileID) {

 try {
    const response = await gptInstance.post(
      `/fine_tuning/jobs`,
      {
        training_file: fileID,
        model: "gpt-4o-mini-2024-07-18",
      }
    );
    console.log('FineTuning creado:', response.data);
    return response.data;
 } catch (error) {
    console.error( 'Error creando FineTuning',error);
    throw error;
 }
}

(async () => {
    const fileID = "file-6AecXLStw7TfyhrupD8J1Q89";
  try {
    const fineTuning = await CreateFineTuning(fileID);
    console.log("FineTuning creado :", fineTuning);
  } catch (error) {
    console.error("Error creando FineTuning:", error);
  }
})();
