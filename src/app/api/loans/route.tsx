import { NextResponse , NextRequest} from "next/server";

import { getListUsersLoans, getListPendingLoans, getListReturnedLoans, getListLateLoans } from "@/lib/db/db_loans";

// Route on localhost:3000/api/loans/
export async function GET(request: Request) {

    // header param "numberBooks" from the request
    let loanType = request.headers.get('LoanType');
    let limit = request.headers.get('limit');
    let keywords = request.headers.get('keywords');
    let excluded_ids_string = request.headers.get('excluded_ids');
    const excluded_ids = excluded_ids_string === null ? [] : JSON.parse(excluded_ids_string);
    if (limit === null) { // if not specified, default to 10
        limit = "10";
    }
    if (loanType === null) { // if not specified, default to 10
        loanType = 'all';
    }
    if (keywords === null || keywords === undefined) { // if not specified, default to 10
        keywords = '';
    }
    let result = null;
    if (loanType === 'all') {
        
        result = await getListUsersLoans(limit,keywords,excluded_ids);
        
    } else if (loanType === 'pending') {
        result = await getListPendingLoans(limit,keywords,excluded_ids);
    } else if (loanType === 'returned') {
        result = await getListReturnedLoans(limit,keywords,excluded_ids);
    } else {
        result = await getListLateLoans(limit,keywords,excluded_ids);
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