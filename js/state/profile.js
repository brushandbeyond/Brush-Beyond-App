// Local, no-login "profile" — a nickname + avatar saved only on this device
// via localStorage. No email, no password, no server. Progress does NOT
// follow a kid to a different device or
// browser — if you outgrow that, see the README note on real accounts.

const PROFILE_KEY = 'bb_profile';

// Each entry is either an emoji character, OR a path to an image you've
// dropped into assets/avatars/ (e.g. 'assets/avatars/fox.png') — see README
// for how to swap these for your own drawn avatars.
const AVATARS = ['🦊', '🐱', '🐼', '🦁', '🐸', '🦄', '🐢', '🐰', '🦋', '🐧', '🦖', '🐙'];

function isImageAvatar(avatar) {
  return typeof avatar === 'string' && /\.(png|jpe?g|gif|webp|svg)$/i.test(avatar);
}

// Renders an avatar as either an <img> (custom artwork) or a plain emoji
// span, so every place that shows an avatar looks right either way.
// `className` also gets sized/styled per call site in css/styles.css.
function avatarHTML(avatar, className) {
  avatar = AVATARS.includes(avatar) ? avatar : AVATARS[0];
  if (isImageAvatar(avatar)) {
    return `<img class="${className} avatar-img" src="${escapeHTML(avatar)}" alt="" />`;
  }
  return `<span class="${className}">${avatar}</span>`;
}

function getProfile() {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return null;
    const profile = JSON.parse(raw);
    if (!profile || typeof profile !== 'object' || Array.isArray(profile)) return null;
    if (typeof profile.nickname !== 'string') return null;
    const lessonIds = new Set(LESSONS.map((lesson) => lesson.id));
    const badges = Array.isArray(profile.badges) ? profile.badges : [];
    const milestones = Array.isArray(profile.seenMilestones) ? profile.seenMilestones : [];
    const last = profile.lastLesson;
    return {
      nickname: profile.nickname.trim().slice(0, 20) || 'Artist',
      avatar: AVATARS.includes(profile.avatar) ? profile.avatar : AVATARS[0],
      badges: [...new Set(badges.filter((id) => lessonIds.has(id)))],
      seenMilestones: [...new Set(milestones.filter((count) => Number.isInteger(count) && count > 0))],
      createdAt: typeof profile.createdAt === 'string' ? profile.createdAt : null,
      watchedVideos: profile.watchedVideos && typeof profile.watchedVideos === 'object' && !Array.isArray(profile.watchedVideos)
        ? Object.fromEntries(Object.entries(profile.watchedVideos).filter(([id, complete]) => lessonIds.has(id) && complete === true))
        : {},
      lastLesson: last && lessonIds.has(last.id) ? {
        id: last.id,
        stepIndex: Number.isInteger(last.stepIndex) && last.stepIndex >= 0 ? last.stepIndex : 0,
      } : null,
    };
  } catch {
    return null;
  }
}

function hasProfile() {
  return !!getProfile();
}

function createProfile(nickname, avatar) {
  const profile = {
    nickname: (nickname || '').trim().slice(0, 20) || 'Artist',
    avatar: AVATARS.includes(avatar) ? avatar : AVATARS[0],
    badges: [],
    seenMilestones: [],
    watchedVideos: {},
    createdAt: new Date().toISOString(),
  };
  return saveProfile(profile) ? profile : null;
}

function saveProfile(profile) {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch {
    showToast('Your progress could not be saved. Please check that device storage is available.');
    return false;
  }
  window.dispatchEvent(new CustomEvent('bb:profile-changed', { detail: profile }));
  return true;
}

function resetProfile() {
  try {
    localStorage.removeItem(PROFILE_KEY);
    localStorage.removeItem('bb_premium_demo');
  } catch {
    showToast('Your profile could not be deleted. Please check your device storage settings.');
    return false;
  }
  window.dispatchEvent(new CustomEvent('bb:profile-changed', { detail: null }));
  return true;
}

function hasBadge(lessonId) {
  const profile = getProfile();
  return !!profile && profile.badges.includes(lessonId);
}

// Returns true if this was a NEW badge (so the caller can celebrate),
// false if they already had it or have no profile yet.
function earnBadge(lessonId) {
  const profile = getProfile();
  if (!profile || !hasCompletedLessonVideo(lessonId) || profile.badges.includes(lessonId)) return false;
  profile.badges.push(lessonId);
  return saveProfile(profile);
}

function hasCompletedLessonVideo(lessonId) {
  const profile = getProfile();
  return !!profile && profile.watchedVideos[lessonId] === true;
}

function completeLessonVideo(lessonId) {
  const profile = getProfile();
  if (!profile || !getLessonById(lessonId)) return false;
  profile.watchedVideos[lessonId] = true;
  return saveProfile(profile);
}

// Powers the "Continue Watching" / "Continue Your Tutorial" card on the
// home page, and lets a tutorial resume on the step a kid last saw instead
// of always restarting at Step 1. `stepIndex` is only meaningful for
// tutorials; omit it for history lessons.
function setLastLesson(lessonId, stepIndex) {
  const profile = getProfile();
  if (!profile) return;
  profile.lastLesson = { id: lessonId, stepIndex: stepIndex || 0 };
  saveProfile(profile);
}

function getLastLesson() {
  const profile = getProfile();
  return (profile && profile.lastLesson) || null;
}

// Called right after a badge is earned. Returns the milestone (from
// MILESTONES) the profile just crossed for the first time, or null — so the
// caller can pop up a "you did it!" celebration exactly once per milestone.
function checkNewMilestone() {
  const profile = getProfile();
  if (!profile) return null;
  if (!profile.seenMilestones) profile.seenMilestones = [];

  const count = profile.badges.length;
  const newlyReached = MILESTONES.filter(
    (m) => count >= m.count && !profile.seenMilestones.includes(m.count)
  );
  if (newlyReached.length === 0) return null;

  // Mark every crossed milestone seen at once — not just the one we pop up
  // for — so a profile that jumps several thresholds in one go (e.g. badges
  // that existed before this feature shipped) gets shown only its highest
  // milestone instead of a stacked run of popups for 1, 5, 10, etc.
  profile.seenMilestones.push(...newlyReached.map((m) => m.count));
  return saveProfile(profile) ? newlyReached[newlyReached.length - 1] : null;
}
