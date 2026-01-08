import { connectDB } from "../../../../../lib/db";
import { NextResponse } from "next/server";
import Address from "../../../../../models/Address";


export async function GET(){

    await connectDB();

    try {
    
        const address = await Address.find({}).lean();
    
        if(address.length === 0){
            return NextResponse.json({success : true , message : "No Address Found"} , {status : 200});
        }

        return NextResponse.json({success : true , message : "Address Found" , address},{status : 200});
        
    } catch (error) {
        return NextResponse.json({success : false , message : error.message},{status : 500});
    }
}