# Deployment Instructions

## Option 1: Deploy to Vercel (Recommended - Easiest)

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```
   This will open your browser to authenticate.

3. **Deploy**:
   ```bash
   vercel --prod
   ```

   Your site will be live at a URL like: `https://personal-website-xxx.vercel.app`

4. **Link to your domain** (optional):
   - Go to your Vercel dashboard
   - Add your custom domain

## Option 2: Deploy to GitHub Pages

### Prerequisites:
1. Create a new repository on GitHub (e.g., `personal-website`)
2. Make sure GitHub Pages is enabled in repository settings

### Steps:

1. **Add GitHub remote**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/personal-website.git
   git branch -M main
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Settings → Pages
   - Source: GitHub Actions
   - The workflow will automatically deploy when you push to main

3. **Your site will be live at**:
   `https://YOUR_USERNAME.github.io/personal-website`

## Option 3: Deploy to Netlify

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Build the project**:
   ```bash
   npm run build
   ```

3. **Deploy**:
   ```bash
   netlify deploy --prod --dir=out
   ```

4. **Login when prompted** (opens browser)

## Quick Deploy (No CLI needed)

### Vercel:
1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Deploy!

### Netlify:
1. Go to [netlify.com](https://netlify.com)
2. Sign up/Login
3. Drag and drop the `out` folder (after running `npm run build`)
4. Your site is live!

