import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const targetUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}${url.pathname}${url.search}`;

  const response = await fetch(targetUrl, {
    headers: request.headers,
    method: request.method,
  });

  return NextResponse.json(await response.json());
}

export async function POST(request: NextRequest) {
  // Similar al GET, pero incluye el body
  const body = await request.json();
  console.log(body);
  // ... lógica similar al GET
}

// Repite para otros métodos HTTP según sea necesario
