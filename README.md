# AI Would You Rather

A festival-booth party game: enter your name, then 10 rounds of AI-generated
"Would You Rather" questions, then an AI-written personality read addressed
to you by name. Built with Next.js (App Router) so it deploys to Vercel or
runs on a laptop at the booth. Local fail-safes keep the game running when the
AI API or network is unavailable.

## What's included

- **`/` — the game.** Name prompt → welcome → 10 rounds → personality
  summary (with the player's name in it) → share / play again. Mobile-first,
  tap-only, one-handed, no login.
- **`/mirror` — the projector view.** Shows the current player's name, the
  live question, a real-time vote split as people answer, a QR code to
  join, and a leaderboard of the most common personality titles seen today.
- **`/api/questions`** — requests a fresh batch of 10 tagged questions per
  session through OpenRouter's free NVIDIA Nemotron 3.5 Lightning model, then
  falls back to a hand-written local pool if the
  call fails or returns malformed data.
- **`/api/summary`** — computes deterministic signal tallies from the session's
  choices, then asks the configured OpenRouter generation model to write the personality
  read. It uses a local
  summary if the AI call fails.
- **`/api/mirror`** — shared state the game page pushes to and the
  projector page polls, so the big screen mirrors whatever the current
  player is doing, including their name.

## Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000` for the game and `http://localhost:3000/mirror`
for the projector view (open that one on the booth's second screen).

### Getting an OpenRouter API key

Create an account and API key at [openrouter.ai/keys](https://openrouter.ai/keys),
then put it in `.env.local` as `OPENROUTER_API_KEY`. The app falls back locally
when the key is missing or the API is unavailable.

## Deploying

### Vercel

```bash
vercel deploy
```

Set `OPENROUTER_API_KEY` in the Vercel project's Environment Variables. The
mirror/leaderboard state in `lib/store.ts` lives in server memory. On serverless functions, requests can
land on different warm instances, so the projector view may occasionally
miss an update or the leaderboard may not perfectly match every session.
For a single booth this is usually unnoticeable, but if you want it fully
consistent, swap `lib/store.ts` for a real shared store (Vercel KV or
Upstash Redis are both a few lines of change — every function in that file
is already the seam to do it at).

### A laptop at the booth

```bash
npm run build
npm start
```

This runs as one long-lived Node process, so `lib/store.ts`'s in-memory
state is always consistent — no database needed. Point the booth's phones
at the laptop's local IP (e.g. `http://192.168.1.23:3000`) and the QR code
on `/mirror` will pick that up automatically since it encodes
`window.location.origin`.

## The username feature

- On the welcome screen, the player types a name into `.name-input`
  (defaults to "Player One" if left blank).
- The name is sent to `/api/summary` alongside the 10 picks, and the prompt
  there explicitly asks the model to open the prediction with `"{name}, you
will probably..."` and to use the name once in the read.
- The summary card's eyebrow reads "{name}'s diagnosis," and the copied
  share text opens with `{name} is "{title}"`.
- The name is also pushed to `/api/mirror` so the projector view can show
  "{name} — Round X / 10" while they play.

## Content safety

The question-generation prompt already asks for "appropriate for a
university festival, no gore, no NSFW, no sensitive identity topics," and
the summary prompt tells the model not to comment on protected traits. If
you want a harder guarantee before the festival, review a batch of ~50
generated questions ahead of time (call `/api/questions` in a loop) and
extend `lib/fallbackQuestions.ts` with any good ones you want to make sure
show up.

## Extending it

- **"Roast your friend" mode**: reuse the same 10 questions, but pass a
  second person's name into `/api/summary` and tweak the system prompt.
- **Bigger leaderboard**: `lib/store.ts` currently returns the top 10
  titles; raise the `.slice(0, 10)` limit if you want more.
- **Share card as an image**: the game currently copies share text to the
  clipboard. For a shareable image, render the `.card` element to canvas
  with `html2canvas` and offer it as a download from the summary screen.
