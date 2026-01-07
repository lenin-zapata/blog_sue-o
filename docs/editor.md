# Guía rápida para la editora

Bienvenida — esta guía explica cómo crear y publicar posts en Sanity para el blog "Sueño Infantil".

## Crear un Post
1. En Sanity Studio, crea un nuevo documento tipo `Post`.
2. Rellena `Título`, `Slug` (se genera automáticamente desde el título), `Extracto` y `Fecha`.
3. Sube `Imagen principal` para OpenGraph.

## Contenido (campo `body`)
- Usa los bloques de texto para el artículo.
- Para incluir un producto afiliado: añade un bloque `Affiliate Product` y rellena `Nombre del producto`, `URL de afiliado` (Amazon), `Imagen`, `Precio` y `Descripción breve`.
- Para colocar un espacio para publicidad: añade un bloque `Ad Space` donde quieras que aparezca la etiqueta de anuncio.

## Políticas
- Añade `rel="nofollow"` a los enlaces de afiliado (la plantilla de frontend ya lo hace automáticamente).
- Añade una nota de divulgación en cada post si contiene enlaces de afiliado.

## Publicación
- Guarda y publica el documento en Sanity.
- El sitio se actualizará en el próximo build/deploy (Cloudflare Pages) o mediante webhooks si lo configuras.
