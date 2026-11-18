# YouTube privacy verification

Reviewed November 17, 2026. Internal evidence memo, not a published privacy label or legal certification.

## Scope checked in this repository

- `js/video/player.js` uses the official IFrame API with `host: https://www.youtube-nocookie.com`, the public video ID, and wrapper origin. The API script itself comes from `www.youtube.com/iframe_api`.
- `ios/App/App/SceneDelegate.swift` creates an HTML wrapper in a WKWebView with the default website data store. It does not explicitly use an ephemeral store.
- The native player gates link activations, main-frame departures and new-window requests. This code inspection is not proof that every script-driven subframe navigation stays within privacy-enhanced playback; that requires runtime testing.
- Video access requires the locally stored parent opt-in. Nickname, avatar, watched coverage and badge progress stay local. No own telemetry backend, Google sign-in, IDFA access or separate ad/analytics SDK was found in the inspected player/profile implementation.
- The player error fallback requests a YouTube thumbnail. Privacy-enhanced mode should not be described as meaning that all provider traffic uses the no-cookie hostname.

## Provider-specific evidence

1. YouTube's embed help says privacy-enhanced embedded views do not personalize the subsequent YouTube experience and ads served in that mode are non-personalized. It also requires child-directed app designation separately, even for privacy-enhanced embeds. Our previous attempts did not reach confirmation, so registration remains unverified.
   https://support.google.com/youtube/answer/171780?hl=en
2. YouTube's Made for Kids advertising help allows contextual ads, including selection using general location. It prohibits personalized targeting and third-party trackers on those ads. It does not specify whether this app's location-related data is retained beyond real-time processing.
   https://support.google.com/youtube/answer/9713557?hl=en
3. Public YouTube API issue 571927087 contains replies attributed to a google.com account, comments 2, 4, 7 and 9. They describe disabled interaction/API logging, aggregate advertising reports and ephemeral identifiers in local storage. They do not give a complete server-side retention and identity-linkage table. Comment 10, dated November 4, asks precisely about these remaining distinctions; no response to it was present in the retrieved thread. This is technical support evidence, not a formal privacy certification.
   https://issuetracker.google.com/issues/571927087
4. YouTube's general developer policy describes basic player processing and additional playback processing. It does not override the need for configuration-specific evidence about retained data.
   https://developers.google.com/youtube/terms/developer-policies

## Apple form: established and unresolved

| Field | Finding / proposed treatment | Completion status |
| --- | --- | --- |
| Does the app collect data? | Yes, including the embedded provider. Previously approved by owner. | Supported; not a complete label by itself. |
| Local nickname, avatar, badges, progress | Do not disclose as uploaded profile data; stored only on device by our implementation. | Verified in app code. |
| Advertising Data | Proposed category for provider ad-impression/click reporting; Third-Party Advertising is a supported proposed purpose. | Complete category set and linkage still unresolved. |
| Device ID | Local identifiers alone are insufficient to establish collection. Need off-device retention details. | Unresolved. |
| Product Interaction | Own badge tracking is local; provider says privacy-enhanced interaction logging is disabled. Do not select merely because videos play. | Other retained playback records unresolved. |
| Coarse Location | Contextual ads may use general location; need to distinguish real-time use from qualifying retention. | Unresolved. |
| Diagnostics | No own diagnostics upload found; general Google privacy language is not sufficient to select every diagnostics type. | Provider-specific retention unresolved. |
| Data linked to user | No Google-account linkage does not establish absence of device/session linkage. | Do not certify No without evidence. |
| Tracking | Non-personalized ads do not, by themselves, settle device-level joins for advertising measurement before aggregation. | Do not certify Yes or No by assumption. |

Apple includes third-party WebView functionality and defines collection by off-device access extending beyond real-time request servicing. Linkage can be to a device without a named account; tracking also covers advertising measurement using third-party data.
https://developer.apple.com/app-store/app-privacy-details/
https://developer.apple.com/app-store/user-privacy-and-data-use/

## Additional Kids-category submission requirements

Apple guideline 1.3 restricts third-party device information, analytics and advertising. Its limited contextual-ad exception requires publicly documented practices including human review of ad creatives for age appropriateness. The sources above do not establish that this exact integration meets that exception. A completed privacy label would not independently resolve this suitability requirement.
https://developer.apple.com/app-store/review/guidelines/#kids-category

Keep the owner's Kids 9–11 choice and YouTube preference unchanged. Do not silently change categories, block provider advertising, or characterize a parent arithmetic gate as verified legal parental consent.

## Exact clarification needed from Google

For a user-initiated youtube-nocookie.com HTML iframe using the IFrame API in an iOS WKWebView with its default data store, no Google sign-in/IDFA/app profile identifiers, Made for Kids videos, and gated external navigation:

1. Which identifiers, ad/playback events, IP-derived location and diagnostics leave the device and are retained beyond real-time request processing? For which purposes and retention periods?
2. Are retained records linked to an IP, session, browser or device before aggregation, even without linkage to a Google account? Is de-identification before transmission or only afterward?
3. Does aggregate ad reporting exclude user/device-level joins with other companies' data for advertising measurement and conversion attribution before aggregation, not only behavioral profiling?
4. Which published policy documents human review of the ad creatives shown by this integration for children's age appropriateness?
5. How can the owner complete or confirm app-wide child-directed designation when the official iOS tool returns from token verification to its home page without confirmation?

No message containing these questions has been sent. The owner previously declined a Google support submission. Do not send one without renewed authorization. Do not provide Google the Apple private key or broaden existing token permissions as a workaround.

## Release decision

Keep the public policy's existing YouTube processing disclosure; it does not promise zero collection or a completed designation. Keep Apple's detailed privacy label unpublished until the unanswered classifications can be supported and owner-approved. Do not submit an incomplete or knowingly guessed label to clear Apple's preflight checks.
