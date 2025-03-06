import { defineConfig } from "vite";
import path from "path";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "AccessibilityPlugin",
      fileName: (format) => `accessibility-plugin-xyz.${format}.js`,
      formats: ["es", "cjs", "umd"],
    },
    outDir: "dist",
    rollupOptions: {
      external: [],
      output: {
        globals: {},
      },
    },
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: path.resolve(__dirname, "src/styles.css"),
          dest: "css",
          rename: "accessibility-plugin-xyz.css",
        },
      ],
    }),
  ],
});
