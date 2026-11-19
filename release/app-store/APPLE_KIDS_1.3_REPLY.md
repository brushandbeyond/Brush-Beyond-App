# Reply to App Review — Kids Category Guideline 1.3 information request

Received November 18, 2026 for 1.0 (3), submission e061362b-4654-427f-822a-778ed04af03f (UNRESOLVED_ISSUES). Paste in App Store Connect → App Review → Reply.

---

Thank you for reviewing Brush & Beyond. Answers to the Guideline 1.3 questions:

1. Does the app include third-party analytics?
No. The app contains no analytics SDK and does not collect or transmit any analytics, usage or diagnostic data. Its only third-party code is the open-source Capacitor runtime, which provides the native app shell. A child's nickname, chosen avatar, lesson progress and badges are stored only on the device and never leave it. There is no account, login, server or backend.

2. Does the app include third-party advertising?
No. The app contains no advertising SDK or ad network integration, and we do not place, sell or earn revenue from any ads. Our YouTube channel is not monetized (not in the YouTube Partner Program). Lesson videos are our own channel's videos, hosted on YouTube, and every lesson video is set as "made for kids". They play through YouTube's embedded player in privacy-enhanced mode (youtube-nocookie.com) inside a WebView, as Google recommends for apps, and only after a parent has turned on video access behind a parental gate. Video access is off by default.
We do not control YouTube's player. Under YouTube's policies, any ad YouTube itself shows on content set as made for kids must be contextual only; personalized ads, remarketing and third-party trackers are prohibited:
- How ads work on content set as "made for kids": https://support.google.com/youtube/answer/9713557
- Google Ads policy, ads and made for kids content: https://support.google.com/adspolicy/answer/9683742
- Ad-serving protections for children: https://support.google.com/adspolicy/answer/14170968
- Privacy-enhanced embedded player (ads served there are non-personalized): https://support.google.com/youtube/answer/171780

3. Will the data be shared with any third parties?
The app itself shares no data with anyone. When a parent has enabled video access and a lesson video is played, the device connects directly to YouTube (Google) to stream it. Google receives the standard technical information needed to deliver the video, such as IP address and device and browser information. Google processes and stores it on its own servers under its privacy policy (https://policies.google.com/privacy) and its made-for-kids rules above. No nickname, avatar, progress or other app data is sent to YouTube or to anyone else.

4. Is the app collecting any user or device data for other purposes?
No. The app does not collect user or device data for any purpose. It does not use the advertising identifier (IDFA), App Tracking Transparency, location, camera, microphone, contacts or photos.

Additional safeguards: every link that leaves the app (our website, support email, and YouTube links, channel links and new windows from the player) requires an adult to pass a parental gate first. Privacy policy: https://brush-beyond-app-help.beneficialhome1.chatgpt.site/privacy.html
