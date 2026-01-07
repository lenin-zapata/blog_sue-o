import React from 'react';
import { urlFor } from '../lib/sanity/image';
import AffiliateCard from './AffiliateCard';
import AdBanner from './AdBanner';

export const portableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <img src={urlFor(value).width(1200).url()} alt={value.alt || 'Imagen'} className="my-6 w-full rounded-md" />
    ),
    affiliateProduct: ({ value }: any) => (
      <AffiliateCard
        data={{
          productName: value.productName,
          affiliateUrl: value.affiliateUrl,
          image: value.image,
          price: value.price,
          description: value.description,
        }}
      />
    ),
    adSpace: ({ value }: any) => <AdBanner placement={value?.placement} />,
  },
};

export default portableTextComponents;
