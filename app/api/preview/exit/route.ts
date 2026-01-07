import { draftMode } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  // ANTES: draftMode().disable();
  // AHORA: Tienes que esperar la promesa
  (await draftMode()).disable();
  
  return NextResponse.redirect(new URL('/', req.url));
}