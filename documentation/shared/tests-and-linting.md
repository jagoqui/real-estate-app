# 3. 🧪✍️ Pruebas y Linting

[⬅ Regresar al índice](../real-estate-app.md)

- ## ✅ Pruebas Unitarias

  - ### Ejecutar Pruebas

    `npm/bun run test`

  - ### Ejecutar Pruebas Aisladas de Archivos

    `npm/bun run test:single`

  - ### Ejecutar Pruebas Modo Watch

    `npm/bun run test:watch`

    > [!NOTE]
    > Por defecto el jest siempre muestra cobertura

- ## ✍️ Eslint, Prettier, markdownlint y Pre-commits

  Configuración de **ESLint**, con soporte para **Prettier** y control de
  imports no usados (\`eslint-plugin-unused-imports\`), linter para Markdown.

  Recomendaciones:
  - **Prettier** se encarga de formatear el código automáticamente.
  - **ESLint** valida el estilo del código e identifica errores comunes.
  - **markdownlint** formatea el código Markdown y soluciones errores comunes.
  - **check-types** usan el `tsc` con `npm/bun run check-types`, valida que no
    haya errores de types en el proyecto
  - Se recomienda ejecutar `npm run check-types && npm run lint --fix`  
    antes de realizar un commit.
  - **Vitest** con `test:staged` ejecuta los tests solo a los archivos modificados.
  - **Husky**, **check-types** y **lint-staged** están configurados para
    bloquear commits que no pasen las validaciones de linting, ejecutando el
    **Prettier**, **Eslint**, **markdownlint** y **Vitest** solo a los archivos modificados.
    Adicional, hace el análisis de types que se especifica con **check-types**  
    y, por último, realiza el _build_ de la aplicación para asegurarnos que todo
    ande bien en ambiente productivo.

  > [!WARNING]
  > Si falla el pre-commit por permisos al momento de eliminar la carpeta `dist`, prueba eliminándola de forma manual.

## 🧪 ESLint Configuration & Coding Best Practices

Este documento resume las reglas y buenas prácticas definidas en el archivo de configuración ESLint para este proyecto Angular + TypeScript. Incluye recomendaciones de ESLint, TypeScript ESLint, Angular ESLint, y varios plugins.

---

## 🔒 Buenas Prácticas Generales

- ❌ Evitar `debugger` (`no-debugger`)

- ⚠️ Evitar `console` salvo `console.error` y `console.warn` (`no-console`)
- ❌ Evitar expresiones vacías (`no-unused-expressions`)
- ❌ No usar `new` sin asignar el resultado (`no-new`)
- ❌ Evitar `new String()`, `new Number()` (`no-new-wrappers`)
- ❌ No lanzar excepciones como string o número (`no-throw-literal`)
- ⚠️ Evitar `== null` (`no-eq-null`)
- ❌ Evitar duplicados en `case` y `import` (`no-duplicate-case`, `no-duplicate-imports`)
- ⚠️ No dejar bloques vacíos (`no-empty`)
- ❌ Usar `0.5` en vez de `.5` (`no-floating-decimal`)
- ⚠️ Evitar ternarios anidados (`no-nested-ternary`)

---

## 🧠 Complejidad y Legibilidad

- 🧬 Máximo 3 niveles de callbacks anidados (`max-nested-callbacks`)
- 🧱 Máxima profundidad de bloques (`max-depth`)
- 📏 Máximo 60 líneas por función (`max-lines-per-function`)
- 🧮 Complejidad ciclomática limitada (`complexity`)
- 🧩 Control de complejidad en templates:
  - `cyclomatic-complexity`: máximo 7
  - `conditional-complexity`: máximo 3

---

## 🧹 Limpieza de Código

- 🔥 Eliminar imports no usados (`unused-imports/no-unused-imports`)
- 🔍 Detectar variables/argumentos no usados (excepto los que comienzan con `_`) (`unused-imports/no-unused-vars`)
- ⚠️ Desactivado `no-unused-vars` estándar y de TypeScript para usar `unused-imports`

---

## 📦 Organización de Imports

- 📚 Ordenar imports automáticamente (`simple-import-sort`)

---

## 🧾 Estilo en TypeScript

- 📐 Usar `Array<T>` en lugar de `T[]` (`@typescript-eslint/array-type`)
- 🔁 Definir tipo de retorno explícito en funciones (`@typescript-eslint/explicit-function-return-type`)
- 🔒 Usar `readonly` siempre que sea posible (`@typescript-eslint/prefer-readonly`)
- 🛑 Evitar `require()` (`@typescript-eslint/no-require-imports`)
- 🧱 Evitar constructores vacíos (`@typescript-eslint/no-useless-constructor`)
- 🧮 Forzar uso de `type` o `interface` de manera consistente (`@typescript-eslint/consistent-type-definitions`)
- 📦 Usar `import type` (`@typescript-eslint/consistent-type-imports`)
- ✅ Inicializar `enum` (`@typescript-eslint/prefer-enum-initializers`)
- ⚠️ Evitar miembros innecesarios o duplicados en enums
- 🧠 Prevenir errores con `this` inválido (`@typescript-eslint/no-invalid-this`)

---

## 🆔 Convenciones de Nombres (`@typescript-eslint/naming-convention`)

- ✅ General: `camelCase`
- 📌 Enums y Tipos: `PascalCase`
- ⚙️ Constantes: `camelCase`, `PascalCase`, `UPPER_CASE`
- ✅ Permitir `_nombre` y `nombre_`
- 🚫 Ignorar propiedades como `host`

---

## 🔧 Reglas Angular ESLint

- ❌ Deshabilitar uso de `@Host()` en metadata
- 🧠 Decoradores contextuales (`contextual-decorator`)
- 🛑 Prohibido `forwardRef`, `ngOnInit()` manual
- 🚫 Evitar pipes impuros
- 📦 Prefijar selectores con `eml`:
  - Componentes: `kebab-case`, tipo `element`
  - Directivas: `camelCase`, tipo `attribute`
- 🏗️ Preferir `standalone components`
- 🧠 Usar `ChangeDetectionStrategy.OnPush`
- 🧭 Prefijo relativo en URLs

---

## 🌐 Reglas para Plantillas HTML

- ❌ `tabindex` positivos no permitidos
- ❌ `async` negado no permitido
- 🚫 Atributos duplicados no permitidos
- ❌ Prohibido el uso de `any`
- ✅ Usar `===` en comparaciones
- ✅ Aplicar `[()]` correctamente (`banana-in-box`)
- 🔁 Preferir el nuevo control flow de Angular
- 🖼️ Usar `ngSrc` para `img`
- ✅ Etiquetas autocontenidas (`<br />`)
- ⚠️ Evitar llamadas a funciones directamente en template (excepto con `$`)

---

## 🧪 Reglas Especiales para Tests

- 🚫 Se desactiva `max-lines-per-function` en archivos `*.test.ts`

---

## 🧱 Regla personalizada ESLint para arquitectura hexagonal

Se incluyó una regla personalizada en ESLint llamada `hexagonal/no-invalid-architecture-imports` para **validar automáticamente las buenas prácticas de imports** según la arquitectura definida (`domain → application → infrastructure`).

### 🎯 Funcionalidades principales

- ✅ Previene imports entre capas incorrectas.
- ✅ Restringe imports entre módulos que no pasen por `shared/`.
- ⚙️ **Completamente parametrizable** mediante configuración.

### 🔧 Configuración personalizable

La regla es **totalmente configurable** y permite personalizar:

```js
"hexagonal/no-invalid-architecture-imports": ["error", {
  sharedModule: "shared",                    // Módulo compartido
  layers: {                                 // Nombres de capas
    domain: "domain",
    application: "application", 
    infrastructure: "infrastructure",
  },
  whiteListPatterns: [                      // Patrones excluidos
    "@/variables/", 
    ".test.ts"
  ],
  allowedImports: {                         // Dependencias permitidas
    domain: [],
    application: ["domain"],
    infrastructure: ["application", "domain"],
  },
  appRouterFileRegex: "app.router.ts*",     // Router principal
  routeFileRegex: "route.*",                // Route por module
 documentationInfoPath: "documentation/shared/hexagonal-architecture.md",
}]
```

### 📋 Configuración por defecto

- **Módulo compartido**: `shared`
- **Capas**: `domain`, `application`, `infrastructure`
- **Archivos excluidos**: Tests (`.test.ts`) y variables (`@/variables/`)
- **Flujo de dependencias**: `domain → application → infrastructure`

> Consulta más detalles en la  
> [documentación de arquitectura](./hexagonal-architecture.md)  
> o en el archivo de regla:  
> [no-invalid-architecture-imports.mjs](../../tools/eslint-plugin-hexagonal/rules/no-invalid-architecture-imports.mjs)

---

## 📌 Notas

- Plugins integrados:
  - `@typescript-eslint/eslint-plugin`
  - `eslint-plugin-unused-imports`
  - `eslint-plugin-simple-import-sort`
  - _(opcional)_ `eslint-plugin-prettier`

[⬅ Regresar al índice](../real-estate-app.md)
