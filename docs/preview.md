# Preview Mode (Sanity + Next.js)

Esta guía explica cómo activar el modo `Preview` en Next.js para ver borradores de Sanity localmente y en entornos protegidos.

## Requisitos
- Añade `http://localhost:3000` a CORS Origins en Sanity.
- Añade estas variables en `.env.local`:
  - `SANITY_API_TOKEN` (token read-only para previews)
  - `SANITY_PREVIEW_SECRET` (clave secreta para proteger la ruta de preview)

## Rutas
- Activar preview:
  - GET /api/preview?secret=<SANITY_PREVIEW_SECRET>&slug=<slug-del-post>
- Salir preview:
  - GET /api/preview/exit

## Flujo
1. Abre la URL de preview (ejemplo):
```
http://localhost:3000/api/preview?secret=mi_clave_secreta&slug=mi-post
```
2. La ruta valida el `secret`, activa `draftMode` y redirige a `/blog/mi-post`.
3. La página usa `previewClient` para pedir el contenido sin usar CDN (mostrará drafts).
4. Para salir: visita `/api/preview/exit`.

## Notas de seguridad
- Usa tokens con permisos mínimos (lectura solo) para previews.
- Mantén `SANITY_PREVIEW_SECRET` y `SANITY_API_TOKEN` como secretos en tu entorno de despliegue (Cloudflare Pages Secrets).

## Probar
- Abre un post en Sanity Studio como borrador y visita la ruta de preview con tu `slug`.
- Si la página no muestra cambios, verifica que `SANITY_API_TOKEN` esté correcto y que `SANITY_PREVIEW_SECRET` coincida.
