# Tasbeeh — Digital Tasbeeh / Counter

A small, lightweight single-page application (SPA) for counting dhikr (tasbeeh), built with React + Vite and Tailwind CSS.

✅ **What this repo contains**

- A clean UI for selecting zikr, a counter screen, and completion flow
- Built with React 19, Vite, Tailwind CSS, and Framer Motion
- Ready to publish as a static site (Vite build -> `dist`)

---

## 🚀 Quick start

Requirements:

- Node.js 16+ (LTS recommended)
- npm (or yarn)

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Open http://localhost:5173 (default Vite port) to view the app.

Build for production and preview locally:

```bash
npm run build
npm run preview
```

---

## 🔧 Project scripts

- `npm run dev` — development server with HMR
- `npm run build` — build static production files to `dist`
- `npm run preview` — locally preview the production build
- `npm run lint` — run ESLint

---

## ☁️ Deploying to Vercel

This app can be deployed as a static site on Vercel. Two recommended ways:

### 1) Deploy via Git (recommended)

1. Push your repository to GitHub/GitLab/Bitbucket.
2. Go to https://vercel.com and import the project (New Project → Import Git Repository).
3. When prompted, set:
   - **Framework Preset**: Vercel usually detects Vite/React automatically — if not, choose **Other**.
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. (Optional) Add environment variables in the Vercel project settings if needed.
5. Click **Deploy**. After the first deploy you’ll get a production URL.

### 2) Deploy from local machine using Vercel CLI

```bash
npm i -g vercel
vercel login
cd /path/to/this/repo
vercel --prod
```

The CLI will guide you through linking or creating a Vercel project. When asked for Build Command and Output Directory, use `npm run build` and `dist` respectively.

### SPA routing note

To make sure client-side routing always serves `index.html`, add the included `vercel.json` (already in this repo) or set a rewrite from `/(.*)` → `/index.html` in your Vercel project settings.

---

## 📦 Optional: `vercel.json`

This repo includes a sample `vercel.json` that instructs Vercel to run the static build and serve the SPA correctly. You can remove it and configure the same settings in the Vercel dashboard if you prefer.

Example (already added to this repo):

```json
{
  "version": 2,
  "builds": [
    { "src": "package.json", "use": "@vercel/static-build" }
  ],
  "routes": [
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
```

---

## ✅ Troubleshooting

- If deployment fails, run `npm run build` locally to see errors.
- Make sure `dist` is generated and contains `index.html`.
- Ensure your repo's root contains `package.json` and the `build` script.

---

## 💡 Tips

- Use Git & GitHub for easy continuous deployment with Vercel.
- After first deploy, use Vercel's Environment variables and Domains settings for custom domains.

---

## License

MIT

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
