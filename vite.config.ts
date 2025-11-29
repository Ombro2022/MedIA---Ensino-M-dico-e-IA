import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Carrega as variáveis de ambiente baseadas no modo (ex: .env)
  // Cast process to any to avoid "Property 'cwd' does not exist on type 'Process'" type error
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    plugins: [react()],
    define: {
      // Isso permite que o código 'process.env.API_KEY' funcione no navegador,
      // injetando o valor da variável de ambiente durante o build/dev.
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
    },
    server: {
      host: true, // Permite acesso via IP na rede local
    }
  };
});