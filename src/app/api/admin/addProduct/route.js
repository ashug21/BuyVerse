import {NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/db";
import Image from "../../../../../models/Image";


export async function POST(req){

    try {

        await connectDB();

        const {title, stars, rating, beforePrice , afterPrice , category ,description,  file} = await req.json();

        if(!title || !stars || !rating || !beforePrice || !afterPrice || !category || !description || !file){
            return NextResponse.json({success : false , message : "All fields are required"}, {status : 400});
        }


       const imageData =  await Image.create({title , stars , rating , beforePrice , afterPrice , category ,description ,  file});

        return NextResponse.json({ success : true , message : "Added to Database" , imageData} , {status : 201});
        
    } catch (error) {
        return NextResponse.json(
          { success: false, message: error.message },
          { status: 500 }
        );
      }
}