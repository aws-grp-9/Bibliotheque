import { NextResponse , NextRequest} from "next/server";
import { getBooks , addBook } from "@/app/db/db_books";
// Route on localhost:3000/api/books/

export async function GET(request: Request) {

    // get header var "numberBooks" from the request
    let limit = request.headers.get('numberBooks');
    if (limit === null) { // if not specified, default to 10
      limit = '10';
    }

    const result = await getBooks(parseInt(limit));

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
    const { title, author, date, description } = data;
    const result = await addBook(title, author, date, description);
    
    if (result.success === false) {
      return NextResponse.json({
        message:result.message,
      }, {status: 500});
    }
    return NextResponse.json({
      result : result.message
    }, {status: 200});
  }