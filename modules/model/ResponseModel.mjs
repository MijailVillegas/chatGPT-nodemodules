import ObjectModels from "./ObjectFunctions.mjs";
import { Choice } from "./ChoiceModel.mjs";
import { Usage } from "./UsageModel.mjs";

export class openaiResponse extends ObjectModels {
  constructor(id, object, created, model, choices, usage, system_fingerprint) {
    super();
    this.id = id || null;
    this.object = object || null;
    this.created = created || null;
    this.model = model || null;
    this.choices = Choice.new(choices) || null;
    this.usage = Usage.new(usage) || null;
    this.system_fingerprint = system_fingerprint || null;
  }
  modelToString() {
    return `{
      "id": "${this.id}",
      "object": "${this.object}",
      "created": ${this.created},
      "model": "${this.model}",
      "choices": ${this.choices.map((choice) =>
        Choice.new(choice).modelToString()
      )},
      "usage": ${Usage.new(this.usage).modelToString()},
      "system_fingerprint": "${this.system_fingerprint}"
    }`;
  }

}
