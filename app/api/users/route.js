import { NextResponse } from "next/server";
import { queryToDB } from "@/utils/db";
import bcrypt from "bcrypt";

export async function GET() {
  try {
    const users = await queryToDB({
      query: "SELECT * from users",
      values: [],
    });

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { message: "Ошибка при получении пользователей" },
      { status: 500 }
    );
  }
}
export async function POST(req) {
  try {
    const { data } = await req.json();

    // const hashedPassword = await bcrypt.hash(data.password, 1);

    await queryToDB({
      query:
        "INSERT INTO users (user_id,name,role,phone,email,password,job,job_position,slave_id,teenager_registered_date,teenager_birthday,teenager_record_type,teenager_education,teenager_adress,teenager_representative,teenager_representative_phone,owner_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      values: [
        data.user_id,
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
      ],
    });

    return NextResponse.json({ message: "Все супер" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Ошибка при создании пользователя" },
      { status: 500 }
    );
  }
}
export async function DELETE(req) {
  const { id } = await req.json();

  try {
    const deleteUser = await queryToDB({
      query: "DELETE FROM users WHERE user_id = ?",
      values: [id],
    });

    const affectedRows = deleteUser.affectedRows;

    if (affectedRows) {
      return NextResponse.json({ message: "deleted" }, { status: 201 });
    }

    return NextResponse.json({ message: "no user" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Ошибка при удалении пользователя" },
      { status: 500 }
    );
  }
}
