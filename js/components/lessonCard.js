function lessonCardHTML(lesson) {
  const thumb =
    lesson.thumbnail ||
    (lesson.videoId ? `assets/thumbnails/${lesson.videoId}.jpg` : null);

  return `
    <a class="lesson-card" href="#/lesson/${lesson.id}" data-card>
      <div class="lesson-card__thumb ${thumb ? '' : 'lesson-card__thumb--empty'}"
           ${thumb ? `style="background-image:url('${thumb}')"` : ''}>
        ${!thumb ? `<div class="lesson-card__placeholder">🎨</div>` : ''}
        ${lesson.duration ? `<span class="lesson-card__duration">${lesson.duration}</span>` : ''}
      </div>
      <div class="lesson-card__body">
        <div class="lesson-card__badges">
          ${typeBadgeHTML(lesson.type)}
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
      <p>No lessons match your selected filters. Try another difficulty, artist, or art era, or select Reset filters above.</p>
    </div>`;
  }
  return `<div class="lesson-grid">${lessons.map(lessonCardHTML).join('')}</div>`;
}
