import { NextResponse } from "next/server";
import { queryToDB } from "@/utils/db";

export async function GET(req) {
  try {
    const id = await req.url.split("/reports/")[1];

    const event = await queryToDB({
      query: "SELECT * FROM reports WHERE id = ?",
      values: [id],
    });

    const currentReport = event[0];

    return NextResponse.json(
      { currentReport },
      { message: "Мероприятие получено" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Ошибка при получении мероприятия" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const { data } = await req.json();

    await queryToDB({
      query:
        "UPDATE reports SET mentor_id = ?, teenager_id = ?, event_id = ?, involvement_grade = ?, help_grade = ?, positive_results = ?, negative_results = ?, conclusions = ? WHERE id = ?",
      values: [
        data.mentor_id,
        data.teenager_id,
        data.event_id,
        data.involvement_grade,
        data.help_grade,
        data.positive_results,
        data.negative_results,
        data.conclusions,
        data.id,
      ],
    });

    return NextResponse.json({ message: "Все супер" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Ошибка при обновлении отчета" },
      { status: 500 }
    );
  }
}
