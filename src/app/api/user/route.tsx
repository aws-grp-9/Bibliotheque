import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    let limit = request.headers.get('numberUsers');
    if (limit === null) {
      limit = '10';
    }
    return NextResponse.json({
      message: "Okay we're gonna send you "+limit+" users soon !",
    }, {status: 200});
}