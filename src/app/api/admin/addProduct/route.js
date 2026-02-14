import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/db";
import Image from "../../../../../models/Image";

export async function POST(req) {
    try {
        await connectDB();

        const { title, stars, rating, beforePrice, afterPrice, category, description, image } = await req.json();

        if (!title || !stars || !rating || !beforePrice || !afterPrice || !category || !description || !image) {
            return NextResponse.json(
                { success: false, message: "All fields are required" }, 
                { status: 400 }
            );
        }

        if (isNaN(stars) || isNaN(rating) || isNaN(beforePrice) || isNaN(afterPrice)) {
            return NextResponse.json(
                { success: false, message: "Stars, rating, and prices must be numbers" }, 
                { status: 400 }
            );
        }

        if (parseInt(stars) < 1 || parseInt(stars) > 5) {
            return NextResponse.json(
                { success: false, message: "Stars must be between 1 and 5" }, 
                { status: 400 }
            );
        }

        const imageData = await Image.create({
            title,
            stars: parseInt(stars),
            rating: parseFloat(rating),
            beforePrice: parseFloat(beforePrice),
            afterPrice: parseFloat(afterPrice),
            category,
            description,
            image
        });

        return NextResponse.json(
            { success: true, message: "Product added successfully", imageData }, 
            { status: 201 }
        );
        
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}
