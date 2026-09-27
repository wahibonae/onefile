export interface ContextResult {
  context: string;
  prompt_suggestion: string;
}

export default async function getFullContext(final_prompt: string, user_prompt: string): ContextResult {
  console.log("final_Prompt: ", final_prompt);
  const res = await fetch("/get-context", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      final_prompt: final_prompt,
      user_prompt: user_prompt,
    }),
  });

  const data: ContextResult = await res.json();

  return data;
}
