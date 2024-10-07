import gptInstance from "../Axios/axiosDefaultConf.mjs";

export async function checkFineTuning(fineTunedID) {
  try {
    const response = await gptInstance.get(
      `/fine_tuning/jobs/${fineTunedID}`
    );
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
  const fineTunedJobID = "";
  try {
    const fineTuning = await checkFineTuning(fineTunedJobID);
    console.log("FineTuning verificado:", fineTuning);
    const estimatedFinish = new Date(fineTuning.estimated_finish * 1000);
    console.log("ends on: ", estimatedFinish.toLocaleString());
  } catch (error) {
    console.error("Error verificando FineTuning:", error);
  }
})();
 */