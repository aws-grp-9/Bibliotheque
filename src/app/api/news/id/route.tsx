import { NextRequest, NextResponse } from "next/server";
import { getNewsById, deleteNews, updateNews, addNews } from "@/lib/db/db_news";

export async function DELETE(req: NextRequest, context: any) {
    const { params } = context;
    const result = await deleteNews(params.id);

    if (result.success === false) {
        return NextResponse.json({
            message: result.message,
        }, { status: 500 });
    }
    return NextResponse.json({
        result: result.message
    }, { status: 200 });
}

export async function GET(req: NextRequest, context: any) {
    const { params } = context;
    const result = await getNewsById(params.id);

    if (result.success === false) {
        return NextResponse.json({
            message: result.message,
        }, { status: 500 });
    }
    return NextResponse.json({
        result: result.data // Changed from result.message to result.data
    }, { status: 200 });
}

export async function UPDATE(req: NextRequest, context: any) {
    const { params } = context;
    const data = await req.json();
    const { title, description, category, image } = data;
    const result = await updateNews(params.id, title, description, category, image);

    if (result.success === false) {
        return NextResponse.json({
            message: result.message,
        }, { status: 500 });
    }
    return NextResponse.json({
        result: result.message
    }, { status: 200 });
}

export async function POST(req: NextRequest) {
    const data = await req.json();
    const { title, description, category, image, date } = data;
    const result = await addNews(title, description, category, image, date);
    if (result.success === false) {
        return NextResponse.json({
            message: result.message,
        }, { status: 500 });
    }
    return NextResponse.json({
        result: result.message
    }, { status: 200 });
}
