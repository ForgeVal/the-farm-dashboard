import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Post from './models/Post.js';
import Metric from './models/Metric.js';

dotenv.config();

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/the-farm-dashboard');
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Post.deleteMany({});
    await Metric.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create sample metrics
    const metric = await Metric.create({
      username: 'thefarm',
      followers: 15420,
      following: 328,
      postsCount: 287,
      profileUrl: 'https://www.instagram.com/thefarm/',
      profilePic: 'https://via.placeholder.com/150',
      bio: 'Your social media growth partner 🌾',
      engagement: 4.5,
      avgLikes: 892,
      avgComments: 54,
      scrapedAt: new Date()
    });
    console.log('✅ Created sample metric:', metric);

    // Create sample posts
    const posts = await Post.insertMany([
      {
        caption: 'Growing your Instagram presence, one post at a time 📈',
        imageUrl: 'https://via.placeholder.com/400x400?text=Post+1',
        likes: 1240,
        comments: 87,
        shares: 23,
        postedAt: new Date(Date.now() - 86400000)
      },
      {
        caption: 'Tips for creating engaging content that converts 💡',
        imageUrl: 'https://via.placeholder.com/400x400?text=Post+2',
        likes: 956,
        comments: 64,
        shares: 18,
        postedAt: new Date(Date.now() - 172800000)
      },
      {
        caption: 'Behind the scenes at The Farm HQ 👀',
        imageUrl: 'https://via.placeholder.com/400x400?text=Post+3',
        likes: 1876,
        comments: 142,
        shares: 45,
        postedAt: new Date(Date.now() - 259200000)
      },
      {
        caption: 'Which content format performs best on your account?',
        imageUrl: 'https://via.placeholder.com/400x400?text=Post+4',
        likes: 1203,
        comments: 91,
        shares: 34,
        postedAt: new Date(Date.now() - 345600000)
      },
      {
        caption: 'Ready to scale your Instagram? Let\'s chat 🚀',
        imageUrl: 'https://via.placeholder.com/400x400?text=Post+5',
        likes: 2104,
        comments: 156,
        shares: 67,
        postedAt: new Date(Date.now() - 432000000)
      }
    ]);
    console.log(`✅ Created ${posts.length} sample posts`);

    console.log('\n🎉 Seed complete!');
    console.log('\nYou can now:');
    console.log('  1. Visit http://localhost:5000 to see the dashboard');
    console.log('  2. Go to http://localhost:5000/admin to edit metrics');
    console.log('  3. Add your own posts and watch them update in real-time\n');

    await mongoose.connection.close();
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
}

seed();
