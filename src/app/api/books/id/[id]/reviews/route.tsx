import { NextResponse } from 'next/server';
import {getBookRating, putRating} from '@/lib/db/db_ratings';


export async function GET(request: Request,context: any) {
    const { params } = context;
    let limit = request.headers.get('numberReviews');
    if (limit === null) { // if not specified, default to 10
      limit = '5';
    }
    const result = await getBookRating(params.id,limit);
    if (result.success === false) {
      return NextResponse.json({
        message: result.message,
      }, {status: 500});
    }
    return NextResponse.json({
      result : result.message
    }, {status: 200});
}

export async function POST(request: Request,context: any) {
    const data = await request.json();
    const { params } = context;
    const { user_token, rating, review } = data;
    const result = await putRating(user_token,params.id,rating,review);
    if (result.success === false) {
      return NextResponse.json({
        message:result.message,
      }, {status: 500});
    }
    return NextResponse.json({
      result : result.message
    }, {status: 200});
}