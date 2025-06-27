// Script to update icon URLs in services.json files
// Run this after uploading icons to a CDN

const fs = require('fs');
const path = require('path');

// Replace this with your CDN base URL after uploading icons
const CDN_BASE_URL = 'https://i.imgur.com/'; // Example: use your actual Imgur links

// Icon filename mapping (update with actual CDN URLs)
const iconUrls = {
  '1Password.png': 'YOUR_IMGUR_ID.png',
  'Adobe_Cloud.png': 'YOUR_IMGUR_ID.png',
  'Adobe_Creative_Cloud.png': 'YOUR_IMGUR_ID.png',
  'applefitness.png': 'YOUR_IMGUR_ID.png',
  'applemusic.jpg': 'YOUR_IMGUR_ID.jpg',
  'applenews.png': 'YOUR_IMGUR_ID.png',
  'Apple_TV.png': 'YOUR_IMGUR_ID.png',
  'arcade.png': 'YOUR_IMGUR_ID.png',
  'asana.png': 'YOUR_IMGUR_ID.png',
  'audible.png': 'YOUR_IMGUR_ID.png',
  'Box.png': 'YOUR_IMGUR_ID.png',
  'Calm.png': 'YOUR_IMGUR_ID.png',
  'Canva.png': 'YOUR_IMGUR_ID.png',
  'coursersa.png': 'YOUR_IMGUR_ID.png',
  'Crunchyroll.png': 'YOUR_IMGUR_ID.png',
  'discord_nitro.png': 'YOUR_IMGUR_ID.png',
  'Disney.png': 'YOUR_IMGUR_ID.png',
  'Dropbox.png': 'YOUR_IMGUR_ID.png',
  'dropbox_sign.png': 'YOUR_IMGUR_ID.png',
  'Duolingo_Plus.png': 'YOUR_IMGUR_ID.png',
  'Epic_Games_Fortnite_Crew.png': 'YOUR_IMGUR_ID.png',
  'Evernote.png': 'YOUR_IMGUR_ID.png',
  'ExpressVPN.png': 'YOUR_IMGUR_ID.png',
  'flickr.png': 'YOUR_IMGUR_ID.png',
  'Google_One.png': 'YOUR_IMGUR_ID.png',
  'HBO_Max.png': 'YOUR_IMGUR_ID.png',
  'Headspace.png': 'YOUR_IMGUR_ID.png',
  'hulu.png': 'YOUR_IMGUR_ID.png',
  'icloud+.png': 'YOUR_IMGUR_ID.png',
  'LinkedIn.png': 'YOUR_IMGUR_ID.png',
  'Medium.png': 'YOUR_IMGUR_ID.png',
  'Microsoft365.png': 'YOUR_IMGUR_ID.png',
  'Netflix.png': 'YOUR_IMGUR_ID.png',
  'Nintendo_Online.png': 'YOUR_IMGUR_ID.png',
  'NordVPN.png': 'YOUR_IMGUR_ID.png',
  'Notion.png': 'YOUR_IMGUR_ID.png',
  'OnlyFans.png': 'YOUR_IMGUR_ID.png',
  'Paramount.png': 'YOUR_IMGUR_ID.png',
  'Patreon.png': 'YOUR_IMGUR_ID.png',
  'Peloton.png': 'YOUR_IMGUR_ID.png',
  'Playstation.png': 'YOUR_IMGUR_ID.png',
  'Prime_Video.png': 'YOUR_IMGUR_ID.png',
  'ProtonVPN.png': 'YOUR_IMGUR_ID.png',
  'skillshare.png': 'YOUR_IMGUR_ID.png',
  'Slack.png': 'YOUR_IMGUR_ID.png',
  'Spotify.png': 'YOUR_IMGUR_ID.png',
  'Substack.png': 'YOUR_IMGUR_ID.png',
  'Trello.png': 'YOUR_IMGUR_ID.png',
  'Twitch_Turbo.png': 'YOUR_IMGUR_ID.png',
  'Udemy.png': 'YOUR_IMGUR_ID.png',
  'Vimeo.png': 'YOUR_IMGUR_ID.png',
  'Xbox_Live.png': 'YOUR_IMGUR_ID.png',
  'Youtube_Premium.png': 'YOUR_IMGUR_ID.png',
  'Zoom.png': 'YOUR_IMGUR_ID.png'
};

function updateIconUrls(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    let services = JSON.parse(data);
    
    services = services.map(service => {
      if (service.logoURL && service.logoURL.startsWith('/icons/')) {
        const filename = service.logoURL.replace('/icons/', '');
        if (iconUrls[filename]) {
          service.logoURL = iconUrls[filename];
          console.log(`Updated ${service.name}: ${filename} -> ${iconUrls[filename]}`);
        }
      }
      return service;
    });
    
    fs.writeFileSync(filePath, JSON.stringify(services, null, 2));
    console.log(`✅ Updated ${filePath}`);
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
  }
}

// Update both JSON files
updateIconUrls('./src/services.json');
updateIconUrls('./public/services.json');

console.log('\n🎉 Icon URLs updated! Don\'t forget to rebuild: npm run build');
