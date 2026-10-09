// Renders the filter bar into `container` and calls `onChange(filters)`
// every time a control changes. `filters` shape:
//   { type: 'all'|'history'|'tutorial', era: 'all'|string,
//     artist: 'all'|string, difficulties: Set<number>, premiumOnly: boolean }
function renderFilterBar({ container, eras, artists, initialType = 'all', showTypeChips = true, onChange }) {
  const state = {
    type: initialType,
    era: 'all',
    artist: 'all',
    difficulties: new Set(),
    premiumOnly: false,
  };

  const eraOptions = eras.map((e) => `<option value="${e}">${e}</option>`).join('');
  const artistOptions = artists.map((a) => `<option value="${a}">${a}</option>`).join('');

  container.innerHTML = `
    <div class="filter-bar">
      ${showTypeChips ? `
      <div class="filter-group filter-group--type" role="group" aria-label="Lesson type">
        <button type="button" class="chip" data-type="all">All</button>
        <button type="button" class="chip" data-type="history">🏛 Art History</button>
        <button type="button" class="chip" data-type="tutorial">🎨 Art Tutorials</button>
      </div>
      ` : ''}

      <div class="filter-group">
        <label for="filter-era">Art era</label>
        <select id="filter-era">
          <option value="all">All eras</option>
          ${eraOptions}
        </select>
      </div>

      <div class="filter-group">
        <label for="filter-artist">Artist</label>
        <select id="filter-artist">
          <option value="all">All artists</option>
          ${artistOptions}
        </select>
      </div>

      <div class="filter-group filter-group--difficulty">
        <label>Difficulty</label>
        <div class="difficulty-chips">
          ${DIFFICULTY_LEVELS.map(
            (d) => `<button type="button" class="chip chip--difficulty" data-diff="${d.level}" style="--chip-color:${d.color}" title="${d.blurb}">${d.label}</button>`
          ).join('')}
        </div>
      </div>

      <label class="filter-group filter-group--premium">
        <input type="checkbox" id="filter-premium" />
        ✨ Premium only
      </label>

      <button type="button" class="link-btn" id="filter-reset">Reset filters</button>
    </div>
  `;

  const typeChips = container.querySelectorAll('[data-type]');
  const eraSelect = container.querySelector('#filter-era');
  const artistSelect = container.querySelector('#filter-artist');
  const diffChips = container.querySelectorAll('[data-diff]');
  const premiumCheckbox = container.querySelector('#filter-premium');
  const resetBtn = container.querySelector('#filter-reset');

  function syncTypeChips() {
    typeChips.forEach((chip) => chip.classList.toggle('is-active', chip.dataset.type === state.type));
  }
  function syncDiffChips() {
    diffChips.forEach((chip) =>
      chip.classList.toggle('is-active', state.difficulties.has(Number(chip.dataset.diff)))
    );
  }

  typeChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      state.type = chip.dataset.type;
      syncTypeChips();
      onChange({ ...state, difficulties: new Set(state.difficulties) });
    });
  });

  eraSelect.addEventListener('change', () => {
    state.era = eraSelect.value;
    onChange({ ...state, difficulties: new Set(state.difficulties) });
  });

  artistSelect.addEventListener('change', () => {
    state.artist = artistSelect.value;
    onChange({ ...state, difficulties: new Set(state.difficulties) });
  });

  diffChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const level = Number(chip.dataset.diff);
      if (state.difficulties.has(level)) state.difficulties.delete(level);
      else state.difficulties.add(level);
      syncDiffChips();
      onChange({ ...state, difficulties: new Set(state.difficulties) });
    });
  });

  premiumCheckbox.addEventListener('change', () => {
    state.premiumOnly = premiumCheckbox.checked;
    onChange({ ...state, difficulties: new Set(state.difficulties) });
  });

  resetBtn.addEventListener('click', () => {
    state.type = initialType;
    state.era = 'all';
    state.artist = 'all';
    state.difficulties.clear();
    state.premiumOnly = false;
    eraSelect.value = 'all';
    artistSelect.value = 'all';
    premiumCheckbox.checked = false;
    syncTypeChips();
    syncDiffChips();
    onChange({ ...state, difficulties: new Set(state.difficulties) });
  });

  syncTypeChips();
  syncDiffChips();
  onChange({ ...state, difficulties: new Set(state.difficulties) });
}

function applyFilters(lessons, filters) {
  return lessons.filter((l) => {
    if (filters.type !== 'all' && l.type !== filters.type) return false;
    if (filters.era !== 'all' && l.era !== filters.era) return false;
    if (filters.artist !== 'all' && l.artist !== filters.artist) return false;
    if (filters.difficulties.size > 0 && !filters.difficulties.has(l.difficulty)) return false;
    if (filters.premiumOnly && !l.premium) return false;
    return true;
  });
}
