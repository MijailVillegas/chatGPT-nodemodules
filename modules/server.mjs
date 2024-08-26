import express from "express";
import { handler } from "./index.mjs";

const app = express();

app.use(express.json());

app.post("/lambda", async (req, res) => {
  try {
    const result = await handler(req.body);
    res.json(result); // Envía el resultado real como JSON
  } catch (error) {
    res.status(500).json({ error: error.message }); // Manejo de errores
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(
    `Server running on http://127.0.0.1:${PORT}`,
    `API endpoints /lambda`
  )
);
