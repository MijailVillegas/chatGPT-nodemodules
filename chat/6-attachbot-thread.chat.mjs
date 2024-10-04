import gptInstance from "../Axios/axiosDefaultConf.mjs";

export async function ChatBotWithThreading(threadID, botID) {
    try {
        const response = await gptInstance.post(
          `threads/${threadID}/runs`,
          {
            assistant_id: botID,
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


(async ()=>{
    try {
        const threadID = "thread_e2DZbs1EdiiHKELJfzkeKdtZ";
        const botID = "asst_iyBtFmkVMm3TGNtxcUpGkgj6";
        const bot = await ChatBotWithThreading(threadID, botID);
        console.log("respuesta del thread: ",bot);
    } catch (error) {
        console.log("Error chateando con thread:", error);
    }
})()