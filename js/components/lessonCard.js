function lessonCardHTML(lesson) {
  const thumb =
    lesson.thumbnail ||
    (lesson.videoId ? `https://img.youtube.com/vi/${lesson.videoId}/mqdefault.jpg` : null);

  return `
    <a class="lesson-card" href="#/lesson/${lesson.id}" data-card>
      <div class="lesson-card__thumb ${thumb ? '' : 'lesson-card__thumb--empty'}"
           ${thumb ? `style="background-image:url('${thumb}')"` : ''}>
        ${lesson.premium ? `<div class="lesson-card__lock">🔒</div>` : ''}
        ${!thumb ? `<div class="lesson-card__placeholder">🎨</div>` : ''}
        ${lesson.duration ? `<span class="lesson-card__duration">${lesson.duration}</span>` : ''}
      </div>
      <div class="lesson-card__body">
        <div class="lesson-card__badges">
          ${typeBadgeHTML(lesson.type)}
          ${lesson.premium ? premiumBadgeHTML() : ''}
        </div>
        <h3 class="lesson-card__title">${lesson.title}</h3>
        <p class="lesson-card__meta">${lesson.artist} · ${lesson.era}</p>
        ${difficultyBadgeHTML(lesson.difficulty)}
      </div>
    </a>
  `;
}

function lessonGridHTML(lessons) {
  if (lessons.length === 0) {
    return `<div class="empty-state">
      <p>🖼 No lessons match those filters yet — try clearing one!</p>
    </div>`;
  }
  return `<div class="lesson-grid">${lessons.map(lessonCardHTML).join('')}</div>`;
}
