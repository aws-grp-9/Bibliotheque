import { NextResponse } from 'next/server';
import { getUsers , createUser , banUser } from '@/lib/db/db_users';

export async function GET(request: Request) {
    let limit = request.headers.get('numberUsers');
    let user_token = request.headers.get('user_token');
    let excluded_ids_string = request.headers.get('excluded_ids');
    let keywords = request.headers.get('keywords');
    const excluded_ids = excluded_ids_string === null ? [] : JSON.parse(excluded_ids_string);
    const { user } = user_token ? await JSON.parse(user_token) : { user: null };

    if (user_token === null || user_token === '') {
      return NextResponse.json({
        message: 'No user token provided',
      }, {status: 500});
    }
    
    if (limit === null) {
      limit = '10';
    }
    const result = await getUsers(user,parseInt(limit),excluded_ids,keywords || '');
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

// for now i dont add the username as changeable
export async function PATCH(request: Request) {
  let user_token = request.headers.get('user_token');
  const { user } = user_token ? await JSON.parse(user_token) : { user: null };
  const data = await request.json();
  const {user_id} = data;
  const result = await banUser(user,user_id);
  if (result.success === false) {
    return NextResponse.json({
      message:result.message,
    }, {status: 500});
  }

  return NextResponse.json({
    result : result.message
  }, {status: 200});
}