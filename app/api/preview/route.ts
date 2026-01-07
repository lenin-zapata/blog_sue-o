import { NextResponse } from 'next/server';
import { draftMode } from 'next/headers';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get('secret');
  const slug = searchParams.get('slug') || '';

  if (secret !== process.env.SANITY_PREVIEW_SECRET || !slug) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  (await draftMode()).enable(); 
  return NextResponse.redirect(new URL(`/blog/${slug}`, req.url));
}