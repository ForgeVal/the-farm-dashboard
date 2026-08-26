# Quick Start - The Farm Dashboard

Get your admin panel running in **3 minutes**.

## 1️⃣ Prerequisites

```bash
node --version  # Needs 20+
npm --version
```

## 2️⃣ Get MongoDB

**Option A: Cloud (Easy)**
- Go to https://www.mongodb.com/cloud/atlas
- Free tier works great
- Create cluster → get connection string

**Option B: Local Docker**
```bash
docker run -d -p 27017:27017 mongo:7.0
# Use: mongodb://localhost:27017/the-farm-dashboard
```

## 3️⃣ Install & Run

```bash
# Install
npm install

# Setup env
cp .env.example .env
# Edit .env → add MONGODB_URI

# Start
npm run dev
```

Done! Access:
- **Dashboard**: http://localhost:5000 (your original design)
- **Admin**: http://localhost:5000/admin (control panel)

## 🎯 Try It

1. Go to http://localhost:5000/admin
2. Edit metrics → watch them sync live
3. Add a post → it updates instantly
4. Add a task → appears in task list

## 🚀 Deploy

```bash
# Push to GitHub
git add .
git commit -m "Initial"
git push

# Go to railway.app
# Connect GitHub → auto-deploy!
```

## Commands

```bash
npm run dev      # Development
npm run start    # Production
npm run seed     # Load sample data
```

---

That's it! Your team can now manage everything from `/admin` 🎉
