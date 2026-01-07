import { createImageUrlBuilder } from '@sanity/image-url';
import { client } from './client';

const builder = createImageUrlBuilder(client as any);

export const urlFor = (source: any) => builder.image(source);
