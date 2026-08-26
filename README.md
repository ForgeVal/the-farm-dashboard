# The Farm - Admin Dashboard

A real-time admin control panel for managing social media metrics, posts, and tasks. Built with Express, MongoDB, and WebSocket for live synchronization.

## Features

✅ **Your Original Design** - Public dashboard displays your beautiful Claude Design mockup  
✅ **Professional Admin Panel** - Manage metrics, posts, and tasks from `/admin`  
✅ **Real-time Sync** - All changes instantly reflect across all connected clients  
✅ **No Authentication** - Team shares secret `/admin` URL, no login required  
✅ **Fully Editable** - Update any dashboard element from the admin panel  
✅ **Production Ready** - Docker, Railway-ready, GitHub Actions CI/CD  

## What You Can Edit

### Metrics
- Followers, engagement rate, reach, profile visits
- Saves, DMs, 7-day reach
- Dashboard title, subtitle, account name & bio

### Posts
- Add new posts with caption, image URL, likes, comments, shares
- Edit existing posts
- Delete posts instantly

### Tasks
- Create tasks with priority and due date
- Mark tasks as complete
- Delete tasks

## Quick Start

### Prerequisites
- Node.js 20+
- MongoDB (local or Atlas)

### Setup

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env and add MONGODB_URI

# Run
npm run dev

# Access:
# Dashboard: http://localhost:5000
# Admin: http://localhost:5000/admin
```

## Project Structure

```
├── server/
│   ├── server.js              # Express + WebSocket
│   ├── models/
│   │   ├── Metric.js          # Dashboard metrics
│   │   ├── Post.js            # Social posts
│   │   ├── Task.js            # Admin tasks
│   │   └── (websocket.js)
│   └── scrapers/
│       └── instagram.js       # (Optional scraping)
│
├── public/
│   ├── index.html             # Your original dashboard
│   └── admin.html             # Admin control panel
│
├── Dockerfile
├── docker-compose.yml
├── package.json
└── .env.example
```

## API Routes

### GET Endpoints
```
GET /api/admin/metrics        # Get all metrics
GET /api/admin/posts          # Get all posts
GET /api/admin/tasks          # Get all tasks
```

### POST Endpoints
```
POST /api/admin/metrics       # Update metrics
POST /api/admin/posts         # Add post
POST /api/admin/tasks         # Add task
POST /api/admin/tasks/:id/complete # Mark task complete
POST /api/admin/sync          # Sync with Instagram (placeholder)
```

### PUT/DELETE Endpoints
```
PUT  /api/admin/posts/:id     # Update post
DELETE /api/admin/posts/:id   # Delete post
DELETE /api/admin/tasks/:id   # Delete task
```

## WebSocket Events

Real-time updates broadcast to all connected clients:

```javascript
'metrics-updated'  // Metrics changed
'post-added'       // New post created
'post-updated'     // Post edited
'post-deleted'     // Post removed
'task-added'       // New task created
'task-updated'     // Task status changed
'task-deleted'     // Task removed
```

## Deployment

### Railway (Recommended - 5 minutes)

1. Push to GitHub
2. Go to railway.app → New Project → Deploy from GitHub
3. Railway auto-deploys on every git push!

### Docker Local

```bash
docker-compose up
# Access at http://localhost:5000
```

### Render / Heroku / etc

```bash
npm install
npm start
```

## Environment Variables

```bash
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/the-farm-dashboard
```

## Customization

### Theme Colors
Admin panel uses your design theme:
- Background: `#F3EEE7` (beige)
- Sidebar: `#2E2622` (dark brown)
- Accent: `#6C1E27` (burgundy)

Edit `public/admin.html` CSS to change.

### Add More Editable Fields
1. Add to `Metric` schema in `server/models/Metric.js`
2. Add form field in `public/admin.html`
3. Add save logic to admin panel form handlers

### Connect to Instagram API
Update `server/scrapers/instagram.js` to fetch real metrics instead of manual entry.

## Troubleshooting

**Won't connect to MongoDB**
- Check MONGODB_URI in .env
- Verify IP whitelist on MongoDB Atlas

**Admin panel won't save**
- Check server is running (`npm run dev`)
- Open browser DevTools → Network → check API calls
- Verify MongoDB connection

**Dashboard shows old data**
- Hard refresh browser (Ctrl+Shift+R)
- Check WebSocket connection in DevTools Console

## Support

Questions? Check the code comments or open an issue on GitHub!

---

**The Farm Dashboard** - Built for your team 🌾
