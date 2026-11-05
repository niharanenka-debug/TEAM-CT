# LearnMesh deployment on GitHub and Render

## What is functional now

The production server builds with `pnpm build`, starts with `pnpm start`, serves `/api/health`, and exposes a server-side Groq Tutor endpoint at `/api/ai/chat`. The Groq key is never sent to the browser. The Tutor page calls that endpoint and displays the returned answer.

## Important limitation

The current academic portal is still a prototype for most workflows. Class records are stored in browser `localStorage`, upload controls only select files and show queued status, and the displayed analytics are demo values. The tRPC router currently contains authentication/system procedures but no durable class, MSE, upload, analytics, assignment, or document-retrieval procedures. Deploying to Render will not automatically make those workflows persistent or multi-user.

To make every workflow production-ready, add database tables and protected API procedures for classes, students, assessment files, marks, assignments, approvals, course documents, and analytics. Add object storage for uploaded files and a document-extraction/vector-search pipeline for true RAG citations.

## GitHub

1. Push the repository root to a GitHub repository. Do not commit `.env`; it is ignored by `.gitignore`.
2. Keep `pnpm-lock.yaml`, `package.json`, `Dockerfile`, `render.yaml`, `client/`, `server/`, `shared/`, and `drizzle/` in the repository.
3. The committed `.env.example` is safe to share. Replace its placeholder values only in local untracked `.env` or in Render’s Environment settings.

## Render Blueprint deployment

1. In Render, choose **New → Blueprint** and select the GitHub repository containing `render.yaml`.
2. Render will create the `learnmesh` web service. The Blueprint uses:
   - Build: `corepack enable && pnpm install --frozen-lockfile && pnpm build`
   - Start: `pnpm start`
   - Health check: `/api/health`
3. In the Render service Environment page, set `GROQ_API_KEY` to a real key from the Groq Console. Do not paste it into source code or browser code.
4. If you configure persistence later, set `DATABASE_URL` to a reachable MySQL-compatible database and run migrations deliberately. The current UI does not yet use those tables.
5. Deploy and confirm the Render service URL returns JSON from `/api/health`.

Render injects its own `PORT`; the server already listens on `process.env.PORT` and binds to `0.0.0.0`.

## Verify Groq after deployment

Replace `YOUR_RENDER_URL` with the HTTPS service URL:

```bash
curl -sS https://YOUR_RENDER_URL/api/health
curl -sS https://YOUR_RENDER_URL/api/ai/health
curl -sS -X POST https://YOUR_RENDER_URL/api/ai/chat \
  -H 'Content-Type: application/json' \
  -d '{"message":"Explain 3NF in simple words","context":"DBMS Unit 3 · Normalization"}'
```

Expected `/api/ai/health` output includes `{"provider":"groq","configured":true}`. Never print or share the value of `GROQ_API_KEY`.

## Local verification

```bash
cp .env.example .env
# edit .env and put your real GROQ_API_KEY only in the untracked .env file
pnpm install --frozen-lockfile
pnpm check
pnpm build
pnpm start
curl -sS http://localhost:3000/api/health
curl -sS http://localhost:3000/api/ai/health
```

The Groq integration uses Groq’s OpenAI-compatible endpoint at `https://api.groq.com/openai/v1` and the `GROQ_API_KEY` environment variable. The server-side proxy follows Groq’s guidance not to expose API keys in frontend bundles.
