import { NextResponse } from 'next/server';

export async function GET(request: Request,context: any) {
    const { id } = context.params;
    return NextResponse.json({
      message: "Okay we're gonna send you all the infos about user "+id+" soon !",
    }, {status: 200});
  }