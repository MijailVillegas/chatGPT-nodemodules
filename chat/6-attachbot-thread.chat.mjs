import axios from "axios";

export async function ChatBotWithThreading(threadID, botID) {
    try {
        const response = await axios.post(
          `https://api.openai.com/v1/threads/${threadID}/runs`,
          {
            assistant_id: botID,
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


(async ()=>{
    try {
        const threadID = "thread_P5zMu6l0ZuWQTji3zES75B45";
        const botID = "asst_UCaHjVJIwjLBATDRlFcuqCAy";
        const bot = await ChatBotWithThreading(threadID, botID);
        console.log("respuesta del thread: ",bot);
    } catch (error) {
        console.log("Error chateando con thread:", error);
    }
})()