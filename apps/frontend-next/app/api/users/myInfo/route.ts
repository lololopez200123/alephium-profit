import { NextResponse } from 'next/server';
import { parse } from 'cookie';

export async function GET(request: Request) {
  const cookieHeader = request.headers.get('cookie');
  try {
    if (!cookieHeader) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const cookies = parse(cookieHeader);
    const jwt = cookies[process.env.JWT_COOKIE_NAME || 'jwt'];

    if (!jwt) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const res = await fetch(`${process.env.BACKEND_BASE_URL}/users/my-info`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json({ message: errorData.message || 'Failed to get my info' }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error getting myInfo:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
