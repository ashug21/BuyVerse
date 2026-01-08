import { connectDB } from "../../../../../lib/db";
import { NextResponse } from "next/server";
import Order from "../../../../../models/Order";


export async function GET(){

    await connectDB();

    try {
    
        const orders = await Order.find({}).lean();
    
        if(orders.length === 0){
            return NextResponse.json({success : true , message : "No orders Found"} , {status : 200});
        }

        return NextResponse.json({success : true , message : "orders Found" , orders},{status : 200});
        
    } catch (error) {
        return NextResponse.json({success : false , message : error.message},{status : 500});
    }
}