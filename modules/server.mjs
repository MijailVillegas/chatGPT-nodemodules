import express from 'express';
import { handler } from './index.mjs';

const app = express();


app.use(express.json());
app.post('/lambda', async(req, res)=>{
    const result = await handler(req.body);
    res.json('result');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on  http://127.0.0.1:${PORT}`)
);