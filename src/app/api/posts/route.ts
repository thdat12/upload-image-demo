import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { fileNm, message, fileData } = await request.json();
  const result = await prisma.post.create({
    data: {
      fileNm,
      message,
      fileData,
    },
  });

  return NextResponse.json({ success: true, result });
}

export async function GET() {
  const result = await prisma.post.findMany();
  return NextResponse.json({
    success: true,
    result,
  });
}

export async function DELETE(request: NextRequest) {
  const res = await request.json();

  const result = await prisma.post.delete({
    where: {
      id: res.id,
    },
  });

  return NextResponse.json({
    success: true,
    result,
  });
}
