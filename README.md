# browser-extensions

Browser tools that integrate with any website UI — client-side, mostly no backend. The real, browser-agnostic logic lives in `src/lib/`; each browser gets a thin adapter.

## Focus

Three pillars:

- **lib** — the real, shared extension logic (browser-agnostic; e.g., "talk with ChatGPT is the same shit").
- **chrome** — the Chrome adapter (MV3 manifest + entrypoints + build).
- **firefox** — the Firefox adapter (MV2 manifest + entrypoints + build).

## Structure

```text
src/
  lib/        shared browser-agnostic logic (+ tests)
  chrome/     Chrome adapter: MV3 manifest, entrypoints (background/content/options/popup), build (+ tests)
  firefox/    Firefox adapter: MV2 manifest, entrypoints, build (+ tests)
docker/       Dockerfile (CI pipeline)
docs/
```

AI-assisted features (e.g., a chat helper in a web app) are exploratory. The per-browser adapters/builds are tracked as issues.

## Current extensions

| Extension | Status |
|---|---|
| Recorder | logic in `src/lib/`; Chrome adapter in `src/chrome/` (migration in progress via issues) |
