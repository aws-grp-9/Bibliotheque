
import { NextResponse } from 'next/server';


export async function GET(request: Request,context: any) {
    const { params } = context;
    return NextResponse.json({
      message: "Okay we're gonna send you if the book with id "+params.id+" is available !",
    }, {status: 200});
    
}

export async function POST(request: Request,context: any) {
    const data = await request.json();
    const { params } = context;
    return NextResponse.json({
      message: "Okay we're gonna reserve the book with id "+params.id+" for you !",
      data
    }, {status: 200});
}