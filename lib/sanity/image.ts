import { createImageUrlBuilder } from '@sanity/image-url';

const builder = createImageUrlBuilder({
  projectId: 'sdejpl9x', // <--- IMPORTANTE: Escrito a mano
  dataset: 'production', // <--- IMPORTANTE: Escrito a mano
});

export const urlFor = (source: any) => {
  return builder.image(source);
};