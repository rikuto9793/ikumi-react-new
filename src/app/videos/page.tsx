"use client";

import React, { useState, useEffect } from "react";
import { Home as HomeIcon, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface VideoItem {
  id: string;
  title: string;
  channel: string;
  views: number;      // API 側で number にしている前提
  uploadTime: string; // ISO 文字列
  duration: string;
  thumbnail: string;
}

const VideoScrollUI: React.FC = () => {
  const router = useRouter();

  const goToHomes = () => router.push("/home");
  const goToLives = () => router.push("/live");
  const goToSearch = () => router.push("/search");
  const goToChats = () => router.push("/chatmama");

  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  // マウント時に /api/videos から取得
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch("/api/videos");
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }
        const data = await res.json();
        setVideos(data);
        console.log("🎥 取得した動画データ:", data);

      } catch (e) {
        console.error("動画取得に失敗しました", e);
        setError("動画の取得に失敗しました。時間をおいて再度お試しください。");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // 検索フィルタ（タイトル or チャンネル）
  const filteredVideos = videos.filter((v) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      v.title.toLowerCase().includes(q) ||
      v.channel.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
      {/* ヘッダー */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <h1 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Ikumi
            </h1>
          </div>

          {/* 検索バー */}
          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="動画を検索..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
              <svg
                className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607z"
                />
              </svg>
            </div>
          </div>

          <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">👤</span>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="container mx-auto px-4 py-6">
        {loading ? (
          <p className="text-center text-gray-500">読み込み中...</p>
        ) : error ? (
          <p className="text-center text-red-500 text-sm">{error}</p>
        ) : filteredVideos.length === 0 ? (
          <p className="text-center text-gray-500">
            条件に合う動画がありません
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
              >
                {/* サムネイル（動画） */}
                <div className="relative">
                  <video
                    src={video.thumbnail}  // ← Supabaseの.MOV URL
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    muted
                    playsInline
                    preload="metadata"
                  />
                  {/* 再生時間ラベル */}
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-sm font-medium">
                    {video.duration}
                  </div>
                </div>


                {/* 動画情報 */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 line-clamp-2 mb-2 group-hover:text-pink-600 transition-colors">
                    {video.title}
                  </h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p className="font-medium">{video.channel}</p>
                    <div className="flex items-center space-x-2">
                      <span>{video.views} 回視聴</span>
                      <span>•</span>
                      <span>
                        {video.uploadTime
                          ? new Date(video.uploadTime).toLocaleDateString(
                            "ja-JP"
                          )
                          : ""}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* もっと見るボタン（今はダミー） */}
        <div className="text-center mt-8">
          <button className="btn bg-gradient-to-r rounded-full from-pink-500 to-purple-500 text-white border-none hover:from-pink-600 hover:to-purple-600 px-8 py-4">
            さらに読み込む
          </button>
        </div>
      </main>

      {/* ボトムナビゲーション */}
      <nav className="bg-white/90 backdrop-blur-sm border-t border-gray-200 fixed bottom-0 left-0 right-0">
        <div className="flex items-center justify-around py-2">
          {/* ライブ配信 */}
          <button
            onClick={goToLives}
            className="flex flex-col items-center py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg
              className="w-6 h-6 text-gray-600 mb-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span className="text-xs text-gray-600">配信</span>
          </button>

          {/* 検索 */}
          <button
            onClick={goToSearch}
            className="flex flex-col items-center py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg
              className="w-6 h-6 text-gray-600 mb-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607z"
              />
            </svg>
            <span className="text-xs text-gray-600">検索</span>
          </button>

          {/* ホーム */}
          <button
            onClick={goToHomes}
            className="flex flex-col items-center py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center mb-1">
              <HomeIcon className="w-4 h-4 text-gray-600" />
            </div>
            <span className="text-xs text-gray-600 font-medium">ホーム</span>
          </button>

          {/* チャット */}
          <button
            onClick={goToChats}
            className="flex flex-col items-center py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <MessageCircle className="w-6 h-6 text-gray-600 mb-1" />
            <span className="text-xs text-gray-600">チャット</span>
          </button>

          {/* 動画（現在地） */}
          <button className="flex flex-col items-center py-2 px-3 rounded-lg bg-gradient-to-r from-pink-100 to-purple-100">
            <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mb-1">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <rect
                  x="3"
                  y="4"
                  width="18"
                  height="12"
                  rx="2"
                  ry="2"
                  strokeWidth="2"
                />
                <polygon points="10,8 16,12 10,16" fill="white" />
              </svg>
            </div>
            <span className="text-xs text-purple-600 font-medium">動画</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default VideoScrollUI;

