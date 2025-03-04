import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "AccessibilityPlugin",
      fileName: (format) => `accessibility-plugin.${format}.js`,
      formats: ["es", "cjs"],
    },
    outDir: "dist",
    rollupOptions: {
      external: [],
      output: {
        globals: {},
      },
    },
  },
});
