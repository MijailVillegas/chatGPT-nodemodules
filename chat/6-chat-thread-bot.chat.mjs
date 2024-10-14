import gptInstance from "../Axios/axiosDefaultConf.mjs";

export async function sendMsgToThread(threadID, message) {
    try {
        const response = await gptInstance.post(
          `/threads/${threadID}/messages`,
          {
            role: "user",
            content: message,
          },
          {
            headers: {
              "OpenAI-Beta": "assistants=v2",
            },
          }
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
try {
    const threadID = "thread_P5zMu6l0ZuWQTji3zES75B45";
    const content = "Hola, cuéntame un chiste de pájaros";
    const runsID = "run_g1XdYgjuw089dtSUUHFmzmfI";
    const bot = await sendMsgToThread(threadID, runsID, content);
    console.log(bot);
    console.log(bot.content);
} catch (error) {
    console.log(error)
}
})() */