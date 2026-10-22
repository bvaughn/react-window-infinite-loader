import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: "jsdom",
      include: ["lib/**/*.test.{ts,tsx}"],
      restoreMocks: true,
      setupFiles: "./vitest.setup.ts"
    }
  })
);
