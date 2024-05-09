import { NextResponse } from 'next/server';
import { updateUser , getInfosUser , deleteUser , getInfosFromEmail} from '@/lib/db/db_users';

export async function GET(request: Request) {
    let user_token_data = request.headers.get('user_token');
    const { user } = user_token_data ? await JSON.parse(user_token_data) : { user: null };
    if (user === null || user === '') {
      return NextResponse.json({
        message: 'No user token provided',
      }, {status: 500});
    }
    // check if the user is the same as the one in the token
    const user_infos = await getInfosFromEmail(user.email);
    if (user_infos.success === false) {
      return NextResponse.json({
        message:user_infos.message,
      }, {status: 500});
    }
    return NextResponse.json({
      result : user_infos.message
    }, {status: 200});
  }

// for now i dont add the username as changeable
export async function UPDATE(request: Request,context: any) {
    const { params } = context;
    const data = await request.json();
    const { email, firstName, lastName, birthDate } = data;
    const result = await updateUser(params.id,email,firstName,lastName,birthDate);

    if (result.success === false) {
      return NextResponse.json({
        message:result.message,
      }, {status: 500});
    }

    return NextResponse.json({
      result : result.message
    }, {status: 200});
  }

export async function DELETE(request: Request,context: any) {
    const { params } = context;
    const result = await deleteUser(params.id);

    if (result.success === false) {
      return NextResponse.json({
        message:result.message,
      }, {status: 500});
    }

    return NextResponse.json({
      result : result.message
    }, {status: 200});
  }