import axios from "axios";
import gptInstance from "../Axios/axiosDefaultConf.mjs";

export async function listMsgFromThread(threadID, order = "", limit = "") {
  const params = [];
  if (order) {
    params.push("order=" + order);
  }
  if (limit) {
    params.push("limit=" + limit);
  }
  let paramsString = "";
  if (params.length > 0) {
    paramsString = "?" + params.join("&");
  }
  try {
    const response = await gptInstance.get(
      `/threads/${threadID}/messages${paramsString}`,
      { headers: {"OpenAI-Beta": "assistants=v2",},}
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function retrieveRunFromThread(threadID, runID) {
  try {
    const response = await gptInstance.get(
      `/threads/${threadID}/runs/${runID}`,
      { headers: { "OpenAI-Beta": "assistants=v2" } }
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
    const msgID = "msg_z1VXmM59rezDPw21vFRggArA";
    const msg = await listMsgFromThread(threadID);
    console.log("Mensaje recuperado: ", msg);
  } catch (error) {
    console.log("Error recuperando msg:", error);
  }
})(); */
