// src/app/api/whisper/route.ts
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs"; // Ensure Node.js runtime for FormData

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const audio = formData.get("audio") as File;

  const openaiRes = await fetch(
    "https://api.openai.com/v1/audio/transcriptions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: (() => {
        const fd = new FormData();
        fd.append("file", audio, "audio.webm");
        fd.append("model", "whisper-1");
        return fd;
      })(),
    }
  );

  const data = await openaiRes.json();
  const content = data.choices?.[0]?.message?.content;

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

  return NextResponse.json(data);
}
