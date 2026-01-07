# Integración Webhook: Sanity → Cloudflare Pages

Esta guía te explica cómo crear un webhook en Sanity que dispare un deploy en Cloudflare Pages cada vez que publiques o actualices un `Post`.

## 1) Crear Deploy Hook en Cloudflare Pages
1. Accede a tu proyecto en Cloudflare Pages.
2. Ve a **Settings > Deployments > Deploy Hooks** (o **Deploys > Deploy Hooks** según la UI).
3. Crea un nuevo Deploy Hook, Nombra por ejemplo: `Sanity - Publish` y copia la URL generada.

## 2) Crear Webhook en Sanity Studio (recomendado)
1. Abre Sanity Studio y ve a **Project Settings > API > Webhooks** (o Settings > API > Webhooks).
2. Crea un nuevo webhook y pega la URL del Deploy Hook de Cloudflare Pages.
3. Configura el Trigger: **Document published** (y opcionalmente Document updated / unpublished).
4. Añade un filtro para que sólo afecte al tipo `post` (si tu UI lo permite), así evitarás despliegues innecesarios.
5. Guarda el webhook.

¡Listo! Ahora cada vez que publiques o actualices un `Post` en Sanity se disparará un deploy en Cloudflare Pages.

## 3) (Opcional) Añadir un header secreto y validación
- Si quieres mayor seguridad, añade un header personalizado desde la configuración del webhook (ej: `X-Hook-Secret: <secret>`).
- Dado que Cloudflare Pages Deploy Hook no valida headers, puedes crear un pequeño endpoint intermedio (Cloudflare Worker) que valide el header y reenvíe al Deploy Hook sólo si coincide. Si quieres, puedo generar un ejemplo de Cloudflare Worker para esto.

## 4) Probar manualmente (curl)
Puedes probar el Deploy Hook manualmente con:

```bash
curl -X POST "https://<your-pages-deploy-hook-url>"
```

O usar el script de ayuda local (descrito abajo).

## 5) Script de ayuda local (trigger)
En el repo hay un script en `scripts/trigger-deploy.js` que envía un POST al Deploy Hook usando la variable de entorno `CF_DEPLOY_HOOK_URL`.

```bash
# exporta la URL (Windows PowerShell)
$env:CF_DEPLOY_HOOK_URL = "https://..."
node scripts/trigger-deploy.js
```

---
Si quieres, puedo generar también el ejemplo del Cloudflare Worker para validar el header secreto antes de reenviar al Deploy Hook. ¿Lo generamos ahora? (S/N)