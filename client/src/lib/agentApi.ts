export const agentKeys = [
  "coordinator",
  "tutor",
  "assignment-generation",
  "student-model",
  "knowledge-tracing",
  "learning-analytics",
  "knowledge-graph",
  "recommendation",
  "explainability",
] as const;

export type AgentKey = (typeof agentKeys)[number];

export async function runAgent(agent: AgentKey, task: string, context: string) {
  const response = await fetch("/api/ai/agent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ agent, task, context }),
  });
  const payload = (await response.json().catch(() => ({}))) as { answer?: string; error?: string };
  if (!response.ok) throw new Error(payload.error || `The ${agent} agent request failed`);
  if (!payload.answer) throw new Error("The agent returned an empty response");
  return payload.answer;
}
