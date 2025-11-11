"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Home,
  Monitor,
  Search,
  MessageCircle,
  Play,
  X,
} from "lucide-react";

interface VideoItem {
  id: string;
  title: string;
  channel: string;
  views: number;
  uploadTime: string;
  duration: string;
  thumbnail: string; // 再生URLも兼ねる
}

const VideosPage: React.FC = () => {
  const router = useRouter();

  // ナビ用
  const goToHome = () => router.push("/home");
  const goToLives = () => router.push("/live");
  const goToSearch = () => router.push("/search");
  const goToChat = () => router.push("/chatmama");
  const goToAllVideos = () => router.push("/videos");

  // 状態管理
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [currentVideo, setCurrentVideo] = useState<VideoItem | null>(null);

  // 一覧取得
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch("/api/videos");
        if (!res.ok) throw new Error(`Failed: ${res.status}`);
        const data: VideoItem[] = await res.json();
        setVideos(data);
        console.log("🎥 取得:", data);
      } catch (e) {
        console.error("動画取得エラー", e);
        setError("動画の取得に失敗しました。");
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  // クリック時：views +1 → プレーヤー再生
  const handleVideoClick = async (video: VideoItem) => {
    try {
      const res = await fetch(`/api/videos/${video.id}/view`, {
        method: "POST",
      });
      if (res.ok) {
        const data: { views: number } = await res.json();
        setVideos((prev) =>
          prev.map((v) =>
            v.id === video.id ? { ...v, views: data.views } : v
          )
        );
      }
    } catch (e) {
      console.error("視聴回数更新エラー:", e);
    }

    setCurrentVideo(video);
  };

  // 検索フィルタ
  const filteredVideos = videos.filter((v) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      v.title.toLowerCase().includes(q) ||
      v.channel.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 pb-20 relative">
      {/* ヘッダー */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-20">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            みんなの動画
          </h1>
          <div className="flex-1 max-w-md ml-4">
            <div className="relative">
              <input
                type="text"
                placeholder="動画を検索..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>
      </header>

      {/* メイン */}
      <main className="container mx-auto px-4 py-6">
        {loading ? (
          <p className="text-center text-gray-500">読み込み中...</p>
        ) : error ? (
          <p className="text-center text-red-500 text-sm">{error}</p>
        ) : filteredVideos.length === 0 ? (
          <p className="text-center text-gray-500">
            条件に合う動画がありません。
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden group"
              >
                {/* サムネイル（動画プレビュー） */}
                <div
                  className="relative cursor-pointer"
                  onClick={() => handleVideoClick(video)}
                >
                  <video
                    src={video.thumbnail}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    muted
                    playsInline
                    preload="metadata"
                  />
                  {/* 再生時間 */}
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs">
                    {video.duration}
                  </div>
                </div>

                {/* 動画情報 */}
                <div className="p-4">
                  <h3 className="text-sm font-semibold line-clamp-2 mb-1 text-gray-800 group-hover:text-pink-600 transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-xs text-gray-600">{video.channel}</p>
                  <p className="text-xs text-gray-500">
                    {video.views} 回視聴・
                    {video.uploadTime
                      ? new Date(video.uploadTime).toLocaleDateString("ja-JP")
                      : ""}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* 🎥 再生プレーヤー（オーバーレイ） */}
      {currentVideo && (
        <div className="fixed inset-0 z-30 bg-black/90 flex flex-col items-center justify-center">
          <button
            onClick={() => setCurrentVideo(null)}
            className="absolute top-3 right-3 p-2 bg-white/20 rounded-full hover:bg-white/40 transition"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <div className="w-[90%] max-w-3xl aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
            <video
              src={currentVideo.thumbnail}
              controls
              autoPlay
              className="w-full h-full object-contain"
            />
          </div>
          <div className="text-center text-white mt-4 px-4">
            <h2 className="font-semibold text-lg">{currentVideo.title}</h2>
            <p className="text-sm text-gray-300 mt-1">
              {currentVideo.channel} ・ {currentVideo.views} 回視聴
            </p>
          </div>
        </div>
      )}

      {/* 🎨 フッターナビ（統一版） */}
      <nav className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-sm border-t border-gray-200">
        <div className="flex items-center justify-around py-2">
          <button
            onClick={goToLives}
            className="flex flex-col items-center py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Monitor className="w-6 h-6 text-gray-600 mb-1" />
            <span className="text-xs text-gray-600">配信</span>
          </button>

          <button
            onClick={goToSearch}
            className="flex flex-col items-center py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Search className="w-6 h-6 text-gray-600 mb-1" />
            <span className="text-xs text-gray-600">検索</span>
          </button>

          <button
            onClick={goToHome}
            className="flex flex-col items-center py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center mb-1">
              <Home className="w-4 h-4 text-gray-600" />
            </div>
            <span className="text-xs text-gray-600 font-medium">ホーム</span>
          </button>

          <button
            onClick={goToChat}
            className="flex flex-col items-center py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <MessageCircle className="w-6 h-6 text-gray-600 mb-1" />
            <span className="text-xs text-gray-600">チャット</span>
          </button>

          {/* 🎥 現在地：動画 */}
          <button
            onClick={goToAllVideos}
            className="flex flex-col items-center py-2 px-3 rounded-lg bg-gradient-to-r from-pink-100 to-purple-100"
          >
            <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mb-1">
              <Play className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs text-purple-600 font-medium">動画</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default VideosPage;