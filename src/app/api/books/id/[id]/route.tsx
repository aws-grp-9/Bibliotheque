import { NextResponse , NextRequest} from "next/server";

// Route on localhost:3000/api/books/id/[id]

export async function DELETE(request: Request,context: any) {
    const { params } = context;
    return NextResponse.json({
      message: "Okay we're gonna delete the book with id "+params.id+" soon !",
    }, {status: 200});
}
export async function GET(request: Request,context: any) {
    const { params } = context;
    return NextResponse.json({
      message: "Okay we're gonna send you all infos about the book with id "+params.id+" soon !",
    }, {status: 200});
}

export async function PUT(request: Request,context: any) {
    const { params } = context;
    return NextResponse.json({
      message: "Okay we're gonna update the book with id "+params.id+" soon !",
    }, {status: 200});
}

