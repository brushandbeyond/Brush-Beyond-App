const COPY = {
  history: {
    title: '🏛 Art History',
    intro:
      'Meet the artists and movements that shaped art as we know it. Explore every lesson for free, including our extensive, deep-dive episodes.',
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
  const eras = getUniqueValues('era');
  const artists = getUniqueValues('artist');
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
    showTypeChips: true,
    onChange: (filters) => {
      root.querySelector('.page-header h1').textContent = COPY[filters.type].title;
      root.querySelector('.page-header p').textContent = COPY[filters.type].intro;
      const filtered = applyFilters(LESSONS, filters);
      gridMount.innerHTML = lessonGridHTML(filtered);
    },
  });
}
