# Security Documentation

## 🚨 IMMEDIATE ACTION REQUIRED

### Critical Security Issue: Exposed API Key in Git History

**Status:** Your Google Maps API key `AIzaSyDFBUJSmoJccQw1ZMDUwiBAibiXgwkhxlo` is exposed in the public GitHub repository.

**What happened:**
- Commit `5c2b285` added a hardcoded API key fallback
- Commit `7d5feac` included the key in index.html
- The repository is public at: `https://github.com/meetpairwell-eng/swearingen_cole.git`
- Anyone can view this key in the commit history

**Impact:**
- Anyone can use your API key to make requests
- Potential for significant unexpected charges
- No way to track legitimate vs malicious usage

---

## Phase 1: Immediate API Key Rotation (DO THIS NOW)

### Step 1: Create a New Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Navigate to **APIs & Services** > **Credentials**
4. Click **+ CREATE CREDENTIALS** > **API key**
5. A new key will be generated - copy it immediately

### Step 2: Restrict the New API Key

**CRITICAL:** Never use an unrestricted API key. Apply these restrictions immediately:

#### Application Restrictions (Referrer-based)
1. Edit your new API key
2. Under **Application restrictions**, select **HTTP referrers**
3. Add these referrers:
   ```
   localhost:5173/*
   localhost:*/*
   yourdomain.com/*
   *.yourdomain.com/*
   ```
4. Replace `yourdomain.com` with your actual production domain

#### API Restrictions
1. Under **API restrictions**, select **Restrict key**
2. Enable ONLY these APIs:
   - Maps JavaScript API
   - Places API (if using autocomplete)
3. Click **Save**

### Step 3: Set Usage Quotas

Protect yourself from unexpected charges:

1. Go to **APIs & Services** > **Maps JavaScript API**
2. Click **Quotas & System Limits**
3. Set reasonable limits:
   - **Map loads per day:** 5,000 (adjust based on traffic)
   - **Geocoding requests:** 1,000 per day
4. Set up billing alerts:
   - Go to **Billing** > **Budgets & alerts**
   - Create alert at $50, $100, $200

### Step 4: Delete the Compromised Key

1. Go back to **Credentials**
2. Find the old key: `AIzaSyDFBUJSmoJccQw1ZMDUwiBAibiXgwkhxlo`
3. Click the trash icon to **DELETE** it
4. Confirm deletion

**Do not skip this step!** The old key must be deleted to prevent abuse.

### Step 5: Update Your Local Environment

1. Create `.env.local` if it doesn't exist:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and add your NEW API key:
   ```bash
   VITE_GOOGLE_MAPS_API_KEY=your_new_restricted_api_key_here
   ```

3. Restart your dev server:
   ```bash
   npm run dev
   ```

### Step 6: Update Production Environment

If you're using Dokploy, Vercel, or another deployment platform:

1. Go to your deployment dashboard
2. Add the environment variable:
   - Key: `VITE_GOOGLE_MAPS_API_KEY`
   - Value: `your_new_restricted_api_key_here`
3. Redeploy your application

---

## Phase 2: Clean Git History (Optional but Recommended)

The old API key is still in your git history. While we've deleted the key (making it useless), it's good practice to remove it from history:

### Option A: Simple Approach (Recommended)
Since you've already deleted the key, just move forward. Anyone finding it in history won't be able to use it.

### Option B: Rewrite History (Advanced)
**Warning:** This requires force-pushing and coordinating with anyone who has cloned the repo.

```bash
# Install git-filter-repo (if not already installed)
# macOS: brew install git-filter-repo
# Linux: pip3 install git-filter-repo

# Backup your repo first!
cd ..
cp -r "CS Website V2" "CS Website V2.backup"
cd "CS Website V2"

# Remove the sensitive data
git filter-repo --replace-text <(echo "AIzaSyDFBUJSmoJccQw1ZMDUwiBAibiXgwkhxlo==>REDACTED")

# Force push (WARNING: This rewrites history)
git push origin --force --all
git push origin --force --tags
```

**Important:** Notify anyone with access to the repo that they need to re-clone it.

---

## API Key Rotation Schedule

To maintain security, rotate API keys on a regular schedule:

### Quarterly Rotation (Every 3 months)
1. Create new API key with restrictions
2. Update all environments (.env.local, production)
3. Test thoroughly
4. Delete old API key
5. Document rotation in this file

### Rotation Checklist
- [ ] Create new restricted API key
- [ ] Update local .env.local
- [ ] Update production environment variables
- [ ] Redeploy application
- [ ] Verify maps are working
- [ ] Delete old API key
- [ ] Update this document with rotation date

**Last Rotation Date:** [Add date when you complete Phase 1]
**Next Rotation Due:** [Add date 3 months from now]

---

## Environment Variable Best Practices

### What NOT to do:
- ❌ Never commit `.env` or `.env.local` files
- ❌ Never hardcode API keys in source code
- ❌ Never use production keys in development
- ❌ Never share API keys via Slack, email, or messaging apps
- ❌ Never commit API keys "temporarily" with plans to remove later

### What TO do:
- ✅ Always use environment variables for secrets
- ✅ Use different API keys for dev, staging, and production
- ✅ Restrict API keys to specific domains/IPs
- ✅ Set usage quotas and billing alerts
- ✅ Rotate keys regularly (quarterly recommended)
- ✅ Store production keys in secure credential managers

---

## Additional Security Measures

### Future Improvements (Phase 2-4)

Refer to the main audit report for:
- Cloudflare R2 access controls
- Content Security Policy implementation
- Webhook rate limiting
- Security headers configuration
- Error monitoring with Sentry

---

## Incident Response

If you suspect an API key has been compromised:

1. **Immediately delete the key** in Google Cloud Console
2. Create and configure a new restricted key
3. Update all environments with the new key
4. Check Google Cloud billing for unexpected charges
5. Review API usage logs for suspicious activity
6. Document the incident and lessons learned

---

## Questions or Issues?

If you're stuck or need help:
1. Check the `.env.example` file for configuration templates
2. Review this SECURITY.md file
3. Check the main README.md for general setup
4. Consult Google Cloud Console documentation

---

## Security Checklist

Use this checklist to verify your security setup:

### API Keys
- [ ] No hardcoded API keys in source code
- [ ] All API keys stored in `.env.local` (not committed)
- [ ] `.env.local` is in `.gitignore`
- [ ] Production keys are in deployment platform (Dokploy/Vercel)
- [ ] All keys have application restrictions (HTTP referrers)
- [ ] All keys have API restrictions (only necessary APIs enabled)
- [ ] Usage quotas are set
- [ ] Billing alerts are configured

### Git Security
- [ ] Old compromised keys have been deleted
- [ ] `.env` files are not in git history
- [ ] `.gitignore` includes `.env*` patterns

### Deployment
- [ ] Environment variables validated at build time
- [ ] Production uses different keys than development
- [ ] Maps feature tested in production

### Monitoring
- [ ] Google Cloud billing alerts configured
- [ ] API usage dashboard bookmarked
- [ ] Quarterly rotation reminder set

---

**Last Updated:** 2026-02-25
**Next Review:** [3 months from last rotation]
