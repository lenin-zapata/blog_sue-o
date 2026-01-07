import React from 'react';
import { urlFor } from '../lib/sanity/image';

type Affiliate = {
  productName: string;
  affiliateUrl: string;
  image?: any;
  price?: string;
  description?: string;
};

export default function AffiliateCard({ data }: { data: Affiliate }) {
  return (
    <article className="max-w-md w-full bg-white rounded-xl shadow-sm border border-gray-100 p-4 my-6 mx-auto">
      <div className="flex gap-4">
        {data.image ? (
          <img
            src={urlFor(data.image).width(300).height(300).fit('crop').url()}
            alt={data.productName}
            className="w-24 h-24 object-cover rounded-md"
          />
        ) : null}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800">{data.productName}</h3>
          {data.price ? <p className="text-lilac-500 font-medium mt-1">{data.price}</p> : null}
          {data.description ? <p className="text-sm text-gray-600 mt-2">{data.description}</p> : null}
          <div className="mt-3">
            <a
              href={data.affiliateUrl}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="inline-block bg-lilac-500 hover:bg-lilac-600 text-white px-4 py-2 rounded-md text-sm shadow-sm"
            >
              Ver en Amazon
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
