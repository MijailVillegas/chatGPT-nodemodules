import { makeBot } from "../../chat/functions.chat.mjs";

export const handleBot = async (params) => {
  try {
    const { status, ...data } = await makeBot(params.data);
    return { status, event: "new_bot", ...data };
  } catch (error) {
    return { status: error.statusCode || 500, message: error.message };
  }
};