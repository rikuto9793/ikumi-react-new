//講師の個人プロフィール

"use client"

import React, { useState } from "react";

export default function VeteranMamaProfileFull() {
  const [isFollowing, setIsFollowing] = useState(false);

  const videos = [
    { id: 1, thumbnail: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=400", title: "新生児のお世話の基本 - 初めてのママ・パパへ", duration: "15:42", views: "2.3M", uploadTime: "1週間前" },
    { id: 2, thumbnail: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400", title: "夜泣き対策 - 赤ちゃんがよく眠るコツ", duration: "18:23", views: "3.1M", uploadTime: "2ヶ月前" },
    { id: 3, thumbnail: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400", title: "赤ちゃんとの遊び方 - 月齢別発達を促すおもちゃ", duration: "22:18", views: "950K", uploadTime: "3ヶ月前" },
    { id: 4, thumbnail: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=400", title: "産後ケア - ママの心と体のリカバリー", duration: "25:50", views: "1.4M", uploadTime: "4ヶ月前" },
    { id: 5, thumbnail: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400", title: "おむつ交換のコツとポイント - 新米パパママ必見", duration: "8:15", views: "720K", uploadTime: "1年前" },
    { id: 6, thumbnail: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400", title: "子どもの安全対策 - 家庭内事故を防ぐ方法", duration: "16:42", views: "1.1M", uploadTime: "2年前" },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-pink-50 to-purple-50">
      {/* プロフィールセクション */}
      <section className="w-full bg-white/70 backdrop-blur-sm shadow-sm py-10 px-6 md:px-16 lg:px-32">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          {/* 左側：プロフィール情報 */}
          <div className="flex items-start gap-6">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
              あ
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <h1 className="text-3xl font-bold text-gray-800">あやママ</h1>
                <span className="px-3 py-1.5 bg-pink-100 text-pink-600 text-xs rounded-full border border-pink-300">
                  育児歴 10年
                </span>
              </div>
              <p className="text-gray-700 text-base mb-3 max-w-2xl">
                お弁当作りの達人。朝の時短レシピ配信。3人の子育て経験を活かして、忙しいママたちのサポートをしています。
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">#お弁当</span>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">#時短</span>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">#育児ハック</span>
              </div>

              {/* Stats */}
              <div className="flex gap-10 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">156</div>
                  <div className="text-sm text-gray-600">投稿</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">12.5K</div>
                  <div className="text-sm text-gray-600">フォロワー</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">234</div>
                  <div className="text-sm text-gray-600">フォロー中</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">4.8</div>
                  <div className="text-sm text-gray-600">評価</div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`px-6 py-2.5 rounded-lg font-semibold transition-all ${
                    isFollowing
                      ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      : "bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:shadow-lg"
                  }`}
                >
                  {isFollowing ? "フォロー中" : "メンバーになる"}
                </button>
                <button className="px-6 py-2.5 bg-white border-2 border-pink-200 text-pink-700 rounded-lg font-semibold hover:bg-pink-50 transition">
                  メッセージ
                </button>
              </div>
            </div>
          </div>

          {/* 右側：評価サマリー（PC表示） */}
          <div className="hidden md:flex flex-col gap-4 items-center text-center">
            <div>
              <div className="text-3xl font-bold text-gray-800">4.8</div>
              <div className="text-sm text-gray-600">評価</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-800">892</div>
              <div className="text-sm text-gray-600">いいね</div>
            </div>
          </div>
        </div>
      </section>

      {/* 動画セクション */}
      <section className="px-6 md:px-16 lg:px-32 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">投稿動画</h2>
          <div className="flex items-center gap-3">
            <span className="text-gray-600 text-sm">並び替え:</span>
            <select className="px-4 py-2 rounded-lg border-2 border-gray-200 bg-white text-sm">
              <option>新着順</option>
              <option>人気順</option>
              <option>再生時間順</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div
              key={video.id}
              className="bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
            >
              <div className="relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full aspect-video object-cover"
                />
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </div>
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-gray-800 mb-2 text-sm line-clamp-2">
                  {video.title}
                </h4>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <span>{video.views} 回視聴</span>
                  <span>•</span>
                  <span>{video.uploadTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}