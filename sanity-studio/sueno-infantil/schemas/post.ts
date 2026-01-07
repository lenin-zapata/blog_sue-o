export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    { name: 'title', title: 'Título', type: 'string' },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
    },
    { name: 'excerpt', title: 'Extracto', type: 'text' },
    { name: 'mainImage', title: 'Imagen principal', type: 'image', options: { hotspot: true } },
    { name: 'publishedAt', title: 'Fecha', type: 'datetime' },
    {
      name: 'body',
      title: 'Contenido',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image' },
        { type: 'affiliateProduct' },
        { type: 'adSpace' }
      ],
    },
  ],
};
