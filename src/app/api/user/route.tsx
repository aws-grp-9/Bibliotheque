import { NextResponse } from 'next/server';
import { getUsers , createUser } from '@/lib/db/db_users';

export async function GET(request: Request) {
    let limit = request.headers.get('numberUsers');
    if (limit === null) {
      limit = '10';
    }
    const result = await getUsers(parseInt(limit));
    if (result.success === false) {
      return NextResponse.json({
        message: result.message,
      }, {status: 500});
    }

    return NextResponse.json({
      result : result.message
    }, {status: 200});
}

export async function POST(request: Request) {
    const data = await request.json();
    const { creation_date, email, name } = data;
    const result = await createUser(creation_date, email, name);
    if (result.success === false) {
      return NextResponse.json({
        message:result.message,
      }, {status: 500});
    }
    return NextResponse.json({
      result : result.message
    }, {status: 200});
}