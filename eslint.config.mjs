import { defineConfig, globalIgnores } from "eslint/config";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const nextVitals = require("eslint-config-next/core-web-vitals.js");
const nextTs = require("eslint-config-next/typescript.js");

import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({ baseDirectory: process.cwd() });

export default defineConfig([
  ...compat.extends(...nextVitals.extends, ...nextTs.extends),
  globalIgnores([".next/**", "node_modules/**", "coverage/**", "next-env.d.ts"]),
]);
