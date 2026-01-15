import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/db";
import Comment from "../../../../../models/Comment";

export async function DELETE(req,{params}){


    try {
        await connectDB();
        const {id} = await params;

       const comment =  await Comment.findById(id);

       if(!comment){
        return NextResponse.json({success : false , message : "Comment not Found"}, {status : 404});
       }

       await Comment.findByIdAndDelete(id);

       return NextResponse.json({success : true , message : "Comment deleted from DB"} , {status : 200});


    } catch (error) {
        return NextResponse.json({success : false , message : error.message}, {status : 500});
    }
}