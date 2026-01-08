import User from "../../../../../models/User";
import { connectDB } from "../../../../../lib/db";
import { NextResponse } from "next/server";


export async function GET(){

    await connectDB();

    try {
    
        const users = await User.find({}).lean();
    
        if(users.length === 0){
            return NextResponse.json({success : true , message : "No users Found"} , {status : 200});
        }

        return NextResponse.json({success : true , message : "Users Found" , users},{status : 200});
        
    } catch (error) {
        return NextResponse.json({success : false , message : error.message},{status : 500});
    }
}