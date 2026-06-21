## Context

The uploaded spec is written for a React Router DOM project with `src/pages/` and `src/App.tsx`. Our project uses **TanStack Router** with file-based `src/routes/`, and our paths are already different (`/` not `/feed`, `/messenger` not `/messages`, `/ads` not `/market`, `/user/$id` not `/profile/:userId`, `/categories/$id/$subId` not `/feed/category/:id/:sub`).

I will keep our existing routes and translate the spec's API/file conventions to ours. The actual bug fixes are what matters; the routing constants will point at our real paths.

## Scope: 11 bug fixes (all in spec)

| # | Severity | Bug | Fix |
|---|----------|-----|-----|
| 17 | CRITICAL | «Написать» on a user card opens chat with the wrong user (falls back to first dialog) | Look up dialog by `userId` from THAT card's data; if no dialog exists, dispatch `createDialog` then navigate to it; never fall back to `dialogs[0]` |
| 5  | MEDIUM | «...» on post card does nothing | Wire `PostActionMenu` (Save/Copy link/Share/Hide/Report) with framer-motion popover, Escape + outside click |
| 8  | HIGH | Repost menu actions dead | Wire Repost menu: "В ленту" (toast), "В сообщения" (chat picker), "Скопировать ссылку" (clipboard + toast), "Внешние сети" (Web Share + fallback) |
| 3  | HIGH | «Подробнее» on ad card dead | Add `ctaType` to `Ad` mock (`internalPage` / `externalLink` / `modal`); wire button per type |
| 12 | HIGH | Call + «...» in messenger header dead | Custom action menu: Информация → `/user/$id`, Заблокировать → toast, Поиск/Очистить → "Будет доступно позже", Call → confirm modal |
| 2  | MEDIUM | Banner in feed: click breaks, close button cascades | Whole banner is link OR button; close has `stopPropagation`; `action.type === 'none'` is no-op |
| 9  | MEDIUM | Subcategory click shows intermediate category page | Subcategory in sidebar links DIRECTLY to `/categories/$id/$subId` |
| 1  | MEDIUM | «Помощь» button has no route | Already exists at `/help` — verify sidebar link works |
| —  | — | Dead clicks anywhere (empty `onClick={() => {}}`) | Replace with toast «Будет доступно позже» |
| —  | — | `window.location.*` / `location.reload()` | Replace with `useNavigate` / `Link` |
| —  | — | Active sidebar highlighting for nested routes | `useLocation` + `getActiveSection(pathname)` |

## Architecture changes

**New files**
- `src/lib/routes.ts` — typed `ROUTES` constants and `getActiveSection(pathname)` mapped to OUR paths (`/`, `/messenger`, `/ads`, `/categories/$id/$subId`, `/user/$id`, etc.)
- `src/components/post/PostActionMenu.tsx` — custom framer-motion popover (no shadcn Dialog/DropdownMenu)
- `src/components/messenger/ChatHeaderActions.tsx` — call confirm + «...» menu
- `src/components/ads/AdCTAButton.tsx` — handles 3 cta types
- `src/components/feed/FeedBanner.tsx` — safe-click banner wrapper

**Modified files**
- `src/lib/store.ts` — add `createDialog(toUserId)` action that returns/creates a dialog id; add `repostPost`, `hideOrReportPost` (toast-only) stubs
- `src/lib/mock.ts` — add `ctaType` + `ctaUrl` to `Ad`
- `src/routes/messenger.tsx` — wire ChatHeaderActions; remove dead buttons
- `src/routes/friends.tsx`, `src/routes/user.$id.tsx` — «Написать» calls `store.openOrCreateDialogWith(userId)` then `navigate({ to: '/messenger', search: { chat: id } })` — **no fallback to first dialog**
- `src/components/PostCard.tsx` — mount `PostActionMenu` on «...» and Repost; route share link to `/` + post anchor (we don't have `/post/$id`; I'll add a thin redirect route or use feed scroll)
- `src/components/layout/Sidebar.tsx` + `BottomNav.tsx` — use `ROUTES` constants + `getActiveSection`; nested-route highlight; subcategory direct link
- `src/components/AdBanner.tsx` (the in-feed banner) — split clickable bg vs close button

## What I am NOT doing (out of scope of this pass)

- Renaming our existing routes to `/feed` `/messages` `/market` (would break every existing link, tests, deep-link suite). Routes stay; only constants centralize them.
- Replacing existing shadcn components elsewhere — only the menus listed above are rebuilt with framer-motion as the spec requires.
- Adding a new `/post/$id` route unless needed for the share-link feature (will use a hash anchor on the feed if a full route adds too much surface area; tell me if you want a real post detail page).

## Verification

After implementing, I'll run a Playwright sweep covering the spec's bug-by-bug table:
1. «Написать» on each user → correct chat id, never first
2. Post «...» menu opens, all 5 items work
3. Repost menu — 4 paths, clipboard verified
4. Ad «Подробнее» — 3 cta types
5. Messenger header — call modal + 3 menu items
6. Banner — bg click vs close button
7. Subcategory click — lands directly on `/categories/$id/$subId`
8. `/help` reachable from sidebar
9. Sidebar active state for `/categories/c1`, `/messenger`, `/user/$id`
10. No `window.location.*` in repo (`rg` check)

## Open question

The spec aggressively prescribes `/feed`, `/messages`, `/market` paths. Want me to:
- **(A)** Keep current paths (`/`, `/messenger`, `/ads`) and only centralize them in `ROUTES` — recommended, zero regression risk
- **(B)** Add redirects from `/feed` → `/`, `/messages` → `/messenger`, `/market` → `/ads` so both work
- **(C)** Full rename (risky: breaks all deep links / tests / saved URLs)

I'll proceed with **(A)** unless you say otherwise.