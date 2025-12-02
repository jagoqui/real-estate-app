# Refactorización de Arquitectura Hexagonal - Módulo Owners

## Resumen

Se refactorizó el módulo `owners` del proyecto para seguir el patrón de arquitectura hexagonal utilizado en el módulo `users`, eliminando el uso de contratos y requests en favor de repositorios e inputs.

## Cambios Realizados

### 1. Capa de Dominio (Domain Layer)

#### Inputs Creados

- **`owner.input.ts`**: Define las interfaces de entrada para las operaciones:
  - `CreateOwnerInput`: Input para crear un owner
  - `UpdateOwnerInput`: Input para actualizar un owner

#### Repositorios Creados

- **`owner.repository.ts`**: Define la interfaz del repositorio con los siguientes métodos:
  - `create(input: CreateOwnerInput): Promise<Owner>`
  - `getAll(): Promise<Array<Owner>>`
  - `getById(ownerId: string): Promise<Owner>`
  - `getByUserId(userId: string): Promise<Array<Owner>>`
  - `getPropertiesCountByOwnerId(ownerId: string): Promise<number>`
  - `update(input: UpdateOwnerInput): Promise<Owner>`
  - `delete(ownerId: string): Promise<void>`

### 2. Capa de Infraestructura (Infrastructure Layer)

#### Constantes

- **`owner-endpoints.constants.ts`**: Define los endpoints de la API

#### Acciones del Repositorio

Creadas en `infrastructure/repositories/actions/owners/`:

1. **`create-owner/create-owner.action.ts`**: Implementa la creación de owners
2. **`get-owners/get-owners.action.ts`**: Implementa la obtención de todos los owners
3. **`get-owner-by-id/get-owner-by-id.action.ts`**: Implementa la obtención de un owner por ID
4. **`get-owner-by-user-id/get-owner-by-user-id.action.ts`**: Implementa la obtención de owners por user ID
5. **`get-properties-count-by-owner-id/get-properties-count-by-owner-id.action.ts`**: Implementa el conteo de propiedades
6. **`update-owner/update-owner.action.ts`**: Implementa la actualización de owners
7. **`delete-owner/delete-owner.action.ts`**: Implementa la eliminación de owners

#### Implementación del Repositorio

- **`owner.repository.impl.ts`**: Implementa la interfaz `OwnerRepository` utilizando las acciones creadas

### 3. Capa de Presentación (Presentation Layer)

#### Hooks Refactorizados

Creados en `presentation/react/hooks/owners/`:

1. **`use-create-owner/use-create-owner.ts`**: Hook para crear owners
2. **`use-get-owners/use-get-owners.ts`**: Hook para obtener todos los owners
3. **`use-get-owner-by-id/use-get-owner-by-id.ts`**: Hook para obtener un owner por ID
4. **`use-get-owner-by-user-id/use-get-owner-by-user-id.ts`**: Hook para obtener owners por user ID
5. **`use-get-properties-count-by-owner-id/use-get-properties-count-by-owner-id.ts`**: Hook para obtener el conteo de propiedades
6. **`use-update-owner/use-update-owner.ts`**: Hook para actualizar owners
7. **`use-delete-owner/use-delete-owner.ts`**: Hook para eliminar owners

## Ventajas de la Refactorización

### 1. Cumplimiento de la Regla de Dependencias

- ✅ **Domain** → No depende de nada (solo tipos locales y del shared module)
- ✅ **Infrastructure** → Depende de Domain
- ✅ **Presentation** → Depende de Infrastructure (a través de la implementación del repositorio)

### 2. Mejoras en el Código

- **Eliminación de Context Providers**: Ya no es necesario usar context para compartir requests
- **Hooks más simples**: Los hooks usan directamente el repositorio implementado
- **Mejor testabilidad**: Las acciones son funciones puras fáciles de testear
- **Separación de responsabilidades**: Cada capa tiene una responsabilidad clara

### 3. Consistencia con el Módulo Users

- Ambos módulos ahora siguen el mismo patrón de arquitectura
- Facilita el mantenimiento y comprensión del código
- Establece un estándar para futuros módulos

## Arquitectura Resultante

```
domain/
├── inputs/
│   ├── user.input.ts        ✅ (existente)
│   └── owner.input.ts       ✅ (nuevo)
└── repositories/
    ├── user.repository.ts   ✅ (existente)
    └── owner.repository.ts  ✅ (nuevo)

infrastructure/
├── constants/
│   ├── user-endpoints.constants.ts   ✅ (existente)
│   └── owner-endpoints.constants.ts  ✅ (nuevo)
└── repositories/
    └── actions/
        ├── users/
        │   ├── create-user/...       ✅ (existente)
        │   └── user.repository.impl.ts ✅ (existente)
        └── owners/
            ├── create-owner/...      ✅ (nuevo)
            └── owner.repository.impl.ts ✅ (nuevo)

presentation/
└── react/
    └── hooks/
        ├── users/
        │   └── use-create-user/...   ✅ (existente)
        └── owners/
            └── use-create-owner/...  ✅ (nuevo)
```

## Próximos Pasos

Para completar la refactorización del proyecto, se recomienda aplicar el mismo patrón a:

1. **Módulo Properties**: Migrar de `properties-requests.contract.ts` a repositorios e inputs
2. **Módulo Auth**: Migrar de `auth-requests.contract.ts` a repositorios e inputs

Una vez completado, se podrán eliminar:

- Los archivos de contratos en `domain/contracts/`
- Los archivos de requests en `infrastructure/requests/`
- Los context providers de requests en `presentation/react/contexts/*-requests/`

## Validación

✅ Linter: Sin errores
✅ Build: Compilación exitosa
✅ Arquitectura: Cumple con la regla de dependencias hexagonal
