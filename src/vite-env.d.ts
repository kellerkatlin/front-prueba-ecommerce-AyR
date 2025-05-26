/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  // agrega aquí otros .env si los usas
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
