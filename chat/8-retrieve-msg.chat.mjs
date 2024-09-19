import axios from "axios";


export async function listMsgFromThread(threadID) {
  try {
    const response = await axios.get(
      `https://api.openai.com/v1/threads/${threadID}/messages`,
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
export async function retrieveMsgFromThread(threadID,msgID) {
    try {
        const response = await axios.get(
          `https://api.openai.com/v1/threads/${threadID}/messages/${msgID}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + process.env.OPENAI_API_KEY,
              "OpenAI-Beta": "assistants=v2",
            },
          }
        )
        return response.data;
    } catch (error) {
        throw new Error(error);
    }   
}


(async () =>{
    try {
        const threadID = "thread_P5zMu6l0ZuWQTji3zES75B45";
        const msgID = "msg_z1VXmM59rezDPw21vFRggArA";
        const msg = await listMsgFromThread(threadID);
        console.log("Mensaje recuperado: ",msg);
    } catch (error) {
        console.log("Error recuperando msg:", error);
    }
})()