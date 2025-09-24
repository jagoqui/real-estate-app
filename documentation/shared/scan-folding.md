# 4. 📁 Estructura de Carpetas

[⬅ Regresar al índice](../real-estate-app.md)

Este proyecto sigue la arquitectura hexagonal 🧱:

- **Domain**: Interfaces, entidades y reglas de negocio
- **Application**: Casos de uso, servicios de aplicación
- **Infrastructure**: Adaptadores para comunicarse con APIs externas o almacenamiento
- **Presentation**: Componentes, rutas y vistas

```json
src/
 modules/
  shared/
   domain/               # Lógica de negocio compartido
   application/          # Casos de uso compartido
   infrastructure/       # Servicios externos, API,UI
  login/
   domain/               # Lógica de negocio de la declaración
   application/          # Casos de uso de la declaración
   infrastructure/       # Servicios externos
 environments/
  .env/                     # Environment principal
  .env.local/               # Environment local
 scripts/                      # Proxy's, Sonar, carga de entorno
data/
documentation/
scripts/

```

> [!NOTE]
> Ver más de como usar la arquitectura hexagonal en el proyecto [aquí](./hexagonal-architecture.md)

[⬅ Regresar al índice](../real-estate-app.md)
