import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  envDir:
    mode === "production"
      ? path.resolve(__dirname, "")
      : path.resolve(__dirname, "environments"),
}));

//TODO: Pendiente validar envs con zod
