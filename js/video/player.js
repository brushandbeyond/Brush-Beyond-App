(function () {
  const config = window.lessonPlayerConfig || JSON.parse(decodeURIComponent(location.hash.slice(1)));
  const tracker = createWatchTracker({ maxSampleGap: config.native ? Infinity : 3 });
  let player;
  let timer;
  let finished = false;
  let active = true;
  let lastPlaying = false;

  window.setLessonPlayerActive = function (value) {
    active = value;
    tracker.resetSample();
    lastPlaying = false;
  };

  function samplePlayer(playing) {
    tracker.sample(player.getCurrentTime(), player.getDuration(), active && playing, performance.now());
    const status = document.getElementById('watch-status');
    if (status) status.textContent = finished ? 'Video completed — your badge is ready.' : 'Video watched: ' + Math.floor(tracker.coverage(player.getDuration()) * 100) + '%';
  }

  window.checkLessonCompletion = function () {
    if (!player || !player.getPlayerState) return false;
    const state = player.getPlayerState();
    samplePlayer(lastPlaying || state === YT.PlayerState.PLAYING);
    if (tracker.completed(player.getDuration()) && (state === YT.PlayerState.ENDED || player.getCurrentTime() >= player.getDuration() - 0.75)) finished = true;
    return finished;
  };

  document.addEventListener('visibilitychange', () => {
    if (!config.native) window.setLessonPlayerActive(!document.hidden);
  });

  function report(type) {
    if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.lessonPlayer) {
      window.webkit.messageHandlers.lessonPlayer.postMessage({ type });
    } else {
      parent.postMessage({ type, token: config.token }, location.origin);
    }
  }

  function fail() {
    clearTimeout(timeout);
    clearInterval(timer);
    if (player && player.destroy) player.destroy();
    const container = document.getElementById('player');
    if (container) container.hidden = true;
    document.getElementById('fallback').hidden = false;
    document.getElementById('cover').src = 'https://img.youtube.com/vi/' + config.videoId + '/hqdefault.jpg';
    document.getElementById('youtube-link').href = 'https://www.youtube.com/watch?v=' + config.videoId;
    report('error');
  }

  const timeout = setTimeout(fail, 20000);
  window.onYouTubeIframeAPIReady = function () {
    player = new YT.Player('player', {
      host: 'https://www.youtube-nocookie.com',
      videoId: config.videoId,
      width: '100%', height: '100%',
      playerVars: { playsinline: 1, origin: config.origin || location.origin },
      events: {
        onReady() {
          clearTimeout(timeout);
          report('ready');
          timer = setInterval(() => {
            const playing = player.getPlayerState() === YT.PlayerState.PLAYING;
            samplePlayer(playing || lastPlaying);
            lastPlaying = playing;
          }, 250);
        },
        onError() { clearTimeout(timeout); fail(); },
        onStateChange(event) {
          samplePlayer(lastPlaying || event.data === YT.PlayerState.PLAYING);
          lastPlaying = event.data === YT.PlayerState.PLAYING;
          if (!lastPlaying) tracker.resetSample();
          if (event.data === YT.PlayerState.PLAYING) report('playing');
          if (event.data !== YT.PlayerState.ENDED || finished) return;
          if (tracker.completed(player.getDuration())) {
            finished = true;
            report('completed');
          }
        },
      },
    });
  };
  const script = document.createElement('script');
  document.getElementById('youtube-link').addEventListener('click', (event) => {
    event.preventDefault();
    report('external');
  });
  script.src = 'https://www.youtube.com/iframe_api';
  script.onerror = fail;
  document.head.appendChild(script);
})();
