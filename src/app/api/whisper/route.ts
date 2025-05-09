import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

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
  return NextResponse.json(data);
}
