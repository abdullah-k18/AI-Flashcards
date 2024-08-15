import { NextResponse } from "next/server";
import { useRouter } from "@clerk/nextjs";
import OpenAI from "openai"

const systemPrompt = `
You are an expert at creating educational flashcards based on books. Take the provided text and generate 10 flashcards that cover the key ideas, themes, or important facts from the text.

Each flashcard should:
- Have a concise question or prompt on the front.
- Provide a clear, accurate answer or explanation on the back.

Format the flashcards in the following JSON structure:
{
  "flashcards": [
    {
      "front": "Question or prompt",
      "back": "Answer or explanation"
    }
  ]
}

Please make sure to create exactly 10 flashcards based on the content provided.
`;

export async function POST(req) {
    const openai = new OpenAI({
        apiKey: process.env.OPENROUTER_API_KEY,
        baseURL: "https://openrouter.ai/api/v1"
    });

    const data = await req.json();



    const completion = await openai.chat.completions.create({
        messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: data.text },
        ],
        model: 'gpt-3.5-turbo',
        stream: false,
    });

    const flashcards = JSON.parse(completion.choices[0].message.content);

    return NextResponse.json(flashcards.flashcards);
}