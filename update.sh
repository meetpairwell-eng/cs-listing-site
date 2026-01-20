#!/bin/bash
# SIMPLE UPDATE SCRIPT
# Run this EVERY TIME you edit manualListings.js
# Usage: ./update.sh

echo "🔄 Updating..."

# Kill any running servers (no matter where they are)
pkill -9 -f "vite" 2>/dev/null

# Clear the cache
rm -rf node_modules/.vite

# Wait a moment
sleep 1

# Start fresh
echo "✅ Starting server..."
npm run dev
