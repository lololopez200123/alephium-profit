import { NextResponse } from 'next/server';
import { parse } from 'cookie';

export async function GET(request: Request) {
  try {
    const cookieHeader = request.headers.get('cookie');
    if (!cookieHeader) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const cookies = parse(cookieHeader);
    const jwt = cookies[process.env.JWT_COOKIE_NAME || 'jwt'];

    if (!jwt) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const res = await fetch(`${process.env.BACKEND_BASE_URL}/indexer-alephium/my-balance`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    });

    console.log('Backend response:', res);

    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json({ message: errorData.message || 'Failed to retrieve balance' }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error retrieving balance:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
