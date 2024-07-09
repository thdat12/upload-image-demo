import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get("file") as File;
  if (!file) {
    return NextResponse.json({ success: false });
  }
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const uploadDir = join(process.cwd(), "public");

  const fileNm = new Date().valueOf() + "";
  const ext = file.name.split(".").reverse()[0];

  const path = join(uploadDir, `${fileNm}.${ext}`);

  await writeFile(path, buffer);

  return NextResponse.json({
    success: true,
    data: { fileNm: `${fileNm}.${ext}` },
  });
}
