import { NextResponse } from "next/server";
import { queryToDB } from "@/utils/db";

export async function GET() {
  try {
    const data = await queryToDB({
      query: "SELECT * from events WHERE event_date >= CURDATE()",
      values: [],
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "Ошибка при получении пользователей" },
      { status: 500 }
    );
  }
}
