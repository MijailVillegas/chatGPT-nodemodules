import ObjectFunctions from "./ObjectFunctions.mjs";

export default class openaiResponse extends ObjectFunctions {
  constructor(id, object, created, model, choices, usage, system_fingerprint) {
    this.id = id || null;
    this.object = object || null;
    this.created = created || null;
    this.model = model || null;
    this.choices = choices || null;
    this.usage = usage || null;
    this.system_fingerprint = system_fingerprint || null;
  }

  toString() {
    return `{
      "id": "${this.id}",
      "object": "${this.object}",
      "created": ${this.created},
      "model": "${this.model}",
      "choices": ${this.choices},
      "usage": ${this.usage},
      "system_fingerprint": "${this.system_fingerprint}"
    }`;
  }
}
