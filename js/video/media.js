function playerCoverHTML(videoId, title) {
  return `<div class="video-frame video-frame--cover" data-youtube-video="${escapeHTML(videoId)}" data-video-title="${escapeHTML(title)}">
    <img src="assets/thumbnails/${encodeURIComponent(videoId)}.jpg" alt="${escapeHTML(title)} video cover">
    <button type="button" class="btn btn--tutorial video-play">▶ Watch video</button>
  </div>`;
}

function wireLessonMedia(container, lesson, onCompleted) {
  const native = window.Capacitor && window.Capacitor.getPlatform() === 'ios';
  container.querySelectorAll('[data-youtube-video]').forEach((cover) => {
    cover.querySelector('button').addEventListener('click', async () => {
      if (!hasParentVideoAccess()) {
        showModal({ title: 'Ask a parent to enable videos', body: 'A parent or carer can review YouTube access in Parent settings. You can still read lesson instructions without enabling videos.', primaryLabel: 'Parent settings', onPrimary: () => navigate('/parents'), secondaryLabel: 'Keep reading' });
        return;
      }
      const videoId = cover.dataset.youtubeVideo;
      const complete = () => {
        if (videoId !== lesson.videoId) return;
        if (completeLessonVideo(lesson.id)) onCompleted();
      };
      if (native) {
        try {
          const plugin = window.Capacitor.Plugins.LessonVideo;
          const result = await plugin.open({ videoId, title: cover.dataset.videoTitle });
          if (result.completed) complete();
        } catch {
          showToast('The video could not open. Please try again.');
        }
        return;
      }
      const frame = document.createElement('iframe');
      const token = crypto.randomUUID();
      frame.title = cover.dataset.videoTitle;
      frame.allow = 'autoplay; encrypted-media; fullscreen; picture-in-picture';
      frame.allowFullscreen = true;
      frame.src = 'assets/player.html#' + encodeURIComponent(JSON.stringify({ videoId, token }));
      const onMessage = (event) => {
        if (event.origin !== location.origin || event.source !== frame.contentWindow || !event.data || event.data.token !== token) return;
        if (event.data.type === 'completed') complete();
        if (event.data.type === 'external') openParentExternalURL('https://www.youtube.com/watch?v=' + videoId);
      };
      window.addEventListener('message', onMessage);
      window.addEventListener('hashchange', () => window.removeEventListener('message', onMessage), { once: true });
      cover.replaceChildren(frame);
    });
  });

  container.querySelectorAll('video').forEach((video) => {
    const tracker = createWatchTracker();
    const timer = setInterval(() => {
      if (!video.isConnected) { clearInterval(timer); return; }
      tracker.sample(video.currentTime, video.duration, !video.paused && !video.seeking, performance.now());
    }, 250);
    video.addEventListener('ended', () => {
      if (video.getAttribute('src') !== lesson.videoFile || !tracker.completed(video.duration)) return;
      if (completeLessonVideo(lesson.id)) onCompleted();
    });
  });
}
