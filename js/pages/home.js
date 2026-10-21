// Stats shown in the "fun facts" row below. The YouTube numbers (views,
// videos) update themselves: a daily GitHub Action writes them to
// js/data/youtube-stats.json, and this page reads that file live from
// GitHub — see scripts/update-youtube-stats.js. The values here are only
// the fallback shown if that file can't be loaded (e.g. offline) or hasn't
// been filled in yet. `countriesReached` isn't public on YouTube, so it
// stays manual — check YouTube Studio > Analytics > Audience.
const STATS = {
  videosMade: '120+',
  countriesReached: '30+',
  youtubeViews: '43,000+',
};

// Read live from GitHub so the iOS app picks up new numbers without an App
// Store update; the bundled copy is the backup if GitHub is unreachable.
const YOUTUBE_STATS_URLS = [
  'https://raw.githubusercontent.com/brushandbeyond/Brush-Beyond-App/main/js/data/youtube-stats.json',
  'js/data/youtube-stats.json',
];

let youtubeStatsPromise = null;

function loadYoutubeStats() {
  if (!youtubeStatsPromise) {
    youtubeStatsPromise = (async () => {
      for (const url of YOUTUBE_STATS_URLS) {
        try {
          const res = await fetch(url, { cache: 'no-cache' });
          if (!res.ok) continue;
          const data = await res.json();
          if (data.viewCount != null) return data;
        } catch {
          // try the next source
        }
      }
      return null;
    })();
  }
  return youtubeStatsPromise;
}

async function fillLiveStats(root) {
  const data = await loadYoutubeStats();
  if (!data) return;
  const values = {
    youtubeViews: data.viewCount.toLocaleString('en-US'),
    videosMade: data.videoCount != null ? data.videoCount.toLocaleString('en-US') : null,
  };
  for (const [key, value] of Object.entries(values)) {
    const el = root.querySelector(`[data-stat="${key}"]`);
    if (el && value) el.textContent = value;
  }
}

function profileBannerHTML() {
  const profile = getProfile();
  if (!profile) {
    return `
      <a class="profile-banner" href="#/profile">
        <span class="profile-banner__icon">🏅</span>
        <span>
          <strong>Create your free artist profile</strong>
          <span class="profile-banner__sub">Earn a badge every time you finish a lesson!</span>
        </span>
      </a>
    `;
  }
  return `
    <a class="profile-banner" href="#/profile">
      ${avatarHTML(profile.avatar, 'profile-banner__icon')}
      <span>
        <strong>Welcome back, ${profile.nickname}!</strong>
        <span class="profile-banner__sub">You've earned ${profile.badges.length} badge${profile.badges.length === 1 ? '' : 's'} — keep going!</span>
      </span>
    </a>
  `;
}

function continueWatchingHTML() {
  const profile = getProfile();
  if (!profile) return '';

  const last = getLastLesson();
  if (!last) return '';

  const lesson = getLessonById(last.id);
  if (!lesson) return '';
  if (hasBadge(lesson.id)) return ''; // already finished — nothing to continue
  if (lesson.premium && !isPremium()) return ''; // no longer accessible

  const thumb =
    lesson.thumbnail ||
    (lesson.videoId ? `https://img.youtube.com/vi/${lesson.videoId}/mqdefault.jpg` : null);
  const isTutorial = lesson.type === 'tutorial' && lesson.steps && lesson.steps.length > 0;
  const label = isTutorial ? '▶ Continue Your Tutorial' : '▶ Continue Watching';
  const subtitle = isTutorial
    ? `Step ${(last.stepIndex || 0) + 1} of ${lesson.steps.length}`
    : `${lesson.artist} · ${lesson.era}`;

  return `
    <a class="continue-card" href="#/lesson/${lesson.id}">
      <div class="continue-card__thumb ${thumb ? '' : 'continue-card__thumb--empty'}" ${thumb ? `style="background-image:url('${thumb}')"` : ''}>
        ${!thumb ? '<span>🎨</span>' : ''}
      </div>
      <div class="continue-card__body">
        <span class="continue-card__label">${label}</span>
        <h3>${lesson.title}</h3>
        <p>${subtitle}</p>
      </div>
    </a>
  `;
}

// Pops up once per browser tab session (not on every visit to home) so it
// nudges a returning kid without nagging them while they're browsing.
function maybeShowContinueWatchingPopup() {
  const profile = getProfile();
  if (!profile) return;

  const last = getLastLesson();
  if (!last) return;

  const lesson = getLessonById(last.id);
  if (!lesson) return;
  if (hasBadge(lesson.id)) return;
  if (lesson.premium && !isPremium()) return;

  const seenKey = `bb_continue_popup_seen_${last.id}`;
  if (sessionStorage.getItem(seenKey)) return;
  sessionStorage.setItem(seenKey, '1');

  const isTutorial = lesson.type === 'tutorial' && lesson.steps && lesson.steps.length > 0;
  const body = isTutorial
    ? `You left off on Step ${(last.stepIndex || 0) + 1} of ${lesson.steps.length}. Want to pick up where you left off?`
    : `Want to keep watching "${lesson.title}"?`;

  showModal({
    icon: '▶️',
    title: `Welcome back, ${profile.nickname}!`,
    body,
    primaryLabel: isTutorial ? 'Continue My Tutorial' : 'Continue Watching',
    onPrimary: () => navigate(`/lesson/${lesson.id}`),
    secondaryLabel: 'Not Now',
  });
}

function renderHome(root) {
  const historyCount = LESSONS.filter((l) => l.type === 'history').length;
  const tutorialCount = LESSONS.filter((l) => l.type === 'tutorial').length;

  root.innerHTML = `
    ${profileBannerHTML()}
    ${continueWatchingHTML()}
    <section class="hero">
      <div class="hero__content">
        <span class="hero__eyebrow">Brush & Beyond</span>
        <h1>You're a Future <em>Artist!</em></h1>
        <p class="hero__tagline">
          <strong>Brush &amp; Beyond</strong> is an art education platform that provides
          art history lessons and hands-on tutorials, taught step by step
          at your own pace. Built by two high schoolers
          who wanted every kid to have real art education, our program fosters a lifelong love of the arts.
        </p>
        ${
          hasProfile()
            ? ''
            : `
              <div class="hero__ctas">
                <a class="btn btn--tutorial" href="#/profile">🎨 Create an Account to Continue</a>
              </div>
            `
        }
      </div>
    </section>

    <section class="how-it-works">
      <h2>Art Education, Made Simple.</h2>
      <div class="how-it-works__grid">
        <div class="how-card">
          <span class="how-card__num">1</span>
          <h3>Learn Art History</h3>
          <p>Meet an artist or movement through a short, fun video lesson.</p>
        </div>
        <div class="how-card">
          <span class="how-card__num">2</span>
          <h3>Follow Step by Step</h3>
          <p>Use our tutorials that break every project into clear steps with video clips and instructions.</p>
        </div>
        <div class="how-card">
          <span class="how-card__num">3</span>
          <h3>Create Your Own Art</h3>
          <p>Grab your supplies and make something that's completely, uniquely yours!</p>
        </div>
      </div>
    </section>

    <section class="section-cards">
      <a class="big-card big-card--history" href="#/history">
        <span class="big-card__icon">🏛</span>
        <h2>Art History</h2>
        <p>Meet the artists, movements, and stories behind famous works. In-depth, Premium deep-dives are available for the extra curious.</p>
        <span class="big-card__count">${historyCount} lessons</span>
      </a>
      <a class="big-card big-card--tutorial" href="#/tutorials">
        <span class="big-card__icon">🎨</span>
        <h2>Art Tutorials</h2>
        <p>Follow along step by step to create your own masterpiece, inspired by the artists you just met.</p>
        <span class="big-card__count">${tutorialCount} lessons</span>
      </a>
    </section>

    <section class="fun-facts">
      <div class="fun-fact"><strong data-stat="videosMade">${STATS.videosMade}</strong><span>educational videos made</span></div>
      <div class="fun-fact"><strong>${STATS.countriesReached}</strong><span>countries reached</span></div>
      <div class="fun-fact"><strong data-stat="youtubeViews">${STATS.youtubeViews}</strong><span>views on YouTube</span></div>
      <div class="fun-fact"><strong>100%</strong><span>kid-friendly</span></div>
    </section>

    <section class="mission">
      <h2>Our Mission</h2>
      <p>
        To ignite creativity, cultivate artistic curiosity, and inspire a love of the arts by
        offering engaging, kid-friendly art history videos and hands-on projects.
      </p>
    </section>
  `;

  fillLiveStats(root);
  maybeShowContinueWatchingPopup();
}
