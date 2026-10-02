import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  // Define a porta do servidor de forma segura
  const port = env.VITE_PORT ? parseInt(env.VITE_PORT) : 5173;

  // O HMR deve sempre espelhar a porta do servidor por padrão em ambiente local, e não 443
  const hmrPort = env.VITE_HMR_PORT ? parseInt(env.VITE_HMR_PORT) : port;

  return {
    plugins: [react()],
    server: {
      host: env.VITE_HOST || "0.0.0.0", // Fallback seguro para Docker
      port: port,
      strictPort: true, // Evita que o Vite tente outra porta se esta estiver ocupada

      hmr: {
        clientPort: hmrPort,
        host: env.VITE_HMR_HOST || "localhost",
      },
    },
    // Garante que o build saiba onde os arquivos serão servidos (útil em produção)
    base: env.VITE_BASE_PATH || "./",
  };
});