function renderPrivacy(root) {
  root.innerHTML = `
    <section class="lesson-detail">
      <h1>Privacy &amp; Help</h1>
      <p>Last updated: November 7, 2026</p>
      <h2>Who operates this app</h2>
      <p>Brush And Beyond Art For Tomorrow operates Brush &amp; Beyond.
        Parents and guardians can contact us for support or privacy questions at
        <strong>brushbeyond07@gmail.com</strong>. Please do not include a child's full
        name or other sensitive information in your message.</p>
      <h2>Your local artist profile</h2>
      <p>Brush &amp; Beyond stores your nickname, selected avatar, earned badges,
        milestone history, completed-video flags, and last lesson on this device. Choose a made-up nickname,
        not your full name. No email address or password is needed. The app does not
        send this profile to a Brush &amp; Beyond server or sync it between devices.</p>
      <h2>Delete your progress</h2>
      <p>Open My Profile and choose “Delete profile and progress,” then confirm.
        This removes your local profile. Deleted progress cannot be recovered.
        Browser or device storage controls can also clear local app data.</p>
      <h2>Internet connections and third parties</h2>
      <p>Videos use YouTube's privacy-enhanced embedded player after a parent enables
        YouTube access in Parents &amp; carers and a video is opened. Google/YouTube
        receives network and technical information, including your IP address and
        device/browser information, and may use cookies or similar storage. Its player
        may show advertising or links. Privacy-enhanced mode does not prevent all data processing.</p>
      <p>Fonts, cover images, lesson text, and a statistics snapshot are bundled in the
        app. Browsing does not automatically fetch Google Fonts, YouTube thumbnails,
        or GitHub statistics. Parent video settings are stored locally.</p>
      <p>Parents can turn off YouTube access in Parents &amp; carers. This prevents new
        video requests, but does not erase Google's records or cookies. Parent gates
        restrict outside navigation; they do not themselves verify legal parental consent.</p>
      <h2>Free lessons</h2>
      <p>This version has no subscriptions, in-app purchases, or payment collection.
        The app does not include a separate advertising or analytics SDK.</p>
      <h2>Help with playback and storage</h2>
      <p>Videos require an internet connection. If a video does not load, check your
        connection and try again. Written steps remain available in the installed
        app. Progress is stored on this device only, so it will not appear on another device.</p>
      <p>For the full public privacy policy, support page, provider policies, or outside links,
        open <a href="index.html#/parents">Parents &amp; carers</a>. Support email goes
        to the operator through Gmail; do not include sensitive information about children.</p>
      <a href="index.html#/profile">My Profile</a> · <a href="index.html#/">Back to lessons</a>
    </section>
  `;
}

const standalonePrivacy = document.getElementById('privacy-policy');
if (standalonePrivacy) renderPrivacy(standalonePrivacy);
