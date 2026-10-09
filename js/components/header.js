function profileChipHTML() {
  const profile = getProfile();
  if (!profile) {
    return `<a href="#/profile" data-nav-link="/profile" class="nav-profile">🎨 Create Profile</a>`;
  }
  return `
    <a href="#/profile" data-nav-link="/profile" class="nav-profile">
      ${avatarHTML(profile.avatar, 'nav-profile__avatar')}
      ${profile.nickname}
      <span class="nav-profile__badges">🏅 ${profile.badges.length}</span>
    </a>
  `;
}

function renderHeader(container) {
  container.innerHTML = `
    <header class="site-header">
      <div class="header-left main-nav">
        <div class="nav-dropdown">
          <button type="button" class="nav-dropdown__trigger" id="explore-trigger" data-nav-link="/history,/tutorials" aria-expanded="false">
            Explore Our Lessons <span class="nav-dropdown__caret">▾</span>
          </button>
          <div class="nav-dropdown__menu" id="explore-menu" hidden>
            <a href="#/history">🏛 Art History</a>
            <a href="#/tutorials">🎨 Art Tutorials</a>
          </div>
        </div>
        <a href="#/teachers" data-nav-link="/teachers">Our Teachers</a>
      </div>

      <a class="brand" href="#/" aria-label="Brush & Beyond — Home">
        <img class="brand__logo" src="assets/logo.png" alt="Brush & Beyond logo" />
        <span class="brand__text">Brush <span class="brand__amp">&amp;</span> Beyond</span>
      </a>

      <div class="header-right main-nav">
        <span id="profile-chip-mount">${profileChipHTML()}</span>
        <a href="#/premium" data-nav-link="/premium" class="nav-premium">${isPremium() ? '⭐ Premium' : 'Upgrade to Premium'}</a>
      </div>
    </header>
  `;

  const dropdown = container.querySelector('.nav-dropdown');
  const trigger = container.querySelector('#explore-trigger');
  const menu = container.querySelector('#explore-menu');

  function closeMenu() {
    menu.hidden = true;
    trigger.setAttribute('aria-expanded', 'false');
  }

  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const opening = menu.hidden;
    menu.hidden = !opening;
    trigger.setAttribute('aria-expanded', String(opening));
  });

  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));

  document.addEventListener('click', (e) => {
    if (!menu.hidden && !dropdown.contains(e.target)) closeMenu();
  });

  window.addEventListener('bb:premium-changed', () => {
    const premiumLink = container.querySelector('.nav-premium');
    if (premiumLink) premiumLink.textContent = isPremium() ? '⭐ Premium' : 'Upgrade to Premium';
  });

  window.addEventListener('bb:profile-changed', () => {
    const mount = container.querySelector('#profile-chip-mount');
    if (mount) mount.innerHTML = profileChipHTML();
  });
}
