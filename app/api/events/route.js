import { NextResponse } from "next/server";
import { queryToDB } from "@/utils/db";

export async function GET(req) {
  try {
    const data = await queryToDB({
      query: "SELECT * from events",
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

export async function POST(req) {
  try {
    const data = await req.formData();
    const dataObj = JSON.parse(data.get("data"));
    const file = data.get("file");

    if (file != "null") {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      await queryToDB({
        query:
          "INSERT INTO events (event_title,event_group,event_curator_id,event_executor_id,event_adress,event_date,event_time,event_max_members,event_description,event_id, event_image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        values: [
          dataObj.event_title,
          dataObj.event_group,
          dataObj.event_curator_id,
          dataObj.event_executor_id,
          dataObj.event_adress,
          dataObj.event_date,
          dataObj.event_time,
          dataObj.event_max_members,
          dataObj.event_description,
          dataObj.event_id,
          buffer,
        ],
      });
    } else {
      await queryToDB({
        query:
          "INSERT INTO events (event_title,event_group,event_curator_id,event_executor_id,event_adress,event_date,event_time,event_max_members,event_description,event_id, event_image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)",
        values: [
          dataObj.event_title,
          dataObj.event_group,
          dataObj.event_curator_id,
          dataObj.event_executor_id,
          dataObj.event_adress,
          dataObj.event_date,
          dataObj.event_time,
          dataObj.event_max_members,
          dataObj.event_description,
          dataObj.event_id,
          null,
        ],
      });
    }

    return NextResponse.json({ message: "Все супер" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Ошибка при создании мероприятия" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  const { id } = await req.json();

  try {
    const deleteHandler = await queryToDB({
      query: "DELETE FROM events WHERE event_id = ?",
      values: [id],
    });

    const affectedRows = deleteHandler.affectedRows;

    if (affectedRows) {
      return NextResponse.json({ message: "deleted" }, { status: 201 });
    }

    return NextResponse.json({ message: "no event" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Ошибка при удалении мероприятия" },
      { status: 500 }
    );
  }
}
