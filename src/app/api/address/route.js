import { NextRequest, NextResponse } from "next/server";
import Address from "../../../../models/Address";
import { connectDB } from "../../../../lib/db";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";


export async function POST(request) {

    try {
        await connectDB();

        const session = await getServerSession(authOptions);

        if (!session || !session.user?.email) {
            return NextResponse.json(
              { success: false, message: "Unauthorized" },
              { status: 401 }
            );
          }


        const {fullname, mobile,pincode,address1,address2,city,state} = await request.json();
        
        if(!fullname || !mobile || !pincode || !address1 || !address2 || !city || !state){
            return NextResponse.json({success : false , message : "All fields are required!"},{status : 400});
        }


        await Address.create({fullname , mobile , pincode , address1 , address2 , city , state , userEmail : session.user.email});
        return NextResponse.json({success : true , message : "Address added Successfully"} , {status : 200});


    } catch (error) {
        return NextResponse.json({success : false , message : "Some Error Occurred" + error}, {status : 500});
    }
}


export async function GET(){

    try {

        await connectDB();
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.email) {
            return NextResponse.json(
              { success: false, message: "Unauthorized" },
              { status: 401 }
            );
          }


        const address = await Address.find({userEmail : session.user.email}).lean();

    
        if (address.length === 0) {    
            return NextResponse.json({ success: false, message: "No address found" },{ status: 404 });
          }

        return NextResponse.json({success: true, address});
        
    } catch (error) {
        return NextResponse.json({success : false , error : "Internal server error"} , {status : 500})
    }
}

