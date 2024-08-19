import ObjectModels from "./ObjectFunctions.mjs";
// Modelo para `Usage`
export class Usage extends ObjectModels {
  constructor(prompt_tokens, completion_tokens, total_tokens) {
    super();
    this.prompt_tokens = prompt_tokens || 0;
    this.completion_tokens = completion_tokens || 0;
    this.total_tokens = total_tokens || 0;
  }

  modelToString() {
    return `{
      "prompt_tokens": ${this.prompt_tokens},
      "completion_tokens": ${this.completion_tokens},
      "total_tokens": ${this.total_tokens}
    }`;
  }
}
