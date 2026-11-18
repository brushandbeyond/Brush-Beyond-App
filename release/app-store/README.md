# App Store submission assets

Prepared November 7, 2026. These files are preparation materials, not an App Store submission.

- `LISTING.md`: English listing copy, keywords, public URLs, review notes, and remaining owner fields.
- `screenshots/iphone-medium/`: original iPhone 18 Pro simulator PNGs.
- `screenshots/ipad-13/`: original iPad Pro 13-inch simulator PNGs.
- `upload-screenshots/`: upload these opaque JPEG copies, retaining original dimensions. Simulator PNG originals contain an alpha channel and are preserved only as source captures.
- `icon/app-icon-1024.png`: the existing 1024×1024 opaque app icon, copied unchanged.

The two included screenshot sizes are 1206×2622 (iPhone Dynamic Island medium display) and 2064×2752 (13-inch iPad). Each has five screenshots. The optional large-iPhone simulator did not finish rendering reliably; its blank captures are not included. Confirm App Store Connect's requested slots when uploading.

Screenshot order: home, full catalog, history lesson, written tutorial, local profile. Images show the actual rendered app with an isolated sample profile named Young Artist, no earned badges, and no fabricated video playback or completed achievements. iOS status bars are normalized to 9:41 using simctl.

Screenshots are captured from Debug simulator builds. The screenshot-only route/profile setup is compiled only for Debug on Simulator and is inactive unless `BB_SCREENSHOT_ROUTE` is explicitly set. It is excluded from physical-phone and Release builds. Existing simulator profiles are not used.

Reproduction: build the Debug simulator app, install it on an isolated screenshot simulator, and run `bash scripts/capture-store-screenshots.sh <device-uuid> <output-directory>`. Then run `bash scripts/package-store-assets.sh` to create opaque JPEG upload copies and `release/Brush-Beyond-App-Store-Pack.zip`.

Apple specifications: https://developer.apple.com/help/app-store-connect/reference/app-information/screenshot-specifications/

Review every PNG before uploading and match each device set to the App Store Connect screenshot slot accepting its actual dimensions. Do not resize one device screenshot and present it as a different device. App Store Connect's current slot requirements are authoritative.

The screenshot pack does not certify physical-phone behavior, Kids-category compliance, or the final App Store privacy declaration. Finish those checks and review the listing before submitting.
