import { NextResponse } from "next/server";

const { default: OpenAI } = require("openai");

const openai = new OpenAI({
  // TBD
  // This key here is juat a placeholder
  apiKey: "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",
  baseURL: "https://openrouter.ai/api/v1",
});

export async function POST(req) {
    try {
      console.log("Starting request processing...");
      const body = await req.json();
      const topic = body.topic || "Machine Learning";
      const prompt = `You are a flashcard creator, you take in text and create multiple flashcards from it. Make sure to create exactly 10 flashcards.
      Both front and back should be one sentence long.Front one should be a question and back one with answer with a bit explanation and question should be of different difficulty and knowledge depth 
      You should return in the following JSON format:
      {
        "flashcards":[
          {
            "front": "Front of the card",
            "back": "Back of the card"
          }
        ]
      }`;
      console.log("Prompt created for topic:", topic);

      const response = await openai.chat.completions.create({
        model: "google/gemma-2-9b-it:free",
        messages: [
          { role: "user", content: topic },
          { role: "system", content: prompt },
        ],
      });

      console.log("API response received:", response);

      const rawContent = response.choices[0].message.content;
      console.log("Raw content received:", rawContent);

      // Extract the JSON part using regex
      const jsonMatch = rawContent.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("No valid JSON found in the response content.");
      }

      const cleanedContent = jsonMatch[0];
      console.log("Cleaned content:", cleanedContent);

      const flashcards = JSON.parse(cleanedContent);
      console.log("Parsed flashcards:", flashcards);

      return NextResponse.json(flashcards.flashcards);
    } catch (error) {
      console.error("Error encountered:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

