import { NextResponse } from 'next/server';
import { getInfosFromEmail } from '@/lib/db/db_users';


export async function GET(request: Request) {
    let email = request.headers.get('email');
    if (email === null) {
      return NextResponse.json({
        message: 'Email not provided',
      }, {status: 400});
    }
    
    const result = await getInfosFromEmail(email);
    if (result.success === false) {
      return NextResponse.json({
        message:result.message,
      }, {status: 500});
    }
    return NextResponse.json({
      result : result.message
    }, {status: 200});
}