import { NextResponse } from 'next/server';

import { getLibraryBooks , addBookToLibrary  } from '@/lib/db/db_library';

export async function GET(request: Request,context : any) {
    
    const {params} = context;
    const result = await getLibraryBooks(params.id);
    
    if (result.success === false) {
      return NextResponse.json({
        message: result.message,
      }, {status: 500});
    }
    return NextResponse.json({
      result : result.message
    }, {status: 200});
}

export async function POST(request: Request,context : any) {
    const {params} = context;
    const data = await request.json();
    const { bookId , quantity } = data;
    const result = await addBookToLibrary(params.id,bookId,parseInt(quantity));
    
    if (result.success === false) {
      return NextResponse.json({
        message:result.message,
      }, {status: 500});
    }
    return NextResponse.json({
      result : result.message
    }, {status: 200});
}
