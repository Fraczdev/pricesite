// Update icon URLs with Imgur links
const fs = require('fs');

// Icon URL mappings based on your uploads
const iconUrls = {
  // Corrected URLs (adding proper format)
  '/icons/1Password.png': 'https://i.imgur.com/Bs8vWiy.png',
  '/icons/Adobe_Creative_Cloud.png': 'https://i.imgur.com/bw3D6PN.png',
  '/icons/Apple_TV.png': 'https://i.imgur.com/GFyF67w.png',
  '/icons/applefitness.png': 'https://i.imgur.com/uh3i7nZ.png',
  '/icons/applemusic.jpg': 'https://i.imgur.com/FHWYjJl.png',
  '/icons/applenews.png': 'https://i.imgur.com/L1Xs9yy.png',
  '/icons/asana.png': 'https://i.imgur.com/suPj8s7.png',
  '/icons/audible.png': 'https://i.imgur.com/yci3jpi.png',
  '/icons/Box.png': 'https://i.imgur.com/DXh3kx2.png',
  '/icons/Calm.png': 'https://i.imgur.com/oC3FA4x.png',
  '/icons/Canva.png': 'https://i.imgur.com/WWYUvbs.png',
  '/icons/coursersa.png': 'https://i.imgur.com/09G53Lf.png',
  '/icons/Crunchyroll.png': 'https://i.imgur.com/5FKvOQC.png',
  '/icons/discord_nitro.png': 'https://i.imgur.com/qzCxX8J.png',
  '/icons/Disney.png': 'https://i.imgur.com/3lABrWH.png',
  '/icons/Duolingo_Plus.png': 'https://i.imgur.com/eeAVHnx.png',
  '/icons/Epic_Games_Fortnite_Crew.png': 'https://i.imgur.com/5dUiMgD.png',
  '/icons/Evernote.png': 'https://i.imgur.com/lcaufmo.png',
  '/icons/ExpressVPN.png': 'https://i.imgur.com/2sP8cTC.png',
  '/icons/flickr.png': 'https://i.imgur.com/4yC5cfg.png',
  '/icons/Google_One.png': 'https://i.imgur.com/FF79gUE.png',
  '/icons/HBO_Max.png': 'https://i.imgur.com/wW79AJh.png',
  '/icons/hulu.png': 'https://i.imgur.com/qrLnMjd.png',
  '/icons/icloud+.png': 'https://i.imgur.com/sCfaSWZ.png',
  '/icons/LinkedIn.png': 'https://i.imgur.com/BeyPJKx.png',
  '/icons/Microsoft365.png': 'https://i.imgur.com/7xr3TJm.png',
  '/icons/Nintendo_Online.png': 'https://i.imgur.com/dH4Ihsw.png',
  '/icons/NordVPN.png': 'https://i.imgur.com/Nx5e0SH.png',
  '/icons/Notion.png': 'https://i.imgur.com/ZHqy6LD.png',
  '/icons/OnlyFans.png': 'https://i.imgur.com/WVmtJEF.png',
  '/icons/Headspace.png': 'https://i.imgur.com/7ap5nXa.png',
  '/icons/Paramount.png': 'https://i.imgur.com/9DmL8jn.png',
  '/icons/Patreon.png': 'https://i.imgur.com/BgseyJC.png',
  '/icons/Peloton.png': 'https://i.imgur.com/Kfq8MM7.png',
  '/icons/Playstation.png': 'https://i.imgur.com/FavRh3T.png',
  '/icons/Prime_Video.png': 'https://i.imgur.com/gfhm43W.png',
  '/icons/ProtonVPN.png': 'https://i.imgur.com/HUZbfn8.png',
  '/icons/skillshare.png': 'https://i.imgur.com/MrwSdJP.png',
  '/icons/Slack.png': 'https://i.imgur.com/ya8T5zl.png',
  '/icons/Spotify.png': 'https://i.imgur.com/RIlFTE6.png',
  '/icons/Substack.png': 'https://i.imgur.com/6cEze8i.png',
  '/icons/Trello.png': 'https://i.imgur.com/StMRbtu.png',
  '/icons/Twitch_Turbo.png': 'https://i.imgur.com/CJUoImO.png',
  '/icons/Udemy.png': 'https://i.imgur.com/QcMPR3R.png',
  '/icons/Vimeo.png': 'https://i.imgur.com/PRMewdE.png',
  '/icons/Xbox_Live.png': 'https://i.imgur.com/uYWWRt6.png',
  '/icons/Youtube_Premium.png': 'https://i.imgur.com/10c1wGT.png',
  '/icons/Zoom.png': 'https://i.imgur.com/CzSbHMZ.png',
  '/icons/Netflix.png': 'https://i.imgur.com/LsMrkGy.png'
};

function updateIconUrls(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    let services = JSON.parse(data);
    
    services = services.map(service => {
      if (service.logoURL && iconUrls[service.logoURL]) {
        const oldUrl = service.logoURL;
        service.logoURL = iconUrls[service.logoURL];
        console.log(`✅ Updated ${service.name}: ${oldUrl} -> ${service.logoURL}`);
      } else if (service.logoURL && service.logoURL.startsWith('/icons/')) {
        console.log(`⚠️  Missing: ${service.name} - ${service.logoURL}`);
      }
      return service;
    });
    
    fs.writeFileSync(filePath, JSON.stringify(services, null, 2));
    console.log(`\n🎉 Updated ${filePath}`);
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
  }
}

console.log('🚀 Updating icon URLs...\n');

// Update both JSON files
updateIconUrls('./src/services.json');
updateIconUrls('./public/services.json');

console.log('\n📋 STILL MISSING - Please upload these:');
console.log('- Apple Arcade (arcade.png)');
console.log('- Dropbox (Dropbox.png)');
console.log('- Dropbox Sign (dropbox_sign.png)');
console.log('- Adobe Stock (Adobe_Cloud.png)');
console.log('- Medium (Medium.png)');
console.log('- MasterClass (masterclass.png)');
console.log('\n🔨 After uploading missing icons, run: npm run build');
