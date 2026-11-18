const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { spawnSync } = require('node:child_process');

const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const failures = [];

function check(label, verify) {
  try {
    if (!verify()) throw new Error('check returned false');
    console.log(`PASS ${label}`);
  } catch (error) {
    failures.push(label);
    console.error(`FAIL ${label}: ${error.message}`);
  }
}

function filesUnder(directory) {
  return fs.readdirSync(path.join(root, directory), { withFileTypes: true }).flatMap((entry) => {
    const relative = path.join(directory, entry.name);
    return entry.isDirectory() ? filesUnder(relative) : [relative];
  });
}

check('JavaScript syntax', () => {
  for (const file of [...filesUnder('js'), ...filesUnder('scripts')].filter((file) => file.endsWith('.js'))) {
    new vm.Script(read(file), { filename: file });
  }
  return true;
});

check('HTML script and stylesheet references exist', () => {
  for (const file of ['index.html', 'privacy.html']) {
    for (const match of read(file).matchAll(/(?:src|href)="([^"]+)"/g)) {
      const reference = match[1];
      if (/^(https?:|#)/.test(reference)) continue;
      if (!fs.existsSync(path.join(root, reference.split('#')[0]))) {
        throw new Error(`${file}: missing ${reference}`);
      }
    }
  }
  return true;
});

check('Lesson IDs, free access, video sources, and milestone reachability', () => {
  const context = vm.createContext({});
  vm.runInContext(read('js/data/lessons.js') + '\n' + read('js/data/milestones.js'), context);
  return vm.runInContext(`
    new Set(LESSONS.map(lesson => lesson.id)).size === LESSONS.length &&
    LESSONS.every(lesson => !lesson.premium && (lesson.videoId || lesson.videoFile)) &&
    MILESTONES.every(milestone => milestone.count > 0 && milestone.count <= LESSONS.length)
  `, context);
});

check('Web and iOS bundled files match current source', () => {
  const sources = ['index.html', 'privacy.html', ...filesUnder('js'), ...filesUnder('css'), ...filesUnder('assets')];
  for (const destination of ['www', 'ios/App/App/public']) {
    for (const file of sources) {
      const bundled = path.join(root, destination, file);
      if (!fs.existsSync(bundled) || !fs.readFileSync(path.join(root, file)).equals(fs.readFileSync(bundled))) {
        throw new Error(`${destination}/${file} is missing or stale; run npm run sync && npx cap sync ios`);
      }
    }
    for (const directory of ['js', 'css', 'assets']) {
      for (const file of filesUnder(path.join(destination, directory))) {
        const relative = path.relative(destination, file);
        if (!sources.includes(relative)) throw new Error(`${file} is an obsolete bundled file`);
      }
    }
  }
  return true;
});

const xcode = spawnSync('xcodebuild', ['-version'], { encoding: 'utf8' });
check('Video covers are bundled and browsing has no remote font links', () => {
  const context = vm.createContext({});
  vm.runInContext(read('js/data/lessons.js'), context);
  const ids = vm.runInContext('[...new Set(LESSONS.flatMap(lesson => [lesson.videoId, ...(lesson.steps || []).map(step => step.videoId)]).filter(Boolean))]', context);
  for (const id of ids) {
    if (!fs.existsSync(path.join(root, 'assets/thumbnails', id + '.jpg'))) throw new Error('Missing local cover: ' + id);
  }
  return !read('index.html').includes('fonts.googleapis.com');
});
const version = xcode.stdout && xcode.stdout.match(/Xcode (\d+)/);
console.log(version && Number(version[1]) >= 26
  ? `PASS Xcode ${version[1]} is selected`
  : 'BLOCKED Native archive: select/install full Xcode 26 or later; no native build was performed.');
console.log(/DEVELOPMENT_TEAM\s*=\s*"?[A-Z0-9]+/.test(read('ios/App/App.xcodeproj/project.pbxproj'))
  ? 'INFO A signing team is configured; signing validity still needs Xcode verification.'
  : 'BLOCKED Distribution signing: choose your Apple Developer team in Xcode.');
console.log('MANUAL Verify support contact, public privacy URL, audience/rights, device playback, screenshots, and App Store declarations.');
console.log('A passing source check is not App Store readiness or approval.');
process.exitCode = failures.length ? 1 : 0;
