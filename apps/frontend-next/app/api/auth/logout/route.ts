import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: 'Logout successful' }, { status: 200 });

  // Delete cookie configuring your expiration in the past
  response.cookies.set({
    name: process.env.JWT_COOKIE_NAME || 'jwt',
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(0),
    path: '/',
    sameSite: 'strict',
  });

  return response;
}
