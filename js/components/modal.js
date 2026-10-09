// Generic popup dialog used for the "continue watching" prompt and the
// milestone celebration prompt. Not used for anything account-gating —
// this is just an attention-grabbing overlay, always dismissable.
function showModal({ icon, title, body, primaryLabel, onPrimary, secondaryLabel, onSecondary }) {
  const overlay = document.createElement('div');
  overlay.className = 'bb-modal-overlay';
  overlay.innerHTML = `
    <div class="bb-modal" role="dialog" aria-modal="true">
      <button type="button" class="bb-modal__close" aria-label="Close">✕</button>
      ${icon ? `<span class="bb-modal__icon">${icon}</span>` : ''}
      <h2>${title}</h2>
      ${body ? `<p>${body}</p>` : ''}
      <div class="bb-modal__actions">
        ${secondaryLabel ? `<button type="button" class="btn btn--ghost" id="bb-modal-secondary">${secondaryLabel}</button>` : ''}
        ${primaryLabel ? `<button type="button" class="btn btn--tutorial" id="bb-modal-primary">${primaryLabel}</button>` : ''}
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add('is-visible'));

  function close() {
    overlay.classList.remove('is-visible');
    setTimeout(() => overlay.remove(), 200);
  }

  overlay.querySelector('.bb-modal__close').addEventListener('click', close);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });

  const primaryBtn = overlay.querySelector('#bb-modal-primary');
  if (primaryBtn) {
    primaryBtn.addEventListener('click', () => {
      close();
      if (onPrimary) onPrimary();
    });
  }

  const secondaryBtn = overlay.querySelector('#bb-modal-secondary');
  if (secondaryBtn) {
    secondaryBtn.addEventListener('click', () => {
      close();
      if (onSecondary) onSecondary();
    });
  }

  return close;
}
