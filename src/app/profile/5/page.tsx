"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Menu, Search, Home, MessageCircle, Play, Monitor, Users, MapPin, Baby, Calendar } from 'lucide-react';

const AppHomeScreen: React.FC = () => {
  const router = useRouter();

  const goToVideos = () => {
    router.push("/profile/6");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
      {/* ヘッダー */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
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
                className="w-full px-4 py-2 pl-10 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
              <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607z" />
              </svg>
            </div>
          </div>

          <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">👤</span>
          </div>
        </div>
      </header>

      {/* メインコンテンツエリア */}
      <main className="flex-1 px-4 py-8">
        {/* 中央：ユーザーアイコン */}
        <div className="flex items-center justify-center">
          <div className="w-20 h-20 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <span className="text-pink-500 font-bold text-3xl">👤</span>
            </div>
          </div>
        </div>
        
        {/* 名前と自己紹介 */}
        <div className="text-center mb-8 mt-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">いくいく美（仮）</h1>
          <p className="text-gray-600">子育て3年目です</p>
        </div>

        {/* プロフィール情報 */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">プロフィール</h2>
          
          {/* フォロワー・フォロー中・配信本数 */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-xl font-bold text-gray-800">1,234</div>
              <div className="text-xs text-gray-600">フォロワー</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-gray-800">567</div>
              <div className="text-xs text-gray-600">フォロー中</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-gray-800">89</div>
              <div className="text-xs text-gray-600">配信本数</div>
            </div>
          </div>

          {/* 詳細情報 */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-pink-50 to-purple-50">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                <Baby className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800 text-sm">お子様</p>
                <p className="text-xs text-gray-600">2人（5歳・3歳）</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800 text-sm">住んでいる町</p>
                <p className="text-xs text-gray-600">東京都渋谷区</p>
              </div>
            </div>
          </div>
        </div>

        {/* 機能カード */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-500 rounded-xl flex items-center justify-center mb-4">
              <Monitor className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">ライブ配信</h3>
            <p className="text-sm text-gray-600">配信を探す</p>
          </div>

          {/* ✅ 動画カード → /profile/6 に遷移 */}
          <div 
            onClick={goToVideos} 
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl flex items-center justify-center mb-4">
              <Play className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">動画</h3>
            <p className="text-sm text-gray-600">お気に入り動画</p>
          </div>
        </div>
      </main>

      {/* ボトムナビゲーション */}
      <nav className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-sm border-t border-gray-200">
        <div className="flex items-center justify-around py-2">
          {/* ライブ配信を探す */}
          <button className="flex flex-col items-center py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors">
            <Monitor className="w-6 h-6 text-gray-600 mb-1" />
            <span className="text-xs text-gray-600">配信</span>
          </button>

          {/* 検索 */}
          <button className="flex flex-col items-center py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors">
            <Search className="w-6 h-6 text-gray-600 mb-1" />
            <span className="text-xs text-gray-600">検索</span>
          </button>

          {/* ホーム（アクティブ状態） */}
          <button className="flex flex-col items-center py-2 px-3 rounded-lg bg-gradient-to-r from-pink-100 to-purple-100">
            <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mb-1">
              <Home className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs text-purple-600 font-medium">ホーム</span>
          </button>

          {/* チャット */}
          <button className="flex flex-col items-center py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors">
            <MessageCircle className="w-6 h-6 text-gray-600 mb-1" />
            <span className="text-xs text-gray-600">チャット</span>
          </button>

          {/* ✅ 動画（ナビゲーション） */}
          <button 
            onClick={goToVideos} 
            className="flex flex-col items-center py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Play className="w-6 h-6 text-gray-600 mb-1" />
            <span className="text-xs text-gray-600">動画</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default AppHomeScreen;
