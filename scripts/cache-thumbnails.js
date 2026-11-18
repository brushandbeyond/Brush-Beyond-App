const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const context = vm.createContext({});
vm.runInContext(fs.readFileSync(path.join(root, 'js/data/lessons.js'), 'utf8'), context);
const ids = vm.runInContext('[...new Set(LESSONS.flatMap(lesson => [lesson.videoId, ...(lesson.steps || []).map(step => step.videoId)]).filter(Boolean))]', context);
const directory = path.join(root, 'assets/thumbnails');
fs.mkdirSync(directory, { recursive: true });
(async () => {
  for (let offset = 0; offset < ids.length; offset += 4) {
    await Promise.all(ids.slice(offset, offset + 4).map(async (id) => {
      if (!/^[A-Za-z0-9_-]{11}$/.test(id)) throw Error('Invalid video ID');
      const target = path.join(directory, id + '.jpg');
      if (fs.existsSync(target)) return;
      const response = await fetch('https://img.youtube.com/vi/' + id + '/hqdefault.jpg');
      if (!response.ok || !response.headers.get('content-type')?.startsWith('image/')) throw Error('Could not cache thumbnail: ' + id);
      fs.writeFileSync(target, Buffer.from(await response.arrayBuffer()));
    }));
  }
  console.log('Cached ' + ids.length + ' video covers for offline app use.');
})().catch((error) => { console.error(error.message); process.exitCode = 1; });
