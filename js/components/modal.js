// Generic popup dialog used for the "continue watching" prompt and the
// milestone celebration prompt. Not used for anything account-gating —
// this is just an attention-grabbing overlay, always dismissable.
function showModal({ icon, title, body, primaryLabel, onPrimary, secondaryLabel, onSecondary }) {
  const previousFocus = document.activeElement;
  const overlay = document.createElement('div');
  overlay.className = 'bb-modal-overlay';
  overlay.innerHTML = `
    <div class="bb-modal" role="dialog" aria-modal="true" aria-label="${escapeHTML(title)}">
      <button type="button" class="bb-modal__close" aria-label="Close">✕</button>
      ${icon ? `<span class="bb-modal__icon">${escapeHTML(icon)}</span>` : ''}
      <h2>${escapeHTML(title)}</h2>
      ${body ? `<p>${escapeHTML(body)}</p>` : ''}
      <div class="bb-modal__actions">
        ${secondaryLabel ? `<button type="button" class="btn btn--ghost" id="bb-modal-secondary">${escapeHTML(secondaryLabel)}</button>` : ''}
        ${primaryLabel ? `<button type="button" class="btn btn--tutorial" id="bb-modal-primary">${escapeHTML(primaryLabel)}</button>` : ''}
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add('is-visible'));
  const buttons = [...overlay.querySelectorAll('button')];
  buttons[0].focus();
  let closed = false;

  function onKeydown(event) {
    if (event.key === 'Escape') close();
    if (event.key !== 'Tab') return;
    const first = buttons[0];
    const last = buttons[buttons.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
  overlay.addEventListener('keydown', onKeydown);
  window.addEventListener('hashchange', close);

  function close() {
    if (closed) return;
    closed = true;
    window.removeEventListener('hashchange', close);
    overlay.removeEventListener('keydown', onKeydown);
    overlay.classList.remove('is-visible');
    setTimeout(() => overlay.remove(), 200);
    if (previousFocus && previousFocus.isConnected) previousFocus.focus();
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
