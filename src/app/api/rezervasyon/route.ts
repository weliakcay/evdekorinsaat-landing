import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  console.log('Rezervasyon isteği alındı', body);
  return NextResponse.json({ success: true });
}
