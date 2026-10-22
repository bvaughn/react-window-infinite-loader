import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { getDevServerConfig } from "react-lib-tools/scripts/dev-server.js";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig, type UserConfig } from "vite";
import dts from "vite-plugin-dts";
import svgr from "vite-plugin-svgr";

const __dirname = dirname(fileURLToPath(import.meta.url));

const libraryConfig: UserConfig = {
  build: {
    lib: {
      entry: resolve(__dirname, "lib/index.ts"),
      name: "react-window-infinite-loader",
      fileName: "react-window-infinite-loader",
      formats: ["cjs", "es"]
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"]
    },
    sourcemap: true
  },
  plugins: [react(), dts({ include: ["lib"], rollupTypes: true })],
  publicDir: false
};

const websiteConfig: UserConfig = {
  base: "/",
  build: {
    minify: "terser",
    outDir: "docs",
    sourcemap: true,
    terserOptions: {
      format: {
        comments: false
      }
    }
  },
  plugins: [
    react(),
    svgr(),
    tailwindcss(),
    visualizer({
      emitFile: true,
      filename: "stats.html"
    })
  ],
  resolve: {
    alias: {
      "react-window-infinite-loader": resolve(__dirname, "lib")
    }
  }
};

// Allow iPhone to connect to the DEV site using a local IP
if (process.env.NODE_ENV === "development") {
  // The port is configured in package.json ("react-lib-tools": { "devServerPort" }), which scripts like compile:search-index also read
  websiteConfig.server = {
    ...getDevServerConfig(),
    host: true
  };
}

let config: UserConfig = {};
switch (process.env.TARGET) {
  case "lib": {
    config = libraryConfig;
    break;
  }
  default: {
    config = websiteConfig;
    break;
  }
}

// https://vite.dev/config/
export default defineConfig(config);
