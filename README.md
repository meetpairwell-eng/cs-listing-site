# Cole Swearingen - Real Estate Website

A modern real estate website built with React + Vite, featuring property listings, search functionality, and Google Maps integration.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Development Workflow

### Making Changes to Data Files

When editing property data in `src/data/manualListings.js`:

```bash
# 1. Edit your data files in VS Code
# 2. Save: Cmd+S
# 3. Run the update script
./update.sh
# 4. Hard refresh browser: Cmd+Shift+R
```

### Why You Need to Run `update.sh`

Vite caches modules for performance. Data files (like `manualListings.js`) need a cache clear to show updates. The `update.sh` script handles this automatically.

### Always Hard Refresh After Data Changes

- **Mac**: `Cmd + Shift + R`
- **Windows**: `Ctrl + Shift + R`

## Project Structure

```
src/
├── components/          # React components
├── data/               # Property data and listings
│   └── manualListings.js  # Manual property entries
├── modules/            # Feature modules (property search, etc.)
├── pages/              # Page components
└── api/                # API services
```

## Environment Variables

Copy `.env.example` to `.env.local` and add your API keys:

```bash
cp .env.example .env.local
```

Required variables:
- `VITE_GOOGLE_MAPS_API_KEY` - Google Maps API key

Optional variables:
- `VITE_SIMPLYRETS_API_KEY` - MLS API credentials
- `VITE_SIMPLYRETS_API_SECRET` - MLS API secret
- `VITE_AGENT_MLS_ID` - Your MLS agent ID

**Important**:
- After changing `.env.local`, you MUST restart the dev server
- NEVER commit `.env.local` to git (it's already in `.gitignore`)
- See `SECURITY.md` for API key security best practices

## 🔐 Security Setup (IMPORTANT!)

**First-time setup or if you see API key errors:**

1. **Read the security guide**: See [`SECURITY.md`](SECURITY.md) for critical security information
2. **Configure Google Maps API**: Follow [`GOOGLE_CLOUD_SETUP.md`](GOOGLE_CLOUD_SETUP.md) for step-by-step setup
3. **Secure your API key**: Apply restrictions in Google Cloud Console (takes 5 minutes)

## Helpful Guides

- 🔐 **[`SECURITY.md`](SECURITY.md)** - **READ THIS FIRST** - API key security and rotation procedures
- 🔧 **[`GOOGLE_CLOUD_SETUP.md`](GOOGLE_CLOUD_SETUP.md)** - Step-by-step Google Maps API setup
- 📝 `QUICK_REFERENCE.md` - Quick workflow cheat sheet
- 🏠 `NOTABLE_SALES_GUIDE.md` - How to add/edit notable sales
- 🏢 `MLS_SETUP_GUIDE.md` - MLS integration setup

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `./update.sh` - Update after editing data files (kills server, clears cache, restarts)

## Tech Stack

- **React 19** - UI framework
- **Vite 7** - Build tool and dev server
- **React Router** - Client-side routing
- **Google Maps API** - Map integration
- **SimplyRETS** - MLS data integration (optional)
