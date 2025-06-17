#!/bin/bash

# Development Server Reset Script
# Use this when experiencing cache/HMR issues

echo "🧹 Cleaning Next.js cache and restarting development server..."

# Kill any running Next.js processes
echo "🔄 Stopping existing development servers..."
pkill -f "next dev" || true

# Clean Next.js cache
echo "🗑️  Removing .next cache directory..."
rm -rf .next

# Clean Node.js cache
echo "🗑️  Cleaning Node.js module cache..."
rm -rf node_modules/.cache

# Clean Tailwind cache (if exists)
echo "🗑️  Cleaning Tailwind cache..."
rm -rf .tailwindcss-cache || true

# Optional: Clear TypeScript build info
echo "🗑️  Clearing TypeScript build cache..."
rm -f tsconfig.tsbuildinfo

echo "✅ Cache cleared! Starting development server..."
echo "🚀 Running: npm run dev"
echo ""

# Start development server
npm run dev