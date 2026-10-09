// Quick-edit stats shown in the "fun facts" row below. Nothing on this page
// is fetched live from brushbeyond.net or YouTube — these are plain numbers
// you update by hand whenever you want them to change.
const STATS = {
  videosMade: '120+',
  countriesReached: '30+',
  // YouTube doesn't publicly expose a channel's all-time view count, so
  // this is manual too — check YouTube Studio > Analytics > Overview and
  // update it here.
  youtubeViews: '43,000+',
};

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
        <p>Meet the artists, movements, and stories behind famous works. In-depth, Premium deep-dives area available for the extra curious.</p>
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
      <div class="fun-fact"><strong>${STATS.videosMade}</strong><span>educational videos made</span></div>
      <div class="fun-fact"><strong>${STATS.countriesReached}</strong><span>countries reached</span></div>
      <div class="fun-fact"><strong>${STATS.youtubeViews}</strong><span>views on YouTube</span></div>
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

  maybeShowContinueWatchingPopup();
}
