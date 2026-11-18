import UIKit
import Capacitor
import WebKit

class SceneDelegate: UIResponder, UIWindowSceneDelegate {
    var window: UIWindow?

    func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
        guard let windowScene = scene as? UIWindowScene else { return }

        window = UIWindow(windowScene: windowScene)
        window?.rootViewController = LessonBridgeViewController()
        window?.makeKeyAndVisible()

        SceneDelegateProxy.shared.scene(scene, willConnectTo: session, options: connectionOptions)
    }

    func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
        SceneDelegateProxy.shared.scene(scene, openURLContexts: URLContexts)
    }

    func scene(_ scene: UIScene, continue userActivity: NSUserActivity) {
        SceneDelegateProxy.shared.scene(scene, continue: userActivity)
    }
}

class LessonBridgeViewController: CAPBridgeViewController {
    override func capacitorDidLoad() {
        bridge?.registerPluginInstance(LessonVideoPlugin())
        #if DEBUG && targetEnvironment(simulator)
        let allowedRoutes = ["/sequence"]
        if let route = ProcessInfo.processInfo.environment["BB_SCREENSHOT_ROUTE"], allowedRoutes.contains(route) {
            let profile: [String: Any] = ["nickname": "Young Artist", "avatar": "🦊", "badges": [], "seenMilestones": [], "watchedVideos": [:], "createdAt": "2026-11-07T00:00:00Z"]
            if let data = try? JSONSerialization.data(withJSONObject: profile), let json = String(data: data, encoding: .utf8) {
                let source = "window.addEventListener('load', async () => { const profile = \(json); const routes = ['/', '/explore', '/lesson/vermeer-master-of-light', '/lesson/frida-kahlo-draw', '/profile']; for (let index=0;index<routes.length;index++) { if(index===3) profile.lastLesson={id:'frida-kahlo-draw',stepIndex:1}; else delete profile.lastLesson; localStorage.setItem('bb_profile',JSON.stringify(profile)); window.dispatchEvent(new CustomEvent('bb:profile-changed')); window.location.hash='#'+routes[index]; await new Promise(resolve=>setTimeout(resolve,800)); console.log('BB_SCREENSHOT_READY_'+index); await new Promise(resolve=>setTimeout(resolve,5000)); } }, {once:true});"
                webView?.configuration.userContentController.addUserScript(WKUserScript(source: source, injectionTime: .atDocumentEnd, forMainFrameOnly: true))
            }
        }
        #endif
    }

}

@objc(LessonVideoPlugin)
class LessonVideoPlugin: CAPPlugin, CAPBridgedPlugin {
    let identifier = "LessonVideoPlugin"
    let jsName = "LessonVideo"
    let pluginMethods: [CAPPluginMethod] = [CAPPluginMethod(name: "open", returnType: CAPPluginReturnPromise), CAPPluginMethod(name: "openExternal", returnType: CAPPluginReturnPromise)]

    @objc func openExternal(_ call: CAPPluginCall) {
        guard let text = call.getString("url"), let url = URL(string: text), ["https", "mailto"].contains(url.scheme ?? "") else {
            call.reject("Unsupported destination")
            return
        }
        DispatchQueue.main.async {
            guard let parent = self.bridge?.viewController else { call.reject("App is unavailable"); return }
            openParentDestination(url, from: parent)
            call.resolve()
        }
    }

    @objc func open(_ call: CAPPluginCall) {
        guard let videoId = call.getString("videoId"),
              videoId.range(of: "^[A-Za-z0-9_-]{11}$", options: .regularExpression) != nil else {
            call.reject("Invalid video identifier")
            return
        }
        DispatchQueue.main.async {
            guard let parent = self.bridge?.viewController, parent.presentedViewController == nil else {
                call.reject("Another video is already open")
                return
            }
            do {
                let controller = try LessonVideoController(videoId: videoId, title: call.getString("title") ?? "Lesson video")
                controller.onFinish = { completed in call.resolve(["completed": completed]) }
                parent.present(controller, animated: true)
            } catch {
                call.reject("Could not load video player", nil, error)
            }
        }
    }
}

class LessonVideoController: UIViewController, WKScriptMessageHandler, WKUIDelegate, WKNavigationDelegate, UIAdaptivePresentationControllerDelegate {
    var onFinish: ((Bool) -> Void)?
    private let html: String
    private let origin: URL
    private var finished = false
    private var completed = false
    private var player: WKWebView?
    private let videoId: String

    init(videoId: String, title: String) throws {
        self.videoId = videoId
        origin = URL(string: "https://" + (Bundle.main.bundleIdentifier ?? "net.brushbeyond.app").lowercased())!
        let base = Bundle.main.resourceURL!.appendingPathComponent("public")
        var content = try String(contentsOf: base.appendingPathComponent("assets/player.html"), encoding: .utf8)
        let config = try JSONSerialization.data(withJSONObject: ["videoId": videoId, "origin": origin.absoluteString, "native": true])
        content = content.replacingOccurrences(of: "<script src=\"../js/video/watchTracker.js\"></script>", with: "<script>" + (try String(contentsOf: base.appendingPathComponent("js/video/watchTracker.js"), encoding: .utf8)) + "</script>")
        content = content.replacingOccurrences(of: "<script src=\"../js/video/player.js\"></script>", with: "<script>window.lessonPlayerConfig=" + String(data: config, encoding: .utf8)! + ";" + (try String(contentsOf: base.appendingPathComponent("js/video/player.js"), encoding: .utf8)) + "</script>")
        html = content
        super.init(nibName: nil, bundle: nil)
        self.title = title
    }

    required init?(coder: NSCoder) { fatalError("init(coder:) has not been implemented") }

    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = .systemBackground
        let done = UIButton(type: .system)
        done.setTitle("Done", for: .normal)
        done.addTarget(self, action: #selector(closePlayer), for: .touchUpInside)
        done.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(done)
        let configuration = WKWebViewConfiguration()
        configuration.allowsInlineMediaPlayback = true
        configuration.mediaTypesRequiringUserActionForPlayback = []
        configuration.userContentController.add(self, name: "lessonPlayer")
        let webView = WKWebView(frame: .zero, configuration: configuration)
        webView.uiDelegate = self
        webView.navigationDelegate = self
        webView.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(webView)
        player = webView
        NSLayoutConstraint.activate([
            done.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 8),
            done.trailingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.trailingAnchor, constant: -20),
            done.heightAnchor.constraint(equalToConstant: 44),
            webView.topAnchor.constraint(equalTo: done.bottomAnchor, constant: 8),
            webView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            webView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            webView.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor),
        ])
        webView.loadHTMLString(html, baseURL: origin)
        presentationController?.delegate = self
        NotificationCenter.default.addObserver(self, selector: #selector(playerBackgrounded), name: UIApplication.didEnterBackgroundNotification, object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(playerForegrounded), name: UIApplication.willEnterForegroundNotification, object: nil)
    }

    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        guard message.frameInfo.isMainFrame, let body = message.body as? [String: Any] else { return }
        if let state = body["type"] as? String { CAPLog.print("Lesson video player:", state) }
        if body["type"] as? String == "external", let url = URL(string: "https://www.youtube.com/watch?v=" + videoId) {
            openParentDestination(url, from: self)
        }
        if body["type"] as? String == "completed" {
            completed = true
            closePlayer()
        }
    }

    @objc private func closePlayer() {
        guard !finished else { return }
        guard !completed, let player = player else {
            finish()
            dismiss(animated: true)
            return
        }
        player.evaluateJavaScript("window.checkLessonCompletion ? window.checkLessonCompletion() : false") { [weak self] value, _ in
            guard let self = self else { return }
            self.completed = self.completed || (value as? Bool == true)
            self.finish()
            self.dismiss(animated: true)
        }
    }

    @objc private func playerBackgrounded() {
        player?.evaluateJavaScript("window.setLessonPlayerActive && window.setLessonPlayerActive(false)", completionHandler: nil)
    }

    @objc private func playerForegrounded() {
        player?.evaluateJavaScript("window.setLessonPlayerActive && window.setLessonPlayerActive(true)", completionHandler: nil)
    }

    func presentationControllerDidDismiss(_ presentationController: UIPresentationController) { finish() }

    private func finish() {
        guard !finished else { return }
        finished = true
        NotificationCenter.default.removeObserver(self)
        player?.configuration.userContentController.removeScriptMessageHandler(forName: "lessonPlayer")
        player?.stopLoading()
        player?.loadHTMLString("", baseURL: nil)
        onFinish?(completed)
        onFinish = nil
    }

    func webView(_ webView: WKWebView, createWebViewWith configuration: WKWebViewConfiguration, for navigationAction: WKNavigationAction, windowFeatures: WKWindowFeatures) -> WKWebView? {
        if let url = navigationAction.request.url, ["https", "http"].contains(url.scheme ?? "") {
            openParentDestination(url, from: self)
        }
        return nil
    }

    func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction, decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
        guard let url = navigationAction.request.url else { decisionHandler(.cancel); return }
        let leavesPlayer = navigationAction.targetFrame?.isMainFrame == true && url.host != origin.host && url.scheme != "about";
        if navigationAction.navigationType == .linkActivated || leavesPlayer {
            decisionHandler(.cancel)
            if ["https", "mailto"].contains(url.scheme ?? "") { openParentDestination(url, from: self) }
            return
        }
        decisionHandler(.allow)
    }
}

private func openParentDestination(_ url: URL, from controller: UIViewController) {
    guard ["https", "mailto"].contains(url.scheme ?? "") else { return }
    guard controller.presentedViewController == nil else { return }
    let first = Int.random(in: 12...29)
    let second = Int.random(in: 12...29)
    let alert = UIAlertController(title: "For parents & carers", message: "Open an outside destination? It uses its own content and privacy policies.\n\nAdult check: what is \(first) × \(second)?", preferredStyle: .alert)
    alert.addTextField { field in field.keyboardType = .numberPad; field.placeholder = "Answer" }
    alert.addAction(UIAlertAction(title: "Cancel", style: .cancel))
    alert.addAction(UIAlertAction(title: "Continue", style: .default) { _ in
        if alert.textFields?.first?.text?.trimmingCharacters(in: .whitespaces) == String(first * second) {
            UIApplication.shared.open(url)
        } else {
            DispatchQueue.main.async { openParentDestination(url, from: controller) }
        }
    })
    controller.present(alert, animated: true)
}
