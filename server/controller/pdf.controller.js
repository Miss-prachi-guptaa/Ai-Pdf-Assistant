import fs from "fs";
import { pdf } from "pdf-parse";
import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const ai = new GoogleGenAI({});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const handleSummaryWS = async (socket, text) => {
  try {
    const response = await ai.models.generateContentStream({
      model: "gemini-2.5-flash",
      contents: [{ type: "text", text: `Summarize this text:\n\n${text}` }],
    });

    for await (const chunk of response) {
      const chunkText = chunk.text;
      if (chunkText) {
        socket.send(JSON.stringify({ type: "summary", chunk: chunkText }));
      }
    }

    socket.send(JSON.stringify({ type: "done" }));
  } catch (err) {
    console.error("Summary error:", err);
    socket.send(JSON.stringify({ type: "error", message: err.message }));
  }
};

export const uploadPdf = async (req, res) => {
  try {
    const filePath = req.file.path;

    const dataBuffer = fs.readFileSync(filePath);
    console.log("Buffer length:", dataBuffer.length);

    const pdfData = await pdf(dataBuffer);
    console.log("PDF text length:", pdfData.text.length);

    res.json({ text: pdfData.text });
  } catch (error) {
    console.error("PDF parsing error:", error);
    res.status(500).json({ error: "Error reading PDF", detail: error.message });
  }
};

export const askQuestionHandler = async (req, res) => {
  try {
    const { text, question } = req.body;
    if (!text || !question) {
      return res.status(400).json({ error: "Text and question are required" });
    }

    const prompt = `Based on the following PDF content, answer the question briefly and accurately.\n\nPDF Content:\n${text}\n\nQuestion: ${question}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ type: "text", text: prompt }]
    });

    const answer =
      response?.[0]?.parts?.[0]?.text ||
      response?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No answer generated";

    res.json({ answer });
  } catch (error) {
    console.error("Error answering question:", error);
    res.status(500).json({ error: "Error answering question", detail: error.message });
  }
};
