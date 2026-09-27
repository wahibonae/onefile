import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { final_prompt, user_prompt } = await req.json();

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    }),
  });

  const data = await response.json();
  const contextText = "";
  const suggestion = "suggestion";

  return NextResponse.json({
    context: contextText,
    prompt_suggestion: suggestion
  });
}
