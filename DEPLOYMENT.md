# Deployment Guide - Railway

Deploy The Farm Dashboard to Railway in **10 minutes**.

## Why Railway?

✅ Auto-deploys on git push  
✅ Free MongoDB included  
✅ Built-in environment variables  
✅ One-click scaling  
✅ Free SSL certificates  
✅ No credit card for free tier  

## Prerequisites

- GitHub account (repo must be public or connected)
- Railway account (https://railway.app)

## Step 1: Create Railway Project

1. Go to https://railway.app
2. Click **"Create New Project"**
3. Select **"Deploy from GitHub"**
4. Authorize Railway to access your GitHub
5. Select the `the-farm-dashboard` repository
6. Click **"Deploy"**

Railway will start building immediately.

## Step 2: Add MongoDB

1. In Railway dashboard, click **"Add Service"**
2. Click **"Add from Marketplace"**
3. Search for **"MongoDB"**
4. Click **"MongoDB"** → **"Add"**
5. Railway adds a MongoDB instance automatically

## Step 3: Connect MongoDB

The MongoDB service is now running. Railway automatically sets the `MONGODB_URI` environment variable in the plugin. Your Express server will use it!

To verify:
1. Click on **MongoDB** service
2. Copy the connection string
3. Click on **Express** (main app) service
4. Go to **"Variables"**
5. Add variable: `MONGODB_URI` = `[paste connection string]`

✅ If you see `MONGODB_URI` already set, you're good!

## Step 4: Set Environment Variables

1. Click on your Express app service
2. Go to **"Variables"**
3. Add these variables:

```
NODE_ENV=production
PORT=5000
```

## Step 5: Deploy

1. Make a small change and push to GitHub:

```bash
git add .
git commit -m "Initial deployment"
git push origin main
```

2. Railway auto-deploys on push
3. Watch the build in Railway dashboard
4. When green checkmark appears, it's live!

## Step 6: Get Your Live URL

1. Click on your Express service
2. Go to **"Deployments"**
3. Copy the URL under "Domain"
4. Your app is now live! 🎉

Example: `https://the-farm-production-abc123.up.railway.app`

## Accessing Your Dashboard

- **Public Dashboard**: `https://your-railway-url.up.railway.app/`
- **Admin Panel**: `https://your-railway-url.up.railway.app/admin`

## Automated Deployments

Every git push to `main` triggers automatic deployment:

```bash
git commit -m "Add new metrics"
git push origin main
# Railway auto-deploys in ~2 minutes
```

## Custom Domain

To use your own domain (e.g., `dashboard.thefarm.io`):

1. In Railway, go to your service
2. Click **"Settings"**
3. Click **"Add Custom Domain"**
4. Enter your domain
5. Copy the CNAME record Railway provides
6. Add to your domain's DNS settings
7. Wait ~5 minutes for DNS propagation

## Monitoring

### View Logs

1. Click on service
2. Go to **"Logs"**
3. See real-time output

### Check Status

1. Service panel shows green = healthy
2. If red, check logs for errors

### Restart Service

1. Click service
2. Click **"Actions"**
3. Click **"Restart"**

## Troubleshooting

### Build Fails

**Error**: `npm: command not found`
- Railway should have Node pre-installed
- Check `Dockerfile` path is correct
- Ensure `package.json` exists at root

**Error**: `ENOENT: no such file or directory`
- Check `.gitignore` isn't hiding files
- Verify all necessary files are committed

### App Crashes After Deploy

**Check logs**: Click service → "Logs"

Common causes:
1. MongoDB URI not set
2. Port conflict (should be 5000)
3. Missing environment variables

**Fix**:
1. Verify variables in "Variables" tab
2. Check MongoDB service is running
3. Restart service

### MongoDB Connection Fails

1. Click MongoDB service
2. Verify it shows "Active"
3. Check `MONGODB_URI` in Express variables
4. Try restarting both services

## Scaling

As your app grows:

1. Click service
2. Adjust **"Auto Deploy on Push"** if needed
3. No code changes needed — scales automatically!

## Backup Data

MongoDB on Railway includes automatic backups. Your data is safe!

To export manually:
1. In MongoDB service, view variables
2. Use MongoDB URI to connect via MongoDB Compass
3. Export collections

## Next Steps

1. ✅ App is live!
2. Send dashboard URL to clients
3. Share `/admin` URL with team
4. Team can immediately add/edit posts
5. No further maintenance needed

## Support

**Railway Issues**: https://docs.railway.app/  
**Dashboard Issues**: Check GitHub issues or README.md

---

Congrats! Your The Farm Dashboard is live! 🚀
