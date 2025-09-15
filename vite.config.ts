import react from "@vitejs/plugin-react-swc";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, type UserConfig } from "vite";
import dts from "vite-plugin-dts";

const __dirname = dirname(fileURLToPath(import.meta.url));

const config: UserConfig = {
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "react-window-infinite-loader",
      fileName: "react-window-infinite-loader",
      formats: ["cjs", "es"],
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
    },
    sourcemap: true,
  },
  plugins: [react(), dts({ rollupTypes: true })],
  publicDir: false,
};

// https://vite.dev/config/
export default defineConfig(config);
