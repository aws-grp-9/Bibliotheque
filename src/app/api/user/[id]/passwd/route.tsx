
import { NextResponse } from 'next/server';
import { changePassword , getEmail , getPassword} from '@/app/db/db_users';


export async function UPDATE(request: Request,context: any) {

    const { params } = context;
    const data = await request.json();
    const { password } = data;
    const result = await changePassword(params.id,password);

    if (result.success === false) {
      return NextResponse.json({
        message:result.message,
      }, {status: 500});
    }

    return NextResponse.json({
      result : result.message
    }, {status: 200});
}

export async function GET(request: Request,context: any) {

    const { params } = context;
    const result = await getPassword(params.id);

    if (result.success === false) {
      return NextResponse.json({
        message:result.message,
      }, {status: 500});
    }

    return NextResponse.json({
      result : result.message
    }, {status: 200});
}

