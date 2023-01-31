import del from "rollup-plugin-delete";
import css from "rollup-plugin-import-css";
import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json" assert { type: "json" };

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: "components/src/component-lib/index.js",
        format: "esm",
        banner: "/* eslint-disable */",
      },
      { file: pkg.main, format: "cjs" },
      { file: pkg.module, format: "esm" },
    ],
    plugins: [del({ targets: ["dist/*", "components/src/component-lib"] }), typescript(), css()],
    external: Object.keys(pkg.dependencies || {}),
  },
];
