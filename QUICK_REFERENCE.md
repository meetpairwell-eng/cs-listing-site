# Quick Reference: Updating Your Site

## Your Simple Workflow

When editing `src/data/manualListings.js`:

1. **Edit** the file in VS Code
2. **Save**: `Cmd+S`
3. **Run**: `./update.sh`
4. **Hard refresh browser**: `Cmd+Shift+R`

That's it! ✅

## Hard Refresh Shortcut

- **Mac**: `Cmd + Shift + R`
- **Windows**: `Ctrl + Shift + R`

## What `update.sh` Does

- Kills any running dev servers
- Clears Vite cache
- Starts fresh server
- Shows "ready in XXX ms" when done

## Troubleshooting

**Changes not appearing?**

1. ✅ File saved? (No dot in VS Code tab)
2. ✅ Ran `./update.sh`?
3. ✅ Waited for "ready in XXX ms"?
4. ✅ Hard refresh? (`Cmd+Shift+R`)

**"Port already in use" error?**

Just run `./update.sh` again - it will kill the old server.

## Files That Need Server Restart

✅ **Always run `./update.sh` after editing:**
- `src/data/manualListings.js`
- `.env.local`
- Any data/config files

✅ **Usually auto-updates (but hard refresh anyway):**
- React components (`.jsx`)
- CSS files (`.css`)
