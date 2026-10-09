# Local development: build an extension and install it

The extension source lives under **`src/`** and the Vite build targets it directly; run all npm commands from **`src/`**.

## Prerequisites

- **Node.js 22.x** (see the root [README.md](../README.md) badge).
- **Google Chrome** (or Chromium) with support for **Manifest V3** unpacked loads.

## Repository layout (what matters for builds)

```text
browser-extensions/          ← repository root
├── src/                      ← npm project root; always run npm commands here
│   ├── package.json          ← shared scripts: build, test, lint
│   ├── vite.config.ts        ← build config
│   ├── chrome/               ← MV3 extension source (manifest, popup, background, content)
│   ├── firefox/              ← Firefox manifest
│   ├── lib/                  ← shared library code + tests
│   └── dist/                 ← produced by `npm run build` — this is what you load in Chrome
└── docs/                     ← documentation (this folder)
```

Load **`src/dist/`** in Chrome — **never** the source folder alone.

## Build (from `src/`)

```bash
cd src
npm ci
npm run build
```

Output appears under **`src/dist/`** (manifest, JS bundles, `icons/`, HTML entrypoints).

Optional helper that echoes browser steps:

```bash
npm run setup:browser
```

## Install locally (unpacked)

1. Open **`chrome://extensions`**.
2. Enable **Developer mode** (toggle is usually top-right).
3. Click **Load unpacked**.
4. Select the **`src/dist/`** folder.

Use **Reload** on the card after you rebuild. If Chrome shows errors, open **Errors** / **Service worker** on that card and fix the build before retrying.

### macOS notes

- **Developer mode** is required for sideloading.
- **Managed devices (MDM)** may block unpacked extensions or restrict downloads; use a profile where development is allowed.
- If an extension uses **downloads** (Recorder exports a zip), ensure Chrome can write to **Downloads** — check **System Settings → Privacy & Security → Files and Folders** (and the download bar for blocked files).

## Quality checks before you push

From **`src/`**:

```bash
npm run check    # format, lint, typecheck, tests, build
```

## Related

- Publish or install from the store: **[chrome-web-store-release.md](chrome-web-store-release.md)**.
- Recorder export format: **[recorder-recording-format.md](recorder-recording-format.md)**.
