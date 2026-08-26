import axios from 'axios';
import { JSDOM } from 'jsdom';

export async function scrapeInstagramProfile(username) {
  try {
    // Fetch Instagram profile page
    const response = await axios.get(`https://www.instagram.com/${username}/`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    const html = response.data;
    
    // Extract JSON data from the page
    const jsonMatch = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/);
    let data = {};

    if (jsonMatch) {
      data = JSON.parse(jsonMatch[1]);
    }

    // Also look for the shared data in the HTML
    const sharedDataMatch = html.match(/"edge_followed_by":\{"edges":\[\],"page_info":\{.*?"count":(\d+)/);
    const bioMatch = html.match(/"biography":"([^"]*)"/);
    const postsMatch = html.match(/"edge_owner_to_timeline_media":\{"edges":\[\],"page_info":\{.*?"count":(\d+)/);
    const profilePicMatch = html.match(/"profile_pic_url":"([^"]*)"/) || 
                           html.match(/"profile_pic_url_hd":"([^"]*)"/);

    const followers = sharedDataMatch ? parseInt(sharedDataMatch[1]) : data.interactionCount?.[0]?.userInteractionCount || 0;
    const bio = bioMatch ? bioMatch[1] : data.description || '';
    const postsCount = postsMatch ? parseInt(postsMatch[1]) : data.author?.[0]?.itemReviewed?.aggregateRating?.reviewCount || 0;
    const profilePic = profilePicMatch ? profilePicMatch[1] : data.image?.[0] || '';

    return {
      username,
      followers: followers || 0,
      postsCount: postsCount || 0,
      profileUrl: `https://www.instagram.com/${username}/`,
      profilePic: profilePic || '',
      bio: bio || '',
      scrapedAt: new Date()
    };
  } catch (error) {
    console.error(`Error scraping @${username}:`, error.message);
    
    // Fallback: return zeros so the endpoint doesn't crash
    return {
      username,
      followers: 0,
      postsCount: 0,
      profileUrl: `https://www.instagram.com/${username}/`,
      profilePic: '',
      bio: '',
      scrapedAt: new Date(),
      error: error.message
    };
  }
}

// Alternative: Use Instagram's public API (more reliable)
export async function scrapeInstagramProfileV2(username) {
  try {
    const response = await axios.get(
      `https://www.instagram.com/api/v1/users/web_profile_info/?username=${username}`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15'
        }
      }
    );

    const user = response.data.data.user;
    
    return {
      username,
      followers: user.edge_followed_by?.count || 0,
      following: user.edge_follow?.count || 0,
      postsCount: user.edge_owner_to_timeline_media?.count || 0,
      profileUrl: `https://www.instagram.com/${username}/`,
      profilePic: user.profile_pic_url_hd || user.profile_pic_url || '',
      bio: user.biography || '',
      scrapedAt: new Date()
    };
  } catch (error) {
    console.error(`V2 scraper failed, falling back to V1:`, error.message);
    return scrapeInstagramProfile(username);
  }
}
