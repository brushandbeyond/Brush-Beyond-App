#!/bin/bash
set -euo pipefail
device="$1"
output="$2"
mkdir -p "$output"
xcrun simctl status_bar "$device" override --time '9:41' --dataNetwork wifi --wifiMode active --wifiBars 3 --cellularMode active --cellularBars 4 --batteryState discharging --batteryLevel 100
names=('01-home' '02-explore' '03-history-lesson' '04-tutorial' '05-profile')
xcrun simctl terminate "$device" net.brushbeyond.app >/dev/null 2>&1 || true
log="/tmp/bb-screenshot-$device-sequence.log"
SIMCTL_CHILD_BB_SCREENSHOT_ROUTE='/sequence' xcrun simctl launch --console-pty "$device" net.brushbeyond.app >"$log" 2>&1 &
launcher=$!
for index in "${!names[@]}"; do
  for attempt in {1..45}; do
    if rg -q "BB_SCREENSHOT_READY_$index" "$log"; then break; fi
    sleep 1
  done
  if ! rg -q "BB_SCREENSHOT_READY_$index" "$log"; then cat "$log"; exit 1; fi
  xcrun simctl io "$device" screenshot "$output/${names[$index]}.png"
done
xcrun simctl terminate "$device" net.brushbeyond.app
wait "$launcher" || true
xcrun simctl status_bar "$device" clear
