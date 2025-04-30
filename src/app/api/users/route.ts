import { NextRequest, NextResponse } from "next/server";
import connectionToDatabase from "../../../../lib/mongoose";
import User from "../../../../models/user";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    await connectionToDatabase();

    const { name, email }: { name?: string; email: string } =
      await request.json();

    const newUser = new User({ name, email });
    await newUser.save();

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
