function embedHTML(videoId, title) {
  if (!videoId) {
    return `
      <div class="video-frame video-frame--placeholder">
        <span>🎬</span>
        <p>Video coming soon! Check the <a href="https://www.youtube.com/@Brush-And-Beyond-2025" target="_blank" rel="noopener">Brush &amp; Beyond YouTube channel</a> in the meantime.</p>
      </div>
    `;
  }
  return `
    <div class="video-frame">
      <iframe
        src="https://www.youtube-nocookie.com/embed/${videoId}"
        title="${title}"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
      </iframe>
    </div>
  `;
}

// A clip you've uploaded yourself (tutorials & milestone celebrations only —
// art history stays on YouTube via embedHTML above).
function localVideoHTML(videoFile) {
  return `
    <div class="video-frame">
      <video src="${videoFile}" controls playsinline></video>
    </div>
  `;
}

// Tutorials check `videoFile` (your own upload) first, then fall back to the
// YouTube `videoId` so nothing breaks before you've uploaded a clip.
function tutorialVideoHTML(videoFile, videoId, title) {
  if (videoFile) return localVideoHTML(videoFile);
  return embedHTML(videoId, title);
}

function stepVideoHTML(step, title) {
  if (step.videoFile) return localVideoHTML(step.videoFile);
  if (!step.videoId) {
    return `
      <div class="video-frame video-frame--placeholder video-frame--step">
        <span>🎬</span>
        <p>This step's clip hasn't been added yet — follow the written instructions below in the meantime!</p>
      </div>
    `;
  }
  return embedHTML(step.videoId, title);
}

function lockedHTML() {
  return `
    <div class="video-frame video-frame--locked">
      <span>🔒</span>
      <p>This is one of our extensive, deep-dive <strong>Premium</strong> lessons.</p>
      <a class="btn btn--premium" href="#/premium">✨ Unlock with Premium</a>
    </div>
  `;
}

function accountGateHTML() {
  return `
    <div class="video-frame video-frame--locked">
      <span>🔒</span>
      <p>Create an account to continue — it's how we save your progress and badges!</p>
      <a class="btn btn--tutorial" href="#/profile">🎨 Create an Account</a>
    </div>
  `;
}

function funFactHTML(fact) {
  return `
    <div class="fun-fact-callout">
      <span class="fun-fact-callout__icon">💡</span>
      <p><strong>Did you know?</strong> ${fact}</p>
    </div>
  `;
}

function materialsHTML(materials) {
  return `
    <div class="materials">
      <h2>🧰 What You'll Need</h2>
      <ul class="materials__list">
        ${materials.map((m) => `<li>${m}</li>`).join('')}
      </ul>
    </div>
  `;
}

function completionHTML(lessonId) {
  if (hasBadge(lessonId)) {
    return `
      <div class="completion completion--earned">
        <span class="completion__icon">🏅</span>
        <p>Badge earned! Great work — check your <a href="#/profile">profile</a> to see your collection.</p>
      </div>
    `;
  }
  return `
    <div class="completion">
      <button type="button" class="btn btn--tutorial" id="claim-badge-btn">Claim My Badge!</button>
    </div>
  `;
}

function wireCompletionButton(container, lessonId, onEarned) {
  const btn = container.querySelector('#claim-badge-btn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const justEarned = earnBadge(lessonId);
    if (justEarned) showToast('🏅 Badge earned! Nice work.');
    onEarned();

    const milestone = justEarned ? checkNewMilestone() : null;
    if (milestone) {
      showModal({
        icon: milestone.icon,
        title: `${milestone.count} lessons — ${milestone.title}!`,
        body: `${milestone.description} Want to watch a special congratulations video?`,
        primaryLabel: '🎬 Watch My Video!',
        onPrimary: () => navigate(`/celebrate/${milestone.count}`),
        secondaryLabel: 'Maybe Later',
      });
    }
  });
}

function renderStepper(container, lesson) {
  const steps = lesson.steps;
  // Resume on the step a kid last saw, so re-opening a tutorial doesn't
  // dump them back at Step 1 — see the "Continue Your Tutorial" card on
  // the home page.
  const lastLesson = getLastLesson();
  let currentIndex =
    lastLesson && lastLesson.id === lesson.id
      ? Math.min(lastLesson.stepIndex, steps.length - 1)
      : 0;

  function draw() {
    const step = steps[currentIndex];
    const isFirst = currentIndex === 0;
    const isLast = currentIndex === steps.length - 1;
    setLastLesson(lesson.id, currentIndex);

    container.innerHTML = `
      ${lesson.materials ? materialsHTML(lesson.materials) : ''}
      <div class="stepper">
        <div class="stepper__progress">
          <span class="stepper__count">Step ${currentIndex + 1} of ${steps.length}</span>
          <div class="stepper__dots">
            ${steps
              .map(
                (_, i) =>
                  `<span class="stepper__dot ${i === currentIndex ? 'is-current' : ''} ${i < currentIndex ? 'is-done' : ''}"></span>`
              )
              .join('')}
          </div>
        </div>
        <h2 class="stepper__title">${step.title}</h2>
        ${stepVideoHTML(step, step.title)}
        <p class="stepper__instructions">${step.instructions}</p>
        <div class="stepper__nav">
          <button type="button" class="btn btn--ghost" id="step-prev" ${isFirst ? 'disabled' : ''}>← Previous Step</button>
          ${
            isLast
              ? `<span class="stepper__done">🎉 You finished all the steps!</span>`
              : `<button type="button" class="btn btn--tutorial" id="step-next">Next Step →</button>`
          }
        </div>
      </div>
      ${isLast ? completionHTML(lesson.id) : ''}
    `;

    const prevBtn = container.querySelector('#step-prev');
    const nextBtn = container.querySelector('#step-next');
    const scrollToTop = () => container.scrollIntoView({ behavior: 'smooth', block: 'start' });

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentIndex = Math.max(0, currentIndex - 1);
        draw();
        scrollToTop();
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentIndex = Math.min(steps.length - 1, currentIndex + 1);
        draw();
        scrollToTop();
      });
    }
    if (isLast) {
      wireCompletionButton(container, lesson.id, draw);
    }
  }

  draw();
}

function renderLessonDetail(root, { id }) {
  const lesson = getLessonById(id);

  if (!lesson) {
    root.innerHTML = `<div class="not-found"><h2>We couldn't find that lesson.</h2><a href="#/">Back home</a></div>`;
    return;
  }

  const backHref = lesson.type === 'tutorial' ? '#/tutorials' : '#/history';
  const backLabel = lesson.type === 'tutorial' ? '← Back to Art Tutorials' : '← Back to Art History';
  const locked = lesson.premium && !isPremium();

  root.innerHTML = `
    <section class="lesson-detail">
      <a class="back-link" href="${backHref}">${backLabel}</a>

      <div class="lesson-detail__badges">
        ${typeBadgeHTML(lesson.type)}
        ${lesson.premium ? premiumBadgeHTML() : ''}
      </div>

      <h1>${lesson.title}</h1>
      <p class="lesson-detail__meta">${lesson.artist} · ${lesson.era}</p>
      ${difficultyBadgeHTML(lesson.difficulty)}

      <p class="lesson-detail__description">${lesson.description}</p>

      <div id="lesson-body"></div>
    </section>
  `;

  const bodyMount = root.querySelector('#lesson-body');

  if (!hasProfile()) {
    bodyMount.innerHTML = accountGateHTML();
    return;
  }

  if (locked) {
    bodyMount.innerHTML = lockedHTML();
    return;
  }

  if (lesson.steps && lesson.steps.length > 0) {
    renderStepper(bodyMount, lesson);
  } else {
    function drawSingle() {
      setLastLesson(lesson.id);
      const videoHTML =
        lesson.type === 'tutorial'
          ? tutorialVideoHTML(lesson.videoFile, lesson.videoId, lesson.title)
          : embedHTML(lesson.videoId, lesson.title);
      bodyMount.innerHTML = `
        ${videoHTML}
        ${lesson.funFact ? funFactHTML(lesson.funFact) : ''}
        ${completionHTML(lesson.id)}
      `;
      wireCompletionButton(bodyMount, lesson.id, drawSingle);
    }
    drawSingle();
  }
}
