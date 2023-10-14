import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";
import { queryToDB } from "@/utils/db";
import { generate } from "short-uuid";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request) {
  const data = await request.formData();
  const file = data.get("file");
  const eventId = generate();

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  await queryToDB({
    query: "INSERT INTO events (event_image, event_id) VALUES (?,?)",
    values: [buffer, eventId],
  });
  return NextResponse.json({ success: true, eventID: eventId });
}
