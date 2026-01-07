# Cloudflare Pages — Deploy & Preview (configuración recomendada)

Esta guía explica cómo configurar Cloudflare Pages para desplegar tu sitio estático y habilitar *build-time previews* para ver borradores desde Sanity.

## Opciones recomendadas
1. **Producción (main)**
   - Conecta tu repo y configura el build command: `npm run export` y Output dir: `out`.
   - Añade variables: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`.
   - (Opcional) Añade `CF_DEPLOY_HOOK_URL` como Secret en GitHub Actions para usar el workflow `trigger-pages-deploy.yml`.

2. **Preview (branch: preview)**
   - Crea una rama `preview` en tu repo.
   - En Cloudflare Pages, crea una nueva Deployment (o configurar el mismo proyecto para seguir la rama `preview`) y en **Environment variables (Preview)** añade:
     - `BUILD_PREVIEW=true`  <-- CRÍTICO: esto hace que nuestro build use `previewClient` y genere HTML con borradores
     - `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`
   - (Opcional) añade `CF_PREVIEW_DEPLOY_HOOK_URL` como Secret en GitHub Actions para que el workflow `trigger-preview-deploy.yml` dispare un deploy al hacer push a `preview`.

## Notas técnicas
- `BUILD_PREVIEW=true` hace que durante la build se use `previewClient` (token y `useCdn: false`) y se incluya contenido no publicado en el HTML estático.
- Esto **expone** el contenido incluido en la build públicamente. Usa sólo en ramas protegidas o revisadas.
- Para una preview privada puedes usar protección por contraseña / acceso controlado en Cloudflare o un proyecto privado.

## Webhooks
- Crear Deploy Hook en Cloudflare Pages (Deploys > Deploy Hooks) y pegar la URL en Sanity Webhooks para que al publicar se dispare la build.
- Para previews, crea otro Deploy Hook específico o configura Cloudflare para construir la rama `preview` automáticamente.

## GitHub Actions
- En `.github/workflows/` añadimos dos workflows que envían un POST a los Deploy Hooks (`CF_DEPLOY_HOOK_URL`, `CF_PREVIEW_DEPLOY_HOOK_URL`) cuando hay push a `main` y a `preview`.
- Añade los secretos en GitHub (Settings > Secrets):
  - `CF_DEPLOY_HOOK_URL` (opcional)
  - `CF_PREVIEW_DEPLOY_HOOK_URL` (opcional)

---
Si quieres, puedo crear la rama `preview`, hacer un commit de prueba y pushearla para disparar el workflow de preview (necesitarás añadir `CF_PREVIEW_DEPLOY_HOOK_URL` como secret en GitHub para que el workflow lo use). ¿Hago eso ahora? (S/N)