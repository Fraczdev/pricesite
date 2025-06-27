// Update services with direct cancellation URLs
import fs from 'fs';

// Direct cancellation URLs - these take users directly to cancel, not just support articles
const directCancelUrls = {
  'icloud_plus': 'https://appleid.apple.com/account/manage', // Apple ID account management
  'apple_music': 'https://music.apple.com/account/settings', // Direct music settings
  'apple_tv_plus': 'https://tv.apple.com/account/settings', // Direct TV+ settings
  'netflix': 'https://www.netflix.com/cancelplan', // Direct cancel page
  'disney_plus': 'https://www.disneyplus.com/account/subscription', // Account subscription page
  'spotify': 'https://www.spotify.com/us/account/subscription/', // Direct subscription page
  'adobe_cc': 'https://account.adobe.com/plans', // Adobe plans page
  'amazon_prime': 'https://www.amazon.com/mc/yourprimemembership', // Prime membership page
  'xbox_game_pass': 'https://account.microsoft.com/services/xbox/billing', // Xbox billing
  'peloton': 'https://account.onepeloton.com/membership', // Direct membership page
  'microsoft_365': 'https://account.microsoft.com/services/', // Microsoft services
  'youtube_premium': 'https://www.youtube.com/paid_memberships', // Direct memberships page
  'dropbox': 'https://www.dropbox.com/account/billing', // Dropbox billing
  'google_one': 'https://one.google.com/settings', // Google One settings
  'hulu': 'https://secure.hulu.com/account', // Hulu account page
  'max': 'https://play.max.com/settings/subscription', // Max subscription settings
  'paramount_plus': 'https://account.paramountplus.com/us/subscription', // Paramount account
  'crunchyroll': 'https://www.crunchyroll.com/acct/?action=premium', // Premium account
  'audible': 'https://www.audible.com/account/payments-and-billing', // Audible billing
  'slack': 'https://slack.com/billing', // Slack billing (requires workspace)
  'notion': 'https://www.notion.so/my-account', // Notion account
  'duolingo_plus': 'https://www.duolingo.com/settings/billing', // Duolingo billing
  'evernote': 'https://www.evernote.com/Settings.action?page=billing', // Evernote billing
  '1password': 'https://my.1password.com/billing', // 1Password billing
  'calm': 'https://www.calm.com/account', // Calm account
  'headspace': 'https://www.headspace.com/settings/billing', // Headspace billing
  'canva': 'https://www.canva.com/settings/billing-and-teams/billing', // Canva billing
  'apple_arcade': 'https://appleid.apple.com/account/manage', // Apple ID management
  'apple_news_plus': 'https://appleid.apple.com/account/manage', // Apple ID management
  'apple_fitness_plus': 'https://appleid.apple.com/account/manage', // Apple ID management
  'twitch_turbo': 'https://www.twitch.tv/settings/billing', // Twitch billing
  'discord_nitro': 'https://discord.com/billing', // Discord billing
  'epic_games_fortnite_crew': 'https://www.epicgames.com/account/billing', // Epic billing
  'playstation_plus': 'https://www.playstation.com/account/management/wallet', // PS account
  'nintendo_switch_online': 'https://accounts.nintendo.com/', // Nintendo account
  'linkedin_premium': 'https://www.linkedin.com/premium/manage/', // LinkedIn premium
  'asana': 'https://app.asana.com/admin/billing', // Asana billing
  'trello': 'https://trello.com/billing', // Trello billing
  'zoom': 'https://zoom.us/billing', // Zoom billing
  'dropbox_sign': 'https://www.dropbox.com/account/billing', // Dropbox billing
  'box': 'https://app.box.com/account/billing', // Box billing
  'proton_mail': 'https://account.proton.me/billing', // Proton billing
  'expressvpn': 'https://www.expressvpn.com/subscriptions', // ExpressVPN subscriptions
  'nordvpn': 'https://my.nordaccount.com/billing/', // NordVPN billing
  'adobe_stock': 'https://account.adobe.com/plans', // Adobe plans
  'flickr_pro': 'https://www.flickr.com/account/billing/', // Flickr billing
  'medium': 'https://medium.com/me/settings/membership', // Medium membership
  'patreon': 'https://www.patreon.com/settings/billing', // Patreon billing
  'substack': 'https://substack.com/settings/billing', // Substack billing
  'onlyfans': 'https://onlyfans.com/my/billing/subscriptions', // OnlyFans subscriptions
  'vimeo': 'https://vimeo.com/settings/billing', // Vimeo billing
  'skillshare': 'https://www.skillshare.com/billing', // Skillshare billing
  'masterclass': 'https://www.masterclass.com/account/billing', // MasterClass billing
  'coursera_plus': 'https://www.coursera.org/account-settings', // Coursera settings
  'udemy_personal_plan': 'https://www.udemy.com/user/edit-credit-payment-info/' // Udemy billing
};

function updateCancelUrls(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    let services = JSON.parse(data);
    
    services = services.map(service => {
      if (directCancelUrls[service.id]) {
        const oldUrl = service.cancelURL;
        service.cancelURL = directCancelUrls[service.id];
        console.log(`✅ Updated ${service.name}: Direct cancel URL`);
      } else {
        console.log(`⚠️  Keeping original: ${service.name} - ${service.id}`);
      }
      return service;
    });
    
    fs.writeFileSync(filePath, JSON.stringify(services, null, 2));
    console.log(`\n🎉 Updated cancel URLs in ${filePath}`);
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
  }
}

console.log('🚀 Updating cancel URLs to direct cancellation pages...\n');

// Update both JSON files
updateCancelUrls('./src/services.json');
updateCancelUrls('./public/services.json');

console.log('\n✨ All cancel URLs updated to direct cancellation pages!');
console.log('🔨 Run: npm run build');
