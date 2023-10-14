import { queryToDB } from "@/utils/db";
import { NextResponse } from "next/server";
export async function POST(req) {
  try {
    const { data } = await req.json();

    const user = await queryToDB({
      query: "SELECT * FROM users WHERE email = ?",
      values: [data.email],
    });

    if (user[0]) {
      return NextResponse.json({ message: "exist" }, { status: 201 });
    }
    return NextResponse.json({ message: "not exist" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
