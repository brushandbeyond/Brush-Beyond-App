// Fetches the Brush & Beyond YouTube channel's public stats (total views,
// video count, subscribers) and writes them to js/data/youtube-stats.json,
// which the home page's stats row reads.
//
// Runs automatically once a day via .github/workflows/youtube-stats.yml.
// To run it by hand (Node 18+):
//
//   YOUTUBE_API_KEY=your-key node scripts/update-youtube-stats.js
//
// Get a free API key at console.cloud.google.com → APIs & Services →
// enable "YouTube Data API v3" → Credentials → Create API key. The key
// stays secret (GitHub Actions secret / your terminal) — it never ships
// inside the app or website.

const fs = require('fs');
const path = require('path');

const CHANNEL_HANDLE = '@Brush-And-Beyond-2025';
const OUT_FILE = path.join(__dirname, '..', 'js', 'data', 'youtube-stats.json');

async function main() {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) {
    console.error('Missing YOUTUBE_API_KEY environment variable.');
    process.exit(1);
  }

  const url =
    'https://www.googleapis.com/youtube/v3/channels' +
    `?part=statistics&forHandle=${encodeURIComponent(CHANNEL_HANDLE)}&key=${key}`;
  const res = await fetch(url);
  const body = await res.json();
  if (!res.ok) {
    console.error(`YouTube API error ${res.status}:`, JSON.stringify(body.error || body));
    process.exit(1);
  }
  const channel = body.items && body.items[0];
  if (!channel) {
    console.error(`No channel found for handle ${CHANNEL_HANDLE}.`);
    process.exit(1);
  }

  const s = channel.statistics;
  const stats = {
    channelId: channel.id,
    viewCount: Number(s.viewCount),
    videoCount: Number(s.videoCount),
    // YouTube hides this (and rounds it) when the channel opts to hide it.
    subscriberCount: s.hiddenSubscriberCount ? null : Number(s.subscriberCount),
    updatedAt: new Date().toISOString(),
  };

  fs.writeFileSync(OUT_FILE, JSON.stringify(stats, null, 2) + '\n');
  console.log('Wrote', path.relative(process.cwd(), OUT_FILE), stats);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
