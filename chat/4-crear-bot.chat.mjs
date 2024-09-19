import axios from "axios";
import { botInstructions } from "../Treainer/bot-instructions.mjs";

async function CreateChatBot(modelID) {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/assistants",
      {
        name: "Stwart Joker",
        description: "Stwart Joker es un contador de chistes tontos.",
        instructions: botInstructions.instructions, // Asegúrate de que esto esté correctamente definido
        temperature: 0.8,
        model: modelID,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
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
  const modelID =
    "ft:gpt-4o-mini-2024-07-18:mijail-villegas:contador-chistes:A899n997";
  try {
    const bot = await CreateChatBot(modelID);
    console.log("Bot creado:", bot);
  } catch (error) {
    console.error("Error creando Bot:", error);
  }
})();
