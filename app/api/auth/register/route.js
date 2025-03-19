import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/app/lib/mongoose';
import User from '@/app/models/User';

export async function POST(request) {
  try {
    await dbConnect();

    const {
      firstName,
      lastName,
      phoneNumber,
      sponsor,
      position,
      password
    } = await request.json();

    // Check if user already exists
    const existingUser = await User.findOne({ phoneNumber });
    if (existingUser) {
      return NextResponse.json(
        { error: 'Phone number already registered' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const user = await User.create({
      firstName,
      lastName,
      phoneNumber,
      sponsor,
      position,
      password: hashedPassword,
      role: 'user' // Default role
    });

    return NextResponse.json({
      message: 'User registered successfully',
      userId: user._id
    });
  } catch (error) {
    console.error('Registration error:', error);
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { error: Object.values(error.errors).map(err => err.message).join(', ') },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Error creating user' },
      { status: 500 }
    );
  }
} 