import { NextResponse , NextRequest} from "next/server";

import { getUserLoans , addNewLoan , getPendingLoans , getReturnedLoans , getLateLoans , returnLoan } from "@/lib/db/db_loans";

// Route on localhost:3000/api/loans/
export async function GET(request: Request,context: any) {

    const {params} = context;
    // header param "numberBooks" from the request
    let loanType = request.headers.get('LoanType');
    if (loanType === null) { // if not specified, default to 10
        loanType = 'all';
    }
    let result = null;
    if (loanType === 'all') {
        result = await getUserLoans(params.id);
    } else if (loanType === 'pending') {
        result = await getPendingLoans(params.id);
    } else if (loanType === 'returned') {
        result = await getReturnedLoans(params.id);
    } else {
        result = await getLateLoans(params.id);
    }
    if (result.success === false) {
      return NextResponse.json({
        message: result.message,
      }, {status: 500});
    }
    return NextResponse.json({
      result : result.message
    }, {status: 200});

}

export async function POST(request: Request,context: any) {

    const {params} = context;

    const data = await request.json();
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

export async function UPDATE(request: Request,context: any) {
    const {params} = context;
    const data = await request.json();
    const { id_loan } = data;
    const result = await returnLoan(params.id,id_loan);

    if (result.success === false) {
      return NextResponse.json({
        message:result.message,
      }, {status: 500});
    }
    return NextResponse.json({
      result : result.message
    }, {status: 200});
}