import { NextResponse } from "next/server";
import { queryToDB } from "@/utils/db";

export async function GET(req) {
  try {
    const id = await req.url.split("/users/")[1];

    const user = await queryToDB({
      query: "SELECT * FROM users WHERE user_id = ?",
      values: [id],
    });

    const currentUser = user[0];

    return NextResponse.json(
      { currentUser },
      { message: "Пользователь получен" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Ошибка при получении пользователя" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const { data } = await req.json();

    await queryToDB({
      query:
        "UPDATE users SET name = ?, role = ?, phone = ?, email = ?, password = ?, job = ?, job_position = ?, slave_id = ?, teenager_registered_date = ?, teenager_birthday = ?, teenager_record_type = ?, teenager_education = ?, teenager_adress = ?,teenager_representative = ?, teenager_representative_phone = ?, owner_id = ? WHERE user_id = ?",
      values: [
        data.name,
        data.role,
        data.phone,
        data.email,
        data.password,
        data.job,
        data.job_position,
        data.slave_id,
        data.teenager_registered_date,
        data.teenager_birthday,
        data.teenager_record_type,
        data.teenager_education,
        data.teenager_adress,
        data.teenager_representative,
        data.teenager_representative_phone,
        data.owner_id,
        data.user_id,
      ],
    });

    return NextResponse.json({ message: "Все супер" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Ошибка при обновлении пользователя" },
      { status: 500 }
    );
  }
}
