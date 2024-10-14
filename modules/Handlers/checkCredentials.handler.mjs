import { isAuthenticated } from "../../chat/functions.chat.mjs";

export const handleCredendials = (params) => {
  try {
    const auth = isAuthenticated(params.payload);
    if (!auth) {
      const error = new Error("unauthorized");
      error.statusCode = 401;
      throw new Error("unauthorized");
    }
    return { status: 200, event: "check_credentials", auth };
  } catch (error) {
    return { status: error.statusCode || 500, message: error.message };
  }
};
