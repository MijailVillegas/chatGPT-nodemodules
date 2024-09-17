import axios from "axios";

async function CreateFineTuning(fileID) {
 try {
    const response = await axios.post(
      `https://api.openai.com/v1/fine_tuning/jobs`,
      {
        training_file: fileID,
        model: "gpt-4o-mini-2024-07-18",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
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
    const fileID = "file-Ge799O0WLl2Q2ZUjULJalbGV";
  try {
    const fineTuning = await CreateFineTuning(fileID);
    console.log("FineTuning creado :", fineTuning);
  } catch (error) {
    console.error("Error creando FineTuning:", error);
  }
})();
