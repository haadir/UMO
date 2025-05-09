import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const { transcript } = await req.json();

  // 1. Generate a simple question using ChatGPT
  const chatRes = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            'You are a memory game generator for people with Alzheimer\'s. Given a story, respond ONLY with a valid JSON object in the format: {"question": ..., "answers": [..], "correct": ...}. Do not include any extra text or formatting.',
        },
        {
          role: "user",
          content: transcript,
        },
      ],
      temperature: 0.7,
    }),
  });

  const chatData = await chatRes.json();
  const content = chatData.choices?.[0]?.message?.content;

  // Try to extract JSON from the response
  let question, answers, correct;
  try {
    // Try to find the first {...} block in the response
    const match = content.match(/\{[\s\S]*\}/);
    const jsonString = match ? match[0] : content;
    const parsed = JSON.parse(jsonString);
    question = parsed.question;
    answers = parsed.answers;
    correct = parsed.correct;
    if (!question || !Array.isArray(answers) || !correct) {
      throw new Error("Invalid format");
    }
  } catch (e) {
    return NextResponse.json(
      {
        error: "Failed to parse question or invalid format.",
        details: content,
      },
      { status: 500 }
    );
  }

  // 2. Generate an image using DALL·E
  const dallePrompt = `A painting/sketch illustration for the question: "${question}". Artistic, gentle, memory-jogging.`;
  const dalleRes = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "dall-e-3",
      prompt: dallePrompt,
      n: 1,
      size: "1024x1024",
      response_format: "url",
    }),
  });

  const dalleData = await dalleRes.json();
  const imageUrl = dalleData.data?.[0]?.url;

  return NextResponse.json({ question, answers, correct, imageUrl });
}
