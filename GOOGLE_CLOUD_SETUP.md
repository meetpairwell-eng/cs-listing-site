# Google Cloud Console Setup Guide

**Quick reference for securing your Google Maps API**

---

## 🎯 Quick Start (5 minutes)

### 1. Create New API Key
Go to: https://console.cloud.google.com/apis/credentials

```
Click "+ CREATE CREDENTIALS" → API key
Copy the key immediately (you'll only see it once)
```

### 2. Restrict the Key (CRITICAL!)

#### Set HTTP Referrer Restrictions
```
Edit API Key → Application restrictions → HTTP referrers
```

Add these patterns:
```
localhost:5173/*
localhost:*/*
yourdomain.com/*
*.yourdomain.com/*
```

#### Set API Restrictions
```
Edit API Key → API restrictions → Restrict key
```

Enable ONLY:
- ✅ Maps JavaScript API
- ✅ Places API (optional, if using autocomplete)

### 3. Set Usage Quotas
```
APIs & Services → Maps JavaScript API → Quotas
```

Recommended limits:
- Map loads per day: **5,000**
- Geocoding requests per day: **1,000**

### 4. Set Billing Alerts
```
Billing → Budgets & alerts → CREATE BUDGET
```

Create alerts at:
- $50 (warning)
- $100 (critical)
- $200 (emergency)

### 5. Delete Old Key
```
APIs & Services → Credentials → Find old key → Delete
```

**Must delete:** `AIzaSyDFBUJSmoJccQw1ZMDUwiBAibiXgwkhxlo`

---

## 📋 Visual Checklist

Print or screenshot this checklist:

### Before Creating Key
- [ ] Logged into correct Google Cloud project
- [ ] Have production domain name ready
- [ ] Have local development URL ready (localhost:5173)

### Creating Key
- [ ] New API key created
- [ ] Key copied to secure location
- [ ] Key not shared via chat/email

### Restricting Key (Critical)
- [ ] HTTP referrers added (localhost + production domain)
- [ ] API restrictions set (Maps JavaScript API only)
- [ ] Tested key with restrictions enabled
- [ ] Key works on localhost
- [ ] Key works on production domain

### Setting Quotas
- [ ] Daily map load quota set (5,000 recommended)
- [ ] Geocoding quota set (1,000 recommended)
- [ ] Billing alerts configured ($50, $100, $200)
- [ ] Billing email confirmed

### Cleanup
- [ ] Old compromised key deleted
- [ ] Confirmed old key no longer works
- [ ] Documented new key creation date
- [ ] Set calendar reminder for next rotation (3 months)

### Environment Setup
- [ ] `.env.local` created from `.env.example`
- [ ] New key added to `.env.local`
- [ ] Dev server restarted
- [ ] Maps working locally

### Production Deployment
- [ ] Environment variable added to deployment platform
- [ ] Application redeployed
- [ ] Maps tested in production
- [ ] No console errors

---

## 🔧 Common Issues & Solutions

### Issue: "This page can't load Google Maps correctly"
**Solution:** Key restrictions are too strict or wrong domain

1. Check HTTP referrers match exactly
2. Check for typos in domain name
3. Include both `yourdomain.com/*` and `*.yourdomain.com/*`
4. For localhost, try `localhost:*/*` instead of `localhost:5173/*`

### Issue: "ApiTargetBlockedMapError"
**Solution:** API restrictions too strict

1. Go to API restrictions
2. Make sure "Maps JavaScript API" is enabled
3. Remove any other unnecessary API restrictions

### Issue: Maps work locally but not in production
**Solution:** Missing production referrer

1. Add your production domain to HTTP referrers
2. Redeploy application
3. Clear browser cache

### Issue: High unexpected charges
**Solution:** Key may be compromised or quotas not set

1. Immediately delete the key in Google Cloud Console
2. Create new restricted key
3. Set usage quotas
4. Review API usage logs for suspicious activity

---

## 📊 Monitoring Your Usage

### Daily Quick Check
```
Google Cloud Console → APIs & Services → Dashboard
```

Look for:
- Sudden spikes in requests
- Requests from unexpected IPs
- Unusual patterns (requests at night, weekends)

### Weekly Review
```
APIs & Services → Maps JavaScript API → Metrics
```

Review:
- Total requests this week
- Average daily usage
- Any error rates

### Monthly Bill Review
```
Billing → Transactions
```

Check:
- Current month charges
- Compare to previous months
- Verify charges match expected traffic

---

## 🔄 API Key Rotation Procedure

**Do this every 3 months:**

### Week Before Rotation
- [ ] Schedule 30-minute maintenance window
- [ ] Notify team of upcoming key change
- [ ] Prepare new key creation steps

### Day of Rotation
1. Create new restricted API key (5 min)
2. Update `.env.local` locally (1 min)
3. Test locally (5 min)
4. Update production environment variable (2 min)
5. Deploy to production (5 min)
6. Verify maps work in production (5 min)
7. Delete old key (1 min)
8. Update SECURITY.md with rotation date (1 min)

### After Rotation
- [ ] Monitor for any errors (24 hours)
- [ ] Confirm no unexpected charges (1 week)
- [ ] Set calendar reminder for next rotation

---

## 💰 Cost Optimization Tips

### Free Tier (Updated 2025)
Google Maps provides **$200/month free credit**, which covers:
- ~28,000 map loads per month
- ~40,000 static map requests

### Reduce Costs
1. **Enable caching:** Use `useMemo` in React to cache map instances
2. **Lazy load:** Only load maps when needed
3. **Optimize zoom levels:** Higher zoom = more tiles = more cost
4. **Use static maps:** For non-interactive maps, use Static Maps API
5. **Set reasonable quotas:** Prevent runaway usage

### Red Flags (Check Immediately)
- More than 100 map loads per day on a low-traffic site
- Charges exceeding $50/month for a small business site
- Requests from foreign IPs (if you only serve US)
- Nighttime traffic spikes (2am-5am)

---

## 📞 Support Resources

### Google Cloud Support
- Documentation: https://cloud.google.com/maps-platform/docs
- Pricing Calculator: https://mapsplatform.google.com/pricing/
- Support: https://cloud.google.com/support

### Emergency Contacts
If you see unexpected charges:
1. Delete the API key immediately
2. Contact Google Cloud billing support
3. Review API logs for the compromised period
4. File a support ticket explaining the situation

---

## 🎓 Learning Resources

### Official Guides
- [Maps JavaScript API Security Best Practices](https://developers.google.com/maps/api-security-best-practices)
- [API Key Restrictions](https://cloud.google.com/docs/authentication/api-keys#api_key_restrictions)
- [Billing & Cost Management](https://cloud.google.com/billing/docs/how-to/budgets)

### Video Tutorials
- Google Maps Platform: "Securing Your API Keys"
- Google Cloud: "Setting Up Billing Alerts"

---

**Created:** 2026-02-25
**Last Updated:** 2026-02-25
**Next Review:** [Set date 1 month from today]

---

## ✅ Final Security Verification

Before considering this complete, verify ALL of these:

- [ ] Old key deleted from Google Cloud Console
- [ ] New restricted key created and configured
- [ ] HTTP referrer restrictions applied
- [ ] API restrictions set (Maps JavaScript API only)
- [ ] Usage quotas configured
- [ ] Billing alerts set up
- [ ] `.env.local` updated with new key
- [ ] Production environment updated with new key
- [ ] Application tested locally
- [ ] Application tested in production
- [ ] No hardcoded keys in source code
- [ ] `.env.local` in `.gitignore`
- [ ] Team notified of key change
- [ ] Calendar reminder set for next rotation

**If all boxes are checked, you're secure! 🎉**
