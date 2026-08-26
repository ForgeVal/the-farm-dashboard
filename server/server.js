import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { scrapeInstagramProfile } from './scrapers/instagram.js';
import { broadcastUpdate } from './websocket.js';

// Models
import Post from './models/Post.js';
import Metric from './models/Metric.js';
import Task from './models/Task.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// CRITICAL: Load .env from project root
const envPath = path.join(__dirname, '../.env');
console.log('🔍 Looking for .env at:', envPath);
dotenv.config({ path: envPath });

// Debug: Show what was loaded
console.log('📝 NODE_ENV:', process.env.NODE_ENV);
console.log('📝 PORT:', process.env.PORT);
console.log('📝 MONGODB_URI:', process.env.MONGODB_URI ? 'SET' : 'NOT SET - USING DEFAULT');

const app = express();
const server = http.createServer(app);
export const wss = new WebSocketServer({ server });

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// MongoDB Connection
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/the-farm-dashboard';
console.log('🔗 Connecting to MongoDB:', mongoURI.substring(0, 50) + '...');

mongoose
  .connect(mongoURI)
  .then(() => console.log('✅ MongoDB connected successfully!'))
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });

// WebSocket Setup
wss.on('connection', (ws) => {
  console.log('👤 Client connected. Total:', wss.clients.size);
  
  ws.on('message', async (data) => {
    try {
      const msg = JSON.parse(data);
      console.log('📨 Message:', msg.type);
    } catch (error) {
      console.error('WebSocket message error:', error);
    }
  });

  ws.on('close', () => {
    console.log('👤 Client disconnected. Total:', wss.clients.size);
  });
});

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/admin.html'));
});

// API: Metrics
app.get('/api/admin/metrics', async (req, res) => {
  try {
    const metrics = await Metric.findOne();
    res.json(metrics || {});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/admin/metrics', async (req, res) => {
  try {
    const metrics = await Metric.findOneAndUpdate({}, req.body, { upsert: true, new: true });
    broadcastUpdate('metrics-updated', metrics);
    res.json(metrics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API: Posts
app.get('/api/admin/posts', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/admin/posts', async (req, res) => {
  try {
    const post = new Post(req.body);
    await post.save();
    broadcastUpdate('post-added', post);
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/admin/posts/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    broadcastUpdate('post-updated', post);
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/admin/posts/:id', async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    broadcastUpdate('post-deleted', { id: req.params.id });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API: Tasks
app.get('/api/admin/tasks', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ dueDate: 1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/admin/tasks', async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    broadcastUpdate('task-added', task);
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/admin/tasks/:id/complete', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, { completed: true }, { new: true });
    broadcastUpdate('task-updated', task);
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/admin/tasks/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    broadcastUpdate('task-deleted', { id: req.params.id });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Instagram Sync
app.post('/api/admin/sync', async (req, res) => {
  try {
    console.log('📱 Syncing Instagram...');
    const data = await scrapeInstagramProfile('thefarmstudio');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log('🚀 Server running on http://localhost:' + PORT);
  console.log('📊 Public Dashboard: http://localhost:' + PORT);
  console.log('⚙️  Admin Panel: http://localhost:' + PORT + '/admin');
});