import { defineConfig } from "tsdown";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "modules/index": "src/modules/index.ts",
  },
  dts: true,
  tsconfig: "tsconfig.build.json",
  format: "esm",
  sourcemap: false,
});
