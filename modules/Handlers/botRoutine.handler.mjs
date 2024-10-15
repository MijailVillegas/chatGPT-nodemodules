import { makeBotsRoutine } from "../../chat/functions.chat.mjs";

export const handleBotRoutine = async (params) => {
  try {
    const { status, ...data } = await makeBotsRoutine(params.body.modelID);
    return { status, event: "bot_routine", ...data };
  } catch (error) {
    return { status: error.statusCode || 500, message: error.message };
  }
};
