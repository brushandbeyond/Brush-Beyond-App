# Brush & Beyond — Lesson App

A free, kid-friendly art-learning website packaged for iOS and Android with Capacitor. Plain HTML, CSS, and JavaScript; no frontend build system or application backend.

## Release status

The current preparation pass makes all 49 lessons free and removes demo Premium. Profiles are device-local, not online accounts. Placeholder teacher profiles are hidden; their source data is preserved for future editing.

See [IOS_RELEASE_CHECKLIST.md](IOS_RELEASE_CHECKLIST.md) for owner decisions, native testing, privacy review, and submission steps. This is not a signed or submitted release. [PROJECT_FINDINGS.md](PROJECT_FINDINGS.md) records the initial review before these changes.

## Run locally

Serve the repository over HTTP:

```sh
ruby -run -e httpd . -p 4173 -b 127.0.0.1
```

Open http://127.0.0.1:4173. Avoid opening `index.html` through `file://`; embedded YouTube playback requires a suitable origin. Native playback must also be tested independently.

## Native development

Install dependencies with `npm ci` when needed. Edit source files at the project root, not generated web copies.

```sh
npm run cap:sync
npx cap open ios
```

- `npm run sync` regenerates `www/`, including `privacy.html`.
- `npm run cap:sync` copies the web bundle into both native platforms.
- For iOS-only updates: `npm run sync && npx cap sync ios`.
- iOS: `ios/App/App.xcodeproj`, Swift Package Manager, full Xcode and signing team required.
- Android: existing Gradle project in `android/`, Android Studio/SDK/JDK required.
- Bundle ID: `net.brushbeyond.app`.
- `npm test` is a placeholder, not a working frontend test suite. Always perform runtime and physical-device checks before release.
- `npm run check:release` verifies source integrity and bundled asset parity, and reports native setup blockers separately. Run it after syncing; a pass does not establish App Store readiness.

## Source map

| Files | Purpose |
| --- | --- |
| `index.html` | App shell and dependency-ordered classic scripts |
| `js/main.js`, `js/router.js` | Hash routes and startup |
| `js/pages/` | Page rendering and interactions |
| `js/components/` | Header, footer, filters, cards, badges, modals, toast |
| `js/utils/html.js` | Escape untrusted text before HTML interpolation |
| `js/state/profile.js` | Local profile, progress, badge and milestone persistence |
| `js/data/lessons.js` | Lesson catalog and written tutorial steps |
| `js/data/difficulty.js` | Difficulty labels and colors |
| `js/data/milestones.js` | Milestone thresholds and optional celebration videos |
| `js/data/teachers.js` | Unpublished teacher placeholders |
| `css/styles.css` | Theme variables and all styles |
| `js/pages/privacy.js`, `privacy.html` | Shared in-app/public-hostable privacy/help content |

Routes: `#/`, `#/history`, `#/tutorials`, `#/explore`, `#/lesson/:id`, `#/profile`, `#/celebrate/:count`, `#/privacy`. Old `#/premium` links open the catalog; old `#/teachers` links open home.

## Edit lesson content

Each lesson in `js/data/lessons.js` has a unique `id`, `title`, `type` (`history` or `tutorial`), `artist`, `era`, `difficulty` (1–5), `videoId`, and `description`.

Optional fields:
- `duration`: display string.
- `funFact`: history callout.
- `thumbnail`: custom asset path instead of the YouTube thumbnail.
- `badgeIcon`: custom image for an earned badge.
- `videoFile`: uploaded tutorial video, preferred over its YouTube ID.
- `materials`: supply list.
- `steps`: objects with `title`, `instructions`, `videoId`, and `videoFile`.

History uses YouTube. Tutorials show written steps when present, with an expandable full-video player. Individual steps without clips show written-instruction guidance; they do not automatically play the full video.

Three tutorials currently use only their main video: `hockney-collage`, `otani-monster-workshop`, and `klee-chorus-of-colors`. Do not invent transcript-derived steps.

Put optional uploaded clips/images in the corresponding `assets/` folders. Bundled clips increase app/download size; compressed H.264 MP4 is a practical format. Verify content rights before publication.

## Profiles and milestones

One profile per browser/device stores nickname, avatar, earned lesson IDs, completed-video flags, seen milestones, and the last lesson/step under `bb_profile`. No email/password or cross-device sync. New badge claims require the main lesson video to reach its end with at least 95% watched coverage; seeking to the end or opening YouTube externally does not qualify. Tutorials also require reaching the last written step. Previously earned badges are preserved. These are local progress checks, not server-verified credentials.

The avatar list in `js/state/profile.js` accepts configured emoji or image paths. Nicknames are escaped at HTML render sites; saved profile data is normalized when read. Storage-write failures show a message rather than falsely reporting success.

Deleting a profile requires confirmation and removes local profile/progress plus the legacy demo Premium flag. Session-only continue reminders use `bb_continue_popup_seen_<lessonId>`.

Milestones occur at 1, 5, 10, 20, and 40 lessons. Optional `videoFile`/`videoId` values in `js/data/milestones.js` add celebration videos; without a clip, the page celebrates the achievement with text.

## Privacy and support

The in-app page at `#/privacy` shares content with `privacy.html`. The owner supplied Brush And Beyond Art For Tomorrow and brushbeyond07@gmail.com as the public operator/contact. Public pages are published at the URLs below; final owner approval of the disclosures remains pending.

The owner selected Kids category and prefers retaining YouTube embeds. Parents & carers gates settings and outside links. YouTube is off by default and requires a parent's explicit provider-access choice. Native iOS player navigation also passes through an adult check. Fonts use the device's installed families, and cover images/statistics are bundled, eliminating automatic Google Fonts, thumbnail, and raw GitHub requests during browsing. YouTube still processes provider requests when a video is opened after permission. Gates do not establish legal parental consent, confirm content rights, or guarantee Kids-category approval.

Public pages are live at https://brush-beyond-app-help.beneficialhome1.chatgpt.site/privacy.html and https://brush-beyond-app-help.beneficialhome1.chatgpt.site/support.html. The separate Sites source checkout is `release-site/`. Final owner review and child-directed YouTube configuration remain pending.

## Live YouTube stats

The home page reads a bundled channel statistics snapshot. Browsing uses local cover images and device fonts. YouTube connects only when video access is enabled and a video is opened.

1. `.github/workflows/youtube-stats.yml` runs daily at 09:17 UTC or manually.
2. `scripts/update-youtube-stats.js` calls YouTube Data API using the GitHub Actions secret `YOUTUBE_API_KEY`.
3. It commits `js/data/youtube-stats.json`.
4. Home reads the bundled JSON, retaining hardcoded fallback numbers if it cannot load. Run `npm run cap:sync` and rebuild to ship new statistics. The installed Kids app does not fetch the raw GitHub file automatically.

`countriesReached` stays manual in `js/pages/home.js`. API keys must never ship in the app.

## Styling and future work

Edit CSS variables at the top of `css/styles.css` for the theme. Fonts are linked from `index.html`.

Real accounts, cross-device progress, and paid access require a separate backend/entitlement design. Do not implement paid access using a client-editable localStorage flag.
