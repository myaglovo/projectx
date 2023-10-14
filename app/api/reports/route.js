import { NextResponse } from "next/server";
import { queryToDB } from "@/utils/db";

export async function GET() {
  try {
    const data = await queryToDB({
      query: "SELECT * from reports",
      values: [],
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "Ошибка при получении отчетов" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { data } = await req.json();

    await queryToDB({
      query:
        "INSERT INTO reports (id,mentor_id,teenager_id,event_id,involvement_grade,help_grade,positive_results,negative_results,conclusions) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      values: [
        data.id,
        data.mentor_id,
        data.teenager_id,
        data.event_id,
        data.involvement_grade,
        data.help_grade,
        data.positive_results,
        data.negative_results,
        data.conclusions,
      ],
    });

    return NextResponse.json({ message: "Все супер" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Ошибка при создании отчета" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  const { id } = await req.json();

  try {
    const deleteHandler = await queryToDB({
      query: "DELETE FROM reports WHERE id = ?",
      values: [id],
    });

    const affectedRows = deleteHandler.affectedRows;

    if (affectedRows) {
      return NextResponse.json({ message: "deleted" }, { status: 201 });
    }

    return NextResponse.json({ message: "no event" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Ошибка при удалении отчета" },
      { status: 500 }
    );
  }
}
