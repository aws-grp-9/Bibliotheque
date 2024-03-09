import { NextResponse } from 'next/server';

export async function GET(request: Request,context: any) {
    const { params } = context;
    return NextResponse.json({
      message: "Okay we're gonna send you all the infos about user "+params.id+" soon !",
    }, {status: 200});
  }