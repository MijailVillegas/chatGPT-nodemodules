import express from "express";
import { handler } from "./index.mjs";

const app = express();

app.use(express.json());

app.post("/lambda", async (req, res) => {
  try {
    const result = await handler(req.body);
    res.status(result.status || 200).json(result); // Envía el resultado real como JSON
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message }); // Manejo de errores
  }
});

const PORT = process.env.PORT || 3050;
app.listen(PORT, () =>
  console.log(
    `Server running on http://127.0.0.1:${PORT}`,
    `\nAPI endpoints:`,`\n/lambda`
  )
);
