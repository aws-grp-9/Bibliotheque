import { NextResponse } from 'next/server';
import { getEmail } from '@/lib/db/db_users';

export async function GET(request: Request,context: any) {
    const { params } = context;
    const result = await getEmail(params.id);

    if (result.success === false) {
      return NextResponse.json({
        message:result.message,
      }, {status: 500});
    }

    return NextResponse.json({
      result : result.message
    }, {status: 200});
  }
