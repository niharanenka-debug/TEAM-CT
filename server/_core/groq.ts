import { z } from "zod";

const GroqRequest = z.object({
  message: z.string().trim().min(1).max(4000),
  context: z.string().trim().max(12000).optional(),
});

export type GroqChatInput = z.infer<typeof GroqRequest>;

function getConfig() {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("GROQ_API_KEY is not configured");
  return {
    apiKey,
    model: process.env.GROQ_MODEL || "openai/gpt-oss-20b",
    baseUrl: process.env.GROQ_BASE_URL || "https://api.groq.com/openai/v1",
  };
}

export async function groqChat(rawInput: GroqChatInput) {
  const input = GroqRequest.parse(rawInput);
  const config = getConfig();
  const response = await fetch(`${config.baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: config.model,
      temperature: 0.2,
      max_tokens: 700,
      messages: [
        {
          role: "system",
          content:
            "You are LearnMesh Tutor Agent. Answer clearly for a college student. Use only the supplied academic context when it is present. If the context does not contain enough evidence, say so instead of inventing a citation. Do not claim to have indexed files unless the application supplied them.",
        },
        ...(input.context
          ? [{ role: "system" as const, content: `Academic context:\n${input.context}` }]
          : []),
        { role: "user" as const, content: input.message },
      ],
    }),
  });

  const payload = (await response.json().catch(() => ({}))) as {
    choices?: Array<{ message?: { content?: string } }>;
    error?: { message?: string };
  };
  if (!response.ok) {
    throw new Error(payload.error?.message || `Groq request failed with ${response.status}`);
  }
  const answer = payload.choices?.[0]?.message?.content?.trim();
  if (!answer) throw new Error("Groq returned an empty answer");
  return { answer, model: config.model };
}

export function groqIsConfigured() {
  return Boolean(process.env.GROQ_API_KEY);
}
