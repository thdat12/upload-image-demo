import { PostType } from "@/app/lib/context/postContext";
import { writeFile, readFile, unlink } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  const { fileNm, comment } = await request.json();

  const uploadDir = join(process.cwd(), "public");
  const path = join(uploadDir, "database", "posts.txt");
  const fileData = await readFile(path, "utf8");
  const posts = fileData ? JSON.parse(fileData) : [];
  posts.unshift({ id: uuidv4(), fileNm, comment });
  await writeFile(path, JSON.stringify(posts));
  return NextResponse.json({ success: true });
}

export async function GET() {
  const uploadDir = join(process.cwd(), "public");

  const path = join(uploadDir, "database", "posts.txt");
  const data: any = await readFile(path, "utf8");

  return NextResponse.json({
    success: true,
    data: data ? JSON.parse(data) : [],
  });
}

export async function DELETE(request: NextRequest) {
  const res = await request.json();

  const uploadDir = join(process.cwd(), "public");

  const path = join(uploadDir, "database", "posts.txt");
  const fileData = await readFile(path, "utf8");
  let posts = fileData ? JSON.parse(fileData) : [];
  const target = posts.find((post: PostType) => post.id === res?.id);
  posts = posts.filter((post: PostType) => post.id !== res?.id);
  await writeFile(path, JSON.stringify(posts));

  const filePath = join(uploadDir, target?.fileNm.toString());

  await unlink(filePath);
  return NextResponse.json({
    success: true,
    data: posts,
  });
}
