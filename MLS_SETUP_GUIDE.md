# MLS Integration Setup Guide

## Current Status
✅ **Code is ready** - Works with sample data now, ready for your real MLS credentials later  
⏳ **Waiting for**: Your MLS Agent ID from broker approval

---

## How It Works Now (Sample Data)

### Without MLS Agent ID:
- Shows **all properties** from SimplyRETS sample data
- Perfect for testing and development
- No filtering applied

### Code Behavior:
```javascript
// In listingsService.js
const agentMlsId = import.meta.env.VITE_AGENT_MLS_ID;
if (agentMlsId) {
    mlsParams.agent = agentMlsId;  // Only filters if ID is set
}
```

**Result**: Sample data works perfectly, no changes needed!

---

## When You Get Your MLS Credentials

### Step 1: Get Your MLS Agent ID
- Contact your broker for approval
- They'll provide your **MLS Agent ID** (e.g., "ABC12345")
- This is different from your license number

### Step 2: Add to Environment Variables
Open `.env.local` and add:

```bash
# Your actual MLS credentials from SimplyRETS
VITE_SIMPLYRETS_API_KEY=your_real_api_key
VITE_SIMPLYRETS_API_SECRET=your_real_api_secret

# Your MLS Agent ID (filters to show only YOUR listings)
VITE_AGENT_MLS_ID=ABC12345
```

### Step 3: Restart Dev Server
```bash
# Stop the current server (Ctrl+C)
npm run dev
```

### Step 4: Done! 🎉
- Now MLS will only show **YOUR** listings
- Manual entries still work exactly the same
- No code changes needed

---

## What Changes When You Add Your MLS ID

### Before (Sample Data):
```
Property Search Page:
├── Manual listings (your curated properties)
└── ALL MLS sample properties (not yours)
```

### After (Your MLS ID):
```
Property Search Page:
├── Manual listings (your curated properties)
└── Only YOUR MLS listings (filtered by agent ID)
```

---

## Sold Properties Sorting

### Current Behavior:
Sold properties are now sorted by **price** (highest first):

1. **Manual with displayPriority** (1, 2, 3...)
   - Your featured sales appear first
   
2. **Highest priced sales** ($12.4M → $8.5M → etc.)
   - Both manual and MLS sorted together by price
   
3. **"Price Upon Request"** properties
   - Off-market sales without public pricing
   
4. **By date** if prices are equal
   - Most recent first

### Example Order:
```
Notable Sales:
1. $12.4M - Hillcrest (manual, displayPriority: 3)
2. $8.5M - Luxury Estate (manual, displayPriority: 4)
3. $7.2M - MLS Sale (from your agent ID)
4. $5.8M - MLS Sale (from your agent ID)
5. Price Upon Request - Potomac (manual, displayPriority: 1)
6. Price Upon Request - 21st Pl (manual, displayPriority: 2)
```

---

## Testing Checklist

### Now (Sample Data):
- [x] Manual listings display correctly
- [x] Sample MLS data shows (all properties)
- [x] Sorting works (price-based for sold)
- [x] No OFF-MARKET badges
- [x] Property Search page works

### After Adding MLS ID:
- [ ] Only YOUR MLS listings appear
- [ ] Manual listings still work
- [ ] Sold properties sorted by price
- [ ] Active listings show correctly
- [ ] Property details load properly

---

## Troubleshooting

### If MLS properties don't show after adding your ID:

1. **Check environment variable is set:**
   ```javascript
   console.log(import.meta.env.VITE_AGENT_MLS_ID); // Should show your ID
   ```

2. **Restart dev server:**
   - Vite needs restart to pick up .env changes
   - Stop (Ctrl+C) and run `npm run dev` again

3. **Verify MLS ID is correct:**
   - Double-check with your broker
   - Try without the agent filter first (remove from .env.local)

4. **Check API credentials:**
   - Make sure VITE_SIMPLYRETS_API_KEY is correct
   - Make sure VITE_SIMPLYRETS_API_SECRET is correct

---

## Files Modified

### Environment Variables:
- `.env.example` - Template with instructions
- `.env.local` - Your actual credentials (not in git)

### Code:
- `src/data/listingsService.js` - Added optional agent filtering
- `src/data/manualListings.js` - Removed OFF-MARKET badges
- Sorting updated to prioritize by price for sold properties

---

## Quick Reference

### To Use Sample Data (Now):
```bash
# In .env.local
VITE_SIMPLYRETS_API_KEY=simplyrets
VITE_SIMPLYRETS_API_SECRET=simplyrets
VITE_AGENT_MLS_ID=
# ↑ Leave blank for sample data
```

### To Use Your Real MLS (Later):
```bash
# In .env.local
VITE_SIMPLYRETS_API_KEY=your_real_key
VITE_SIMPLYRETS_API_SECRET=your_real_secret
VITE_AGENT_MLS_ID=ABC12345
# ↑ Add your agent ID here
```

---

## Support Resources

### SimplyRETS Documentation:
- API Docs: https://docs.simplyrets.com/
- Agent Filtering: https://docs.simplyrets.com/api/index.html#filtering

### Your Broker:
- Request MLS Agent ID
- Confirm SimplyRETS approval
- Get any vendor-specific requirements

### This Codebase:
- All MLS logic in: `src/data/listingsService.js`
- Manual listings in: `src/data/manualListings.js`
- API integration in: `src/api/idxService.js`

---

## Summary

✅ **Ready to use NOW** with sample data  
✅ **Ready for YOUR data** when you get MLS approval  
✅ **No code changes needed** - just update .env.local  
✅ **Sold properties sorted by price** (highest first)  
✅ **OFF-MARKET badges removed** from all properties  

**Next step**: Get broker approval and MLS Agent ID, then just plug it into `.env.local`! 🚀
