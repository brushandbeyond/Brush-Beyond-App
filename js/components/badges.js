function difficultyBadgeHTML(level) {
  const d = getDifficulty(level);
  const segments = Array.from(
    { length: 5 },
    (_, i) =>
      `<span class="difficulty-segment ${i < d.level ? 'is-filled' : ''}" style="${
        i < d.level ? `background:${d.color}` : ''
      }"></span>`
  ).join('');
  return `
    <span class="difficulty-badge" title="${d.blurb}">
      <span class="difficulty-bar">${segments}</span>
      <span class="difficulty-label" style="color:${d.color}">${d.label}</span>
    </span>
  `;
}

function premiumBadgeHTML() {
  return `<span class="premium-badge">✨ Premium</span>`;
}

function typeBadgeHTML(type) {
  return type === 'tutorial'
    ? `<span class="type-badge type-tutorial">🎨 Tutorial</span>`
    : `<span class="type-badge type-history">🏛 Art History</span>`;
}
