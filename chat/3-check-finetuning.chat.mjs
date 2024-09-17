import axios from "axios";

async function checkFineTuning(fineTunedID) {
  try {
    const response = await axios.get(
      `https://api.openai.com/v1/fine_tuning/jobs/${fineTunedID}`,
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
  const fineTunedJobID = "ftjob-ev3FzTC9ylOuQXeHR2HOnaT1";
  try {
    const fineTuning = await checkFineTuning(fineTunedJobID);
    console.log("FineTuning verificado:", fineTuning);
  } catch (error) {
    console.error("Error verificando FineTuning:", error);
  }
})();
