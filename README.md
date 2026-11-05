# LearnMesh Academic Intelligence Platform

React / Express / tRPC / Drizzle starter, adapted from the Sandbox web-db-user template.

- `pnpm dev`: development server; honors `PORT` (default 3000).
- `pnpm build` / `pnpm start`: build and serve `dist/index.js` and `dist/public/`.
- `pnpm db:migrate`: apply checked-in migrations. `pnpm db:push`: generate and apply new schema changes.
- `pnpm check` / `pnpm test`: types and application tests.

Start with the Webdev skill's default-template guide. Platform login, storage, payments and service contracts live in its shared references; read the relevant capability before extending its helper.

`server/_core/publicConfig.ts` exposes only named public runtime values. Private keys stay server-side. The platform serves managed `/manus-storage/` assets; the application does not register a second proxy.

For GitHub and Render deployment, read [`DEPLOY_RENDER.md`](./DEPLOY_RENDER.md). The committed [`render.yaml`](./render.yaml) defines the Node web service, production build/start commands, health check, and secret placeholders. Copy [`.env.example`](./.env.example) to `.env` for local setup; never commit a real `GROQ_API_KEY`.

All nine AI agent workspaces use the server-side `/api/ai/agent` Groq gateway when `GROQ_API_KEY` is configured. The gateway keeps the key off the client, validates agent/task input, applies agent-specific instructions, retries transient Groq failures, times out stalled calls, and returns an explicit error instead of silently showing demo output. Tutor chat remains available through `/api/ai/chat`. Use `/api/ai/agents/health` to verify provider configuration.

Platform configuration is readable and editable through `webdev.config`. Default settings are initial values, not enforced constraints. The agent may modify the files, commands and configuration or follow the flexible guide for another stack.
