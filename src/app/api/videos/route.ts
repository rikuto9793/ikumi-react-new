// src/app/api/videos/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

// 一覧取得
export async function GET() {
  const videos = await prisma.videos.findMany({
    include: { users: true },
    orderBy: { created_at: 'desc' },
  });

  const response = videos.map((v) => ({
    id: v.id,
    title: v.title,
    channel: v.users?.email ?? 'ゲストユーザー',
    views: v.views,
    uploadTime: v.created_at?.toISOString() ?? '',
    duration: '10:00',      // まだDBに無いので仮
    thumbnail: v.public_url,
  }));

  return NextResponse.json(response);
}

// ★ 動画登録（Storage に上がった後のメタ情報を保存）
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, user_id, public_url, storage_path } = body;

    if (!title || !user_id || !public_url || !storage_path) {
      return NextResponse.json(
        { error: 'Missing fields' },
        { status: 400 },
      );
    }

    const newVideo = await prisma.videos.create({
      data: {
        title,
        user_id,
        public_url,
        storage_path,
        views: 0,
      },
    });

    return NextResponse.json(newVideo, { status: 201 });
  } catch (e) {
    console.error('動画登録エラー', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
