import { NextResponse } from 'next/server';
import { deleteUser , getInfosFromEmail} from '@/lib/db/db_users';

export async function GET(request: Request) {
    let user_token_data = request.headers.get('user_token');
    const { user } = user_token_data ? await JSON.parse(user_token_data) : { user: null };
    if (user === null || user === '') {
      return NextResponse.json({
        message: 'No user token provided',
      }, {status: 500});
    }
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


