import trainFileJSONL from "../../chat/functions.chat.mjs";

export const handleTrain = async (body) => {
  try {
    const { status, ...data } = await trainFileJSONL(body);
    return { status, event: "train", ...data };
  } catch (error) {
    return { status: error.statusCode || 500, message: error.message };
  }
};