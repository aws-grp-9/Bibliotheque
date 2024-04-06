import { NextResponse } from 'next/server';
import { checkBookQuantity , deleteBookFromLibrary } from '@/app/db/db_library';

export async function GET(request: Request, context: any) {
    const { params } = context;
    const result = await checkBookQuantity(params.id, params.bookid);
    if (result.success === false) {
        return NextResponse.json({
            message: result.message,
        }, { status: 500 });
    }
    return NextResponse.json({
        result: result.message
    }, { status: 200 });
}

export async function DELETE(request: Request, context: any) {
    const { params } = context;
    const result = await deleteBookFromLibrary(params.id, params.bookid);
    if (result.success === false) {
        return NextResponse.json({
            message: result.message,
        }, { status: 500 });
    }
    return NextResponse.json({
        result: result.message
    }, { status: 200 });
}
