import { NextRequest, NextResponse } from "next/server";
import { getNews, addNews } from "@/lib/db/db_news";

export async function GET(req: NextRequest) {
    let limit = req.headers.get('numberNews') || '10';
    let keywords = req.headers.get('keywords') || '';
    let category = req.headers.get('category') || '';
    let excluded_ids_string = req.headers.get('excluded_ids');
    const excluded_ids = excluded_ids_string ? JSON.parse(excluded_ids_string) : [];
    const result = await getNews(category, keywords, parseInt(limit), excluded_ids);
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
