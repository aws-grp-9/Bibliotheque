import pool from './connection';
import {getInfosFromEmail ,getInfosUser} from './db_users';

/* Structure of Ratings table: 
    id SERIAL PRIMARY KEY,
    id_user INT REFERENCES "User"(id),
    id_book INT REFERENCES "Books"(id),
    rating INT,
    review TEXT
*/

async function getBookRating(id_book: string,limit: string= "5") {
    // get randomly 10 ratings for a book and its average rating
    try {
        if (id_book === ""){
            return {success:false,message:"No book id provided"};
        }
        const query =  'select avg(stars) as average_rating from public."Ratings" where id_book = $1';
        const values = [id_book];
        const result = await pool.query(
            query,
            values
        );

        const reviewsQuery = 'select * from public."Ratings" where id_book = $1 limit $2';
        const reviewsValues = [id_book, limit];
        const reviewsResult = await pool.query(
            reviewsQuery,
            reviewsValues
        );

        // get user infos for each review
        for (let i = 0; i < reviewsResult.rows.length; i++) {
            const userInfos = await getInfosUser(reviewsResult.rows[i].id_user);
            if (userInfos.success === false) {
                return {success:false,message:userInfos.message};
            }
            reviewsResult.rows[i].name = userInfos.message.name;
        }

        return {
            success: true,
            message: {
            average_rating: result.rows[0].average_rating,
            reviews: reviewsResult.rows
            }
        };

         

        return {success:true,message:result.rows}
    } catch ( error: any ) {
        console.log( error );
        return {success:false,message:error.detail};
    }
}

async function verifyRating(id_user: string, id_book: string) {
    try {
        if (id_user === "" || id_user === undefined){
            return {success:false,message:"No user id provided"};
        }
        if (id_book === "" || id_book === undefined){
            return {success:false,message:"No book id provided"};
        }
        const query =  'select * from public."Ratings" where id_user = $1 and id_book = $2';
        const values = [id_user,id_book];
        const result = await pool.query(
            query,
            values
        );
        if (result.rows.length > 0){
            return {success:true,message:true}
        } else {
            return {success:true,message:false}
        }
    } catch ( error: any ) {
        console.log( error );
        return {success:false,message:error.detail};
    }
}

async function putRating(user_token: any, id_book: string, rating: number, review: string) {
    try {
        console.log(rating);
        if (id_book === "" || id_book === undefined){
            return {success:false,message:"No book id provided"};
        }
        if (rating === undefined || rating === 0){
            return {success:false,message:"No rating provided"};
        }
        if (review === "" || review === undefined){
            return {success:false,message:"No review provided"};
        }
        if (user_token === "" ||user_token === undefined){
            return {success:false,message:"No user id provided"};
        }
        const userInfos = await getInfosFromEmail(user_token.user?.email || '');
        if (userInfos.success === false) {
            return {success:false,message:userInfos.message};
        }
        const verify = await verifyRating(userInfos.message.id,id_book);
        if (verify.success === false) {
            return {success:false,message:verify.message};
        }
        if (verify.message === true){
            return {success:false,message:"You have already rated this book"};
        }
        const query =  'insert into public."Ratings" (id_user,id_book,stars,description) values ($1,$2,$3,$4)';
        const values = [userInfos.message.id,id_book,rating,review];
        const result = await pool.query(
            query,
            values
        );
        return {success:true,message:result.rows}
    } catch ( error: any ) {
        console.log( error );
        return {success:false,message:error.detail};
    }
}

export {getBookRating,putRating};