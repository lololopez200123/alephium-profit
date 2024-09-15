import { NextResponse } from 'next/server';

export async function GET() {
  // Lógica para obtener usuarios
  return NextResponse.json({ users: [] });
}

export async function POST(request: Request) {
  const body = await request.json();
  console.log(body);
  // Lógica para crear un usuario
  return NextResponse.json({ message: 'Usuario creado' });
}
