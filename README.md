# Personal Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- 🎨 Modern dark theme with vibrant gradient accents
- 📱 Fully responsive design
- ✨ Smooth animations with Framer Motion
- 🚀 Optimized for performance
- ♿ Accessible and SEO-friendly

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build for Production

```bash
npm run build
```

This creates the Next.js production bundle in `.next`. To serve it locally:

```bash
npm start
```

## Deployment

The production site is [www.jashu.co.in](https://www.jashu.co.in/), deployed by the existing Vercel GitHub integration. Pushes to `main` trigger production deployments; other connected branches receive preview deployments.

GitHub Actions runs **Portfolio CI** to install locked dependencies, verify navigation and complete Blog content, and build the application. Deployment status is reported separately by Vercel.

This application requires a Next.js server for `/api/contact` and image optimization. It is not configured for GitHub Pages or a static `out` export. Keep the standard Next.js output when deploying to Vercel or another Node.js host.

Configure `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` as server-side environment variables in the hosting platform for contact-form delivery. Never expose them as `NEXT_PUBLIC_` variables. `NEXT_PUBLIC_SITE_URL` optionally overrides the canonical URL, which defaults to `https://www.jashu.co.in/`.

The deployment investigation and fix are recorded in [docs/deployment-rca.md](docs/deployment-rca.md).

## License

MIT

