function renderProfile(root) {
  let selectedAvatar = AVATARS[0];

  function drawCreateForm() {
    root.innerHTML = `
      <section class="page-header page-header--profile">
        <h1>🎨 Create Your Artist Profile</h1>
        <p>Pick a nickname and an avatar to start earning badges as you learn! This stays on this device only — no email or password needed.</p>
      </section>
      <div class="profile-form">
        <label for="profile-nickname">Nickname</label>
        <input id="profile-nickname" type="text" maxlength="20" placeholder="e.g. Doodle Master" />

        <label>Pick an Avatar</label>
        <div class="avatar-grid">
          ${AVATARS.map(
            (a) => `<button type="button" class="avatar-option ${a === selectedAvatar ? 'is-selected' : ''}" data-avatar="${a}">${avatarHTML(a, 'avatar-option__icon')}</button>`
          ).join('')}
        </div>

        <button type="button" class="btn btn--tutorial" id="profile-create-btn">Start Creating! 🎉</button>
      </div>
    `;

    root.querySelectorAll('.avatar-option').forEach((btn) => {
      btn.addEventListener('click', () => {
        selectedAvatar = btn.dataset.avatar;
        root.querySelectorAll('.avatar-option').forEach((b) => b.classList.toggle('is-selected', b === btn));
      });
    });

    root.querySelector('#profile-create-btn').addEventListener('click', () => {
      const nickname = root.querySelector('#profile-nickname').value;
      createProfile(nickname, selectedAvatar);
      drawProfileView();
    });
  }

  function drawProfileView() {
    const profile = getProfile();
    const total = LESSONS.length;

    root.innerHTML = `
      <section class="page-header page-header--profile">
        <h1>${avatarHTML(profile.avatar, 'profile-header-avatar')} ${profile.nickname}'s Art Journey</h1>
        <p>${profile.badges.length} of ${total} badges collected</p>
      </section>

      <div class="milestone-row">
        ${MILESTONES.map((m) => {
          const earned = profile.badges.length >= m.count;
          return `
            <div class="milestone-badge ${earned ? 'is-earned' : 'is-locked'}" title="${m.description}">
              <span class="milestone-badge__icon">${earned ? m.icon : '🔒'}</span>
              <span class="milestone-badge__title">${m.title}</span>
            </div>
          `;
        }).join('')}
      </div>

      <div class="badge-grid">
        ${LESSONS.map((l) => {
          const earned = profile.badges.includes(l.id);
          let iconHTML;
          if (!earned) {
            // Kept a mystery "?" even for lessons with custom artwork, so
            // earning the badge still feels like a reveal.
            iconHTML = `<span class="badge-card__icon">❔</span>`;
          } else if (l.badgeIcon) {
            iconHTML = `<img class="badge-card__img" src="${l.badgeIcon}" alt="" />`;
          } else {
            iconHTML = `<span class="badge-card__icon">${l.type === 'tutorial' ? '🎨' : '🏛'}</span>`;
          }
          return `
            <a href="#/lesson/${l.id}" class="badge-card ${earned ? 'is-earned' : 'is-locked'}">
              ${iconHTML}
              <span class="badge-card__title">${l.title}</span>
            </a>
          `;
        }).join('')}
      </div>

      <button type="button" class="link-btn" id="profile-reset-btn">Not you? Create a new profile</button>
    `;

    root.querySelector('#profile-reset-btn').addEventListener('click', () => {
      resetProfile();
      drawCreateForm();
    });
  }

  if (hasProfile()) {
    drawProfileView();
  } else {
    drawCreateForm();
  }
}
