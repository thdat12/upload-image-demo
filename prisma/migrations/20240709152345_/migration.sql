-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "fileNm" TEXT NOT NULL,
    "fileData" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);
