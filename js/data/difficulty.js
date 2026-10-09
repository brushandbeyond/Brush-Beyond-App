// The Brush & Beyond difficulty scale — five friendly stages every young
// artist can see themselves in, from a first try to confident practice.
const DIFFICULTY_LEVELS = [
  {
    level: 1,
    label: 'Little Picasso',
    blurb: 'Just starting out — big fun, no pressure.',
    color: '#5FBF77',
  },
  {
    level: 2,
    label: 'Rising Artist',
    blurb: 'Ready for a bit more detail and a new technique.',
    color: '#4FA6E8',
  },
  {
    level: 3,
    label: 'Creative Explorer',
    blurb: 'Comfortable trying multi-step projects.',
    color: '#F4B740',
  },
  {
    level: 4,
    label: 'Skilled Painter',
    blurb: 'Enjoys patience-testing detail and technique.',
    color: '#F07B4F',
  },
  {
    level: 5,
    label: 'Master in Training',
    blurb: 'Tackles the most involved projects and ideas.',
    color: '#D45B8C',
  },
];

function getDifficulty(level) {
  return DIFFICULTY_LEVELS.find((d) => d.level === level) || DIFFICULTY_LEVELS[0];
}
