import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // 既存の /api/videos/route.ts に合わせてパスを統一

// POST /api/videos/[id]/view
export async function POST(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const updated = await prisma.videos.update({
      where: { id },
      data: {
        views: { increment: 1 }, // 再生回数を +1
      },
    });

    return NextResponse.json({ views: updated.views });
  } catch (e) {
    console.error("視聴回数更新エラー:", e);
    return NextResponse.json(
      { error: "視聴回数の更新に失敗しました" },
      { status: 500 }
    );
  }
}

