# 2. 🚀 Guía Rápida de Inicio

[⬅ Regresar al índice](../real-estate-app.md)

## 📚 Tabla de Contenido

1. - [Instalación de Paquetes](#-instalación-de-paquetes)
2. - [Tecnologías Usadas](#️-tecnologías-usadas)
3. - [Levantar en Local](#️-levantar-en-local)
4. - [Scanner Sonar](#-sonarqube--sonarscanner-con-docker)
5. - [SNYK](#-snyk-analizador-de-vulnerabilidades)
6. - [Extensiones Recomendadas](#-extensiones-recomendadas)
7. - [Scripts Disponibles](#-scripts-disponibles)

__

1. ### 📦 Instalación de Paquetes

    `npm/bun install`, recomienda bun.

2. ### 🛠️ Tecnologías Usadas

    - **React 19** con Shadow DOM y Angular Elements
    - **Arquitectura Hexagonal** (Domain, Application, Infrastructure, Presentation)
    - **Tailwind** (Librería de estilos)
    - **TanStack Query** (estado y peticiones)
    - **Zod** (validaciones)
    - **ESLint** + **Prettier** + **Husky** + **markdownlint** + **lint-staged**
    - **Vitest** + **@testing-library/react**
    - **SonarQube** + **Docker** + **sonar-scanner-cli**
    - **SNYK** (Para hacer análisis de seguridad del código)
    - **Bun** (opcional como empaquetador)

3. ### ⚙️ Levantar en Local

   - #### 💻 Opción 1: Desarrollo Local

      `npm/bun run dev`

      > [!Note]
      > Acceder en el navegador: `localhost:3000`

4. ## 📊 SonarQube + SonarScanner con Docker

   - ### ☁️ Análisis con servidor remoto

      `npm/bun run sonar-scanner`

      > [!IMPORTANT]
      > Si el remoto a conectar necesita algún acceso con VPN, esta debe estar activa para que el Dockerfile puede descargar los certificados correctamente desde el remoto configurado
      > [!NOTE]
      > Ver reporte en <https://sonarqube.${remote}.com.co/aseguramiento/dashboard?id=${project-key}$>
   >
   - ### 🐳 Análisis con servidor local

   - #### 🏗️ Crear Imagen de Sonarqube (solo la primera vez)

        `npm/bun run sonarqube:image:build`

   - #### 🚀 Iniciar Imagen de Sonarqube

        `npm/bun run sonarqube:image:start`

        > [!Note]
        > Acceder en el navegador: localhost:9000\ con las siguientes credenciales por defecto
        > login: admin
        > password: admin

   - #### 🧪 Hacer análisis local

        `npm/bun run sonar-scanner:local`

   - #### 🛑 Detener Imagen SonarQube

        `npm/bun run sonarqube:image:stop`

        > [!Note]
        > Para ambos debe setear el \`SONAR_TOKEN\`, \`SONAR_HOST_URL\`, \`SONAR_PROJECT_KEY\` y \`SONAR_VERBOSE\` en el `environments/.env` y `.env.sonar-local` respectivamente, ver más en [Sonarqube local con Docker](https://docs.sonarsource.com/sonarqube-server/10.5/try-out-sonarqube/), [Sonar Scanner from Docker](https://docs.sonarsource.com/sonarqube-server/10.7/analyzing-source-code/scanners/sonarscanner/#sonarscanner-from-docker-image).
        > [!Warning]
        > Verificar que la ruta del proyecto en nombramiento de los folders no tenga espacios, ya que esto genera problemas con el accesos de la ruta desde el DockerFile.

5. ## 🔐 SNYK Analizador de Vulnerabilidades

   1. ### Hacer login (Sólo una vez)

       `npm/bun run snyk:auth`

       > [!NOTE]
       > Esto lo redirigirá a <https://app.snyk.io/>, si tiene cuenta simplemente inicie sesión, sino debes crearla junto con el proyecto, para esto le das en **Scan for security issues** tomas el token de la organización desde el ejemplo en el flag --org y lo agregas a los environments con el valor de `SNYK_ORG`, más información en [Snyk CLI for Snyk Code](https://docs.snyk.io/snyk-cli/scan-and-maintain-projects-using-the-cli/snyk-cli-for-snyk-code).

   2. ### Ejecutar Análisis

      1. #### Dependencias

          `npm/bun run snyk:dependencies`

      2. #### Código Estático

          `npm/bun run snyk:static`

          > [!NOTE]
          > Para poder usar esta funcionalidad necesita activar el **Snyk Code** en la configuración del project, ver más en [Enable Snyk Code in Snyk Web UI](https://docs.snyk.io/scan-with-snyk/snyk-code/configure-snyk-code#enable-snyk-code-in-snyk-web-ui).

      3. #### Monitor UI

          `npm/bun run snyk:monitor`

          > [!NOTE]
          > Para ver el resultado ir an link que aparece en consola en la sección: `Explore this snapshot at https://app.snyk.io/org/...`

      4. #### Ejecutar todos los comandos

       `npm/bun run snyk:runner`

    > [!NOTE]
    > Para más información acerca de los comandos ir a [Available CLI commands](https://docs.snyk.io/snyk-cli/cli-commands-and-options-summary#available-cli-commands)

6. ## 🧩 Extensiones Recomendadas

    - [ES7+ React/Redux/React-Native snippets](dsznajder.es7-react-js-snippets)
    - [Code Spell Checker](https://marketplace.visualstudio.com/items/?itemName=streetsidesoftware.code-spell-checker)
    - [Spanish - Code Spell Checker](https://marketplace.visualstudio.com/items/?itemName=streetsidesoftware.code-spell-checker-spanish)
    - [Draw.io Integration](https://marketplace.visualstudio.com/items/?itemName=hediet.vscode-drawio)
    - [Eslint](https://marketplace.visualstudio.com/items/?itemName=dbaeumer.vscode-eslint)
    - [Live Server](https://marketplace.visualstudio.com/items/?itemName=ritwickdey.LiveServer)
    - [Markdown All In One](https://marketplace.visualstudio.com/items/?itemName=yzhang.markdown-all-in-one)
    - [Path Intellisense](https://marketplace.visualstudio.com/items/?itemName=christian-kohler.path-intellisense)
    - [Prettier](https://marketplace.visualstudio.com/items/?itemName=esbenp.prettier-vscode)
    - [Pretty TypeScript Errors](https://marketplace.visualstudio.com/items/?itemName=yoavbls.pretty-ts-errors)
    - [Tailwind](https://marketplace.visualstudio.com/items/?itemName=bradlc.vscode-tailwindcss)
    - [Template String Converter](https://marketplace.visualstudio.com/items/?itemName=meganrogge.template-string-converter)
    - [TODO Highlight](https://marketplace.visualstudio.com/items/?itemName=wayou.vscode-todo-highlight)
    - [markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint)

    > [!NOTE]
    > Para mostrar las extensiones recomendadas en el visual studio code ir extensiones y colocar `@recommended`, o desde la paleta de control con `ctrl + shift + p` colocar `Show Recommended Extensions`.

7. ### 📦 Scripts disponibles

{
  "check-types": "tsc --noemit",
  "test:single": "node scripts/vitest-single-coverage.js",
  "sonar-scanner:local": "docker rm -f sonar-scanner-cli; node ./scripts/sonar-scanner.js -local",
  "sonarqube:image:build": "docker rm -f sonarqube; docker run -d --name sonarqube -e SONAR_ES_BOOTSTRAP_CHECKS_DISABLE=true -p 9000:9000 sonarqube:latest",
  "sonarqube:image:start": "docker start sonarqube",
  "sonarqube:image:stop": "docker stop sonarqube",
  "snyk:auth": "npx snyk auth",
  "snyk:dependencies": "node ./scripts/snyk.js",
  "snyk:static": "node ./scripts/snyk.js -static",
  "snyk:monitor": "node ./scripts/snyk.js -monitor",
  "snyk:runner": "npm run snyk:static; npm run snyk:dependencies; npm run snyk:monitor",
}

[⬅ Regresar al índice](../real-estate-app.md)
