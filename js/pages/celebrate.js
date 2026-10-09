// The page a milestone popup's "Watch My Video! 🎬" button lands on. Plays
// whatever congratulations clip you've wired up for that milestone in
// js/data/milestones.js — see the comment there for how to add your own.
function renderCelebrate(root, { count }) {
  const milestone = MILESTONES.find((m) => String(m.count) === String(count));
  const profile = getProfile();

  if (!milestone) {
    root.innerHTML = `<div class="not-found"><h2>We couldn't find that celebration.</h2><a href="#/profile">Back to your profile</a></div>`;
    return;
  }

  const videoHTML = milestone.videoFile
    ? localVideoHTML(milestone.videoFile)
    : milestone.videoId
      ? embedHTML(milestone.videoId, `${milestone.title} celebration`)
      : `
        <div class="video-frame video-frame--placeholder">
          <span>🎬</span>
          <p>A congratulations video is coming soon for this milestone! In the meantime — take a bow, you earned it.</p>
        </div>
      `;

  root.innerHTML = `
    <section class="lesson-detail celebrate-page">
      <div class="celebrate-page__confetti">🎉🎨🎉</div>
      <h1>Way to go${profile ? `, ${profile.nickname}` : ''}!</h1>
      <p class="lesson-detail__description">
        <strong>${milestone.icon} ${milestone.title}</strong> — ${milestone.description}
      </p>
      ${videoHTML}
      <a class="btn btn--tutorial" href="#/profile">🏅 Back to My Profile</a>
    </section>
  `;
}
