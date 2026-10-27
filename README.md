# willychang21.github.io

Willy Chang's portfolio, published at <https://willychang21.github.io>.

## Concept

Willy's work keeps coming back to routing: data-privacy requests across jurisdictions, an orchestrator that picks critical nodes, maps with routing, AR navigation. The site is set as a technical atlas on that idea.

- **The route plate.** The page opens on a map of the real route, Taipei → Seattle → Champaign → San Jose, drawn along great circles. The opening statement sits in the open Pacific under the arc.
- **The stations are the way in.** Each station on the map is a tab. Choosing one lists the roles, degrees and projects recorded there, and the route beyond it turns grey, so the map reads as the journey up to that point. San Jose, now, is chosen first. The lists come from each record's own `station` field (`src/content/route.ts`), so a new role or project joins its stop by itself. Station codes in the experience record and in project details link back to their stop.
- **Transit diagrams.** Each project's stated architecture is drawn in the same language: octilinear lines, station markers, and orange for the part Willy built or changed.
- **One signal colour.** Radix orange is used only for the route and for whatever is current. The neutrals are Radix olive.
- **Three type roles.** Archivo condensed for display, Newsreader for reading, JetBrains Mono for coordinates and dates only.

## Stack

| | |
| --- | --- |
| UI | React 19, TypeScript, CSS Modules with design tokens (`src/styles/tokens.css`) |
| Build | Vite 8. Two HTML entries: `index.html` and `404.html` for GitHub Pages |
| Motion | [Motion](https://motion.dev) (`LazyMotion` with `domAnimation`): the route drawing and the scroll-linked header line. Everything else is CSS. |
| Colour | [Radix Colors](https://www.radix-ui.com/colors) olive and orange, light and dark |
| Fonts | Self-hosted through Fontsource, with metric-matched fallbacks so the font swap doesn't shift layout |
| Tests | Vitest, Testing Library and jsdom for data and components; Playwright for layout and interaction in a real browser, against the production build |
| Lint | ESLint with typescript-eslint and the React Hooks (compiler) rules |

## Scripts

```sh
bun install
bun run dev          # local dev server
bun run test         # Vitest, once
bun run typecheck    # tsc -b
bun run lint         # ESLint
bun run check        # all three
bun run build        # type-check, then build into build/
bun run verify:build # check the built HTML: every local URL resolves, preloads are used
bun run test:e2e     # browser checks against the built site (build first)
bun run preview      # serve build/
```

## Layout

```
src/
  content/      every word and figure on the page, typed (types.ts); edit here, not in components
  components/   shared pieces: header, diagram, copy-email, theme toggle, rich text
  sections/     one component per page section, each with its CSS module
  hooks/        media queries, active section, theme
  styles/       tokens, base, print (the Save as PDF résumé)
scripts/
  generate-route-map.mjs   rebuilds src/content/route-map.generated.ts from Natural Earth data
  render-og.mjs            renders public/og.png from a running preview
public/         avatar, logos, project screenshots, social card, robots.txt
```

Résumé copy supports `**bold**` and `[label](https://…)`; see `components/RichText.tsx`.

Each project can be linked to directly: `/#project-<id>` (for example `/#project-muosaic`) opens it. A stop on the map can be too: `/#stop-<id>` (`tpe`, `sea`, `cmi`, `sjc`).

## Deploying

Pushing to `main` runs `.github/workflows/deploy.yml` on pinned Node 22 and Bun 1.4.4. It runs lint and unit tests, builds, verifies the build output, runs the browser tests against it, and publishes `build/` to GitHub Pages. Pages on a free plan needs the repository to be public. The site is a single page with in-page anchors only, so there are no client routes to break on refresh. Unknown paths get the static `404.html`.
