import axios from "axios";

export async function sendMsgToThread(threadID, content) {
    try {
        const response = await axios.post(
          `https://api.openai.com/v1/threads/${threadID}/messages`,
          {
            role: "user",
            content: content,
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
try {
    const threadID = "thread_P5zMu6l0ZuWQTji3zES75B45";
    const content = "Hola, cuéntame un chiste de pájaros";
    const bot = await sendMsgToThread(threadID, content);
    console.log(bot);
    console.log(bot.content);
} catch (error) {
    console.log(error)
}
})()