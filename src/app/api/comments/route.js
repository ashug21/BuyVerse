import { NextResponse } from "next/server";
import Comment from "../../../../models/Comment";
import { connectDB } from "../../../../lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";


export async function POST(req){

    try {

        await connectDB();

        const session = await getServerSession(authOptions);


        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
          }


        const {description , productId} = await req.json();

        if (!description || !productId) {
            return NextResponse.json(
              { success: false, message: "All fields are required" },
              { status: 400 }
            );
          }
          

        const comment = await Comment.create({name : session.user.name , description , productId});

        return NextResponse.json({success : true , message : "Comment added" , comment}, { status: 201 });
        
    } catch (error) {
        return NextResponse.json({success : false , message : error.message},  { status: 500 });
    }
}


export async function GET(req) {
    await connectDB();
  
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");
  
    const comments = await Comment.find({ productId }).sort({
      createdAt: -1,
    });
  
    return NextResponse.json(comments);
  }