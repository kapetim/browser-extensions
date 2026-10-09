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
        popup: resolve(extensionRoot, "chrome/popup.html"),
        options: resolve(extensionRoot, "chrome/options.html"),
        background: resolve(extensionRoot, "chrome/background.ts"),
        content: resolve(extensionRoot, "chrome/content.ts"),
      },
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "chunks/[name].js",
        assetFileNames: "assets/[name][extname]",
      },
    },
  },
  test: {
    include: ["**/tests/*.test.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["chrome/**/*.ts", "lib/**/*.ts"],
      exclude: ["**/tests/*.test.ts"],
    },
  },
});
