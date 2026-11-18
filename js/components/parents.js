function hasParentVideoAccess() {
  try { return JSON.parse(localStorage.getItem('bb_parent_video_access') || 'null')?.enabled === true; }
  catch { return false; }
}

function requestParentCheck(reason, confirmLabel = 'Continue') {
  return new Promise((resolve) => {
    const first = 12 + Math.floor(Math.random() * 18);
    const second = 12 + Math.floor(Math.random() * 18);
    const previous = document.activeElement;
    const overlay = document.createElement('div');
    overlay.className = 'bb-modal-overlay is-visible';
    overlay.innerHTML = `<form class="bb-modal" role="dialog" aria-modal="true" aria-labelledby="parent-title">
      <h2 id="parent-title">For parents &amp; carers</h2><p>${escapeHTML(reason)}</p>
      <label for="parent-answer">Adult check: what is ${first} × ${second}?</label>
      <input id="parent-answer" inputmode="numeric" autocomplete="off" required aria-describedby="parent-error">
      <p id="parent-error" role="status"></p><div class="bb-modal__actions">
      <button type="button" class="btn btn--ghost" id="parent-cancel">Cancel</button>
      <button type="submit" class="btn btn--tutorial">${escapeHTML(confirmLabel)}</button></div></form>`;
    document.body.appendChild(overlay);
    const answer = overlay.querySelector('input');
    function finish(allowed) {
      window.removeEventListener('hashchange', cancel);
      overlay.remove();
      if (previous?.isConnected) previous.focus();
      resolve(allowed);
    }
    const cancel = () => finish(false);
    window.addEventListener('hashchange', cancel, { once: true });
    overlay.querySelector('#parent-cancel').addEventListener('click', cancel);
    overlay.addEventListener('click', (event) => { if (event.target === overlay) cancel(); });
    overlay.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') { event.preventDefault(); cancel(); }
      if (event.key !== 'Tab') return;
      const fields = [...overlay.querySelectorAll('input,button')];
      const next = event.shiftKey ? -1 : 1;
      const index = fields.indexOf(document.activeElement);
      event.preventDefault();
      fields[(index + next + fields.length) % fields.length].focus();
    });
    overlay.querySelector('form').addEventListener('submit', (event) => {
      event.preventDefault();
      if (answer.value.trim() !== String(first * second)) {
        overlay.querySelector('#parent-error').textContent = 'Please ask a parent or carer to complete this check.';
        answer.value = '';
        answer.focus();
        return;
      }
      finish(true);
    });
    answer.focus();
  });
}

async function openParentExternalURL(url) {
  const destination = new URL(url);
  if (!['https:', 'mailto:'].includes(destination.protocol)) return;
  if (window.Capacitor?.getPlatform() === 'ios') {
    await window.Capacitor.Plugins.LessonVideo.openExternal({ url: destination.href });
  } else if (await requestParentCheck('You are leaving Brush & Beyond. The destination uses its own privacy and content policies.')) {
    window.open(destination.href, '_blank', 'noopener');
  }
}

function parentLinkHTML(url, label) {
  return `<button type="button" class="link-btn" data-parent-url="${escapeHTML(url)}">${escapeHTML(label)}</button>`;
}

document.addEventListener('click', (event) => {
  const button = event.target.closest('[data-parent-url]');
  if (button) openParentExternalURL(button.dataset.parentUrl).catch(() => showToast('The link could not be opened.'));
});

async function renderParents(root) {
  root.innerHTML = '<section class="lesson-detail"><h1>Parents &amp; carers</h1><p>Please complete the adult check to manage video access and outside links.</p><button class="btn btn--tutorial" id="parent-enter">Parent settings</button></section>';
  root.querySelector('#parent-enter').addEventListener('click', async () => {
    if (!await requestParentCheck('Open parent settings and support links?')) return;
    if (root !== document.getElementById('app') || currentPath() !== '/parents') return;
    draw();
  });
  function draw() {
    const enabled = hasParentVideoAccess();
    root.innerHTML = `<section class="lesson-detail"><h1>Parents &amp; carers</h1>
      <h2>YouTube access: ${enabled ? 'enabled' : 'off'}</h2>
      <p>Opening a video connects to Google/YouTube. Google receives your IP address and technical/device information and may use cookies or similar storage. YouTube may show ads or links. Privacy-enhanced mode does not prevent all data processing.</p>
      <p>Enable only if you agree to these provider requests for your child's video viewing. This choice is stored on this device. Disabling prevents new video requests; it does not delete Google's records or cookies.</p>
      <button class="btn btn--tutorial" id="parent-video-toggle">${enabled ? 'Turn off YouTube access' : 'Allow YouTube video access'}</button>
      <h2>Support &amp; privacy</h2><p>Brush And Beyond Art For Tomorrow · brushbeyond07@gmail.com</p>
      <p>${parentLinkHTML('mailto:brushbeyond07@gmail.com', 'Email support')}</p>
      <p>${parentLinkHTML('https://brush-beyond-app-help.beneficialhome1.chatgpt.site/privacy.html', 'Public privacy policy')}</p>
      <p>${parentLinkHTML('https://brush-beyond-app-help.beneficialhome1.chatgpt.site/support.html', 'Public support page')}</p>
      <p>${parentLinkHTML('https://brushbeyond.net', 'Brush & Beyond website')}</p>
      <p><a href="#/privacy">Read privacy information in this app</a></p></section>`;
    root.querySelector('#parent-video-toggle').addEventListener('click', async () => {
      if (!enabled && !await requestParentCheck('Allow Google/YouTube to receive network and technical information when videos are opened?', 'Allow YouTube')) return;
      try { localStorage.setItem('bb_parent_video_access', JSON.stringify({ enabled: !enabled, updatedAt: new Date().toISOString() })); }
      catch { showToast('Your setting could not be saved.'); return; }
      draw();
    });
  }
}
