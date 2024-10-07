import { botInstructions } from "../Treainer/bot-instructions.mjs";
import gptInstance from "../Axios/axiosDefaultConf.mjs";

export async function CreateChatBot(name, description, instructions, modelID) {
  try {
    const response = await gptInstance.post(
      "/assistants",
      {
        name: name,
        description: description,
        instructions: instructions,
        temperature: 0.8,
        model: modelID,
      },
      {
        headers: {
          "OpenAI-Beta": "assistants=v2",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

(async () => {
  const name = "Stwart Joker";
  const description = "Stwart Joker es un contador de chistes tontos.";
  const modelID = "ft:gpt-4o-mini-2024-07-18:emprendelatamapi::AEMff2Gf";
  try {
    const bot = await CreateChatBot(
      name,
      description,
      botInstructions.instructions,
      modelID
    );
    console.log("Bot creado:", bot);
  } catch (error) {
    console.error("Error creando Bot:", error);
  }
})();
