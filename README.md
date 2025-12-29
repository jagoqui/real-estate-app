# Real Estate App

[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/jagoqui/real-estate-app)

> 🏠 **Aplicación de gestión de propiedades raíz** diseñada como proyecto de demostración de **arquitectura hexagonal, DDD (Domain-Driven Design) y CQRS** en el desarrollo frontend.

## 📚 Documentación Completa

Para obtener información detallada sobre instalación, configuración, arquitectura y contribución:

### 📖 **Documentación Principal**

👉 **[Ir a la Documentación Completa](documentation/real-estate-app.md)**

### 🌐 **Recursos Adicionales**

- 🤖 [Documentación automática Deepwiki](https://deepwiki.com/jagoqui/real-estate-app)
- 🚀 [Servidor remoto](https://real-estate-app-hex.netlify.app/)

---

## 🎯 Resumen del Proyecto

Este proyecto demuestra la implementación de:

- ✅ **Buenas prácticas** de desarrollo frontend
- 🏗️ **Arquitectura hexagonal** adaptada al frontend
- 🎯 **DDD (Domain-Driven Design)** con domain 100% puro
- 📋 **CQRS** (Command Query Responsibility Segregation)
- 🛡️ **Capa anticorrupción** con DTOs, Mappers y Schemas
- 🧪 **Testing** y calidad de código
- 📁 **Organización** estructurada y escalable
- 🔧 **Herramientas** modernas de desarrollo

## 🏗️ Arquitectura

### Capas Principales

```bash
domain → application → infrastructure → presentation
```

- **Domain (🎯)**: Núcleo 100% puro - Models, Inputs, Repository Interfaces
- **Application (📋)**: Commands que extienden Inputs con lógica de aplicación
- **Infrastructure (🔧)**: Schemas (Zod), DTOs, Mappers, Actions, Repository Implementations
- **Presentation (⚛️)**: Components, Hooks, Contexts (React)

### Flujo de Datos

```bash
Model → Schema → Repository → Input → Command → Action →
Repository Impl → Hook Repository → Hook TanStack → Component →
Layout → Container → Module Route → App Route → main.tsx
```

👉 **[Ver Documentación Completa de Arquitectura](documentation/shared/hexagonal-architecture.md)**

## 🚀 Stack Tecnológico

- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS** + **Radix UI**
- **TanStack** (Query, Router, Table)
- **Zod** (validación en infrastructure)
- **react-hook-form** + **zodResolver**
- **Vitest** + **Testing Library**
- **ESLint** (con reglas custom de arquitectura) + **Prettier** + **Husky**

## 🏗️ Características Principales

- **Gestión de propiedades**: CRUD completo de bienes raíces
- **Arquitectura hexagonal + DDD + CQRS**: 4 capas bien definidas con flujo controlado
- **Domain 100% puro**: Sin dependencias externas (React, Zod, etc.)
- **Capa anticorrupción**: DTOs, Mappers, Schemas protegen el dominio
- **Type-safe routing**: Navegación con validación de tipos
- **Formularios avanzados**: Con react-hook-form y zodResolver
- **Testing completo**: Cobertura de código y testing automático
- **ESLint custom rules**: Valida arquitectura automáticamente

---

## 🤝 Contribuir al Proyecto

¿Quieres contribuir? Revisa las guías completas de contribución, workflow de desarrollo y cómo reportar issues en:

👉 **[Guía de Contribución](documentation/real-estate-app.md#contribución)**

---

## 📞 Información del Proyecto

- **Desarrollador**: [Jagoqui](https://github.com/jagoqui)
- **Repository**: <https://github.com/jagoqui/real-estate-app>
- **Issues**: <https://github.com/jagoqui/real-estate-app/issues>

---

⭐ **¡No olvides dar una estrella al proyecto si te fue útil!**

📖 **Para información detallada, consulta la [Documentación Completa](documentation/real-estate-app.md)**

[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/jagoqui/real-estate-app)
