import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/lib/auth";
import { NextResponse } from "next/server";

export async function GET(request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: "Not authenticated" },
      { status: 401 }
    );
  }

  return NextResponse.json({
    name: session.user.name,
    role: session.user.role,
    phoneNumber: session.user.phoneNumber
  });
} 