import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/rewrite", async (req, res) => {
  const { emailText } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a professional email writing assistant.",
        },
        {
          role: "user",
          content: `Rewrite the following email clearly and professionally without changing its meaning:\n\n${emailText}`,
        },
      ],
    });
    res.status(200).json({
      rewrittenEmail: response.choices[0].message.content,
    });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      error: "Failed to rewrite the email",
      message:error.message
    });
  }
});

export default app;
