import ObjectModels from "./ObjectFunctions.mjs";

// Modelo para `Message`
export class Message extends ObjectModels {
  constructor(role, content, refusal) {
    super();
    this.role = role || null;
    this.content = content || null;
    this.refusal = refusal || null;
  }

  modelToString(){
    return `{
    "role": "${this.role}",
    "content": "${this.content}",
    "refusal": "${this.refusal}"}`;
  }
}
