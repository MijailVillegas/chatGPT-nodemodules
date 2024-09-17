import { botInstructions } from "../Treainer/bot-instructions.mjs";

async function  CreateChatBot(modelID) {
    try {
        const response = await axios.post(
          "https://api.openai.com/v1/assistants",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
              "OpenAI-Beta": "assistants=v2",
            }
          },
          {
            instrucctions: botInstructions,
            name: "Stwart Joker",
            model: modelID
          }
        );
        console.log("Bot creado" ,response.data); 
        return response.data;
    } catch (error) {
        
    }
}