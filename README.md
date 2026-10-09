# Brush & Beyond — Lesson App

A kid-friendly learning platform for Brush & Beyond's art history lessons and
step-by-step art tutorials, with filtering by era, artist, and difficulty,
and a Premium tier for extensive deep-dive history episodes.

**Nothing on this site is fetched live from brushbeyond.net or YouTube.**
Every word, number, and stat is content I wrote once into these files — it
won't drift or get overwritten by your manual updates elsewhere, but it also
won't update itself. Edit the file, see the change.

## Running it

No install, no build step — it's plain HTML/CSS/JS. **Serve it through a
local web server rather than double-clicking `index.html`** — any static
file server works, e.g. `npx serve .` (if you have Node.js) or
`ruby -run -e httpd . -p 4173` (macOS ships Ruby already), then open the
URL it prints (e.g. `http://localhost:3000`).

This matters more than it sounds: opening the file directly loads it over
`file://`, and YouTube's embedded player rejects that (no real origin to
check against) with a **"Video player configuration error" / Error 153** —
so every art history video (and any tutorial without an uploaded clip) will
look broken even though nothing is actually wrong. Once it's served over
`http://` (locally or once deployed, see below), embeds work normally.

## Deploying it

Since it's static files, you can drag the whole folder into
[Netlify Drop](https://app.netlify.com/drop), or push it to a GitHub repo and
turn on GitHub Pages — no build configuration needed.

## Building the iOS app (App Store)

The website itself still needs zero install (see above). Separately, this
project is now also wrapped with [Capacitor](https://capacitorjs.com) so it
can be built as a real iOS app and submitted to the App Store. That wrapper
needs Node.js, which got installed on this machine via
[nvm](https://github.com/nvm-sh/nvm) — in a new terminal, run this once per
session before any `npm`/`npx` command below:

```bash
export NVM_DIR="$HOME/.nvm"
source "$NVM_DIR/nvm.sh"
nvm use --lts
```

**What's already done:**
- `package.json` + Capacitor installed (`@capacitor/core`, `@capacitor/cli`, `@capacitor/ios`)
- `capacitor.config.json` — app name "Brush & Beyond", id `net.brushbeyond.app`
- An `ios/` folder with a real Xcode project (`ios/App/App.xcodeproj`), using
  Swift Package Manager so there's no separate CocoaPods install step
- `www/` — a **generated** copy of the site that Capacitor bundles into the
  app. Don't hand-edit anything in `www/`; edit `index.html`/`css/`/`js/`/`assets/`
  at the project root like always, then run `npm run cap:sync` to refresh it.

**What you still need to do — this part needs your Mac and your Apple ID, I can't do it for you:**
1. Install full **Xcode** from the Mac App Store (free, but a big download —
   several GB). Only the smaller Command Line Tools are installed right now,
   which can't build or run iOS apps.
2. Open `ios/App/App.xcodeproj` in Xcode.
3. Sign in with an [Apple Developer](https://developer.apple.com/programs/) account
   ($99/year — required for App Store distribution, not needed just to run
   it in the Simulator) under Xcode's Signing & Capabilities settings.
4. Run it on the iOS Simulator (or a real device) straight from Xcode to try it.
5. When ready to publish, use Xcode's **Product → Archive**, then follow
   Apple's [App Store submission flow](https://developer.apple.com/ios/submit/)
   (screenshots, app description, review — Apple's review typically takes a
   few days).

Whenever you change the web app, re-run `npm run cap:sync` before rebuilding
in Xcode so it picks up the latest files.

**Android:** not set up yet, but it's a quick add whenever you want it:
`npm install @capacitor/android && npx cap add android` (needs Android
Studio instead of Xcode, and a one-time $25 Google Play developer fee instead
of a yearly one).

## Changing colors and fonts

Open **[css/styles.css](css/styles.css)** — the very top has a `:root` block
with every color and font the whole site uses, and a comment explaining how
to edit it. Change a hex code there and it updates everywhere (buttons,
cards, badges, nav) automatically. To use different fonts, pick them at
[fonts.google.com](https://fonts.google.com), update the font `<link>` tag
near the top of [index.html](index.html), then put the new font name into
`--font-display` / `--font-body` in that same `:root` block.

## Header / navigation

The header is a 3-column layout (Khan Academy-style): an **"Explore Our
Lessons ▾" dropdown** + "Our Teachers" on the left, the centered logo/name
(also the Home link), and the profile chip + "Upgrade to Premium" on the
right — all in [js/components/header.js](js/components/header.js). To add a
new item to the dropdown, add another `<a href="#/...">` inside
`#explore-menu`; to add a new top-level nav link, add it to `.header-left` or
`.header-right` alongside the existing ones.

## Editing lesson content

Everything lives in **[js/data/lessons.js](js/data/lessons.js)** — one array
of lesson objects, documented with comments at the top of the file. To add a
lesson or fix one, just edit that file; every page (filters, cards, detail
view) reads from it automatically.

- `type`: `'history'` or `'tutorial'`
- `premium`: `true` locks it behind the Premium page unless the user has
  demo-Premium turned on
- `videoId`: the part after `?v=` in a YouTube URL. Every lesson has one
  filled in now, matched against the real
  [YouTube channel](https://www.youtube.com/@Brush-And-Beyond-2025) — if you
  ever add a new lesson before its video is up, leave this `null` and the
  lesson page shows a "video coming soon" placeholder instead.
- `videoFile` — **tutorials only.** Path to a video file you've uploaded
  yourself (see "Uploading your own tutorial clips" below). When set, it
  plays instead of the YouTube embed above; art history lessons don't have
  this field and always stay on YouTube.
- `funFact`: a one-line "did you know?" shown as a callout on history
  lessons — this is the easiest place to add more written depth.
- `materials`: a plain array of strings, shown as a supply checklist above a
  tutorial's steps.
- `steps`: an array of `{ title, instructions, videoId, videoFile }` — this
  is what powers the "Step 1 of N" flow with a **Next Step** button on
  tutorial pages. Add as many steps as you want. Leaving both `videoId` and
  `videoFile` null shows a "clip not added yet" placeholder for that step
  while still showing your written instructions.

  10 of the 13 tutorials have `steps`/`materials` written from the actual
  YouTube video transcripts (via each video's "Show transcript" panel), not
  guessed — so they should match what's really in the video. **3 have a
  confirmed video but no transcript pulled yet, so they're left with no
  `steps`/`materials`** rather than invented ones: `hockney-collage`,
  `otani-monster-workshop`, and `klee-chorus-of-colors`. Pull their
  transcripts the same way and fill them in whenever you get to it.

### Uploading your own tutorial clips (instead of YouTube)

Art history lessons always play from YouTube. Tutorials (and the milestone
celebration videos — see below) can instead play a video file you upload
yourself, with YouTube as an automatic fallback until you do:

1. Drop your clip into **[assets/tutorials/](assets/tutorials/)** — one
   subfolder per lesson keeps things tidy, e.g.
   `assets/tutorials/frida-kahlo-draw/step-1.mp4`.
2. Set that lesson's (or step's) `videoFile` field in `lessons.js`:
   ```js
   videoFile: 'assets/tutorials/frida-kahlo-draw/step-1.mp4',
   ```
3. That's it — the app plays your file instead of the YouTube embed. Leave
   `videoFile: null` and it falls back to `videoId` automatically, so
   nothing breaks before you've uploaded anything.

Keep clips reasonably compressed (H.264 `.mp4` works everywhere, including
the iOS app) — unlike a YouTube embed, an uploaded file ships inside the app
bundle / gets downloaded by every visitor's browser, so file size matters
here in a way it doesn't for YouTube.

### Adding your own thumbnail images

If a lesson doesn't have a `videoId` yet, its card shows a plain placeholder
icon instead of a thumbnail. To use a custom image instead:

1. Drop the image file into **[assets/thumbnails/](assets/thumbnails/)**
   (e.g. `assets/thumbnails/frida-kahlo-draw.jpg`).
2. Add a `thumbnail` field to that lesson in `lessons.js`, e.g.:
   ```js
   thumbnail: 'assets/thumbnails/frida-kahlo-draw.jpg',
   ```
   This overrides the auto-generated YouTube thumbnail, so it also works for
   lessons that already have a video if you'd rather use your own image.

## The "Our Teachers" page

Edit **[js/data/teachers.js](js/data/teachers.js)** — a short array with a
name, role, and bio for each teacher. Add a `photo` field pointing at an
image you've dropped into **[assets/teachers/](assets/teachers/)** (same
pattern as thumbnails above); leave it `null` to show a colored initial
instead.

## Difficulty scale

The 1–5 scale ("Little Picasso" → "Master in Training") lives in
[js/data/difficulty.js](js/data/difficulty.js) if you want to rename or
re-color the levels — it now shows as a simple colored bar + label instead
of icons.

## Profiles & badges

Kids can create a free "profile" (nickname + avatar) and earn a badge
for every lesson they finish — no email, no password, no server. It's saved
via `localStorage` on that device only, in [js/state/profile.js](js/state/profile.js).
Because no personal info is ever collected, there's nothing to worry about
re: kids' privacy law (COPPA) — but it also means a kid's badges don't follow
them to a different browser or device.

- **A profile is required to open any lesson.** Browsing the Art History /
  Art Tutorials grids is open to everyone, but clicking into a lesson shows
  a "Create an account to continue" gate (`accountGateHTML()` in
  [js/pages/lessonDetail.js](js/pages/lessonDetail.js)) until a profile
  exists. The homepage's main button does the same thing before a profile
  exists. If you'd rather let people watch freely and only prompt for an
  account at the end, remove that early check in `renderLessonDetail` —
  the "create a profile to start earning badges" fallback used to live in
  `completionHTML` and is easy to bring back.
- A lesson badge is earned by clicking **"I Finished This — Claim My Badge!"**
  on a history lesson, or on the last step of a tutorial. That button lives in
  `lessonDetail.js` (`completionHTML` / `wireCompletionButton`).
- Milestone badges (5 lessons, 10 lessons, etc.) are computed automatically
  from how many lesson badges a profile has — edit the thresholds in
  [js/data/milestones.js](js/data/milestones.js).
- The full collection (earned + locked) shows on **My Profile**
  ([js/pages/profile.js](js/pages/profile.js)), and a live badge count shows
  in the header nav chip.

### Popups: continue watching & milestone celebrations

Two popups (in [js/components/modal.js](js/components/modal.js)) make the
site feel more alive without needing any backend:

- **"Welcome back" / continue watching** — if a kid has a profile and an
  unfinished lesson, the home page pops up a reminder once per browser tab
  session (it won't nag on every single visit), offering to jump right back
  in — resuming a tutorial on the exact step they left off. This logic lives
  in `maybeShowContinueWatchingPopup()` in
  [js/pages/home.js](js/pages/home.js); the same info also shows as a
  permanent "Continue Watching" card on the home page for anyone who
  dismissed the popup.
- **Milestone celebrations** — the moment a kid crosses a milestone count
  (10, 20, 50 lessons — see [js/data/milestones.js](js/data/milestones.js))
  by claiming a badge, a popup congratulates them with a "🎬 Watch My Video!"
  button that opens `#/celebrate/<count>` (rendered by
  [js/pages/celebrate.js](js/pages/celebrate.js)).

**To add your own congratulations video for a milestone**, upload your own
clip (same as tutorials — see above) or link to YouTube:

1. Either drop a clip into **[assets/celebrations/](assets/celebrations/)**
   (e.g. `assets/celebrations/10-badges.mp4`), or find a video on YouTube
   and copy its ID out of the URL — from
   `https://www.youtube.com/watch?v=dQw4w9WgXcQ` that's `dQw4w9WgXcQ`
   (everything after `v=`); from a shared link like
   `https://youtu.be/dQw4w9WgXcQ` it's everything after the last `/`.
2. Open [js/data/milestones.js](js/data/milestones.js) and set that
   milestone's `videoFile` and/or `videoId` field:
   ```js
   { count: 10, icon: '🏆', title: 'Art Enthusiast', description: 'Completed 10 lessons.', videoFile: 'assets/celebrations/10-badges.mp4', videoId: null },
   ```
3. That's it — the celebration page plays `videoFile` if set, otherwise
   falls back to embedding `videoId`. Leave both `null` and it shows a
   friendly "coming soon" placeholder instead.

### Drawing your own badge art

Badge icons default to a plain 🏛 (history) / 🎨 (tutorial), but you can draw
or design your own PNG per lesson:

1. Drop the image into **[assets/badges/](assets/badges/)**
   (e.g. `assets/badges/frida-kahlo-draw.png`) — a square image works best.
2. Add a `badgeIcon` field to that lesson in `lessons.js`:
   ```js
   badgeIcon: 'assets/badges/frida-kahlo-draw.png',
   ```
3. That's it — it'll show automatically once a kid earns that badge. Locked
   badges always show as a mystery "?" (even ones with custom art) so
   earning them still feels like a reveal.

### Using your own avatar art instead of emoji

The avatar picker on the profile page defaults to 12 emoji, but you can swap
any (or all) of them for your own drawn avatars:

1. Drop each image into **[assets/avatars/](assets/avatars/)**
   (e.g. `assets/avatars/fox.png`) — square, and reasonably small (under
   ~200×200px) since these show tiny in the nav bar.
2. Open [js/state/profile.js](js/state/profile.js) and replace an entry in
   the `AVATARS` array with the path:
   ```js
   const AVATARS = ['assets/avatars/fox.png', '🐱', '🐼', /* ...etc */];
   ```
3. That's it — every place an avatar shows (the picker, the profile page,
   the header nav chip, the home page banner) automatically detects whether
   an entry is an emoji or an image path and renders it correctly. You can
   mix emoji and custom images in the same list.

**If you ever want real cross-device accounts instead** (so a kid's progress
follows them to a new computer), that needs an actual backend — e.g. Firebase
Auth + Firestore, or Supabase. That's a bigger step: you'd set up a free
project with one of those, and since it involves real sign-in for kids, it's
worth thinking through parental consent / a privacy policy at that point
rather than after the fact.

## Premium

There's no real payment processor wired up yet. The Premium page
([js/pages/premium.js](js/pages/premium.js)) has a demo toggle that flips a
`localStorage` flag so you can preview the locked/unlocked experience. When
you're ready to take real payments, swap that toggle for a real checkout
(Stripe Checkout is the simplest option) and set the same flag once payment
is confirmed — everything else (the lock screens, the badges) already reads
from `js/state/subscription.js`'s `isPremium()`.

## Structure

```
index.html
css/styles.css            colors, fonts, and every visual style — start here to restyle
assets/thumbnails/         drop custom lesson images here
assets/teachers/           drop teacher photos here
assets/badges/             drop custom badge artwork here
assets/avatars/            drop custom avatar artwork here
js/
  data/lessons.js          content — edit this for new lessons, steps, fun facts
  data/teachers.js         the "Our Teachers" page content
  data/difficulty.js       the 1–5 difficulty scale
  data/milestones.js       badge-count milestones (5 lessons, 10 lessons, ...)
  state/subscription.js    demo Premium flag (localStorage)
  state/profile.js         local profile + earned badges (localStorage)
  router.js                tiny hash-based router (#/history, #/lesson/:id, ...)
  components/              header, footer, lesson cards, filter bar, badges, toast
  pages/                   home, explore (history/tutorials), lesson detail, premium, teachers, profile
```
