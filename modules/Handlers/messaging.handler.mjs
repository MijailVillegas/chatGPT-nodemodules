import { msgFromThread } from "../../chat/functions.chat.mjs";

export const handleMessaging = async (params) => {
  try {
    const { threadID, botID, message } = params.body;
    const { status, ...data } = await msgFromThread(threadID, botID, message);
    return { status, event: "messaging", ...data };
  } catch (error) {
    return { status: error.statusCode || 500, message: error.message };
  }
};
