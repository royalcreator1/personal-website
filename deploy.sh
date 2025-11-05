#!/bin/bash

echo "🚀 Deploying Personal Portfolio Website"
echo "========================================"
echo ""

# Check if built
if [ ! -d "out" ]; then
    echo "📦 Building project..."
    npm run build
fi

echo ""
echo "Choose deployment method:"
echo "1. Vercel (Recommended - Fastest)"
echo "2. GitHub Pages (Free hosting)"
echo "3. Netlify (Alternative)"
echo ""
read -p "Enter choice (1-3): " choice

case $choice in
    1)
        echo "Deploying to Vercel..."
        npx vercel --prod
        ;;
    2)
        echo "For GitHub Pages:"
        echo "1. Create a repo on GitHub"
        echo "2. Run: git remote add origin YOUR_REPO_URL"
        echo "3. Run: git push -u origin main"
        echo "4. Enable GitHub Pages in repo settings"
        ;;
    3)
        echo "Deploying to Netlify..."
        npx netlify-cli deploy --prod --dir=out
        ;;
    *)
        echo "Invalid choice"
        ;;
esac

