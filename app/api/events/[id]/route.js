import { NextResponse } from "next/server";
import { queryToDB } from "@/utils/db";

export async function GET(req) {
  try {
    const id = await req.url.split("/events/")[1];

    const event = await queryToDB({
      query: "SELECT * FROM events WHERE event_id = ?",
      values: [id],
    });

    const currentEvent = event[0];

    return NextResponse.json(
      { currentEvent },
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
    const data = await req.formData();
    const dataObj = JSON.parse(data.get("data"));
    const file = data.get("file");

    if (file != "null") {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      await queryToDB({
        query:
          "UPDATE events SET event_title = ?, event_group = ?, event_adress = ?, event_date = ?, event_time = ?, event_max_members = ?, event_description = ?, event_image = ? WHERE event_id = ?",
        values: [
          dataObj.event_title,
          dataObj.event_group,
          dataObj.event_adress,
          dataObj.event_date,
          dataObj.event_time,
          dataObj.event_max_members,
          dataObj.event_description,
          buffer,
          dataObj.event_id,
        ],
      });
    } else {
      await queryToDB({
        query:
          "UPDATE events SET event_title = ?, event_group = ?, event_adress = ?, event_date = ?, event_time = ?, event_max_members = ?, event_description = ? WHERE event_id = ?",
        values: [
          dataObj.event_title,
          dataObj.event_group,
          dataObj.event_adress,
          dataObj.event_date,
          dataObj.event_time,
          dataObj.event_max_members,
          dataObj.event_description,
          dataObj.event_id,
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
