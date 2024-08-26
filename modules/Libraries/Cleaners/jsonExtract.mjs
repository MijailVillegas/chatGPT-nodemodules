export const jsonFilter = (text) => {
     return JSON.parse(text.replace(/```json|```/g, "").trim());
};
