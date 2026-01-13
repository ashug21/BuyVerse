import { NextResponse } from "next/server";
import { connectDB } from "../../../../../../lib/db";
import User from "../../../../../../models/User";


export async function DELETE(req , {params}){

    try {
        await connectDB();

        const {id} = await params;

        const user = await User.findById(id);

         if (!user) {
              return NextResponse.json(
                { success: false, message: "User not found" },{ status: 404 });
            }

            await User.findByIdAndDelete(id);

        return NextResponse.json({success : true , message : "User Deleted from DB"});

    } catch (error) {
        
        return NextResponse.json({success : false , message : error.message});
    }
}