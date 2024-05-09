
import { NextResponse } from 'next/server';
import {getUserLoans,getPendingLoans,getReturnedLoans,getLateLoans} from '@/lib/db/db_loans';

export async function GET(request: Request) {

    // header param "numberBooks" from the request
    let loanType = request.headers.get('LoanType');
    let user_token_data = request.headers.get('user_token');
    const { user } = user_token_data ? await JSON.parse(user_token_data) : { user: null };
    
    if (user === null || user === '') {
        return NextResponse.json({
            message: "No user token provided",
        }, {status: 500});
    }
    if (loanType === null) { // if not specified, default to 10
        loanType = 'all';
    }
    let result = null;
    if (loanType === 'all') {
        result = await getUserLoans(user);
    } else if (loanType === 'pending') {
        result = await getPendingLoans(user);
    } else if (loanType === 'returned') {
        result = await getReturnedLoans(user);
    } else {
        result = await getLateLoans(user);
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