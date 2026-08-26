import mongoose from 'mongoose';

const metricSchema = new mongoose.Schema({
  // Instagram Profile
  username: String,
  profilePic: String,
  bio: String,
  accountName: String,
  
  // Core Metrics
  followers: { type: Number, default: 0 },
  following: { type: Number, default: 0 },
  postsCount: { type: Number, default: 0 },
  
  // Performance Metrics
  engagement: { type: Number, default: 0 },
  engagementRate: { type: Number, default: 0 },
  reach: { type: Number, default: 0 },
  profileVisits: { type: Number, default: 0 },
  saves: { type: Number, default: 0 },
  dms: { type: Number, default: 0 },
  sevenDayReach: { type: Number, default: 0 },
  
  // Average metrics
  avgLikes: { type: Number, default: 0 },
  avgComments: { type: Number, default: 0 },
  
  // Dashboard Display
  dashTitle: { type: String, default: 'The Farm Analytics' },
  dashSubtitle: { type: String, default: 'Instagram Performance' },
  
  // URLs
  profileUrl: String,
  scrapedAt: Date,
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Metric', metricSchema);
