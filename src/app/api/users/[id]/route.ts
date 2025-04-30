import { NextRequest, NextResponse } from "next/server";
import connectionToDatabase from "../../../../../lib/mongoose";
import User from "../../../../../models/user";

interface Params {
  params: { id: string };
}

export async function DELETE(
  request: NextRequest,
  context: Params
): Promise<NextResponse> {
  try {
    await connectionToDatabase();

    const { id } = context.params;

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
