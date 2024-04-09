import { NextResponse } from 'next/server';



export async function GET(request: Request,context: any) {
    const { params } = context;
    let limit = request.headers.get('numberReviews');
    if (limit === null) { // if not specified, default to 10
      limit = '10';
    }
    return NextResponse.json({
      message: "Okay we're gonna send you "+limit+" reviews for the book with id "+params.id+" soon !",
    }, {status: 200});
}

export async function POST(request: Request,context: any) {
    const data = await request.json();
    const { params } = context;
    return NextResponse.json({
      message: "Review added for the book with id "+params.id+" !",
      data
    }, {status: 200});
}