// Milestone badges are earned automatically based on how many lesson
// badges a profile has collected — no separate storage needed, just
// compare `profile.badges.length` against `count` each time you render.
//
// `videoFile` is a clip you've uploaded yourself (e.g.
// 'assets/celebrations/10-badges.mp4') — see README. If set, the
// celebration page (#/celebrate/<count>) plays it. Otherwise it falls back
// to `videoId`, a YouTube video ID (from
// https://www.youtube.com/watch?v=dQw4w9WgXcQ that's "dQw4w9WgXcQ").
// Leave both null and a friendly placeholder shows instead.
const MILESTONES = [
  { count: 1, icon: '🌟', title: 'First Steps', description: 'Completed your very first lesson.', videoFile: null, videoId: null },
  { count: 5, icon: '🎨', title: 'Getting Creative', description: 'Completed 5 lessons.', videoFile: null, videoId: null },
  { count: 10, icon: '🏆', title: 'Art Enthusiast', description: 'Completed 10 lessons.', videoFile: null, videoId: null },
  { count: 20, icon: '👑', title: 'Art Master', description: 'Completed 20 lessons.', videoFile: null, videoId: null },
  { count: 50, icon: '💎', title: 'Art Legend', description: 'Completed 50 lessons.', videoFile: null, videoId: null },
];
