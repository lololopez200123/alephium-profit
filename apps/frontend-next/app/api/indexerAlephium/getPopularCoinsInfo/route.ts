import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch(`${process.env.BACKEND_BASE_URL}/indexer-alephium/get-popular-coins-info`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json({ message: errorData.message || 'Failed to retrieve popular coins info' }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error retrieving popular coins info:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
