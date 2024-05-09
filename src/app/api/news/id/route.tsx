import { NextRequest, NextResponse } from "next/server";
import { getNewsById, deleteNews, updateNews, addNews } from "@/lib/db/db_news";

export async function deleteNewsHandler(req: NextRequest, context: any) {
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

export async function getNewsByIdHandler(req: NextRequest, context: any) {
    const { params } = context;
    const result = await getNewsById(params.id);

    if (result.success === false) {
        return NextResponse.json({
            message: result.message,
        }, { status: 500 });
    }
    return NextResponse.json({
        result: result.message
    }, { status: 200 });
}

export async function updateNewsHandler(req: NextRequest, context: any) {
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

export async function addNewsHandler(req: NextRequest) {
    const data = await req.json();
    const { title, description, date, category, image } = data;
    const result = await addNews(title, description, date, category, image);
    if (result.success === false) {
        return NextResponse.json({
            message: result.message,
        }, { status: 500 });
    }
    return NextResponse.json({
        result: result.message
    }, { status: 200 });
}
