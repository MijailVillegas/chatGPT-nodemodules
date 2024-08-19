import { Message } from "./MessageModel.mjs";
import ObjectModels from "./ObjectFunctions.mjs";

// Modelo para `Choice`
export class Choice extends ObjectModels {
  constructor(index, message, logprobs, finish_reason) {
    super();
    this.index = index || null;
    this.message = message || null;
    this.logprobs = logprobs || null;
    this.finish_reason = finish_reason || null;
  }

  modelToString(){
    return `{
    "index": ${this.index},
    "message": ${Message.new(this.message).modelToString()},
    "logprobs": ${this.logprobs},
    "finish_reason": ${this.finish_reason}}`;
  }
}