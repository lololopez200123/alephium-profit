import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { address, publicKey } = await request.json();

    const res = await fetch(`${process.env.BACKEND_BASE_URL}/auth/sign`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ address, publicKey }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json({ message: errorData.message || 'Failed to authenticate' }, { status: res.status });
    }

    const data = await res.json();

    const jwt = data.jwt;

    const response = NextResponse.json({ message: 'Login successful', data }, { status: 200 });

    response.cookies.set({
      name: process.env.JWT_COOKIE_NAME || 'jwt',
      value: jwt,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: Number(process.env.JWT_COOKIE_MAX_AGE) || 604800, // 1 week by default
      path: '/',
      sameSite: 'strict',
    });

    return response;
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
