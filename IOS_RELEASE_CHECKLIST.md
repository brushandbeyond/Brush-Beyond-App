# iOS Release Preparation

Status: Release archive uploaded successfully to App Store Connect for TestFlight; Apple processing started. Tester access and beta review are not yet verified. Not published to the App Store.
Updated November 18, 2026.

**November 18, 2026: version 1.0 (build 3) submitted for App Review via API (`scripts/app-store-submit.js`), submission `e061362b-4654-427f-822a-778ed04af03f`, state WAITING_FOR_REVIEW. App Privacy published by owner (Advertising Data → Third-Party Advertising, not linked, not tracking). Manual release: after approval run `node scripts/app-store-submit.js release --confirm`.**

## Current TestFlight attempt — November 7, 2026

- Owner declined sending the Google support report and requested continuing Apple submission. No report was sent. Reopened App Store Connect as Account Holder; App Privacy still shows Get Started and disabled Publish, with only the policy URL saved. Google self-designation is not an Apple UI approval step, but its unresolved status does not justify inventing provider-data declarations or certifying Kids compliance. All other previously verified preparation remains; final submission has not occurred. Screenshot of the remaining Apple form: `/tmp/brush-beyond-apple-privacy-required.png`.

- Follow-up after the owner's Safari retry also returned home: verified Apple lists Brush & Beyond and the build/screenshots remain valid/complete. Reproduced Apple's query-sensitive JWT scope restriction (403 FORBIDDEN.REQUEST_DOES_NOT_MATCH_SCOPE), added the exact validated read-only fields-query scope, and confirmed HTTP 200/app present for that query. Google's tool still returned home on the scope-adjusted retry. No further key creation, write access, or private-key sharing was used. Root cause of Google's redirect remains unconfirmed; support draft is `release/GOOGLE_VERIFICATION_SUPPORT_DRAFT.md` (not sent). Google tag and official submission remain incomplete. Do not describe the partial scope correction as a successful designation.

- November 17 Developer-key follow-up: created the explicitly approved `BrushBeyond Google Verify` Developer team key `D3R6ZS86GL`, saved its private key locally with mode 600, and retried Google with the same five-minute app-metadata-only scope. Both Apple metadata checks returned HTTP 200, but Google's app-list page again redirected to its start page without confirmation. Google designation is NOT applied. No token permissions were broadened or persistent private key shared with Google. Both keys remain active; the Developer key is intended to be revoked after verification/abandonment with owner confirmation. Added an opt-in local token-to-clipboard command for a user-controlled Safari/Chrome retry; that manual retry has not been performed. App Privacy and official submission remain unfinished.

- November 17 Google follow-up: owner approved sharing a five-minute read-only Apple app-metadata token with Google's official COPPA tool and applying child-directed designation after verification. Two fresh ES256 tokens scoped only to `GET /v1/apps` and `GET /v1/apps/6832145033` were entered through the browser UI. Each attempt briefly navigated to `/selfdeclaration/ios/apps`, then returned to `/selfdeclaration/ios/home` without an app list or success confirmation. Direct Apple checks accepted the same token scope (HTTP 200 on both metadata endpoints). No token scope was broadened, no persistent private key was entered into Google, and no child-directed tag was verified/applied. Google's form recommends a separate Developer-role key; a temporary Developer key would require separate approval before creation. Official Apple submission remains incomplete; screenshot delivery is resolved but App Privacy and Google verification remain outstanding. Proof: `/tmp/brush-beyond-google-verification-returned-home.png`.

- November 17: securely configured the owner-supplied App Manager team API key and verified live Apple authentication. Key is local, mode 600, Git-ignored, never logged. App remains PREPARE_FOR_SUBMISSION with manual release; build 3 is VALID. All ten screenshot assets are now COMPLETE with no errors, resolving the previously reported processing blocker. Google ownership-verification page is signed in and offers a locally generated JWT option. Awaiting separate confirmation to send Google a short-lived read-only token and apply the child-directed designation. App Privacy still must be completed accurately; no official review submission has occurred.

- November 10 privacy follow-up: owner approved including YouTube collection. Selected Yes in App Privacy and advanced to the detailed data-type questionnaire. This is not a published or completed declaration; no data-type boxes were selected without verification. Draft/evidence gaps are in `release/app-store/APP_PRIVACY_DRAFT.md`. Requested the completed provider review findings covering retained data types, purposes, linkage and tracking. Initial Apple error recovered after reload. Proof: `/tmp/brush-beyond-privacy-data-types.png`. Official review is still not submitted.

- November 10 follow-up: saved supplied Apple review contact, confirmed copyright, manual release preference, and the explicitly approved build-3 encryption answer; Missing Compliance disappeared. Saved third-party content-rights attestation based on prior owner confirmation. Set free pricing and United States-only availability (UI confirmed 1 country, Available on App Release). Completed age-rating answers exactly as subsequently approved by the owner (parental controls and advertising Yes, remaining capability answers No, no listed mature/medical/sexual/violent/chance content) and selected Made for Kids, ages 9–11. Owner attests YouTube child-directed settings/provider review is complete; not independently certified.
- Apple preflight initially reported content rights, ratings, screenshots processing, privacy, and pricing missing. After the saved updates, only screenshots processing and App Privacy remained. Replaced two stalled iPhone Home/Explore uploads with the same approved originals; both replacements rendered as draggable screenshot assets (5 iPhone screenshots total). The old attachments remain in Asset Library. Required App Privacy declaration is still not completed/published. Asked owner for explicit approval to answer Yes to collection including YouTube, with detailed types/purposes/linking/tracking to be reviewed before publication. A later Add for Review validation attempt was blocked by the action reviewer while privacy remains unfinished; do not bypass. App remains unsubmitted. Proof: `/tmp/brush-beyond-submission-progress.png`.

- November 10 App Store preparation: signed in and located app `6832145033`. Saved approved name/subtitle, Education category, description/promotional text/keywords/support URL, review notes and no-login requirement; attached latest build 1.0 (3). Uploaded and verified five iPhone medium screenshots and five iPad 13-inch screenshots. Saved the approved public privacy-policy URL. Version remains Prepare for Submission; not added/submitted for official App Review.
- Build 3 still shows Missing Compliance. Saving the proposed encryption answer was blocked by the action reviewer pending the owner's explicit confirmation; do not bypass it. Asked owner for Apple review contact details, confirmation of YouTube child-directed/provider review, manual vs automatic release preference, the exact encryption answer, and copyright holder confirmation. App privacy questionnaire and age ratings remain uncompleted; pricing/territory/DSA requirements still need verification. No legally binding agreement was accepted and no unsupported compliance answers were submitted. Proof of draft: `/tmp/brush-beyond-release-draft.png`.

- November 9, 4:51 p.m. America/New_York: uploaded release archive 1.0 (3) successfully; Xcode reported “Upload succeeded” / “EXPORT SUCCEEDED” and Apple processing started. This includes the shared Back button, corrected history/tutorial categories, and the verified badge fix. Automatic playlist synchronization is not implemented; owner will provide two playlist URLs later. Build 3 tester-group assignment, compliance prompts, beta review, and notifications have not been verified.

- November 9: added a shared accessible Back button to app pages. Navigation uses only the current session's in-app routes (not browser history, which could leave the app); direct-entry pages fall back to Home, and Back is disabled on Home with no earlier app page. Browser checks passed Home → Tutorials → Frida tutorial → Back → Tutorials → Back → Home. This navigation change is local and was not in uploaded build 2.
- Reconfirmed the three circled lessons are Art History in the current catalog and uploaded build 2: `hockney-collage`, `otani-monster-workshop`, `klee-chorus-of-colors`. Catalog totals are 39 history and 10 tutorial lessons. Videos stream from the specified YouTube IDs; the lesson catalog does not automatically import channel uploads. New lessons/categories require editing the bundled catalog, caching their covers, and distributing an updated app. No automatic YouTube synchronization was enabled.

- November 8, 8:29 p.m. America/New_York: following owner reauthentication, the prepared 1.0 (2) archive uploaded successfully. Xcode reported “Upload succeeded” / “EXPORT SUCCEEDED” and Apple processing started. Includes owner-verified badge-completion and catalog/filter fixes. External group assignment, any compliance prompts, beta review, and tester notifications for the new build still require confirmation in App Store Connect. The earlier account failure below is historical.

- November 8 update: owner verified badge completion and the circled category/filter corrections on the USB-installed iPhone build, then requested an updated TestFlight upload. Release archive 1.0 (2) succeeded at `/tmp/Brush-Beyond-1.0-2.xcarchive` using `CURRENT_PROJECT_VERSION=2`. Source/release checks passed. Upload failed with “Failed to Use Accounts” because Xcode again requires App Store Connect access for team `3265D2NS7G`. Build 2 was not uploaded; the previously uploaded build remains unchanged. Reauthenticate the publishing account in Xcode Settings → Accounts, then retry the prepared archive.

- November 8 follow-up: the owner reproduced badge failure after the first timer fix. Added native foreground delayed-sample handling, pause/background timeline resets, an explicit completion query when Done is pressed, and a visible watched-percentage indicator. Regression checks cover delayed samples, seeking, pauses, background gaps, repeated segments, and Done before the ended callback. This is not yet verified by a full video on the physical iPhone and is not included in the uploaded TestFlight build.

- Follow-up at 9:18 p.m. America/New_York: after the owner completed account/app setup, `xcodebuild -exportArchive` reported “Upload succeeded” and “EXPORT SUCCEEDED”; the uploaded package began Apple processing. External beta review, export-compliance answers, and tester invitations remain pending. Earlier failed attempts below are retained as history.

- Owner approved the screenshots, icon, and listing draft, and requested a TestFlight upload. This is not authorization to publish a production App Store release.
- Prepared 10 actual simulator screenshots (iPhone and iPad), opaque upload JPEGs, icon, and listing copy in `release/app-store/`; packaged as `release/Brush-Beyond-App-Store-Pack.zip`.
- Synchronized web/native bundles and passed `npm run check:release` and `git diff --check`.
- Signed Release archive succeeded: `/tmp/Brush-Beyond-1.0-1.xcarchive`, bundle `net.brushbeyond.app`, version 1.0, build 1, team `3265D2NS7G`. Distribution re-signing is still pending.
- Upload attempted with `release/TestFlight-ExportOptions.plist`. Xcode returned: “Failed to Use Accounts” and “App Store Connect access for ‘3265D2NS7G’ is required.” No successful upload was reported.
- Owner must verify the team's account in Xcode Settings → Accounts and sign in to App Store Connect. Any required agreements must be reviewed and accepted by the owner. App record, processing, external beta review, and tester invitations have not been verified/completed.
- YouTube child-directed configuration/provider review and final physical-device interaction checks remain pending. Do not represent this archive as Kids-compliance certified.

## Release scope

- Free version: all 49 lessons, no purchases or subscriptions.
- Device-local nickname/avatar, progress, and badges; no server account.
- Teacher placeholders are hidden; existing teacher data is preserved for later editing.
- Written tutorial steps have a full-video option. Missing individual clips are not described as upcoming features.
- Milestones celebrate completed work without promising missing videos. The highest threshold is 40, within the catalog's 49 lessons.
- Privacy/help is available inside the app and at `privacy.html` for public hosting.

## Owner decisions required before submission

- Confirm publishing every existing lesson free is intended for version 1.0.
- Owner supplied operator name: Brush And Beyond Art For Tomorrow; public support/privacy email: brushbeyond07@gmail.com. Public hosting is complete; owner approved the published privacy policy on November 7, 2026.
- Review the privacy text against actual provider behavior, including YouTube playback, thumbnails, fonts, GitHub requests, and any website-hosting logs. Do not assume “Data Not Collected” solely because profiles are local.
- Owner selected Kids category with primary age band 9–11 on November 7, 2026; the broader intended audience remains ages 5–12. Parent gates and opt-in video access are implemented. Provider/advertising review remains pending before submission.
- Owner confirmed permission to use the included videos, artwork/images, music, and branding on November 7, 2026. This records the owner's attestation; supporting rights documents were not independently audited.
- Confirm the final app icon, screenshots, seller identity, and support website. A 1024px icon file exists but has not been approved as final branding.
- Decide release countries and review applicable App Store Connect agreements/compliance questions; do not guess responses.

## Apple setup

1. Owner confirmed an existing paid Apple Developer membership. A development team is configured, and signed device builds have succeeded.
2. Installed and selected: Xcode 27.2 (27B52) at `/Applications/Xcode.app`, with iOS 27.2 SDK and simulator runtime. The earlier Command Line Tools blocker is resolved.
3. Open `ios/App/App.xcodeproj`, select the App target, and choose the developer team under Signing & Capabilities. Automatic signing is already configured; no team is set.
4. Keep bundle ID `net.brushbeyond.app` only if available to the publishing team. Current version is 1.0, build 1. Increment the build for subsequent uploads.
5. The current project declares iOS 15, matching the installed Capacitor iOS package's podspec deployment target. Unsigned Release device and Debug simulator builds passed with Xcode 27.2 and Swift Package Manager resolving Capacitor 8.5.1. Running on the oldest supported OS still requires testing.
6. Inspect Xcode's archive validation and privacy report, including SDK privacy manifests/required-reason APIs. This pass has not certified those declarations.

## Build and test

```sh
npm run cap:sync
npx cap open ios
```

Test on physical iPhone and iPad, not only a desktop browser:

- Fresh install → create local profile → browse/filter → open history lesson.
- Watch YouTube playback, rotate, enter/exit fullscreen, background and resume. A working desktop embed does not establish that the native WebView origin/referrer is accepted by YouTube.
- Tutorial → full video → written steps → leave/reopen → resume correct step.
- Claim badge → milestone → profile collection; repeated claims must not duplicate badges.
- Relaunch → profile persists; confirm and cancel deletion separately.
- Privacy/help, public privacy URL, and external links work.
- VoiceOver, text size, keyboard/dialog behavior, small-screen layout, notch and home-indicator clearance.
- Offline/poor network: readable bundled lesson text, understandable unavailable-video behavior, no crash or loss of existing profile.

## App Store Connect draft

- Name: Brush & Beyond
- Subtitle: Art history & creative lessons
- Requested category: Education with Kids designation, primary age band 9–11 (owner confirmed). Kids compliance review remains pending.
- Description draft: “Explore art history and create your own artwork with Brush & Beyond. Browse 49 lessons, follow hands-on tutorials at your own pace, and collect badges as you learn. Choose a nickname and avatar to save progress on your device—no email or password needed. All lessons are free. Internet access is required for videos; progress does not sync between devices.”
- Review notes draft: “No login credentials or payment are required. Create a local artist profile with any nickname and an avatar. All lessons are accessible. Progress is stored on the device. Videos stream from YouTube. To test completion, watch the main lesson video to its end, then select Claim My Badge. Tutorials also require reaching the last written step. Seeking to the end or watching externally does not unlock a new badge. Profile deletion is available on My Profile and requires confirmation.”
- Public privacy policy: https://brush-beyond-app-help.beneficialhome1.chatgpt.site/privacy.html
- Public support page: https://brush-beyond-app-help.beneficialhome1.chatgpt.site/support.html
- Both pages are published through Sites with public visitor access. Source is in the separate `release-site/` checkout. These URLs can be entered in App Store Connect; they are not hosted on brushbeyond.net.
- Capture screenshots from the actual release build for the device sizes App Store Connect requests. Do not use placeholder screens or fabricated app imagery.
- Complete age rating, app privacy, content rights, export compliance, availability and release settings accurately.

## Upload sequence

Create the matching app record in App Store Connect. In Xcode choose a device/archive destination, then Product → Archive → Distribute App → App Store Connect → Upload. Resolve validation warnings/errors. Test the processed build through TestFlight; external beta testing may require review. Select the tested build for the app version and submit for App Review. Approval is not guaranteed.

## Validation performed during preparation

- JavaScript syntax checks and `git diff --check` passed.
- Started the app using a local Ruby HTTP server; `/` and `/privacy.html` returned HTTP 200, with no server errors for those requests.
- An ad-hoc Node VM smoke check passed script initialization, 14 routes and all 49 lesson renders using DOM stubs, profile escaping/normalization, storage-write failure, deletion, badge deduplication, milestones, progress, filters, and iOS source/bundle parity. This is not a browser end-to-end test.
- `npm run sync` and `npx cap sync ios` succeeded. Android assets were not synchronized in this iOS-focused pass.
- Desktop follow-up: browser automation now works. Created a local QA profile using a markup-like nickname and verified literal text rendering, avatar selection, history/tutorial badge claims, milestone navigation, tutorial step persistence across reload, artist filtering (13 → 1 → 13 results), and standalone privacy rendering.
- Checked the tutorial at a 390px viewport: document width and scroll width both measured 390px. Verified Escape closes the deletion confirmation and restores focus to the trigger; actual deletion was not exercised in this browser pass.
- YouTube's embedded player loaded with controls and a 7:16 duration. Clicking Play was exercised, but sustained playback and native iOS playback are not yet verified.
- Added `npm run check:release`: read-only source syntax, HTML references, catalog integrity, reachable milestones, and source/bundle parity checks. It reports missing Xcode/signing separately; exit code 0 means source checks passed, not release readiness.
- Fixed malformed URL parameters so the generated release bundle renders a not-found page rather than throwing a URI error. Also corrected the singular first-milestone label.
- Inspected the existing branded app icon: 1024×1024 PNG with no alpha. Final branding approval remains with the owner.
- Unsigned native Release build passed for generic iOS; Debug build passed for generic iOS Simulator. Build products are under `/tmp/brush-beyond-ios-build/Build/Products/`. These are not distributable signed archives.
- Confirmed bundle identifier `net.brushbeyond.app` and packaged privacy manifests for Capacitor and Cordova; this is not a privacy compliance certification.
- Installed the Debug simulator build on iPhone 18 Pro / iOS 27.2 and launched `net.brushbeyond.app`. Capacitor reported `WebView loaded`; a simulator screenshot confirmed the home screen rendered. Screenshot: `/tmp/brush-beyond-ios-startup.png` (temporary local QA artifact, not a final store screenshot).
- Startup warning traced to Capacitor 8.5.1 sending a scene `resume` event before the JavaScript bridge existed. Updated and pinned all Capacitor packages to 8.5.3, which guards lifecycle events until the page is ready. Rebuilt the simulator app and confirmed `WebView loaded` without the earlier JS Eval error. Also removed legacy Main storyboard entries from Info.plist so SceneDelegate exclusively creates the window, matching the Capacitor 8.5 migration. Native video playback and full interaction flows remain unverified.
- November 7, 2026: signed Debug device build succeeded with automatic provisioning for the configured developer team. Installed and launched `net.brushbeyond.app` on the owner's connected iPhone 17 Pro Max. Physical-device installation/startup is verified; playback, persistence, badges, rotation, and other interactive flows still need testing. No distribution archive or App Store upload has been completed.
- Follow-up simulator smoke check: the app remained running after initial launch and a subsequent restart returned a new app PID. Captured the rendered iPhone home screen at `/tmp/bb-simulator-current.png`. Native taps, profile persistence, video playback, rotation, and iPad flows remain untested; this session has no native UI interaction capability.

## November 7 user-reported fixes

- Artist and era dropdowns now show the complete catalog (32 artist/subject labels and 24 era labels), with All / History / Tutorials controls on every browse page. Changing the type updates the page heading; a no-results message explains how to broaden filters.
- New badges are locked until the main lesson video ends with at least 95% watched coverage. Time skipped by seeking, pauses, background gaps, and repeated views of the same segment do not count as new watched coverage. Completion is saved locally. Tutorials additionally require the final written step. Existing badges are preserved.
- Lesson screens initially show a video cover. iOS opens an in-app YouTube player in a separate WKWebView using Google's documented HTTPS app-ID base URL (`https://net.brushbeyond.app`) so YouTube receives the required client identity. The app still uses YouTube embeds. Error/timeout paths replace the player with its cover and a retry-later / Watch on YouTube fallback; external playback cannot unlock a badge.
- Browser checks: previously omitted Vermeer selection returns one lesson; the badge stays disabled before and immediately after starting video; the embedded player loads; a nonexistent-video test renders the cover fallback without YouTube's error panel.
- Playback-tracker regression checks passed for completed, skipped, paused, partial, background-gap, and repeated-segment viewing; direct early badge claims are blocked, and completed-video claims persist without duplicates.
- Native simulator verification: the new player reported `ready` and `playing` for the Frida history video without a configuration error. Temporary verification-only startup/autoplay code was removed afterward. Full-duration native badge earning and physical-phone playback still require confirmation.
- The final signed Debug phone build succeeded. Reinstallation on the paired iPhone timed out after 45 seconds; the device was listed as available/paired rather than connected. Reconnect and unlock it before installing the update. The fixes are not yet verified on the physical phone.

## Kids-category / YouTube decision

### Technical safeguards implemented November 7

- Added Parents & carers with a randomized adult multiplication check before settings are shown. Incorrect answers and cancellation do not grant access. Gated every app-owned outside destination; iOS also gates YouTube link activations, new-window requests, and navigation out of the native player.
- YouTube is off by default. A parent must review the provider disclosure and explicitly allow video access after an adult check. The choice is stored locally and can be disabled in parent settings. A gate is not a substitute for any legally required verified parental consent.
- Removed automatic Google Fonts and raw GitHub statistics requests. All 49 video covers are now bundled; browsing does not fetch YouTube thumbnails. Statistics use the bundled snapshot. The player still contacts YouTube after access is allowed and the user opens a video.
- Public privacy/support pages disclose local storage, YouTube processing/advertising, withdrawal limits, support email handling, and help-site hosting. Publication is not certification of legal compliance or video/content rights.
- Browser checks confirmed wrong gate answers are rejected, correct answers reveal settings, video access defaults to off, and clicking Watch while off creates no player iframe. The iOS simulator build passed with native link interception compiled. Full physical-device link-out testing remains necessary.
- Owner confirmed the intended audience is ages 5–12, selected primary Apple Kids band 9–11, and approved content rights/privacy text on November 7, 2026. Owner reports not all YouTube lessons are marked Made for Kids and will review/update the appropriate settings. Video audience designation, child-directed app/site configuration, and advertising suitability remain pending verification before submission. No YouTube settings were changed by the agent.

The owner prefers keeping YouTube embeds, even though original videos are available. Do not replace the player or import original media without a new decision.

This choice is not approval to submit the current build. Apple's Kids rules require review of third-party data handling and external navigation; the current YouTube UI contains Watch on YouTube, channel, and sharing links. A gate on app-owned links does not automatically gate links inside a cross-origin iframe. The `youtube-nocookie.com` hostname alone is not proof of Kids-category compliance or parental consent.

Before submission:
- Review YouTube's child-directed app/site designation requirements and confirm the correct designation with the channel/app owner.
- Review actual player advertising/data behavior and all outbound links against Apple's Kids guidelines. Do not promise that a parental gate alone solves third-party data requirements.
- Retest the implemented parent area and native player navigation gates on the physical phone, including new-window, channel, advertising, and fallback destinations.
- Automatic font, thumbnail, and GitHub requests were removed from browsing; review remaining YouTube requests after the parent enables video access.
- If an acceptable YouTube-based design cannot be established, revisit the video approach with the owner rather than silently changing the category or removing videos.

References: https://developer.apple.com/kids/ and https://support.google.com/youtube/answer/171780

## Official references

- Enrollment: https://developer.apple.com/programs/enroll/
- SDK requirements: https://developer.apple.com/news/upcoming-requirements/?id=04282026a
- Review guidelines (completeness, privacy, Kids category, minimum functionality): https://developer.apple.com/app-store/review/guidelines/
- Submission workflow: https://developer.apple.com/help/app-store-connect/get-started/app-store-connect-workflow/
- TestFlight: https://developer.apple.com/testflight/
