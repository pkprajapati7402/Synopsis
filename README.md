# Synopsis

> **Autonomous UI/UX Feedback & Real-Time Voice Iteration Platform**  
> Turn user emotions, cursor interactions, intent, and spoken voice into live sandbox code updates and automated, review-ready GitHub Pull Requests.

---

## Overview

**Synopsis** (also referred to as **Synapse**) closes the gap between product feedback and engineering execution. Instead of forcing beta testers to record clunky screen shares or write ambiguous bug tickets, Synopsis spins up an isolated, hot-reloading sandbox of your web app. Testers simply speak what they want to see, and an autonomous AI web developer agent modifies the code in real time while tracking user sentiment, facial expressions, and mouse engagement.

When the session is complete, all accepted variations, session notes, and telemetry are packaged into a ready-to-merge **GitHub Pull Request** with a single click.

```
                     ┌─────────────────────────────────────────┐
                     │          Tester Voice / Chat            │
                     └────────────────────┬────────────────────┘
                                          │
                                          ▼
                     ┌─────────────────────────────────────────┐
                     │      Gemini Intent Refinement Engine    │
                     └────────────────────┬────────────────────┘
                                          │
                                          ▼
┌─────────────────────────┐  Code Gen ┌─────────────────────────┐  Hot Reload ┌─────────────────────────┐
│     Project GitHub      ├──────────►│  Gemini 2.5 / Workers AI├───-───────►│  Isolated Sandbox      │
│       Repository        │           │    Code Modifier Agent  │             │   Preview Runtime       │
└─────────────────────────┘           └───────────┬─────────────┘             └────────────┬────────────┘
                                                  │                                        │
                                                  │ Telemetry & History                    │ UX Interactions
                                                  ▼                                        ▼
                                      ┌─────────────────────────┐             ┌─────────────────────────┐
                                      │   Supermemory Context   │             │   Hume AI + Mouse Move  │
                                      │   & Changelog Storage   │             │    Emotion Telemetry    │
                                      └───────────┬─────────────┘             └────────────┬────────────┘
                                                  │                                        │
                                                  ▼                                        │
                                      ┌─────────────────────────┐                          │
                                      │   Automated GitHub PR   │◄─────────────────────────┘
                                      │  (One-Click with Diffs) │
                                      └─────────────────────────┘
```

---

## Core Capabilities

- **Real-Time Speech-to-Code**: Speak naturally to modify your app. Built with resilient dual-engine speech recognition (real-time WebSocket streaming with automatic native browser **Web Speech API** fallback).
- **Autonomous Code Agent**: Analyzes your project's HTML, CSS, and JS structure, applies non-destructive edits, and hot-reloads the changes live in the preview. Runs on **Gemini 2.5 Flash** (with automatic fallback from Cloudflare Workers AI in local dev).
- **Persistent Isolated Sandboxes**: Powered by Cloudflare Workers Durable Objects. Runs containerless via local SQLite storage in local development, and in isolated Cloudflare Containers in production.
- **Emotion & Sentiment Telemetry**: Integrates **Hume AI** to detect tester facial expressions, vocal sentiment, engagement, and hesitation points without intrusive surveys.
- **Behavioral UX Analytics**: Tracks cursor velocity, dwell times, and click paths to diagnose usability friction.
- **One-Click GitHub Pull Requests**: In-sandbox top navigation bar highlights modified files (`x files modified: index.html, style.css`) and commits directly to a new GitHub branch with automated changelogs.
- **Long-Term Memory**: Powered by **Supermemory** to retain project design rules, past iterations, and testing context across sessions.

---

## Repository Structure

```
Synopsis/
├── dashboard/                  # Next.js 16 App Router web application
│   ├── src/
│   │   ├── app/                # Application routes (/s/[id], /dashboard, /ux_telemetry)
│   │   ├── components/         # UI components, SandboxVoice, top navigation, analytics
│   │   ├── lib/                # Worker API client, mouse tracking utilities
│   │   └── ux_telemetry/       # Modular client-side emotion and cursor tracking
│   ├── convex/                 # Convex backend schema, mutations, and actions
│   ├── server.js               # Custom Node.js dev server (Next.js proxy + WebSocket STT)
│   └── .env.local              # Dashboard local environment secrets
│
├── worker/                     # Cloudflare Worker sandbox engine
│   ├── src/
│   │   ├── index.ts            # Durable Object Sandbox class, Gemini code gen, file APIs
│   │   └── starterFiles.generated.ts # Pre-compiled starter app files
│   ├── starter/                # Default multi-page web templates & studio preview HTML
│   ├── wrangler.jsonc          # Cloudflare Worker & Durable Object configuration
│   └── .dev.vars               # Worker local runtime secrets
│
├── docs/                       # Architecture and telemetry documentation
├── Dockerfile                  # Container image definition for production sandbox runtimes
└── README.md                   # Project documentation
```

---

## Prerequisites

| Requirement | Purpose | Notes |
|---|---|---|
| **Node.js 18+** | Local runtime | Tested on Node.js 18, 20, and 22 |
| **npm** | Package management | Monorepo package workflows |
| **Google AI Studio Key** | Prompt refinement & code generator | Free tier without credit card ([aistudio.google.com](https://aistudio.google.com/apikey)) |
| **Convex Account** | Realtime database & backend actions | Free tier ([convex.dev](https://convex.dev)) |
| **GitHub Token** *(Optional for testing, required for PRs)* | Creating branches & opening PRs | Classic Personal Access Token with `repo` scope ([github.com/settings/tokens](https://github.com/settings/tokens)) |

---

## Third-Party Services & API Keys

| Service | Used For | Required? | Where to Get |
|---|---|---|---|
| **Google Gemini** | Prompt cleanup & code generation | **Yes** (Primary AI engine) | [Google AI Studio](https://aistudio.google.com/apikey) (Free, no credit card) |
| **Convex** | Database, project membership, actions | **Yes** (Backend) | [convex.dev](https://convex.dev) (Free tier) |
| **GitHub Token** | PR creation & repo import | **Recommended** | [GitHub Settings → Tokens](https://github.com/settings/tokens/new?scopes=repo&description=Synopsis-App) (`repo` scope) |
| **ElevenLabs** | Realtime STT & spoken voice replies | *Optional* (Browser speech fallback built-in) | [elevenlabs.io](https://elevenlabs.io) |
| **Hume AI** | Real-time emotion telemetry | *Optional* | [hume.ai](https://hume.ai) |
| **Supermemory** | Long-term memory & PR changelogs | *Optional* | [console.supermemory.ai](https://console.supermemory.ai) |
| **Resend** | Tester invitation emails | *Optional* | [resend.com](https://resend.com) |

> [!TIP]
> **No Credit Card Required for Local Development:**  
> You can run the entire platform locally for free using a **Gemini API key** from Google AI Studio and a free **Convex** project. Speech-to-text and text-to-speech fall back automatically to your browser's native **Web Speech API** and **SpeechSynthesis**.

---

## Quickstart Guide

### 1. Clone & Install Dependencies

```bash
# Clone the repository
git clone https://github.com/pkprajapati7402/Synopsis.git
cd Synopsis

# Install root dependencies
npm install

# Install worker dependencies
cd worker && npm install

# Install dashboard dependencies
cd ../dashboard && npm install
cd ..
```

---

### 2. Configure Environment Variables

#### A. Worker Secrets (`worker/.dev.vars`)
Create a file named `.dev.vars` inside the `worker/` directory:

```ini
# Google Gemini API key (Prompt refinement & code generator fallback)
# Generous free tier without credit card: https://aistudio.google.com/apikey
GEMINI_API_KEY=your_gemini_api_key_here

# Optional: Supermemory for sandbox long-term memory
SUPERMEMORY_API_KEY=your_supermemory_key_here
```

#### B. Dashboard Environment (`dashboard/.env.local`)
Create a file named `.env.local` inside the `dashboard/` directory:

```ini
# Cloudflare Worker local URL
NEXT_PUBLIC_WORKER_BASE_URL=http://localhost:8787

# Better Auth Secret (generate any random 32+ character string)
BETTER_AUTH_SECRET=490d5aa4df2aba7fbf304b04c9923005d03afcb1b4c986db164473d61bcf9563

# Google Gemini API key
GEMINI_API_KEY=your_gemini_api_key_here

# Optional: GitHub Personal Access Token (for opening PRs directly)
# GITHUB_TOKEN=ghp_...
# NEXT_PUBLIC_GITHUB_TOKEN=ghp_...

# Optional: Hume AI, ElevenLabs, Supermemory, Resend
# NEXT_PUBLIC_HUME_API_KEY=...
# ELEVENLABS_API_KEY=...
# SUPERMEMORY_API_KEY=...
# RESEND_API_KEY=...
```

#### C. Link Convex Backend
From the `dashboard/` directory, run:

```bash
cd dashboard
npx convex dev
```

Follow the interactive prompts to log in and select or create your Convex project. This will automatically populate `CONVEX_DEPLOYMENT`, `NEXT_PUBLIC_CONVEX_URL`, and `NEXT_PUBLIC_CONVEX_SITE_URL` in your `dashboard/.env.local`.

---

### 3. Run Locally

Open three terminal windows:

#### Terminal 1 — Cloudflare Worker
```bash
cd worker
npm run dev
```
*Runs on `http://127.0.0.1:8787` with local Durable Object SQLite storage.*

#### Terminal 2 — Convex Backend
```bash
cd dashboard
npx convex dev
```
*Watches and syncs database schema, server mutations, and cloud actions.*

#### Terminal 3 — Dashboard Web App
```bash
cd dashboard
npm run dev
```
*Runs on `http://localhost:3000` (proxying through `server.js`).*

---

## How to Use

1. **Open the Homepage**: Navigate to **[http://localhost:3000](http://localhost:3000)** and sign in.
2. **Create or Open a Project**:
   - Link a public or personal GitHub repository (e.g. `HarryRegel/sample-library-web` or your own fork).
3. **Launch a Sandbox**:
   - Open your sandbox URL (e.g. `http://localhost:3000/s/<sandbox-id>`).
   - The app loads the repository files into an isolated preview.
4. **Speak or Type Instructions**:
   - In the bottom toolbar, click the **Smiley Face Icon** to speak (e.g. *"Change the navigation background to dark slate and make the hero title larger"*), or click the **Pencil Icon** to type.
   - The autonomous AI agent modifies the files in seconds and hot-reloads the preview live.
   - The top navigation bar updates with: `✓ 2 files modified: index.html, style.css`.
5. **Create a Pull Request**:
   - Click the **Create PR** button in the top navigation bar.
   - If prompted, provide your GitHub Token (`ghp_...`).
   - Synopsis opens the Pull Request directly on GitHub with the modified files and changelog, and displays a direct `View PR #... ↗` link.

---

## Deploying to Production

### 1. Deploy the Worker
```bash
cd worker
npm run deploy
```
Set production secrets in Cloudflare:
```bash
wrangler secret put GEMINI_API_KEY
wrangler secret put SUPERMEMORY_API_KEY
```

### 2. Deploy Convex Functions
```bash
cd dashboard
npx convex deploy
```
In the [Convex Dashboard](https://dashboard.convex.dev), configure your production environment variables:
- `WORKER_BASE_URL`: `https://<your-worker>.<your-subdomain>.workers.dev`
- `GITHUB_TOKEN`: `ghp_...` (classic token with `repo` scope)
- `SITE_URL`: `https://<your-dashboard-domain>.com`

### 3. Deploy the Dashboard
Deploy the `dashboard/` directory to **Vercel** or any Node.js host. Ensure all environment variables from `dashboard/.env.local` are set in your deployment settings.

---

## Troubleshooting & Common Questions

<details>
<summary><strong>1. Why did I see "Binding AI needs to be run remotely"?</strong></summary>

Cloudflare Workers AI (`env.AI`) models run in Cloudflare's GPU clusters and are unavailable in local offline dev (`wrangler dev --local`).  
**Resolution:** Synopsis includes an automatic **Gemini 2.5 Flash** fallback in `worker/src/index.ts`. As long as `GEMINI_API_KEY` is present in `worker/.dev.vars`, local code generation runs seamlessly.
</details>

<details>
<summary><strong>2. Why did I see "You must be authenticated to use this endpoint"?</strong></summary>

This error comes from ElevenLabs when an API key lacks Speech-to-Text realtime WebSocket permissions.  
**Resolution:** Synopsis automatically routes voice capture through the browser's native **Web Speech API** (`SpeechRecognition`), keeping speech recognition 100% free, real-time, and functional without requiring paid ElevenLabs tiers.
</details>

<details>
<summary><strong>3. Do I need to run <code>npx supermemory setup</code>?</strong></summary>

**No.** That command is for terminal AI coding agents (like Claude Code or Aider). For Synopsis, you only need an API key from [console.supermemory.ai](https://console.supermemory.ai) (and it is completely optional).
</details>

<details>
<summary><strong>4. How do GitHub permissions work when opening a PR?</strong></summary>

GitHub requires write access to create branches on a repository. If you are testing with another user's public repo (e.g. `HarryRegel/sample-library-web`), fork it to your own GitHub account first (e.g. `your-username/sample-library-web`), and link your fork in your project settings.
</details>

---

## Contributing & License

Contributions, issues, and feature requests are welcome. Feel free to open an issue or submit a pull request.

Distributed under the **MIT License**. See `LICENSE` for more information.
