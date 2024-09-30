import { NextResponse } from 'next/server';
import { parse } from 'cookie';

export async function POST(request: Request) {
  try {
    const { coin } = await request.json();

    const cookieHeader = request.headers.get('cookie');
    if (!cookieHeader) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const cookies = parse(cookieHeader);
    const jwt = cookies[process.env.JWT_COOKIE_NAME || 'jwt'];

    if (!jwt) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const res = await fetch(`${process.env.BACKEND_BASE_URL}/users/favorite-coin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({ coin }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json({ message: errorData.message || 'Failed to add favorite coin' }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error adding favorite coin:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
