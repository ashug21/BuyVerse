import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/db";
import Comment from "../../../../../models/Comment";

export async function GET(){

    try {
        
        await connectDB();

        const comments = await Comment.find({}).lean();

        if(!comments){
            return NextResponse.json({success : true , message : "No Comments Found"}, {status : 204});
        }

        return NextResponse.json({success : true , comments} , {status : 200});
    } catch (error) {
        return NextResponse.json({success : false} , {status : 500});
    }
}