import { NextResponse } from "next/server";
import { queryToDB } from "@/utils/db";

export async function GET() {
  try {
    const data = await queryToDB({
      query: "SELECT * from teenagerevents",
      values: [],
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "Ошибка при получении записей на мероприятия" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { data } = await req.json();

    await queryToDB({
      query: "INSERT INTO teenagerevents (teenagerID, eventID) VALUES (?, ?)",
      values: [data.user_id, data.event_id],
    });

    return NextResponse.json({ message: "Все супер" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Ошибка при добавлении записи на мероприятия" },
      { status: 500 }
    );
  }
}

// export async function DELETE(req) {
//   const { id } = await req.json();

//   try {
//     const deleteHandler = await queryToDB({
//       query: "DELETE FROM events WHERE event_id = ?",
//       values: [id],
//     });

//     const affectedRows = deleteHandler.affectedRows;

//     if (affectedRows) {
//       return NextResponse.json({ message: "deleted" }, { status: 201 });
//     }

//     return NextResponse.json({ message: "no event" }, { status: 201 });
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Ошибка при удалении мероприятия" },
//       { status: 500 }
//     );
//   }
// }
