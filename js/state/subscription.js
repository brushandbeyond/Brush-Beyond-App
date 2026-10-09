// Simple client-side stand-in for a premium subscription.
//
// There is no real payment processor wired up yet. This lets the app fully
// demonstrate the free/premium experience today; when you're ready to take
// real payments, replace `setPremium()`'s call site in pages/premium.js with
// a real checkout (e.g. Stripe Checkout) and set this flag once the
// checkout/webhook confirms payment.

const KEY = 'bb_premium_demo';

function isPremium() {
  return localStorage.getItem(KEY) === 'true';
}

function setPremium(value) {
  localStorage.setItem(KEY, value ? 'true' : 'false');
  window.dispatchEvent(new CustomEvent('bb:premium-changed', { detail: value }));
}
