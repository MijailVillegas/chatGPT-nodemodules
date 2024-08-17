import ObjectFunctions from "./ObjectFunctions.mjs";

// Modelo para `Usage`
export class Usage extends ObjectFunctions {
  constructor(prompt_tokens, completion_tokens, total_tokens) {
    this.prompt_tokens = prompt_tokens || 0;
    this.completion_tokens = completion_tokens || 0;
    this.total_tokens = total_tokens || 0;
  }

  static new(json = {}) {
    return new Usage(
      json.prompt_tokens,
      json.completion_tokens,
      json.total_tokens
    );
  }

  toString() {
    return `{
      "prompt_tokens": ${this.prompt_tokens},
      "completion_tokens": ${this.completion_tokens},
      "total_tokens": ${this.total_tokens}
    }`;
  }
}
