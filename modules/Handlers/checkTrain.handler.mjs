import { checkFineTuning } from "../../chat/functions.chat.mjs";

export const handleCheckTrain = async (params) => {
  try {
    const { status, ...data } = await checkFineTuning(params.data);
    return { status, event: "check_train", ...data };
  } catch (error) {
    return { status: error.statusCode || 500, message: error.message };
  }
};