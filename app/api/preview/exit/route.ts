import { NextResponse } from 'next/server';
import { draftMode } from 'next/headers';

export async function GET(req: Request) {
  draftMode().disable();
  return NextResponse.redirect(new URL('/', req.url));
}
