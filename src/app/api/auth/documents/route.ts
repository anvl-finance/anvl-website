import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    const correctPassword = process.env.DOCUMENTS_PASSWORD;

    if (!correctPassword) {
      return NextResponse.json(
        { error: 'Document access is not configured.' },
        { status: 503 }
      );
    }

    if (password === correctPassword) {
      const response = NextResponse.json({ success: true });
      response.cookies.set('anvl_docs_access', 'granted', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/documents',
      });
      return response;
    }

    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete('anvl_docs_access');
  return response;
}
