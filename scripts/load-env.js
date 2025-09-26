// index.js (o tu archivo de inicio)

import dotenv from 'dotenv';
import path from 'path';
import {fileURLToPath} from 'url';

// 1. Configuración de rutas para módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 2. Define el entorno actual (ej. 'development', 'production').
// Esto permite buscar archivos como: /environments/.env.development
const NODE_ENV = process.env.NODE_ENV || 'development';

// 3. Construye la ruta al archivo de entorno dentro del folder 'environments'.
// Buscará: ./environments/.env.development
const envFileName = `.env.${NODE_ENV}`;
const envPath = path.resolve(__dirname, 'environments', envFileName);

// 4. Carga las variables de entorno
const result = dotenv.config({path: envPath});

if (result.error && result.error.code === 'ENOENT') {
  // Manejo específico si el archivo NO existe (FileNotFound)
  console.warn(
    `⚠️ Warning: No .env file found at ${envPath}. Relying on system environment variables.`
  );
} else if (result.error) {
  // Manejar otros errores de dotenv
  console.error(`❌ Error al cargar variables de entorno:`, result.error.message);
} else {
  console.log(`🟢 Variables cargadas desde: ${envPath}`);
}
