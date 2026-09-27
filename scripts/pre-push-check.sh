#!/bin/bash
# Pre-Push TypeScript & Build Check
# Run this before pushing to catch errors early

echo "🔍 Running pre-push checks..."
echo ""

# 1. TypeScript type checking
echo "📘 TypeScript type check..."
npx tsc --noEmit
if [ $? -ne 0 ]; then
  echo "❌ TypeScript errors found! Fix before pushing."
  exit 1
fi
echo "✅ TypeScript OK"
echo ""

# 2. Next.js lint
echo "🔧 ESLint check..."
npm run lint
if [ $? -ne 0 ]; then
  echo "⚠️ Lint warnings/errors found"
fi
echo ""

# 3. Build check
echo "🏗️ Build check..."
npm run build
if [ $? -ne 0 ]; then
  echo "❌ Build failed! Fix before pushing."
  exit 1
fi
echo "✅ Build OK"
echo ""

echo "🎉 All checks passed! Safe to push."
exit 0
