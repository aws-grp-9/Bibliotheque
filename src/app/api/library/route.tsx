import { NextResponse } from 'next/server';
import { getLibraries , addLibrary } from '@/app/db/db_library';


export async function GET(request: Request) {
    const result = await getLibraries();

    if (result.success === false) {
      return NextResponse.json({
        message: result.message,
      }, {status: 500});
    }
    return NextResponse.json({
      result : result.message
    }, {status: 200});
}

export async function POST(request: Request) {
    const data = await request.json();
    const { name, address } = data;
    const result = await addLibrary(name, address);
    
    if (result.success === false) {
      return NextResponse.json({
        message:result.message,
      }, {status: 500});
    }
    return NextResponse.json({
      result : result.message
    }, {status: 200});
}