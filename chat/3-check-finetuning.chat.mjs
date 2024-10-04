import gptInstance from "../Axios/axiosDefaultConf.mjs";

async function checkFineTuning(fineTunedID) {
  try {
    const response = await gptInstance.get(
      `/fine_tuning/jobs/${fineTunedID}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Error al verificar el FineTuning");
  }
}

(async () => {
  const fineTunedJobID = "ftjob-FjIGD5R2BgGW3dMhGHPTwWEF";
  try {
    const fineTuning = await checkFineTuning(fineTunedJobID);
    console.log("FineTuning verificado:", fineTuning);
    const estimatedFinish = new Date(fineTuning.estimated_finish * 1000);
    console.log("ends on: ", estimatedFinish.toLocaleString());
  } catch (error) {
    console.error("Error verificando FineTuning:", error);
  }
})();
