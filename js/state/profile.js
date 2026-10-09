// Local, no-login "profile" — a nickname + avatar saved only on this device
// via localStorage. No email, no password, no server: nothing personal is
// ever collected, so there's nothing to worry about re: kids' privacy law
// (COPPA) here. Progress does NOT follow a kid to a different device or
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
  if (isImageAvatar(avatar)) {
    return `<img class="${className} avatar-img" src="${avatar}" alt="" />`;
  }
  return `<span class="${className}">${avatar}</span>`;
}

function getProfile() {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function hasProfile() {
  return !!getProfile();
}

function createProfile(nickname, avatar) {
  const profile = {
    nickname: (nickname || 'Artist').trim().slice(0, 20),
    avatar: avatar || AVATARS[0],
    badges: [],
    seenMilestones: [],
    createdAt: new Date().toISOString(),
  };
  saveProfile(profile);
  return profile;
}

function saveProfile(profile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  window.dispatchEvent(new CustomEvent('bb:profile-changed', { detail: profile }));
}

function resetProfile() {
  localStorage.removeItem(PROFILE_KEY);
  window.dispatchEvent(new CustomEvent('bb:profile-changed', { detail: null }));
}

function hasBadge(lessonId) {
  const profile = getProfile();
  return !!profile && profile.badges.includes(lessonId);
}

// Returns true if this was a NEW badge (so the caller can celebrate),
// false if they already had it or have no profile yet.
function earnBadge(lessonId) {
  const profile = getProfile();
  if (!profile || profile.badges.includes(lessonId)) return false;
  profile.badges.push(lessonId);
  saveProfile(profile);
  return true;
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
  saveProfile(profile);

  return newlyReached[newlyReached.length - 1];
}
