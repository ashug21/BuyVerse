import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";
import Wishlist from "../../../../models/Wishlist";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";


export async function POST(request){

    try {

        await connectDB();

        const session = await getServerSession(authOptions);

        if(!session){
            return NextResponse.json({error  : "UnAuthenticated"},{status : 401});
        }
        
        const { title , price , img} = await request.json();

        const wishlist = await Wishlist.create({title , price , img , userEmail : session.user.email});
        return NextResponse.json({success: true , message : "Added to WishList" , wishlist} , {status : 200});
        
    } catch (error) {
        return NextResponse.json({success: false , message : error.message} , {status : 500});
    }   
}


export async function GET(){

    try {

        await connectDB();

        const session = await getServerSession(authOptions);

        if(!session){
            return NextResponse.json({error  : "UnAuthenticated"},{status : 401});
        }


       const wishlists = await Wishlist.find({userEmail : session.user.email}).lean();

       if(wishlists.length === 0 ){
            return NextResponse.json({success : true , message : "No Wishlist found" , wishlists: []} , {status : 204});
       }

       return NextResponse.json({success : true , message : "Wishlist found" , wishlists} , {status : 200});
        
    } catch (error) {
        return NextResponse.json({success: false , message : error.message} , {status : 500});
    }
}