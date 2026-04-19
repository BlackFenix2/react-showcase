# React Showcase Copilot Instructions

## Verified Stack

- Next.js 15 App Router with React 19 and TypeScript.
- MUI 7 is the primary UI library.
- Toolpad Core provides the app shell and dashboard primitives.
- Global app state uses easy-peasy for the root store.
- MobX is also used for specific feature stores.

## App Structure

- The root layout is [src/app/layout.tsx](src/app/layout.tsx). It wraps the app with `AppRouterCacheProvider`, `StoreProvider`, `React.Suspense`, and `NextAppProvider`.
- The main route group is [src/app/(dashboard)](<src/app/(dashboard)>). That group uses Toolpad `DashboardLayout` in [src/app/(dashboard)/layout.tsx](<src/app/(dashboard)/layout.tsx>).
- Verified pages under the dashboard group:
  - `/` via [src/app/(dashboard)/page.tsx](<src/app/(dashboard)/page.tsx>)
  - `/todo` via [src/app/(dashboard)/todo/page.tsx](<src/app/(dashboard)/todo/page.tsx>)
  - `/shows` via [src/app/(dashboard)/shows/page.tsx](<src/app/(dashboard)/shows/page.tsx>)
  - `/shows/[id]` via [src/app/(dashboard)/shows/[id]/page.tsx](<src/app/(dashboard)/shows/[id]/page.tsx>)
  - `/cats` via [src/app/(dashboard)/cats/page.tsx](<src/app/(dashboard)/cats/page.tsx>)
  - `/domain` via [src/app/(dashboard)/domain/page.tsx](<src/app/(dashboard)/domain/page.tsx>)
  - `/license` via [src/app/(dashboard)/license/page.tsx](<src/app/(dashboard)/license/page.tsx>)
  - `/games/flappy-bird` via [src/app/(dashboard)/games/flappy-bird/page.tsx](<src/app/(dashboard)/games/flappy-bird/page.tsx>)
  - `/games/number-guesser` via [src/app/(dashboard)/games/number-guesser/page.tsx](<src/app/(dashboard)/games/number-guesser/page.tsx>)
  - `/games/tic-tac-toe` via [src/app/(dashboard)/games/tic-tac-toe/page.tsx](<src/app/(dashboard)/games/tic-tac-toe/page.tsx>)

## UI Conventions

- Keep using MUI components and icons for new UI in existing pages.
- Keep using the shared theme from [src/app/theme.ts](src/app/theme.ts). It enables MUI CSS variables and Toolpad color-scheme integration.
- Respect Toolpad navigation in [src/app/layout.tsx](src/app/layout.tsx) when adding or renaming dashboard routes.
- Existing page shells often use Toolpad `PageContainer`, but not every page does. Match the surrounding feature instead of forcing a new pattern.

## State Management

- The easy-peasy root store is defined in [src/state/index.ts](src/state/index.ts) with models in [src/state/models](src/state/models).
- The verified easy-peasy models are `mobile` and `todo` in [src/state/models/mobileModel.ts](src/state/models/mobileModel.ts) and [src/state/models/todoModel.ts](src/state/models/todoModel.ts).
- Typed easy-peasy hooks live in [src/state/hooks/index.ts](src/state/hooks/index.ts).
- MobX is used for the shows feature in [src/state/stores/showStore.ts](src/state/stores/showStore.ts) and the Flappy Bird game in [src/state/stores/games/birdStore.ts](src/state/stores/games/birdStore.ts).
- Several pages also use local React state directly, for example the domain, cats, number-guesser, and todo pages. Do not introduce a new state library.
- Prefer extending the state mechanism already used by the feature you are editing.

## Folder Responsibilities

- [src/app](src/app): App Router layouts, pages, route groups, and global theme setup.
- [src/components/Views](src/components/Views): feature-specific view components grouped by feature name.
- [src/components/modules](src/components/modules): reusable feature modules such as the countdown.
- [src/components/shared](src/components/shared): shared utility UI such as loading and not-found components.
- [src/components/elements](src/components/elements): element-level reusable building blocks.
- [src/components/inputs](src/components/inputs): input wrappers such as `TextInput`.
- [src/services/API](src/services/API): API helpers and feature API modules.
- [src/state](src/state): easy-peasy models, typed hooks, MobX stores, game objects, and input utilities.
- [public/games](public/games): static game assets.

## Imports And Paths

- The repo defines the `@/*` alias to `./src/*` in [tsconfig.json](tsconfig.json).
- Prefer `@/` imports for cross-folder imports under `src`.
- Local barrel files exist in some component folders. Reuse them where the feature already does.

## Commands

- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`

## Known Caveats

- [next.config.ts](next.config.ts) sets `typescript.ignoreBuildErrors = true`. Do not assume the build enforces type safety.
- [src/components/modules/SEO.tsx](src/components/modules/SEO.tsx) appears to be legacy Gatsby-era code and is not part of the verified Next.js app flow.
- [src/services/API/domainAPI.ts](src/services/API/domainAPI.ts) is currently a server-side stub that returns a placeholder-shaped response.
- [src/services/API/moviesAPI.ts](src/services/API/moviesAPI.ts) contains a hard-coded TMDB token. Do not document environment-variable behavior that does not exist yet.

## Editing Guidance

- Do not rewrite the app to a different routing or state model.
- Keep changes aligned with the existing feature boundary. Example: show-search behavior belongs with the MobX shows store, while todo behavior belongs with easy-peasy.
- When adding routes, update both the App Router tree and the Toolpad navigation if the route should appear in the shell.
- Prefer concrete changes that fit the current architecture over framework-generic cleanup.
