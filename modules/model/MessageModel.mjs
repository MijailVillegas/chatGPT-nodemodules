import ObjectFunctions from "./ObjectFunctions.mjs";

// Modelo para `Message`
export default class Message extends ObjectFunctions {
  constructor(role, content, refusal) {
    this.role = role || null;
    this.content = content || null;
    this.refusal = refusal || null;
  }
}
