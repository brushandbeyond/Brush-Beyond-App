function createWatchTracker({ maxSampleGap = 3 } = {}) {
  const watched = new Set();
  let previousTime = null;
  let previousWall = null;
  return {
    sample(time, duration, playing, wallTime) {
      if (!Number.isFinite(time) || !Number.isFinite(duration) || duration <= 0) return;
      if (playing && previousTime !== null && previousWall !== null) {
        const elapsed = (wallTime - previousWall) / 1000;
        const progress = time - previousTime;
        if (progress === 0 && elapsed >= 0 && elapsed <= maxSampleGap) return;
        if (elapsed > 0 && elapsed <= maxSampleGap && progress > 0 && progress <= elapsed * 2.2 + 0.25) {
          for (let bucket = Math.floor(previousTime * 4); bucket < Math.floor(time * 4); bucket++) watched.add(bucket);
        }
      }
      previousTime = playing ? time : null;
      previousWall = playing ? wallTime : null;
    },
    completed(duration) {
      return Number.isFinite(duration) && duration > 0 && watched.size / 4 >= duration * 0.95;
    },
    coverage(duration) {
      return Number.isFinite(duration) && duration > 0 ? Math.min(1, watched.size / 4 / duration) : 0;
    },
    resetSample() {
      previousTime = null;
      previousWall = null;
    },
  };
}
