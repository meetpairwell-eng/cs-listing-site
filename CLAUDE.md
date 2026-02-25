# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Start development server (localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Update after data file changes (kills server, clears cache, restarts)
./update.sh
```

## Project Architecture

This is a **React 19 + Vite 7** real estate website with a dual-source property listing system:

### Core Architecture Pattern

The app follows a **hybrid data architecture** that merges:
1. **Manual off-market listings** (`src/data/manualListings.js`) - manually curated properties
2. **MLS API integration** (`src/api/idxService.js`) - live MLS data via SimplyRETS

Both sources are normalized through `src/data/listingsService.js` which provides a unified interface.

### Routing Structure

Routes are defined in `src/App.jsx` using React Router:
- Home page is composed of multiple section components (`Hero`, `About`, `Services`, etc.)
- `/connect` and `/contact` redirect to home with ContactModal auto-opened
- Property details at `/property/:id` with photo grid at `/property/:id/photos`
- All unknown routes redirect to home (`Navigate` component)

### State Management

- No Redux or global state library
- Contact modal state managed in `App.jsx` and passed via props
- Property favorites managed via `src/hooks/useFavorites.js` with localStorage
- All modals (ContactModal, ValuationModal) receive `isOpen` and `onClose` props

### Asset Management

Images are served from **Cloudflare R2** storage (CDN):
- Base URL configured in `src/config.js` (`SITE_CONFIG.mediaBaseUrl`)
- `src/utils/imageHandler.js` handles URL resolution and Cloudflare image optimization
- Convention: property photos use `photoPrefix` + `photoCount` for bulk loading
  - Example: `photoPrefix: 'lakewood'`, `photoCount: 12` generates `lakewood-1.webp` through `lakewood-12.webp`
- Normalized through `listingsService.js` to ensure all listings have `image` and `photos[]` fields

### Component Organization

```
src/
├── components/       # Reusable UI components (Navbar, Footer, ContactModal, etc.)
│   └── common/      # Shared utilities (LoadingSpinner, OptimizedImage)
├── pages/           # Route-level page components
├── modules/         # Self-contained feature modules
│   └── property-search/  # Property search with its own components/ and api/
├── data/            # Data files and listing services
├── api/             # External API integrations (idxService, etc.)
├── hooks/           # Custom React hooks
└── utils/           # Helper functions (imageHandler, etc.)
```

### Property Search Module

Located in `src/modules/property-search/`, this is a **self-contained feature module** with:
- Own components subfolder (FilterModal, PropertyCard, PropertyList, etc.)
- Own API layer (`api/mockData.js`)
- Google Maps integration (`PropertyMapGoogle.jsx`)
- Main entry: `PropertySearch.jsx`

## Important Workflows

### Editing Property Data

When editing `src/data/manualListings.js`:
1. Save the file
2. **Run `./update.sh`** (required - Vite caches data modules)
3. Hard refresh browser (Cmd+Shift+R on Mac)

**Why?** Vite aggressively caches module imports. Data file changes won't appear without clearing the cache. The `update.sh` script handles this by killing the server, clearing cache, and restarting.

### Environment Variables

After modifying `.env.local`, **restart the dev server** (Vite only reads env vars at startup):
- `VITE_GOOGLE_MAPS_API_KEY` - Required for map features
- `VITE_SIMPLYRETS_API_KEY` / `VITE_SIMPLYRETS_API_SECRET` - Optional MLS integration
- `VITE_AGENT_MLS_ID` - Optional filter to show only agent's listings

### Image Optimization

The `OptimizedImage` component (`src/components/common/OptimizedImage.jsx`) automatically:
- Handles Cloudflare R2 URLs via `getFullImageUrl()`
- Applies Cloudflare Image Resizing for responsive images
- Implements lazy loading with IntersectionObserver

When adding new images:
1. Upload to R2 bucket at the configured `mediaBaseUrl`
2. Reference by relative path (e.g., `"5609Ursula/5609Ursula-1.webp"`)
3. OptimizedImage will auto-resolve to full URL

### Property Listing Normalization

The `listingsService.js` normalizes all properties to have:
- `image` - Main hero image
- `photos[]` - Array of all photos (deduplicated)
- Supports bulk photo loading via `photoPrefix` + `photoCount`
- Falls back gracefully if images are missing

## Configuration Files

- `src/config.js` - **Central config file** for all site content:
  - Agent information (name, email, phone, license)
  - R2 media paths (hero video, headshot, service images)
  - Social media links
  - Award logos
  - About page content structure

## Docker/Deployment Notes

`vite.config.js` is configured for Docker/Dokploy deployment:
- Server binds to `0.0.0.0` (essential for container access)
- Port locked to 5173 with `strictPort: true`
- File watching uses polling (better compatibility on Mac/containers)

## ESLint Configuration

Modern flat config (`eslint.config.js`):
- React Hooks and React Refresh plugins enabled
- Custom rule: `no-unused-vars` ignores uppercase variables (constants pattern)
- Ignores `dist/` directory

## Reference Documentation

- `MLS_SETUP_GUIDE.md` - SimplyRETS MLS integration setup
- `NOTABLE_SALES_GUIDE.md` - Adding/editing notable property sales
- `PRODUCTION_BUILD_FIXES.md` - Production deployment troubleshooting
- `SIMPLYRETS_INTEGRATION.md` - Detailed MLS API integration guide
- `QUICK_REFERENCE.md` - Quick workflow cheat sheet for common tasks
