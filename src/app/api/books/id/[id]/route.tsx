import { NextResponse , NextRequest} from "next/server";
import { getBook , deleteBook , updateBook } from "@/lib/db/db_books";

// Route on localhost:3000/api/books/id/[id]

export async function DELETE(request: Request,context: any) {
    const { params } = context; 
    const result = await deleteBook(params.id);

    if (result.success === false) {
      return NextResponse.json({
        message:result.message,
      }, {status: 500});
    }
    return NextResponse.json({
      result : result.message
    }, {status: 200});

}
export async function GET(request: Request,context: any) {
    const { params } = context;
    const result = await getBook(params.id);

    if (result.success === false) {
      return NextResponse.json({
        message:result.message,
      }, {status: 500});
    }
    return NextResponse.json({
      result : result.message
    }, {status: 200});
}

export async function UPDATE(request: Request,context: any) {
    const { params } = context;
    const data = await request.json();
    const { title, author, date, description, ISBN , genre, image } = data;
    const result = await updateBook(params.id,title,author,date,description,ISBN,genre,image);

    if (result.success === false) {
      return NextResponse.json({
        message:result.message,
      }, {status: 500});
    }
    return NextResponse.json({
      result : result.message
    }, {status: 200});
}

