# Sueño Infantil — Next.js + Sanity

Proyecto: Blog estático y optimizado para SEO, deploy en Cloudflare Pages.

## Requisitos
- Node 18+
- Cuenta de Sanity (proyecto + dataset)

## Variables de entorno
Crea un `.env.local` con:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=...
```

## Scripts
- `npm run dev` — entorno de desarrollo
- `npm run build` — compilar
- `npm run export` — compilar y exportar (para Cloudflare Pages)

## Notas
- `next.config.js` tiene `output: 'export'` y `images.unoptimized=true` (usamos CDN de Sanity).
- Para la editora: usa Sanity Studio y en el bloque `body` añade `Affiliate Product` para promociones y `Ad Space` para colocar anuncios programáticos.

## Despliegue (Cloudflare Pages)
1. Conecta tu repo a Cloudflare Pages.
2. Setea el comando de build a `npm run export` y la carpeta de output a `out`.
3. Añade variables de entorno para Sanity (`NEXT_PUBLIC_SANITY_PROJECT_ID` y `NEXT_PUBLIC_SANITY_DATASET`) en el panel de Pages.
4. Para actualizaciones automáticas al publicar en Sanity, configura un webhook en tu proyecto de Sanity que dispare un nuevo deploy en Cloudflare Pages (ver `docs/webhooks.md` para pasos y opciones avanzadas).

### Previews (rama `preview`)
- Crea una rama `preview` en el repo y configura un deployment en Cloudflare Pages para esa rama.
- En la sección **Environment variables (Preview)** añade `BUILD_PREVIEW=true` (esto hace que la build incluya borradores desde Sanity).
- Opcional: añade `CF_PREVIEW_DEPLOY_HOOK_URL` como Secret en GitHub para que el workflow `trigger-preview-deploy.yml` dispare manualmente el deploy cuando se haga push a `preview`.

## Privacidad y divulgaciones
- Añade un aviso de política de privacidad y una declaración de afiliados en el footer del sitio.
- Evita insertar JS de terceros directamente desde el CMS; usa un Tag Manager controlado y revisado por el equipo.

