import noInvalidArchitectureImports from './rules/no-invalid-architecture-imports.mjs';

/**
 * @fileoverview ESLint rule to enforce Hexagonal Architecture import restrictions.
 *
 * ## Purpose
 * This rule enforces dependency rules between layers (`domain`, `application`, `infrastructure`)
 * and prevents direct cross-module imports that bypass the `shared` module.
 *
 * ## Default Behavior
 * By default, the rule enforces:
 *
 * - **Allowed imports:**
 *   - `domain`: cannot import anything
 *   - `application`: can import from `domain`
 *   - `infrastructure`: can import from `application` and `domain`
 *
 * - **Cross-module restriction:**
 *   Files in one module cannot import directly from another module.
 *   Shared code must go through the configured `sharedModule`.
 *
 * - **Whitelist patterns:**
 *   Test files (`.test.ts`) and variables (`@/variables/`) are ignored.
 *
 * ## Usage
 * Add the plugin and rule to your ESLint configuration:
 *
 * ```js
 * import hexagonalPlugin from "./eslint-plugin-hexagonal.mjs";
 *
 * export default {
 *   plugins: {
 *     hexagonal: hexagonalPlugin,
 *   },
 *   rules: {
 *     "hexagonal/no-invalid-architecture-imports": "error",
 *   },
 * };
 * ```
 *
 * ## Configuration
 * You can override the defaults by passing options:
 *
 * ```js
 * rules: {
 *   "hexagonal/no-invalid-architecture-imports": ["error", {
 *     sharedModule: "shared",
 *     layers: {
 *       domain: "domain",
 *       application: "application",
 *       infrastructure: "infrastructure",
 *     },
 *     whiteListPatterns: ["@/variables/", ".test.ts"],
 *     allowedImports: {
 *       domain: [],
 *       application: ["domain"],
 *       infrastructure: ["application", "domain"],
 *     }
 *   }]
 * }
 * ```
 *
 * ## Examples
 *
 * ❌ **Incorrect**
 * ```ts
 * // From infrastructure → domain (not allowed)
 * import { User } from "@/modules/users/domain/user";
 * ```
 *
 * ❌ **Incorrect**
 * ```ts
 * // Cross-module import without shared
 * import { Order } from "@/modules/orders/domain/order";
 * ```
 *
 * ✅ **Correct**
 * ```ts
 * // Allowed: application → domain
 * import { User } from "@/modules/users/domain/user";
 * ```
 *
 * ✅ **Correct**
 * ```ts
 * // Allowed: cross-module via shared
 * import { Logger } from "@/modules/shared/utils/logger";
 * ```
 *
 * 📄 See full documentation at: `documentation/shared/hexagonal-architecture.md`
 */
export default {
  rules: {
    'no-invalid-architecture-imports': noInvalidArchitectureImports,
  },
};
