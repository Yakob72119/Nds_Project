import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/mongoose";
import User from "@/app/models/User";

export async function POST(request) {
  try {
    await dbConnect();
    const { phoneNumber } = await request.json();

    const existingUser = await User.findOne({ phoneNumber });
    
    return NextResponse.json({ 
      exists: !!existingUser 
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Error checking phone number" },
      { status: 500 }
    );
  }
} 