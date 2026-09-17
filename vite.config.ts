import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const extensionRoot = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  root: extensionRoot,
  build: {
    target: "es2022",
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        popup: resolve(extensionRoot, "src/chrome/popup.html"),
        options: resolve(extensionRoot, "src/chrome/options.html"),
        background: resolve(extensionRoot, "src/chrome/background.ts"),
        content: resolve(extensionRoot, "src/chrome/content.ts"),
      },
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "chunks/[name].js",
        assetFileNames: "assets/[name][extname]",
      },
    },
  },
  test: {
    include: ["src/**/tests/*.test.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["src/**/*.ts"],
      exclude: ["src/**/tests/*.test.ts"],
    },
  },
});
