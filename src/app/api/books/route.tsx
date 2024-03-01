import { NextResponse , NextRequest} from "next/server";

// Route on localhost:3000/api/books/

export async function GET(request: Request) {
    // get header var "numberBooks" from the request
    let limit = request.headers.get('numberBooks');
    if (limit === null) { // if not specified, default to 10
      limit = '10';
    }
    return NextResponse.json({
      message: "Okay we're gonna send you "+limit+" books soon !",
    }, {status: 200});
  }