# 🌊 Flujo de Datos y Patrones de Diseño

[⬅ Regresar al índice](../real-estate-app.md)

Este documento detalla el flujo completo de datos en la aplicación, desde la interacción del usuario hasta la persistencia y vuelta, explicando cada patrón de diseño implementado.

---

## 📊 Visión General del Flujo

El flujo de datos en esta aplicación sigue un patrón unidireccional que atraviesa todas las capas de la arquitectura hexagonal:

```bash
Usuario → Component → Hook Caso de Uso → Repository Hook → 
Repository Impl → Action → API → Response → 
Schema Validation → Mapper → Domain Model → 
TanStack Query Cache → React State → UI Update
```

---

## 🔄 Flujo Detallado por Capa

### 1️⃣ **Presentación: Usuario y Componente**

**Responsabilidad**: Captura de datos del usuario mediante formularios

```tsx
// Component: RegisterForm.tsx (presentation/react/components/)
export const RegisterForm = () => {
  const { onRegister, isPending } = useRegister();
  
  const form = useForm<RegisterCommand>({
    resolver: zodResolver(registerFormValuesSchema),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onRegister)}>
        {/* Campos del formulario */}
      </form>
    </Form>
  );
};
```

**Elementos clave**:

- **react-hook-form**: Gestiona el estado del formulario
- **zodResolver**: Valida datos con schema de Zod
- **RegisterCommand**: Type del formulario (application layer)
- **registerFormValuesSchema**: Schema Zod construido desde Command

---

### 2️⃣ **Validación de Formulario**

**Responsabilidad**: Validar datos antes de enviarlos

```typescript
// Schema: register-form-values.schema.ts (infrastructure/schemas/)
import type { RegisterCommand } from '@/modules/shared/application/commands/register.command';
import z from 'zod';

export const registerFormValuesSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
  role: userRoleSchema,
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
}) satisfies z.ZodType<RegisterCommand>;
```

**Elementos clave**:

- Schema construido en **infrastructure** (no en domain)
- Usa `satisfies z.ZodType<RegisterCommand>` para coherencia de tipos
- Validaciones específicas de UI (ej: confirmPassword)

---

### 3️⃣ **Hook de Caso de Uso**

**Responsabilidad**: Orquestar la operación específica con TanStack Query

```typescript
// Hook: useRegister.tsx (presentation/react/hooks/)
export const useRegister = (): UseRegisterReturn => {
  const authRepository = useAuthRepository();

  const { mutate, isPending, error, data } = useMutation({
    mutationKey: ['register'],
    mutationFn: (args) => authRepository.register(args),
    onSuccess: () => {
      toast.success('Registration successful!');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { onRegister: mutate, isPending, error, data };
};
```

**Elementos clave**:

- **useMutation** de TanStack Query: Gestiona estado de la petición
- **authRepository**: Hook que encapsula la implementación
- **Manejo de UI**: toast notifications, loading states
- **Cache invalidation**: TanStack Query gestiona automáticamente

---

### 4️⃣ **Repository Hook (Wrapper)**

**Responsabilidad**: Añadir lógica de presentación sobre el repository

```typescript
// Hook: useAuthRepository.ts (presentation/react/hooks/)
export const useAuthRepository = (): AuthRepository => {
  const { setAuthResponse } = useAuthResponseContext();
  const router = useRouter();

  const onSuccessLogin = (auth: Auth): void => {
    setAuthResponse(auth); // Actualiza contexto global
    router.navigate({ to: '/dashboard' }); // Navega
  };

  return {
    register: async (args): Promise<Auth> =>
      asyncFunctionValidationWrapper({
        fn: () => authRepositoryImpl.register(args),
        args,
        onSuccess: onSuccessLogin,
        onError: () => setAuthResponse(null),
      }),
    // ... otros métodos
  };
};
```

**Elementos clave**:

- **Wrapper pattern**: Añade comportamiento sin modificar implementación
- **Side effects de UI**: navegación, estado global, notificaciones
- **Separation of concerns**: lógica de UI separada de lógica de datos

---

### 5️⃣ **Repository Implementation**

**Responsabilidad**: Componer las actions específicas

```typescript
// Repository Impl: auth.repository.impl.ts (infrastructure/repositories/)
import type { AuthRepository } from '@/modules/shared/domain/repositories/auth.repository';
import { registerAction } from './register/register.action';
import { loginWithEmailAndPasswordAction } from './login-with-email-and-password/login-with-email-and-password.action';

export const authRepositoryImpl: AuthRepository = {
  register: registerAction,
  loginWithEmailAndPassword: loginWithEmailAndPasswordAction,
  loginWithGoogle: loginWithGoogleAction,
  refreshToken: refreshTokenAction,
  logout: logoutAction,
};
```

**Elementos clave**:

- Implementa **interface del domain** (`AuthRepository`)
- **Composition pattern**: compone actions atómicas
- **Single Responsibility**: cada action hace una cosa

---

### 6️⃣ **Action (Operación HTTP)**

**Responsabilidad**: Ejecutar la petición HTTP específica

```typescript
// Action: register.action.ts (infrastructure/repositories/actions/auth/)
import type { RegisterInput } from '@/modules/shared/domain/inputs/auth.input';
import type { Auth } from '@/modules/shared/domain/models/auth.model';
import { api } from '@/modules/shared/infrastructure/http/clients/ky/ky.client';
import { authResponseSchema } from '@/modules/shared/infrastructure/schemas/auth-response.schema';
import { mapAuthResponseToModel } from '@/modules/shared/infrastructure/mappers/auth-response/auth-response.mapper';

export const registerAction = async (input: RegisterInput): Promise<Auth> => {
  // 1. HTTP Request con DTO
  const authResponseDto = await api
    .post<AuthResponseDto>(REGISTER_ACTION_URL, { json: input })
    .json();

  // 2. Validar con schema
  const validAuthResponseDto = authResponseSchema.parse(authResponseDto);

  // 3. Mapper: DTO → Model
  return mapAuthResponseToModel(validAuthResponseDto);
};
```

**Elementos clave**:

- Recibe **Input** del domain (contrato puro)
- Retorna **Model** del domain (entidad pura)
- Usa **DTO** para comunicación externa
- **Schema validation**: garantiza integridad de datos
- **Mapper**: transforma DTO a Model (capa anticorrupción)

---

### 7️⃣ **Schema Validation (Capa Anticorrupción)**

**Responsabilidad**: Validar y garantizar estructura de datos externos

```typescript
// Schema: auth-response.schema.ts (infrastructure/schemas/)
import z from 'zod';
import type { Auth } from '@/modules/shared/domain/models/auth.model';

export const authResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  user: userSchema,
}) satisfies z.ZodType<Auth>;
```

**Elementos clave**:

- Construido desde **Model del domain**
- Usa `satisfies z.ZodType<Auth>` para coherencia
- **Validación runtime**: protege de cambios inesperados en API
- **Type-safety**: garantiza que DTO cumple con Model

---

### 8️⃣ **Mapper (Transformación)**

**Responsabilidad**: Transformar DTO externo a Model del domain

```typescript
// Mapper: auth-response.mapper.ts (infrastructure/mappers/)
import type { AuthResponseDto } from '../../dtos/auth-response.dto';
import type { Auth } from '@/modules/shared/domain/models/auth.model';

export const mapAuthResponseToModel = (dto: AuthResponseDto): Auth => ({
  accessToken: dto.access_token, // snake_case → camelCase
  refreshToken: dto.refresh_token,
  user: mapUserDtoToModel(dto.user),
});
```

**Elementos clave**:

- **Capa anticorrupción**: protege domain de cambios en API
- **Transformación de nomenclatura**: snake_case → camelCase
- **Transformación de estructura**: aplanamiento, anidación, etc.
- **Inmutabilidad**: no modifica DTO original

---

### 9️⃣ **Domain Entities**

**Responsabilidad**: Definir estructura pura del negocio

```typescript
// Model: auth.model.ts (domain/models/)
export interface Auth {
  accessToken: string;
  refreshToken: string;
  user: User;
}

// Input: auth.input.ts (domain/inputs/)
export interface RegisterInput {
  email: string;
  name: string;
  password: string;
  role: UserRole;
}

// Repository: auth.repository.ts (domain/repositories/)
export interface AuthRepository {
  register(input: RegisterInput): Promise<Auth>;
  loginWithEmailAndPassword(input: LoginWithEmailAndPasswordInput): Promise<Auth>;
  // ...
}
```

**Elementos clave**:

- **100% puro**: sin dependencias externas
- **Interfaces TypeScript**: solo contratos
- **Models**: entidades del negocio
- **Inputs**: contratos de entrada (CQRS)
- **Repositories**: ports (interfaces)

---

### 🔟 **Application Commands**

**Responsabilidad**: Extender inputs con datos específicos de UI

```typescript
// Command: register.command.ts (application/commands/)
import type { RegisterInput } from '../../domain/inputs/auth.input';

export type RegisterCommand = RegisterInput & {
  confirmPassword: string; // Campo adicional para UI
};
```

**Elementos clave**:

- **Extiende Input del domain**: añade campos de aplicación
- Usado en **formularios de UI**
- **Separación de responsabilidades**: domain no conoce UI
- Base para schemas de validación de formularios

---

## 🎯 Patrones de Diseño Implementados

### 1. **Repository Pattern**

**Objetivo**: Abstraer la lógica de acceso a datos

```bash
Interface (domain) ← Implementation (infrastructure)
```

**Beneficios**:

- ✅ Testabilidad: mockear repositorios fácilmente
- ✅ Intercambiabilidad: cambiar implementación sin afectar domain
- ✅ Separación de responsabilidades

### 2. **CQRS (Command Query Responsibility Segregation)**

**Objetivo**: Separar operaciones de lectura y escritura

```bash
Commands (application) ← Inputs (domain)
Queries → Repositories → Models
```

**Beneficios**:

- ✅ Claridad: comandos vs consultas bien definidos
- ✅ Extensibilidad: commands pueden tener lógica adicional
- ✅ Optimización: separar lecturas de escrituras

### 3. **Adapter Pattern (Ports & Adapters)**

**Objetivo**: Desacoplar domain de implementaciones externas

```bash
Domain (ports/interfaces) ← Infrastructure (adapters/implementations)
```

**Beneficios**:

- ✅ Flexibilidad: cambiar providers sin afectar domain
- ✅ Testing: mockear adapters fácilmente
- ✅ Independencia: domain no conoce detalles técnicos

### 4. **Anti-Corruption Layer (Capa Anticorrupción)**

**Objetivo**: Proteger domain de cambios en sistemas externos

```bash
API Response (DTO) → Schema Validation → Mapper → Domain Model
```

**Componentes**:

- **DTOs**: Estructura de datos externa
- **Schemas**: Validación runtime
- **Mappers**: Transformación DTO → Model

**Beneficios**:

- ✅ Protección: cambios en API no afectan domain
- ✅ Validación: garantiza integridad de datos
- ✅ Transformación: nomenclatura, estructura, tipos

### 5. **Wrapper Pattern**

**Objetivo**: Añadir comportamiento sin modificar código original

```typescript
useAuthRepository → wraps → authRepositoryImpl
```

**Beneficios**:

- ✅ Side effects de UI: navegación, notificaciones, estado
- ✅ No invasivo: no modifica implementación original
- ✅ Reusabilidad: misma implementación, múltiples wrappers

### 6. **Dependency Inversion Principle**

**Objetivo**: Depender de abstracciones, no de implementaciones

```bash
High-level (domain) → Abstractions ← Low-level (infrastructure)
```

**Beneficios**:

- ✅ Testabilidad: inyectar mocks fácilmente
- ✅ Flexibilidad: cambiar implementaciones
- ✅ Desacoplamiento: capas independientes

---

## 🔀 Comparación: Antes vs Después

### ❌ Antes (Arquitectura Acoplada)

```typescript
// Component haciendo todo
const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      // ❌ Lógica de validación en component
      if (data.password !== data.confirmPassword) {
        toast.error("Passwords don't match");
        return;
      }
      
      // ❌ HTTP request directo en component
      const response = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      
      // ❌ Transformación manual de datos
      const auth = {
        accessToken: response.access_token,
        refreshToken: response.refresh_token,
      };
      
      // ❌ Manejo de estado global en component
      setAuthResponse(auth);
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  return <form onSubmit={handleSubmit}>...</form>;
};
```

**Problemas**:

- ❌ Component con múltiples responsabilidades
- ❌ Lógica de negocio mezclada con UI
- ❌ Difícil de testear
- ❌ No reutilizable
- ❌ Acoplado a implementaciones específicas

### ✅ Después (Arquitectura Hexagonal)

```typescript
// Component solo renderiza
const RegisterForm = () => {
  const { onRegister, isPending } = useRegister();
  
  const form = useForm<RegisterCommand>({
    resolver: zodResolver(registerFormValuesSchema),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onRegister)}>
        {/* UI pura */}
      </form>
    </Form>
  );
};
```

**Beneficios**:

- ✅ Component solo responsable de UI
- ✅ Lógica en capas apropiadas
- ✅ Fácil de testear cada capa
- ✅ Reutilizable (hook, repository, etc.)
- ✅ Desacoplado de implementaciones

---

## 📋 Checklist para Nuevo Flujo de Datos

Cuando implementes una nueva funcionalidad, sigue este checklist:

### 1. Domain Layer

- [ ] Crear **Model** en `domain/models/`
- [ ] Crear **Input** en `domain/inputs/`
- [ ] Definir **Repository Interface** en `domain/repositories/`
- [ ] (Opcional) Crear **Helper** si hay lógica pura

### 2. Application Layer

- [ ] (Si necesario) Crear **Command** en `application/commands/`

### 3. Infrastructure Layer

- [ ] Crear **Schema** en `infrastructure/schemas/` (desde Model/Command)
- [ ] Crear **DTO** en `infrastructure/dtos/`
- [ ] Crear **Mapper** en `infrastructure/mappers/`
- [ ] Crear **Action** en `infrastructure/repositories/actions/*/`
- [ ] Añadir action a **Repository Implementation**

### 4. Presentation Layer

- [ ] Crear **Hook Repository** en `presentation/react/hooks/*/use-*-repository.ts`
- [ ] Crear **Hook Caso de Uso** en `presentation/react/hooks/*/use-*.tsx`
- [ ] Crear **Component** en `presentation/react/components/`
- [ ] (Si necesario) Crear **Container** que use el hook

### 5. Validación

- [ ] Tests unitarios de helpers y mappers
- [ ] Tests de integración de actions
- [ ] Tests de hooks con react-testing-library
- [ ] ESLint no muestra errores de arquitectura
- [ ] TypeScript compila sin errores

---

## 🎓 Recursos y Referencias

- [Arquitectura Hexagonal](./hexagonal-architecture.md)
- [Domain-Driven Design (DDD)](https://martinfowler.com/bliki/DomainDrivenDesign.html)
- [CQRS Pattern](https://martinfowler.com/bliki/CQRS.html)
- [Repository Pattern](https://martinfowler.com/eaaCatalog/repository.html)
- [Anti-Corruption Layer](https://learn.microsoft.com/en-us/azure/architecture/patterns/anti-corruption-layer)

[⬅ Regresar al índice](../real-estate-app.md)
