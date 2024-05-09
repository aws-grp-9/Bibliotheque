import { NextResponse , NextRequest} from "next/server";

import { getUserLoans , addNewLoan , getPendingLoans , getReturnedLoans , getLateLoans , returnLoan } from "@/lib/db/db_loans";

// Route on localhost:3000/api/loans/


export async function POST(request: Request,context: any) {

    const {params} = context;

    const data = await request.json();
    console.log("JESUISLA");
    const { id_book, start_date, end_date , id_library } = data;
    const result = await addNewLoan(params.id,id_book,id_library,start_date,end_date);
    
    if (result.success === false) {
      return NextResponse.json({
        message:result.message,
      }, {status: 500});
    }
    return NextResponse.json({
      result : result.message
    }, {status: 200});
}

export async function PATCH(request: Request,context: any) {
    const {params} = context;
    const data = await request.json();
    const { user_token } = data;
    const result = await returnLoan(params.id,user_token);

    if (result.success === false) {
      return NextResponse.json({
        message:result.message,
      }, {status: 500});
    }
    return NextResponse.json({
      result : result.message
    }, {status: 200});
}