import { NextResponse } from 'next/server';
import { getLibraryInfos , deleteLibrary } from '@/lib/db/db_library';

export async function GET(request: Request , context : any) {

    const { params } = context;
    const result = await getLibraryInfos(params.id);
    if (result.success === false) {
      return NextResponse.json({
        message: result.message,
      }, {status: 500});
    }
    return NextResponse.json({
      result : result.message
    }, {status: 200});
}

export async function DELETE(request: Request , context : any) {

    const { params } = context;
    const result = await deleteLibrary(params.id);
    if (result.success === false) {
      return NextResponse.json({
        message: result.message,
      }, {status: 500});
    }
    return NextResponse.json({
      result : result.message
    }, {status: 200});
}