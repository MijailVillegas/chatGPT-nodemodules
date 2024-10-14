import { CreateThread } from "../../chat/5-create-thread.chat.mjs";

export const handleNewThread = async () => {
  try {
    const { status, id } = await CreateThread();
    return { status, event: "thread", id };
  } catch (error) {
    return { status: error.statusCode || 500, message: error.message };
  }
};