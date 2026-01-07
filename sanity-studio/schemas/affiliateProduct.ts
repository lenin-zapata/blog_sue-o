export default {
  name: 'affiliateProduct',
  title: 'Affiliate Product',
  type: 'object',
  fields: [
    { name: 'productName', title: 'Nombre del producto', type: 'string' },
    {
      name: 'affiliateUrl',
      title: 'URL de afiliado',
      type: 'url',
      validation: (Rule: any) => Rule.uri({ allowRelative: false, scheme: ['http', 'https'] }),
    },
    { name: 'image', title: 'Imagen', type: 'image', options: { hotspot: true } },
    { name: 'price', title: 'Precio (opcional)', type: 'string' },
    { name: 'description', title: 'Descripción breve', type: 'text' },
  ],
  preview: {
    select: {
      title: 'productName',
      media: 'image',
    },
  },
};
