# Pranayama Pro — subscription design

Date: 2026-09-06. Status: approved, implementing on branch `pro-subscription`, ships as 1.3 (22).

(Lives in `design/`, not `docs/`, because `docs/` is the public GitHub Pages site.)

## Decision

Free tier stays permanent; a **Pro** auto-renewable subscription unlocks the power features.
Two plans, both with a **14-day free trial**:

| Product id | Price | Period |
|---|---|---|
| `pro_monthly` | €2.99 | 1 month |
| `pro_yearly` | €19.99 | 1 year (badge "Save 44%", selected by default) |

Purchase plumbing: **RevenueCat** (`@revenuecat/purchases-capacitor`), entitlement id `pro`, offering `default`.
Apple's cut: enrol in the Small Business Program (15%).

## Free vs Pro

| | Free | Pro |
|---|---|---|
| Practice | Full 1:4:2 timer, presets 4–18 s, 10 rounds | Custom inhale duration, other round counts, auto-progression |
| Pointers between rounds | Fixed set of 40 | All 433 + pointer notifications |
| Progress | Last 7 days | Full calendar and history |
| Learn | Everything | — |

Rules: the paywall never interrupts a session; it opens only when a Pro control is tapped.
Nothing recorded is lost when a subscription lapses — history stays on device, only the view is gated.

## Screens

- `/pro` paywall (zen theme): headline, four benefit rows, two plan cards, one button
  "Start 14 days free", Apple's auto-renewal sentence, links Restore · Terms · Privacy.
  In a plain browser the button reads "Available in the iOS app" and is disabled.
- Home: **Custom** and non-10 round counts → `/pro`.
- Settings: Progression section and pointer-notification toggle carry a "Pro" tag → `/pro`.
  New row **Pranayama Pro**: status (Free / Trial until … / Active, renews … / Expired),
  Manage subscription (iOS subscription settings), Restore purchases.
- Progress: beyond 7 days a soft "Unlock full history" card.
- Practice: draws from the free 40 unless Pro. No message ever during a session.

## Architecture

- `src/lib/pro.ts` — pure: `proStatus(customerInfo)`, `isPro`, `freePointers(all)`, `yearlySavings`.
  Fully unit-tested (Vitest).
- `src/lib/purchases.ts` — adapter over the RevenueCat SDK: `configure`, `getOfferings`,
  `purchase(pkg)`, `restore()`, `onCustomerInfoChanged`. Returns an "unavailable" implementation
  when `Capacitor.isNativePlatform()` is false.
- `src/contexts/ProProvider.tsx` — React context `{ status, isPro, plans, purchase, restore, loading, error }`.
  Screens use `usePro()`; nothing else imports the SDK.

Data flow: app start → `configure(apiKey)` → cached `CustomerInfo` → context → screens.
Purchase → StoreKit sheet → SDK → new `CustomerInfo` → context → gates open without reload.

Error handling: cancel → silent. Store/network error → inline sentence on the paywall with retry.
Not configured / web → behaves as Free. Entitlement never blocks rendering; last cached status wins offline.

## Testing & rollout

- Vitest for `pro.ts` (status mapping, trial/expiry edges, deterministic free set, savings maths).
- Manual: StoreKit configuration file in Xcode (simulated store), then one Sandbox tester run on device.
- Ship 1.3 (22) through the same archive/upload path as 1.2. App Review reviews the two subscriptions
  alongside the version (needs a review screenshot per subscription).

## Prerequisites only Naveen can do

1. App Store Connect → Agreements, Tax, and Banking: Paid Apps agreement, bank account, W-8BEN-E.
2. Apple Small Business Program enrolment.
3. Create a RevenueCat account (free). Configuration inside it is done by Claude.

Also required by App Review for subscriptions: Terms of Use (Apple standard EULA link is fine) and
Privacy Policy URL in the App Store metadata and reachable from the paywall.
