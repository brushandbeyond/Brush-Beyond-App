// Tiny hash-based router — no build step, no dependencies.
// Routes are matched in order; the first pattern match wins.

const routes = [];

function addRoute(pattern, render) {
  // pattern like '/lesson/:id' -> regex with named group
  const paramNames = [];
  const regexStr = pattern.replace(/:([a-zA-Z]+)/g, (_, name) => {
    paramNames.push(name);
    return '([^/]+)';
  });
  const regex = new RegExp(`^${regexStr}$`);
  routes.push({ regex, paramNames, render });
}

function currentPath() {
  const hash = window.location.hash.slice(1); // strip '#'
  return hash === '' ? '/' : hash;
}

function navigate(path) {
  window.location.hash = path;
}

function resolve() {
  const path = currentPath();
  const root = document.getElementById('app');
  window.scrollTo(0, 0);

  for (const route of routes) {
    const match = path.match(route.regex);
    if (match) {
      const params = {};
      route.paramNames.forEach((name, i) => {
        params[name] = decodeURIComponent(match[i + 1]);
      });
      root.innerHTML = '';
      route.render(root, params);
      highlightActiveNav(path);
      return;
    }
  }

  root.innerHTML = '<div class="not-found"><h2>Hmm, we couldn\'t find that page.</h2><a href="#/">Back home</a></div>';
}

function highlightActiveNav(path) {
  document.querySelectorAll('[data-nav-link]').forEach((el) => {
    // Comma-separated list supported so one element (e.g. a dropdown
    // trigger covering multiple routes) can be marked active for any of them.
    const bases = el.getAttribute('data-nav-link').split(',');
    const active = bases.some((base) => (base === '/' ? path === '/' : path.startsWith(base)));
    el.classList.toggle('is-active', active);
  });
}

function startRouter() {
  window.addEventListener('hashchange', resolve);
  window.addEventListener('DOMContentLoaded', resolve);
  if (document.readyState !== 'loading') resolve();
}
