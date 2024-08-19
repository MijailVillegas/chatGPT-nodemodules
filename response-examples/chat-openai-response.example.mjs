export const response_example = {
  id: "chatcmpl-9wqtGAVfOfSwGEeMuSDalhDhLDYHt",
  object: "chat.completion",
  created: 1723813362,
  model: "gpt-4o-mini-2024-07-18",
  choices: [
    {
      index: 0,
      message: {
        role: "assistant",
        content:
          "¿Por qué los programadores prefieren el café en lugar del té?\n" +
          "\n" +
          'Porque el té puede tener bugs, pero el café siempre tiene "byte"! ☕💻',
        refusal: null,
      },
      logprobs: null,
      finish_reason: "stop",
    },
  ],
  usage: { prompt_tokens: 15, completion_tokens: 24, total_tokens: 39 },
  system_fingerprint: "fp_48196bc67a",
};