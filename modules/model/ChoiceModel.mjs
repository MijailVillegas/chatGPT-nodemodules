import ObjectFunctions from "./ObjectFunctions.mjs";

// Modelo para `Choice`
export class Choice extends ObjectFunctions {
  constructor(index, message, logprobs, finish_reason) {
    this.index = index || null;
    this.message = message
      ? new Message(message.role, message.content, message.refusal)
      : null;
    this.logprobs = logprobs || null;
    this.finish_reason = finish_reason || null;
  }
}
