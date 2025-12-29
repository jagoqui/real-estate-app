# real-estate-app

## 📝 Descripción

Este es un proyecto para demostrar el uso de buenas prácticas y la **arquitectura hexagonal combinada con DDD (Domain-Driven Design) y CQRS (Command Query Responsibility Segregation)** en una aplicación llamada Real Estate App para la gestión de compra y ventas de propiedades raíz.

## 🏗️ Arquitectura

Este proyecto implementa:

- **Arquitectura Hexagonal (Ports & Adapters)**: Separación clara de capas con flujo de dependencias controlado
- **DDD (Domain-Driven Design)**: Domain 100% puro sin dependencias externas, usando models, inputs, y repository pattern
- **CQRS**: Separación de comandos (Commands en application) de consultas (Inputs en domain)
- **Capa Anticorrupción**: DTOs, Mappers y Schemas protegen el dominio de cambios externos

### 📊 Capas de la Arquitectura

```bash
domain → application → infrastructure → presentation
```

- **Domain**: Núcleo del negocio (models, inputs, repository interfaces) - 100% puro
- **Application**: Commands que extienden inputs con lógica de aplicación
- **Infrastructure**: Schemas (Zod), DTOs, Mappers, Actions, Repository Implementations
- **Presentation**: React components, hooks, contexts (UI framework-specific)

Para más detalles, consulta la [Documentación de Arquitectura Hexagonal](./shared/hexagonal-architecture.md)

## 📚 Tabla de Contenido

1. 🔧 [Requisitos Previos](./shared/prerequisites.md)
2. 🚀 [Guía Rápida de Inicio](./shared/quick-start-guide.md)
3. 🧪 [Pruebas y Linting](./shared/tests-and-linting.md)
4. 📁 [Estructura de Carpetas](./shared/scan-folding.md)
5. 📦 [Paquetes Usados](./shared/packages-use.md)
6. 🏗️ [Arquitectura Hexagonal + DDD + CQRS](./shared/hexagonal-architecture.md)
7. 🌊 [Flujo de Datos y Patrones de Diseño](./shared/data-flow-patterns.md)
8. ️ [Mantenimiento y Actualizaciones](./shared/maintenance-and-updates.md)
9. 💡 [Futuras mejoras](./shared/future-improvements.md)
10. 📚 [Recursos](./shared/resources.md)
11. 📦 [Módulos](./modules/modules.md)

---

## 🚧 Estado Actual del Proyecto

### ✅ Implementaciones Completadas

- ✅ **Domain 100% puro**: Movido Zod a infrastructure, domain sin dependencias externas
- ✅ **Schemas desde Models**: Todos los schemas Zod construidos usando `satisfies z.ZodType<Model>`
- ✅ **CQRS implementado**: Separación clara entre Inputs (domain) y Commands (application)
- ✅ **Repository Pattern**: Interfaces en domain, implementations en infrastructure
- ✅ **Capa Anticorrupción**: DTOs, Mappers y Schemas protegiendo el dominio
- ✅ **ESLint custom rules**: Validación automática de arquitectura actualizada
- ✅ **Actions atómicas**: Operaciones HTTP separadas y componibles

### 🚧 En Proceso de Migración

- 🚧 **Formularios**: Migración a `react-hook-form` + `zodResolver` en progreso
  - ✅ Login form: completado
  - ✅ Register form: completado
  - 🚧 Property forms: en progreso
  - 🚧 Owner forms: en progreso
  - 🚧 User management forms: en progreso

- 🚧 **Componentes legacy**: Refactorización para seguir nuevos patrones
  - Algunos componentes tienen lógica mezclada que se está separando
  - Se están extrayendo custom hooks de casos de uso
  - Se está mejorando la separación de responsabilidades

### 📝 Notas Importantes

> **⚠️ Si encuentras código que no sigue estos patrones:**
>
> - Es código legacy en proceso de migración
> - **NO uses ese código como referencia**
> - Sigue siempre los ejemplos de la [documentación de arquitectura](./shared/hexagonal-architecture.md)
> - Consulta el [flujo de datos](./shared/data-flow-patterns.md) para nuevas implementaciones

**✅ Código de referencia para nuevas implementaciones:**
>
> - Módulo `auth`: Login y Register flows (completamente actualizados)
> - Módulo `shared`: Estructura de capas y patrones
> - Documentación de [arquitectura hexagonal](./shared/hexagonal-architecture.md)
> - Guía de [flujo de datos](./shared/data-flow-patterns.md)

---

## 🎯 Principios Fundamentales

### 1. Domain Purity

```typescript
// ✅ CORRECTO en domain/
export interface User {
  id: string;
  name: string;
  email: string;
}

// ❌ INCORRECTO en domain/
import z from 'zod';
export const userSchema = z.object({...});
```

### 2. Schemas en Infrastructure

```typescript
// ✅ CORRECTO en infrastructure/
import type { User } from '@/domain/models/user.model';
import z from 'zod';

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
}) satisfies z.ZodType<User>;
```

### 3. Separación CQRS

```typescript
// ✅ Input en domain (contrato puro)
export interface RegisterInput {
  email: string;
  password: string;
}

// ✅ Command en application (extensión para UI)
export type RegisterCommand = RegisterInput & {
  confirmPassword: string;
};
```

### 4. Capa Anticorrupción

```typescript
// ✅ Flujo completo
API Response (DTO) 
  → Schema Validation 
  → Mapper (DTO → Model) 
  → Domain Model
```

---

## 🤝 Contribuir al Proyecto

### Antes de hacer cambios

1. 📖 Lee la [documentación de arquitectura](./shared/hexagonal-architecture.md)
2. 🌊 Estudia el [flujo de datos](./shared/data-flow-patterns.md)
3. ✅ Revisa el checklist de nuevas funcionalidades
4. 🎯 Asegúrate de seguir los principios DDD y CQRS

### Al implementar nueva funcionalidad

1. **Empieza por Domain**: Models, Inputs, Repository Interfaces
2. **Continúa con Application**: Commands (si necesario)
3. **Implementa Infrastructure**: Schemas, DTOs, Mappers, Actions, Repository Impl
4. **Finaliza con Presentation**: Hooks, Components
5. **Valida**: ESLint, TypeScript, Tests

### Reglas de oro

- ✅ Domain NUNCA importa librerías externas
- ✅ Schemas siempre con `satisfies z.ZodType<Model>`
- ✅ Formularios siempre con `react-hook-form` + `zodResolver`
- ✅ Un action = una operación HTTP
- ✅ Mappers para transformar DTOs a Models

---

## 📞 Soporte y Recursos

- 📚 [Documentación Completa](./shared/hexagonal-architecture.md)
- 🌊 [Flujo de Datos](./shared/data-flow-patterns.md)
- 🧪 [Testing y Linting](./shared/tests-and-linting.md)
- 📦 [Módulos](./modules/modules.md)
- 🐛 [Reportar Issues](https://github.com/jagoqui/real-estate-app/issues)

---
