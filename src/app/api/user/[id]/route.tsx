import { NextResponse } from 'next/server';
import { updateUser , getInfosUser , deleteUser} from '@/app/db/db_users';

export async function GET(request: Request,context: any) {
    const { params } = context;
    const result = await getInfosUser(params.id);

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