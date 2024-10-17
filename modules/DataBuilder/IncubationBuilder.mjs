import incubationData from "./incubation.data.json" with {type: "json"};
/**
 * Build an array of completion objects. The completion object contains
 *               a messages array with a user message and an assistant message.
 *               The user message is a question and the assistant message is the
 *               answer.
 * @param {Object[]} fases - An array of objects with the following properties
 *                           - {fase: string, data: {p: string, r: string[]}[]}
 * @returns {Object[]} - An array of completion objects on JSONL format for trainning.
 */
export const buildAnswers = (fases) => {
  return fases.flatMap(({ fase, data }, indexA) => {
    return  data.map(({ r }, indexB) => {
        return { messages: [
          { role: "system", content: "Bot para la Incubación de Emprendedor" },
          { role: "assistant", content: `Fase ${fase} ${incubationData[indexA].data[indexB].p}` },
          { role: "user", content:  `${incubationData[indexA].data[indexB].r[r - 1]}`},
        ]
        };
      })
    }
  );
};

/**
 *Builds an array of completion objects. The completion object contains
 *               a messages array with a user message and an assistant message.
 *               The user message is a question and the assistant message is the
 *               answer.
 * @param {Object[]} completions - An array of objects with the following properties
 *                                 - {role: string, content: string}
 * @returns {Object[]} - An array of completion objects on JSONL format for trainning.
 */
export const buildCompletitions = (completions) => {
  if (completions.length % 2 === 1 && completions[completions.length - 1].role === "user") {
    completions.pop();
  }
  if (completions.length % 2 === 0) {
    return completions.reduce((acc, curr, index) => {
      if (index % 2 === 0) {
        acc.push({ messages: [{ role: "system", content: "Bot para la Incubación de Emprendedor" },curr, completions[index + 1]] });
      }
      return acc;
    }, []);
  }
};

export const concat = (a, b) => a.concat(b);
