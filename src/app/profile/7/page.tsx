"use client";

import React from "react";
import Link from "next/link";
import {
  Menu,
  Search,
  Home,
  MessageCircle,
  Play,
  Monitor,
  MapPin,
  Baby,
} from "lucide-react";

/**
 * iPhone風フレーム（375x812）にジャストフィット
 * - 画面中央に phone コンテナ（375x812）
 * - スクロール領域はヘッダー＋メイン（ボトムナビ分の余白を確保）
 * - ボトムナビはフレーム内で absolute 固定＆幅ぴったり
 */
const AppHomeScreen: React.FC = () => {
  return (
    <div className="min-h-dvh grid place-items-center bg-neutral-900 p-4">
      {/* iPhone風フレーム */}
      <div className="relative w-[375px] h-[812px] overflow-hidden rounded-[32px] bg-white shadow-2xl">
        {/* スクロール領域（ヘッダー＋メイン） */}
        <div className="h-full overflow-y-auto bg-gradient-to-b from-pink-50 to-purple-50 pb-24">
          {/* Header */}
          <header
            className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10"
            style={{ paddingTop: "env(safe-area-inset-top)" }}
          >
            <div className="px-4 py-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <button
                    aria-label="メニューを開く"
                    className="p-3 rounded-xl hover:bg-gray-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500"
                  >
                    <Menu className="w-6 h-6 text-gray-700" />
                  </button>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                    Ikumi
                  </h1>
                </div>

                {/* Search bar */}
                <div className="flex-1 max-w-[56%]">
                  <label className="relative block">
                    <span className="sr-only">動画を検索</span>
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
                      <Search className="w-5 h-5 text-gray-400" />
                    </span>
                    <input
                      type="search"
                      inputMode="search"
                      placeholder="動画を検索…"
                      className="w-full h-10 pl-10 pr-3 rounded-full bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-[15px]"
                    />
                  </label>
                </div>

                <div
                  aria-label="プロフィール"
                  className="w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center"
                >
                  <span className="text-white font-bold text-sm">👤</span>
                </div>
              </div>
            </div>
          </header>

          {/* Main */}
          <main
            className="px-4 py-6"
            style={{ paddingBottom: "calc(88px + env(safe-area-inset-bottom))" }}
          >
            {/* Avatar center */}
            <div className="flex items-center justify-center">
              <div className="w-20 h-20 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                  <span className="text-pink-500 font-bold text-3xl">👤</span>
                </div>
              </div>
            </div>

            {/* Name & bio */}
            <div className="text-center mb-8 mt-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">いくいく美（仮）</h2>
              <p className="text-gray-600">子育て3年目です</p>
            </div>

            {/* Profile card */}
            <section className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-lg mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">プロフィール</h3>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[
                  { label: "フォロワー", value: "1,234" },
                  { label: "フォロー中", value: "567" },
                  { label: "配信本数", value: "89" },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="text-xl font-bold text-gray-800">{s.value}</div>
                    <div className="text-xs text-gray-600">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Details */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-pink-50 to-purple-50">
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                    <Baby className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 text-sm">お子様</p>
                    <p className="text-xs text-gray-600">2人（5歳・3歳）</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 text-sm">住んでいる町</p>
                    <p className="text-xs text-gray-600">東京都渋谷区</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Feature cards */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-lg">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-500 rounded-xl flex items-center justify-center mb-3">
                  <Monitor className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-1">ライブ配信</h4>
                <p className="text-sm text-gray-600">配信を探す</p>
              </div>

              {/* 遷移不要なら Link を div に置換でOK */}
              <Link
                href="/profile/6"
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 block"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl flex items-center justify-center mb-3">
                  <Play className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-1">動画</h4>
                <p className="text-sm text-gray-600">お気に入り動画</p>
              </Link>
            </div>
          </main>
        </div>

        {/* Bottom navigation（フレーム幅に合わせてジャスト） */}
        <nav
          className="absolute inset-x-0 bottom-0 bg-white/90 backdrop-blur-sm border-t border-gray-200"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          <div className="grid grid-cols-5 items-end justify-items-center py-2">
            <button className="flex flex-col items-center py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors min-h-11 min-w-11">
              <Monitor className="w-6 h-6 text-gray-600 mb-1" />
              <span className="text-[11px] leading-none text-gray-700">配信</span>
            </button>

            <button className="flex flex-col items-center py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors min-h-11 min-w-11">
              <Search className="w-6 h-6 text-gray-600 mb-1" />
              <span className="text-[11px] leading-none text-gray-700">検索</span>
            </button>

            <button className="flex flex-col items-center py-2 px-3 rounded-lg bg-gradient-to-r from-pink-100 to-purple-100 min-h-11 min-w-11">
              <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mb-1">
                <Home className="w-4 h-4 text-white" />
              </div>
              <span className="text-[11px] leading-none text-purple-700 font-medium">ホーム</span>
            </button>

            <button className="flex flex-col items-center py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors min-h-11 min-w-11">
              <MessageCircle className="w-6 h-6 text-gray-600 mb-1" />
              <span className="text-[11px] leading-none text-gray-700">チャット</span>
            </button>

            <Link
              href="/profile/6"
              className="flex flex-col items-center py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors min-h-11 min-w-11"
            >
              <Play className="w-6 h-6 text-gray-600 mb-1" />
              <span className="text-[11px] leading-none text-gray-700">動画</span>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default AppHomeScreen;
