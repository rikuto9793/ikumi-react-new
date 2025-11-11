"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { ArrowLeft, Loader2 } from "lucide-react";

interface VideoItem {
  name: string;
  url: string;
  createdAt?: string | null;
}

const MyVideosPage: React.FC = () => {
  const [videos, setVideos] = React.useState<VideoItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const router = useRouter();

  React.useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      setError(null);

      try {
        const supabase = createClient();

        // 🔸 ログインユーザー
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
          console.error("auth error", userError);
          setError("ログイン情報を取得できませんでした。");
          setLoading(false);
          return;
        }

        // 🔸 Storage API で videos バケットの自分のフォルダを list
        const { data, error } = await supabase.storage
          .from("videos")
          .list(user.id, {
            limit: 100,
            offset: 0,
            sortBy: { column: "created_at", order: "desc" },
          });

        if (error) {
          console.error("storage.list error", error);
          setError("動画一覧の取得に失敗しました。");
          setLoading(false);
          return;
        }

        // 🔸 public URL に変換
        const items: VideoItem[] =
          data?.map((file) => {
            const path = `${user.id}/${file.name}`;
            const { data: publicData } = supabase.storage
              .from("videos")
              .getPublicUrl(path);

            return {
              name: file.name,
              url: publicData.publicUrl,
              createdAt: (file as any).created_at ?? null, // SDK からは created_at が入る場合もある
            };
          }) ?? [];

        setVideos(items);
        setLoading(false);
      } catch (e) {
        console.error("unexpected error", e);
        setError("予期せぬエラーが発生しました。");
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
      {/* ヘッダー */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center px-4 py-3 space-x-3">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-gray-800">マイ動画</h1>
            <p className="text-xs text-gray-500">
              あなたがアップロードした動画の一覧です
            </p>
          </div>
        </div>
      </header>

      {/* コンテンツ */}
      <main className="px-4 pb-6 pt-4 space-y-4">
        {/* ローディング */}
        {loading && (
          <div className="flex items-center justify-center py-10 text-gray-600 text-sm">
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            読み込み中です…
          </div>
        )}

        {/* エラー */}
        {!loading && error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl p-4">
            {error}
          </div>
        )}

        {/* 動画なし */}
        {!loading && !error && videos.length === 0 && (
          <div className="bg-white/80 border border-dashed border-pink-200 text-gray-600 text-sm rounded-xl p-6 text-center">
            まだ動画がアップロードされていません。
            <br />
            プロフィール画面から動画をアップロードしてみましょう 🎥
          </div>
        )}

        {/* 動画グリッド */}
        {!loading && !error && videos.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {videos.map((v) => (
              <div
                key={v.url}
                className="bg-white/90 rounded-xl shadow-sm border border-pink-100 overflow-hidden"
              >
                <div className="relative aspect-[3/4] bg-gray-100">
                  <video
                    src={v.url}
                    controls
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-2 space-y-0.5">
                  <p className="text-[10px] font-medium text-gray-800 truncate">
                    {v.name}
                  </p>
                  {v.createdAt && (
                    <span className="text-[9px] text-gray-400 block">
                      {new Date(v.createdAt).toLocaleString("ja-JP", {
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MyVideosPage;