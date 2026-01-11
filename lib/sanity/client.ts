import { createClient } from 'next-sanity';

// Eliminamos la importación de './preview' porque causa errores en el build estático

export const client = createClient({
  projectId: 'sdejpl9x',
  dataset: 'production',
  apiVersion: '2025-01-01', // Puedes usar la fecha de hoy
  useCdn: false, // false es mejor para que se actualice rápido cuando publicas
});