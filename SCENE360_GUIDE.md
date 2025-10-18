# Scene360Editor - Guía de Uso

## ¿Qué hay de nuevo?

El Scene360Editor ha sido completamente redesñado con una nueva arquitectura que permite:

### Estructura Jerárquica: Views → Scenes → Hotspots

- **Views 360°**: Diferentes vistas o áreas (ej: "Living Room", "Kitchen", "Bedroom")
- **Scenes**: Múltiples escenas por vista (diferentes ángulos o momentos)
- **Hotspots**: Puntos de interés dentro de cada escena

### Funcionalidades Principales

#### 1. Gestión de Vistas

- **Agregar Vista**: Botón "Add View" para crear una nueva vista 360°
- **Navegación entre Vistas**: Tabs en la parte superior para cambiar entre vistas
- **Eliminar Vista**: Botón de eliminar en cada tab de vista

#### 2. Gestión de Escenas

- **Agregar Escenas**: Botón "Add Scenes" para subir imágenes 360° (drag & drop soportado)
- **Grid de Escenas**: Visualización en cuadrícula de todas las escenas de la vista actual
- **Selección de Escena**: Click en cualquier escena para visualizarla en el preview

#### 3. Modos de Interacción

- **Modo Navegación**: Para explorar la vista 360° (drag para rotar, scroll para zoom)
- **Modo Add Hotspot**: Para agregar puntos de interés clickeando en la vista

#### 4. Preview Interactivo

- **Navegación 360°**: Arrastra el mouse para mirar alrededor
- **Zoom**: Usa la rueda del mouse para acercar/alejar
- **Fullscreen**: Botón para ver en pantalla completa
- **Responsive**: Se adapta al tamaño del contenedor

### Problemas Conocidos y Soluciones

#### Preview Negro

Si el preview aparece negro, posibles causas:

1. **Formato de Imagen**: Solo imágenes 360° panorámicas (aspect ratio 2:1)
2. **Tamaño de Archivo**: Imágenes muy grandes pueden tardar en cargar
3. **Formato de Archivo**: Usa JPG o PNG
4. **Base64 Data URL**: Las imágenes se convierten automáticamente

#### Debug Console

El componente incluye logs detallados en la consola del navegador:

- 🎬 Inicialización de Three.js
- 📊 Progreso de carga de texturas
- ❌ Errores de carga de imágenes
- 🖱️ Eventos de interacción

### Guía de Testing

#### 1. Prueba Básica

1. Abre la aplicación en modo desarrollador (F12 para ver console)
2. Ve a la sección de 360° Views
3. Verifica que aparece la interfaz del Scene360Editor

#### 2. Prueba de Funcionalidad

1. Click en "Add View" para crear una vista
2. Click en "Add Scenes" para subir una imagen 360°
3. Verifica que la imagen aparece en el grid
4. Click en la imagen para seleccionarla
5. Verifica que aparece en el preview

#### 3. Prueba de Navegación

1. En el preview, arrastra el mouse para rotar la vista
2. Usa la rueda del mouse para hacer zoom
3. Cambia entre modo "Navigate" y "Add Hotspot"
4. En modo hotspot, click en el preview para agregar puntos

#### 4. Imágenes de Prueba

Puedes usar imágenes 360° de prueba de:

- Google Street View (descarga panorámicas)
- Ricoh Theta samples
- Cualquier imagen panorámica con aspect ratio 2:1

### Arquitectura Técnica

```typescript
interface View360 {
  id: string;
  name: string;
  scenes: Array<Scene360>;
}

interface Scene360 {
  id: string;
  name: string;
  preview: string; // base64 data URL
  hotspots: Array<Hotspot>;
}

interface Hotspot {
  id: string;
  u: number; // coordenada UV (0-1)
  v: number; // coordenada UV (0-1)
  title?: string;
  description?: string;
  icon?: string;
}
```

### Integración con Parent Component

El Scene360Editor se integra con `propertiesManagement.layout.tsx`:

```typescript
// Estructura de datos actualizada
interface Property {
  // ... otros campos
  views360?: Array<View360>;
}

// Uso del componente
<Scene360Editor
  value={formData.views360 || []}
  onChange={views360 => setFormData({ ...formData, views360 })}
/>
```

### Next Steps

1. **Testing**: Probar con imágenes 360° reales
2. **UI/UX**: Mejorar el diseño visual y feedback
3. **Performance**: Optimizar carga de texturas grandes
4. **Features**: Agregar más tipos de hotspots e interacciones
