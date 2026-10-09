const COPY = {
  history: {
    title: '🏛 Art History',
    intro:
      'Meet the artists and movements that shaped art as we know it. Look for the ✨ Premium badge for our most extensive, deep-dive episodes.',
  },
  tutorial: {
    title: '🎨 Art Tutorials',
    intro:
      'Grab your supplies and follow along step by step — every tutorial here is free.',
  },
  all: {
    title: '🔍 Explore Everything',
    intro: 'Browse all Brush & Beyond lessons and filter by whatever sparks your curiosity.',
  },
};

function renderExplore(root, { lockType = 'all' } = {}) {
  const scoped = lockType === 'all' ? LESSONS : LESSONS.filter((l) => l.type === lockType);
  const eras = [...new Set(scoped.map((l) => l.era))].sort();
  const artists = [...new Set(scoped.map((l) => l.artist))].sort();
  const copy = COPY[lockType];

  root.innerHTML = `
    <section class="page-header page-header--${lockType}">
      <h1>${copy.title}</h1>
      <p>${copy.intro}</p>
    </section>
    <div id="filter-bar-mount"></div>
    <div id="lesson-grid-mount"></div>
  `;

  const filterMount = root.querySelector('#filter-bar-mount');
  const gridMount = root.querySelector('#lesson-grid-mount');

  renderFilterBar({
    container: filterMount,
    eras,
    artists,
    initialType: lockType,
    showTypeChips: lockType === 'all',
    onChange: (filters) => {
      const effectiveFilters = lockType === 'all' ? filters : { ...filters, type: lockType };
      const filtered = applyFilters(scoped, effectiveFilters);
      gridMount.innerHTML = lessonGridHTML(filtered);
    },
  });
}
