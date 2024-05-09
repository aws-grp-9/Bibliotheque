import { NextRequest, NextResponse } from "next/server";
import pool from './connection';

async function getNews(category: string = '', keywords: string = '', limit: number = 10, excluded_ids: string[] = []) {
    try {
        let query = 'SELECT * FROM news';
        const values = [];

        if (category) {
            query += ' WHERE category = $1';
            values.push(category);
        }

        if (keywords) {
            query += ` ${category ? 'AND' : 'WHERE'} (title ILIKE '%' || $${values.length + 1} || '%' OR description ILIKE '%' || $${values.length + 1} || '%')`;
            values.push(keywords);
        }

        if (excluded_ids.length > 0) {
            query += ` ${category || keywords ? 'AND' : 'WHERE'} id NOT IN (${excluded_ids.map((_, i) => `$${values.length + i + 1}`).join(', ')})`;
            values.push(...excluded_ids);
        }

        query += ` LIMIT $${values.length + 1}`;
        values.push(limit);

        const result = await pool.query(query, values);
        return { success: true, data: result.rows };
    } catch (error: any) {
        console.log(error);
        return { success: false, message: error.detail };
    }
}

async function addNews(title: string, description: string, date: string, category: string, image: string) {
    try {
        const query = 'INSERT INTO news (title, description, date, category, image) VALUES ($1, $2, $3, $4, $5)';
        const values = [title, description, date, category, image];
        const result = await pool.query(query, values);
        return { success: true, message: 'News added successfully' };
    } catch (error: any) {
        console.log(error);
        return { success: false, message: error.detail };
    }
}

async function updateNews(id: string, title: string, description: string, category: string, image: string) {
    try {
        const query = 'UPDATE news SET title = $1, description = $2, category = $3, image = $4 WHERE id = $5';
        const values = [title, description, category, image, id];
        const result = await pool.query(query, values);
        return { success: true, message: 'News updated successfully' };
    } catch (error: any) {
        console.log(error);
        return { success: false, message: error.detail };
    }
}
async function deleteNews(id: string) {
    try {
        const query = 'DELETE FROM news WHERE id = $1';
        const values = [id];
        const result = await pool.query(query, values);
        return { success: true, message: 'News deleted successfully' };
    } catch (error: any) {
        console.log(error);
        return { success: false, message: error.detail };
    }
}
async function getNewsById(id: string) {
    try {
        const query = 'SELECT * FROM news WHERE id = $1';
        const values = [id];
        const result = await pool.query(query, values);
        return { success: true, data: result.rows[0] };
    } catch (error: any) {
        console.log(error);
        return { success: false, message: error.detail };
    }
}

export { getNews, addNews, updateNews, deleteNews, getNewsById };

export async function getNewsHandler(req: NextRequest) {
    const limit = parseInt(req.headers.get('numberNews') || '10');
    const keywords = req.headers.get('keywords') || '';
    const category = req.headers.get('category') || '';
    const excluded_ids_string = req.headers.get('excluded_ids');
    const excluded_ids = excluded_ids_string ? JSON.parse(excluded_ids_string) : [];
    const result = await getNews(category, keywords, limit, excluded_ids);
    if (result.success === false) {
        return NextResponse.json({
            message: result.message,
        }, { status: 500 });
    }
    return NextResponse.json({
        result: result.data
    }, { status: 200 });
}

export async function addNewsHandler(req: NextRequest) {
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
