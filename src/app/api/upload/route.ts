import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get("file") as File;
  if (!file) {
    return NextResponse.json({ success: false });
  }
  const bytes = await file.arrayBuffer();
  const base64 = Buffer.from(bytes).toString("base64");

  const fileNm = new Date().valueOf() + "";
  const ext = file.name.split(".").reverse()[0];

  return NextResponse.json({
    success: true,
    results: { fileNm: `${fileNm}.${ext}`, base64 },
  });
}
