import { NextResponse , NextRequest} from "next/server";
import { getBooks , addBook } from "@/lib/db/db_books";
// Route on localhost:3000/api/books/

export async function GET(request: Request) {

    // get header var "numberBooks" from the request
    let limit = request.headers.get('numberBooks');
    let keywords = request.headers.get('keywords');
    let genre = request.headers.get('genre');
    let excluded_ids_string = request.headers.get('excluded_ids');
    const excluded_ids = excluded_ids_string === null ? [] : JSON.parse(excluded_ids_string);
    if (limit === null) { // if not specified, default to 10
      limit = '10';
    }
    if (keywords === null) { // if not specified, default to empty string
      keywords = '';
    }
    if (genre === null) { // if not specified, default to empty string
      genre = '';
    }
    const result = await getBooks(genre,keywords,parseInt(limit),excluded_ids);

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
    const { user_token, title, author, date, description , ISBN , genre , image } = data;
    const result = await addBook(user_token,title, author, date, description, ISBN, genre, image);
    
    if (result.success === false) {
      return NextResponse.json({
        message:result.message,
      }, {status: 500});
    }
    return NextResponse.json({
      result : result.message
    }, {status: 200});
  }