# Complete Setup Guide - The Farm Dashboard v2

## 📋 What You're Getting

A production-ready Instagram analytics dashboard with:

- **Public Dashboard** (`/`) - Read-only metrics display
- **Admin Panel** (`/admin`) - Team editing (no login required)
- **Real-time WebSocket sync** - All changes broadcast instantly
- **Instagram scraping** - Public data (followers, posts, etc)
- **MongoDB persistence** - All data is saved
- **Docker setup** - Local dev environment
- **Railway-ready** - Deploy in minutes

## 📁 Project Structure

```
the-farm-dashboard/
├── server/                      # Express backend
│   ├── server.js               # Main server + API + WebSocket
│   ├── websocket.js            # WebSocket helper
│   ├── seed.js                 # Optional sample data
│   ├── models/
│   │   ├── Post.js             # Post schema
│   │   └── Metric.js           # Instagram metrics schema
│   └── scrapers/
│       └── instagram.js        # Public Instagram scraper
│
├── frontend/                    # React + Vite frontend
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx   # Public dashboard view
│   │   │   └── AdminPanel.jsx  # Admin control panel
│   │   ├── styles/
│   │   │   ├── Dashboard.css   # Dashboard styling
│   │   │   └── AdminPanel.css  # Admin panel styling
│   │   ├── App.jsx             # Router component
│   │   ├── App.css             # Global styles
│   │   └── main.jsx            # React entry point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions auto-deploy
│
├── Dockerfile                  # Production Docker image
├── Dockerfile.dev              # Development Docker image
├── docker-compose.yml          # Local dev compose
├── package.json               # Root dependencies
├── .env.example               # Environment template
├── .gitignore                 # Git ignore rules
│
├── README.md                  # Full documentation
├── QUICKSTART.md              # 5-minute quick start
├── DEPLOYMENT.md              # Railway deployment guide
└── SETUP.md                   # This file

```

## 🚀 Getting Started (3 Options)

### Option 1: Local Development (Fastest)

```bash
# 1. Install dependencies
npm run install:all

# 2. Setup environment
cp .env.example .env
# Edit .env and add MongoDB URI

# 3. Run
npm run dev

# Open http://localhost:5000
```

### Option 2: Docker (Most Isolated)

```bash
# Just one command - everything runs in containers
docker-compose up

# Access at http://localhost:5000
# Ctrl+C to stop
```

### Option 3: Deploy to Railway (Recommended for Clients)

```bash
# 1. Push to GitHub
git add .
git commit -m "Initial commit"
git push origin main

# 2. Go to https://railway.app
# 3. Click "Create New Project" → "Deploy from GitHub"
# 4. Select this repo
# 5. Railway auto-deploys! 🎉

# Your live URL: https://the-farm-production-xyz.up.railway.app
```

## 📊 Using the Dashboard

### Public Dashboard (`/`)

Shows Instagram metrics:
- Follower count
- Posts count
- Average likes & comments
- Recent posts with engagement

**Features:**
- Real-time updates via WebSocket
- Read-only (no editing)
- Beautiful, professional design
- Mobile responsive

### Admin Panel (`/admin`)

Team control panel for editing metrics and posts.

**Features:**
- Fetch latest Instagram metrics (scrape by username)
- Manually update any metric
- Add new posts with captions and images
- Edit existing posts
- Delete posts
- Real-time sync to all users
- No login required (team-only URL)

## 🔧 Configuration

### Environment Variables

```bash
# .env file

# Server config
NODE_ENV=production           # or development
PORT=5000                    # Server port

# Database (get from MongoDB Atlas)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/the-farm-dashboard

# Optional: For advanced Instagram scraping (future)
# APIFY_API_TOKEN=your_token_here
```

### MongoDB Setup

1. **Free option** (Recommended): MongoDB Atlas
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up (free tier)
   - Create a cluster
   - Get connection string
   - Add to `.env`

2. **Local option**: Docker
   ```bash
   docker run -d -p 27017:27017 --name farm-mongo mongo:7.0
   # Then use: MONGODB_URI=mongodb://localhost:27017/the-farm-dashboard
   ```

## 📱 API Routes

All routes are documented in the code, but here's a quick reference:

### Public API
```
GET /api/data
  Returns: { metric, posts }
```

### Admin API
```
POST   /api/admin/scrape              # Scrape Instagram profile
GET    /api/admin/metrics             # Get current metrics
POST   /api/admin/metrics             # Update metrics
GET    /api/admin/posts               # List all posts
POST   /api/admin/posts               # Add post
PUT    /api/admin/posts/:id           # Update post
DELETE /api/admin/posts/:id           # Delete post
```

### WebSocket Events
```javascript
// Server broadcasts these to all connected clients:
'metric-updated'   // When metrics change
'post-added'       // When post added
'post-updated'     // When post edited
'post-deleted'     // When post removed
'scrape-complete'  // When Instagram scrape finishes
'scrape-error'     // When scrape fails
```

## 🎨 Customizing the Design

### Color Scheme

Edit `frontend/src/styles/Dashboard.css` and `AdminPanel.css`:

```css
/* Current colors */
--primary: #6C1E27       /* Burgundy accent */
--dark: #2E2622         /* Dark brown */
--light: #F3EEE7        /* Beige background */

/* Change to your brand colors */
```

### Add Your Logo

In `frontend/src/pages/Dashboard.jsx`, add image to header:

```jsx
<header className="dashboard-header">
  <img src="/your-logo.png" alt="Logo" className="logo" />
  <h1>Your Agency Name</h1>
  {/* ... */}
</header>
```

## 🔄 Workflow

### Typical Team Workflow

1. **Admin adds post** → Goes to `/admin` → Fills in post details
2. **Post appears live** → Updates on public dashboard automatically
3. **Real-time sync** → All team members see update instantly
4. **Clients see data** → Visit public dashboard to view metrics

### Weekly Update Workflow

1. Admin clicks "Fetch Latest" in `/admin`
2. Enters Instagram username
3. System scrapes public profile data
4. Metrics update automatically
5. Changes broadcast to all users

## 🐛 Troubleshooting

### "Cannot connect to MongoDB"
- Check `MONGODB_URI` in `.env`
- Verify connection string format
- If using MongoDB Atlas, ensure IP whitelist

### "WebSocket connection failed"
- Check backend is running (http://localhost:5000)
- Verify firewall allows WebSocket
- Try refreshing browser

### "Scrape returns 0 followers"
- Profile might be private
- Instagram might rate-limit
- Try a different username
- Wait a few minutes and try again

### "Build fails on deployment"
- Check all files are committed to git
- Verify `Dockerfile` is correct
- Check `.gitignore` isn't hiding needed files

## 📚 Documentation

- **Quick Start**: See `QUICKSTART.md` (5 min setup)
- **Deployment**: See `DEPLOYMENT.md` (Railway guide)
- **Full Docs**: See `README.md` (complete reference)

## ✅ Pre-Deployment Checklist

Before sharing with clients:

- [ ] Verified dashboard loads at `/`
- [ ] Verified admin panel loads at `/admin`
- [ ] Tested Instagram scraping
- [ ] Tested adding/editing posts
- [ ] Verified real-time sync works
- [ ] Customized colors/branding
- [ ] Added your logo/company name
- [ ] Tested on mobile
- [ ] Deployed to Railway or server
- [ ] Verified live URL works

## 🚀 Deployment Summary

### For Local Testing
```bash
npm run dev
```

### For Production (Recommended)
1. Push to GitHub
2. Go to Railway.app
3. Connect GitHub
4. Auto-deploys on every git push!

### For Docker
```bash
docker build -t the-farm:latest .
docker run -p 5000:5000 -e MONGODB_URI=... the-farm:latest
```

## 📞 Next Steps

1. **Setup locally** following Option 1 above
2. **Test everything** - add posts, edit metrics, verify sync
3. **Customize** - add your logo, change colors
4. **Deploy** - Follow DEPLOYMENT.md for Railway
5. **Share with team** - Send them `/admin` URL
6. **Share with clients** - Send them `/` URL

## 💡 Pro Tips

- Use `npm run seed` to add sample data
- Check logs: `docker logs farm-backend`
- MongoDB backups are automatic on Railway
- Auto-deploys on `git push` to main
- No authentication needed = team-only URLs

---

**You're all set!** Start with `QUICKSTART.md` and enjoy! 🎉
