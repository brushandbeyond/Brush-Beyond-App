# App Privacy working draft

Status: partial draft saved in App Store Connect; not published or complete.
Updated November 18, 2026.

The owner explicitly approved answering Yes to collection to include the embedded YouTube provider and subsequently requested completing the supported portions using existing Google documentation. Saved Yes and Advertising Data in App Store Connect. Apple's page now shows one data type and “Set Up Advertising Data”; Publish remains disabled. This is a partial category draft, not a complete list or finished privacy label. All other unselected categories remain subject to investigation, not certified absent.

## Verified app implementation

- Nickname, avatar, badges, tutorial progress, watched-video completion and parent choices remain in device-local storage. They are not uploaded by the app.
- No app account login, payment collection, microphone, camera, contacts or device location API is implemented.
- Parent-enabled video playback loads YouTube in a WebView using the privacy-enhanced embed host. YouTube still receives network requests; the hostname is not proof that all data collection or tracking is absent.
- Support email opens an outside email destination; receiving optional support correspondence is not equivalent to uploading all users' contact information.

## Provider mapping requiring verification

| Apple field to investigate | Provider information and limitation |
| --- | --- |
| Device ID / other identifiers | Google's general policy describes unique browser, application and device identifiers. Confirm which identifiers this iOS privacy-enhanced player actually retains and how they map to Apple's definition. The app does not directly request IDFA. |
| Product Interaction | YouTube documents additional playback data collection; Google describes video views and service interactions. Verify retained playback data and its purposes for these child-directed videos. |
| Advertising Data | The player may display advertising. Verify retained ad impression/interaction data; Made for Kids does not itself mean ad-free. |
| Coarse Location | Google describes IP-based location for some services/settings. Sending an IP address to deliver a request alone does not establish that this app collects retained coarse location under Apple's definition. |
| Crash / Performance / Other Diagnostic Data | Google's general policy describes crashes and service interactions. Verify the actual embedded-player diagnostic data and retention; do not automatically select every diagnostics category. |

For each confirmed data type, Apple also requires purpose, linkage to user/device identity, and tracking answers. Do not label all data anonymous, not linked or not used for tracking solely because the app has no login, uses privacy-enhanced embeds, or videos are marked Made for Kids. Likewise, do not declare all categories in Google's general policy as collected by this app without checking their applicability.

Possible purposes to verify are App Functionality (video delivery/security), Analytics and Third-Party Advertising. Exact purposes must match actual provider behavior rather than be selected as a blanket precaution.

## Evidence still needed

Provider-specific clarification of off-device retention, linkage to a device before aggregation, and advertising-measurement joins. These are technical questions for the provider, not facts the owner should be asked to guess. See `YOUTUBE_PRIVACY_VERIFICATION.md` for the researched findings and exact outstanding questions. The owner's prior confirmation that a review was completed does not supply these specific answers.

## November 17 research outcome

- Google's published embed guidance confirms privacy-enhanced playback uses non-personalized advertising, but separately requires child-directed app designation even for this embed mode. That designation has not been verified as successful for this app.
- Google's YouTube API staff replies in public issue 571927087 describe aggregate ad measurement and local ephemeral identifiers. The latest question in the retrieved thread explicitly asks about off-device retention, device linkage and measurement joins before aggregation; no answer to that question was present. Do not treat earlier replies as a complete App Privacy data table.
- Advertising Data is supported as a proposed collection category by the provider's description of retained aggregate ad reporting. Third-Party Advertising is a supported proposed purpose. This does not establish the complete set of categories, identity-linkage answers, or tracking answers.
- Do not automatically add Product Interaction solely for local badge tracking: the app's progress stays local, and the provider says privacy-enhanced mode disables API/interaction logging. Playback data described by general player policies still requires configuration-specific clarification.
- Do not automatically add Device ID solely because the player stores identifiers locally. Apple's collection definition requires qualifying off-device processing. Likewise, IP-based ad selection alone does not establish retained Coarse Location.
- Apple's Kids rule 1.3 also requires an appropriate basis for the limited contextual-ad exception, including publicly documented human review of ad creatives for age appropriateness. Non-personalized advertising alone does not establish this exception.
- Saved the Advertising Data category in Apple's unpublished draft. Inspected its purpose form; Third-Party Advertising is supported by the embed/advertising documentation, but the wizard requires identity-linkage and tracking answers to finish setup. Cancelled that wizard without guessing or saving unsupported answers. Purpose/linkage/tracking setup remains incomplete; Publish is disabled. No production review submission or Google support message was made.

## Existing-documentation mapping

| Source | Supported finding | Limit |
| --- | --- | --- |
| YouTube embed help | Privacy-enhanced ads are non-personalized; embedded views do not personalize YouTube or ads outside the app. | Not a zero-collection statement or a complete identity-linkage/measurement table. |
| Made for Kids advertising help | Contextual ads are allowed; personalized targeting and third-party trackers on these ads are prohibited. | Does not establish a complete off-device retention table or the specific human-review basis for Apple's Kids exception. |
| Google partner-site privacy explanation | YouTube embeds send IP address and page URL; provider describes service delivery, fraud prevention and advertising measurement uses. | Broad cross-service descriptions are not proof that all identifiers/purposes apply to this privacy-enhanced player. |

The app's own local profile/progress does not qualify as uploaded data merely because stored on-device. Optional outside email support is evaluated separately from routine playback collection. Do not select Photos or Videos simply because the app displays the operator's lessons: that Apple field concerns the user's media.

## Primary references

- https://developer.apple.com/app-store/app-privacy-details/
- https://developers.google.com/youtube/terms/developer-policies (embedded-player collection and Made for Kids requirements)
- https://policies.google.com/privacy?hl=en (general Google policy; not a player-specific certification)
- https://support.google.com/youtube/answer/171780?hl=en
- https://support.google.com/youtube/answer/9713557?hl=en
- https://policies.google.com/technologies/partner-sites

## November 18 submission preparation

The owner authorized a public, credential-free registration report. Posting was confirmed at https://issuetracker.google.com/issues/587130863, status New. It asks how an app can be tagged before first public release, whether approval with manual release is eligible, and which read-only verification scopes are supported. It does not resolve registration, provide an exception, or certify the remaining privacy answers.

Rechecked App Store Connect: Advertising Data remains saved, “Set Up Advertising Data” is still present, and Publish is disabled. No additional category, linkage or tracking declaration was saved during this follow-up.

### Exact Apple answer worksheet

| Apple question / selection | Prepared answer | Basis / action |
| --- | --- | --- |
| Do you or third-party partners collect data? | Yes | Owner-approved; provider advertising reporting must be included. Saved in partial draft. |
| Usage Data → Advertising Data | Select | Provider describes advertising reporting; saved category. Not an assertion that this is the only collected type. |
| Advertising Data → Third-Party Advertising | Select when finishing setup | Supported by third-party embedded ad delivery/reporting. Not yet saved as a completed category setup. |
| Advertising Data → Developer's Advertising or Marketing | Not supported by the inspected implementation | No own marketing-data pipeline found. Do not conflate ads supporting YouTube with the operator's own marketing. |
| Advertising Data → Product Personalization | Not supported for the documented privacy-enhanced playback | Provider says embedded views do not personalize the YouTube experience; do not apply this statement to ordinary external YouTube destinations. |
| Advertising Data → Analytics / App Functionality | Requires configuration-specific mapping | General service/fraud/measurement language is not a complete per-data-type purpose table. |
| Advertising Data → Linked to user | Leave unresolved | Apple's linkage includes device identity, not just a named Google account. |
| Advertising Data → Used for tracking | Leave unresolved | Need to distinguish aggregate reporting from joins involving third-party data before aggregation. |
| Name / User ID for the app's local nickname | Do not select solely for this feature | The nickname/profile is stored locally and not uploaded by our implementation. Provider identifiers remain a separate investigation. |
| Photos or Videos for the lesson catalog | Do not select solely for this feature | Bundled/operator lesson content is not collection of the viewer's own media. |
| Precise Location / Contacts / Health / Financial data | No own collection found | The app has no corresponding collection feature/API in the inspected implementation. Do not use this to certify all provider behavior. |

### Release notes to keep accurate

- Google child-directed registration is unconfirmed, not completed. The latest error was reported by the owner; it is not proof that publication is Google's sole eligibility criterion.
- Apple submission and public release are separate; manual release does not establish Google registration eligibility. Registration is a separate Google requirement, not a documented Apple form field or an independently established prerequisite imposed by Apple.
- A Kids-category contextual-ad suitability assessment remains necessary independently of the privacy-label questionnaire. Do not imply that published non-personalized-ad documentation alone guarantees Apple's acceptance.
- No public privacy-page change, runtime/app-build change, privacy-label publication or Apple review submission was made in this follow-up.
