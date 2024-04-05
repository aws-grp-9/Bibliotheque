import { NextResponse , NextRequest} from "next/server";
import { getBooks , addBook } from "@/app/db/db_books";
// Route on localhost:3000/api/books/

export async function GET(request: Request) {

    // get header var "numberBooks" from the request
    let limit = request.headers.get('numberBooks');
    let keywords = request.headers.get('keywords');
    if (limit === null) { // if not specified, default to 10
      limit = '10';
    }
    if (keywords === null) { // if not specified, default to empty string
      keywords = '';
    }

    const result = await getBooks(parseInt(limit), keywords);

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
    const { title, author, date, description , ISBN , genre, stored_at } = data;
    const result = await addBook(title, author, date, description, ISBN, genre,stored_at);
    
    if (result.success === false) {
      return NextResponse.json({
        message:result.message,
      }, {status: 500});
    }
    return NextResponse.json({
      result : result.message
    }, {status: 200});
  }