import { msgFromThread } from "../../chat/functions.chat.mjs";

export const handleMessaging = async (params) => {
  try {
    const { status, ...data } = await msgFromThread(params.data);
    return { status, event: "thread", ...data };
  } catch (error) {
    return { status: error.statusCode || 500, message: error.message };
  }
};
