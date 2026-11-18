# Brush & Beyond — Project Handoff Findings

Reviewed November 6, 2026. This is a source-code review, not a browser QA pass or a native build certification.

## Overview

Brush & Beyond is a kid-oriented art-learning app: browse art history and hands-on tutorials, create a local artist profile, follow lessons, and collect badges. The same static website is packaged for iOS and Android using Capacitor 8.

The architecture is deliberately small: plain HTML, CSS, and JavaScript, no frontend framework, bundler, application server, database, real authentication, or payment integration. Existing conventions can be extended without introducing a framework.

## Architecture and ownership

| Area | Source of truth | Notes |
| --- | --- | --- |
| App shell | `index.html` | Loads classic scripts in dependency order; functions and constants share the global environment. |
| Startup/navigation | `js/main.js`, `js/router.js` | Hash routes and direct DOM rendering; no full-page reload needed. |
| Screens | `js/pages/` | Home, explore, lesson detail, Premium, teachers, profile, celebrations. |
| Shared UI | `js/components/` | Header/footer, cards, filters, badges, toast, modal. |
| Content | `js/data/` | Hand-authored lesson catalog, teachers, difficulty levels, milestones, stats snapshot. |
| Persistence | `js/state/` | Browser/device-local profile and demo subscription. |
| Styling | `css/styles.css` | Central CSS variables, pastel palette, serif fonts, responsive layout and some native safe-area handling. |
| Native packaging | `capacitor.config.json`, `ios/`, `android/` | App ID `net.brushbeyond.app`; native entry points are thin Capacitor wrappers. |
| Generated web bundle | `www/` | Ignored by Git; do not edit as source. |
| Stats automation | `scripts/update-youtube-stats.js`, `.github/workflows/youtube-stats.yml` | Daily YouTube API snapshot committed to the repository. |

Routes: `/`, `/history`, `/tutorials`, `/explore`, `/lesson/:id`, `/premium`, `/teachers`, `/profile`, `/celebrate/:count`, all prefixed by `#` in URLs.

## Current user flows

1. Anyone can browse the lesson catalog and combine type, era, artist, difficulty, and Premium-only filters.
2. Opening a lesson requires a local profile: nickname plus one of twelve avatars. Despite some UI saying “account,” there is no server account.
3. Premium lessons additionally require the demo Premium flag. The Premium screen explicitly lets anyone toggle it.
4. History lessons embed YouTube. Tutorials with steps show a stepper and materials; tutorials without steps show their main video. Uploaded tutorial clips are supported by the code.
5. Users manually claim completion badges; watching the video is not verified.
6. The most recent lesson and tutorial step are remembered. There is no video timestamp tracking or independent saved position for every lesson.
7. Home shows a continue card and a reminder popup, suppressed per lesson per browser-tab session.
8. Badge thresholds trigger milestone celebrations. The profile page shows earned and locked badges.

Persistence keys: `bb_profile`, `bb_premium_demo`, and session-only `bb_continue_popup_seen_<lessonId>`. Custom events `bb:profile-changed` and `bb:premium-changed` update the header. Creating a replacement profile deletes the old local progress; there is no multi-profile selector or cloud recovery.

## Catalog inventory

Computed directly from the checked-in data:

- 49 lessons: 36 history and 13 tutorials.
- 9 Premium lessons; tutorials are free.
- All lessons have a main video source; no duplicate lesson IDs were found.
- 10 tutorials contain 43 written steps in total; 33 steps have no individual video source and display the written-instruction placeholder instead.
- Three tutorials have no step sequence: `hockney-collage`, `otani-monster-workshop`, `klee-chorus-of-colors`.
- Both teacher entries are placeholders.
- Milestones are 1, 5, 10, 20, and 50 completed lessons; all celebration video fields are empty.
- The 50-lesson milestone cannot currently be reached through the 49-lesson catalog.

Video availability and transcript accuracy were not verified against external services. The README describes prior transcript work, but this review does not independently confirm it.

## External services and delivery

- YouTube privacy-enhanced embeds serve video; YouTube also serves thumbnails.
- Google Fonts supplies the typefaces.
- Home fetches stats from the repository's raw GitHub URL, then the bundled JSON, then retains hardcoded fallback values. The request is cached in memory for the page session.
- The stats workflow runs daily at 09:17 UTC and supports manual dispatch. It expects a GitHub Actions secret named `YOUTUBE_API_KEY`; secret configuration was not inspected.
- Recent Git history is mostly automated stats refreshes. Earlier feature commits added native Android support and live/exact stats.

## Development workflow

- Serve the repository over HTTP, for example `ruby -run -e httpd . -p 4173`. Avoid opening `index.html` via `file://`, especially for embedded video.
- Edit root `index.html`, `css/`, `js/`, and `assets/`.
- `npm run sync` recreates `www/` from those sources.
- `npm run cap:sync` regenerates that bundle and synchronizes Capacitor platforms before native rebuilding.
- iOS uses an Xcode project and Swift Package Manager; Android uses Gradle and a Java `BridgeActivity`.
- `npm test` is only a failing placeholder. Android includes generated example tests, not meaningful application-flow coverage. No frontend test suite or lint configuration was found.
- No `AGENTS.md` or dedicated Claude instruction file was found in the project scan. `README.md` and inline comments hold the existing handoff guidance.

## Important issues and boundaries

### Security and persistence

- User-provided nicknames are interpolated into `innerHTML` in multiple screens and the header without escaping. This creates an HTML-injection risk; render user strings as text or escape them before templating.
- Premium is a UI demonstration, not protected access. Both the entitlement flag and lesson/video metadata are client-side. A paid product would need an authoritative entitlement/content-access design, not merely a checkout followed by setting the existing flag.
- Profile JSON parsing catches malformed JSON, but does not validate the parsed schema. Missing arrays or invalid saved step indices can break rendering. Storage writes are also unguarded against storage failures.
- Profile replacement clears progress immediately, without confirmation. The separate Premium flag survives a profile reset.

### Content and usability

- Missing step clips, teacher bios, and celebration videos are visible unfinished content, not missing infrastructure.
- A tutorial with steps renders those steps instead of a separate main-video player. A missing step clip does not automatically use the lesson's main video.
- Modal markup has a dialog role, but no implemented keyboard focus trapping, Escape handling, or focus restoration.
- “Create an account” wording can overstate the local-only profile behavior.

### Documentation drift

- The README says Android is not set up, but the Android project and dependency already exist.
- README statements about this machine's Xcode installation are historical and were not checked.
- The README and profile comments make categorical privacy-law assurances. This source review does not establish compliance; those assurances should not be treated as verified, particularly given third-party resources.
- The README's payment guidance understates the work needed to turn a local demo flag into trusted paid access.

## Review scope and next-work approach

Reviewed the README, script loading, routes, state, primary screens and components, content data, styling conventions, native entry points, package scripts, stats automation, and recent history. Executed a read-only Node inventory of lesson and milestone data. The working tree was clean at the start.

No application code was changed, no dependencies installed, no native sync/build performed, and no browser/device behavior tested. This handoff document is the only added file.

For the next request, preserve the existing lightweight architecture unless the requested capability requires a larger change. Content work belongs in `js/data/`; UI changes belong in pages/components and CSS; real accounts, paid access, or cross-device progress require a separate backend/security design discussion.
