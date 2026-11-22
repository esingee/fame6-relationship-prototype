# From Resolution to Relationship: Clickable Prototype

FAME 6.0 · IDFC FIRST Bank · Problem Statement 3

A front-end-only, simulated mobile banking app that shows three customer-experience ideas:

| Feature | Promise |
|---|---|
| **Open Case Notes** | "I can see exactly what is happening to my case, in plain words." |
| **FIRST VOICE** | "When I suggest something, the bank tells me what happened to my idea, and why." |
| **FIRST MOMENTS** | "When my life changes, the bank helps with the practical steps, without selling me anything." |

> **Concept prototype. Not an official IDFC FIRST Bank app. Not made by or affiliated with IDFC FIRST Bank. Dummy data only.**
> There is no backend, no real login and no real data. State lives in React state and `localStorage` (key `fr2r-demo-state`). Nothing typed on the sign-in screen is stored or sent.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-checks, then builds to dist/
npm run preview  # serve the built site locally
```

The app opens on the demo sign-in. **Reset Demo** and the English/हिंदी toggle are in "Demo controls" at the bottom of the Home screen.

## Add the logo and the reference screenshot

- **Logo:** drop your file at `public/logo.png`. It is used on sign-in and home. If the file is missing, a text wordmark is shown instead. (A logo with a transparent or white background works best, as it sits on a white bar.)
- **Reference photos:** `reference/` holds photos of the real app (home, login, customer service). The sign-in, home, header and requests styling were matched to them.

## Demo scripts

**A. Open Case Notes (about 75 s)**
1. Sign In → Home.
2. Home → My Requests → "EMI paid but showing as due".
3. Scroll: point at **What Happens Next** and the amber **Date Changed?** note.
4. Tap "See how the bank's agent view works (demo)". Show internal vs customer split, tap **Approve & Publish**.
5. Back on the case page, tap **Simulate Next Update (Demo Only)**. The case resolves and the post-interaction sheet appears.

**B. FIRST VOICE (about 75 s)**
1. From the sheet, tap **Suggest An Improvement** (category pre-set to Loans). Type, or tap the mic, then submit.
2. On the receipt, show the 4-stage tracker.
3. My Ideas → the implemented idea's decision note → the declined "developer mode" decision.
4. Idea Board (Support one, see Spotlight), type "I want to close my loan from the app" to see similar-idea matching, then Ideas We Made Real.

**C. FIRST MOMENTS (about 75 s)**
1. Home → Customer Service → Life Update → Moving To A New City.
2. Open Task 1, show the address tip, Mark As Done.
3. Task 3 → I Need Help → Call me back.
4. Finish the rest, then See My Recap and show the "No sales call" line.

Extra: `/#/workbench` is the stretch-goal internal dashboard; `/#/agent/cn-24817` is the agent view.

## Deploy

Routes use `HashRouter` and Vite `base: './'`, so the build works from any static host or sub-path.

### GitHub Pages (via Actions)
1. Push this repo to GitHub on the `main` branch.
2. Repo → **Settings → Pages → Source: GitHub Actions**.
3. The workflow in `.github/workflows/deploy.yml` builds and publishes on every push to `main`. Your site is at `https://<user>.github.io/<repo>/`.

### Cloudflare Pages
1. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**, pick the repo.
2. Build command: `npm run build`. Build output directory: `dist`. Node version 20 or later.
3. Deploy. No redirects file is needed because of the hash router.

## Project layout

```
src/
  App.tsx            routes
  components/        Shell (frame + ConceptBanner + BottomNav), ui (Button, Card, Chip, BottomSheet, Toast, StageTracker, Timeline, ProgressMeter), TaskCard, DecisionNote
  data/              types and seeded fixtures (cases, ideas, moments)
  i18n/strings.ts    English + Hindi (home and the three feature entry screens)
  state/             useDemoState (context + localStorage)
  screens/           SignIn, Home, cases/, voice/, moments/
```
