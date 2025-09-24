# 7. 🌍 Manejo de Entornos

[⬅ Regresar al índice](../real-estate-app.md)

Este proyecto utiliza `vite` para la gestión de variables de entorno.

- Las variables específicas de cada entorno se definen en el archivo `environments/.env` carga de leer estas variables y configurarlas para su uso en la aplicación React.

_Para acceder a las variables de entorno dirigirse a las Libraries de Azure de dev, lab y prod [real-estate-app-local](https://example-dev.azurewebsites.net/library/variable-groups/real-estate-app-local), [real-estate-app-lab](https://example-lab.azurewebsites.net/library/variable-groups/real-estate-app-lab) y [real-estate-app-prod](https://example-prod.azurewebsites.net/library/variable-groups/real-estate-app-prod) respectivamente._

Para el desarrollo en local necesitamos `real-estate-app-local` la cual deberá guardar en `environments/.env` y para ejecutar análisis con SonarQube en local, también necesitas crear el archivo `environments/.env.sonar-local` con las siguientes variables:

```bash
VITE_SONAR_TOKEN=DE LA CONFIGURACIÓN EN LOCAL DEL SONAR
VITE_SONAR_HOST_URL=http://localhost:9000
VITE_SONAR_PROJECT_KEY=DE LA CONFIGURACIÓN EN LOCAL DEL SONAR
VITE_REMOTE_SONAR_CLIENT=sonarqube.remote-test.com.co:443
NODE_ENV=sonar-local
```
