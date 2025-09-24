# 🧩 Módulos del Sistema

[⬅ Regresar al índice](../real-estate-app.md)

Este documento proporciona una visión general de todos los módulos que componen la aplicación Real Estate App, organizados según la arquitectura hexagonal implementada.

## 📚 Acceso Rápido a Módulos

1. 🔐 [Login](./login/login.md)
2. 🏠 [Properties](./properties/properties.md)
3. 🖼️ [Properties Images](./properties-images/properties-images.md)
4. 📊 [Properties Traces](./properties-traces/properties-traces.md)
5. 👥 [Owners](./owners/owners.md)

## �📋 Índice de Módulos

La aplicación está estructurada en módulos independientes, cada uno con sus propias responsabilidades y siguiendo los principios de la arquitectura hexagonal (`domain → application → infrastructure`).

### 🔐 Autenticación y Acceso

| Módulo | Descripción | Documentación |
| ------ | ----------- | ------------- |
| **Login** | Manejo de autenticación de usuarios, integración con Google OAuth y gestión de sesiones | [📖 Ver documentación](./login/login.md) |

### 🏠 Gestión de Propiedades

| Módulo | Descripción | Documentación |
| ------ | ----------- | ------------- |
| **Properties** | CRUD de propiedades inmobiliarias, listado, filtros y gestión de datos principales | [📖 Ver documentación](./properties/properties.md) |
| **Properties Images** | Gestión de imágenes de propiedades, upload, optimización y galería | [📖 Ver documentación](./properties-images/properties-images.md) |
| **Properties Traces** | Histórico de cambios y trazabilidad de propiedades, auditoría de modificaciones | [📖 Ver documentación](./properties-traces/properties-traces.md) |

### 👥 Gestión de Usuarios

| Módulo | Descripción | Documentación |
| ------ | ----------- | ------------- |
| **Owners** | Gestión de propietarios de inmuebles, datos personales y vinculación con propiedades | [📖 Ver documentación](./owners/owners.md) |

## 🏗️ Arquitectura por Módulos

Cada módulo sigue la estructura de arquitectura hexagonal:

```bash
src/app/modules/{module-name}/
├── domain/           # Reglas de negocio y contratos
├── application/      # Casos de uso, DTOs y adaptadores
└── infrastructure/   # Implementaciones técnicas y UI
```

### 🔄 Comunicación entre Módulos

- **Módulo Shared**: Código compartido entre módulos
- **Dependency Injection**: Para inyección de dependencias
- **Event System**: Para comunicación asíncrona entre módulos

## 🚀 Funcionalidades Principales

### 🔐 **Login Module**

- Autenticación con Google OAuth
- Gestión de tokens y sesiones
- Validación de permisos

### 🏠 **Properties Module**

- CRUD completo de propiedades
- Filtros avanzados de búsqueda
- Gestión de estados de propiedad

### 🖼️ **Properties Images Module**

- Upload múltiple de imágenes
- Optimización automática
- Galería responsive

### 📊 **Properties Traces Module**

- Historial de cambios
- Auditoría de modificaciones
- Reportes de actividad

### 👥 **Owners Module**

- Gestión de propietarios
- Vinculación con propiedades
- Datos de contacto

## 📚 Guías de Desarrollo

Para contribuir o extender cualquier módulo:

1. **Lee la documentación específica** del módulo
2. **Sigue la arquitectura hexagonal** establecida
3. **Mantén la separación de responsabilidades** entre capas
4. **Usa el módulo shared** para código reutilizable
5. **Escribe tests** para nuevas funcionalidades

---

💡 **Tip**: Cada módulo tiene su propia documentación detallada que incluye diagramas, casos de uso y ejemplos de implementación.
