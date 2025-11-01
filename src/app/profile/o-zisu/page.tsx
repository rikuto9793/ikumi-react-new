'use client';

import React, { useState } from 'react';
import { Camera, Sparkles, Heart, User, Home, Search, ShoppingBag } from 'lucide-react';

const MakeupApp = () => {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            BeautyLens
          </h1>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-full bg-pink-100 hover:bg-pink-200 transition-colors">
              <Search className="w-5 h-5 text-pink-600" />
            </button>
            <button className="p-2 rounded-full bg-purple-100 hover:bg-purple-200 transition-colors">
              <User className="w-5 h-5 text-purple-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6">
        {/* Greeting */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            今日、どんな気分？
          </h2>
          <p className="text-gray-600">あなたにぴったりのメイクを見つけましょう</p>
        </div>

        {/* Main Action Button */}
        <div className="mb-8">
          <button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200">
            <div className="flex items-center justify-center gap-3">
              <Camera className="w-8 h-8" />
              <div className="text-left">
                <div className="text-lg font-semibold">バーチャルメイク</div>
                <div className="text-sm opacity-90">カメラでメイクを試してみる</div>
              </div>
            </div>
          </button>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-center w-12 h-12 bg-pink-100 rounded-full mb-3">
              <Sparkles className="w-6 h-6 text-pink-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">トレンド</h3>
            <p className="text-sm text-gray-600">最新のメイクトレンドをチェック</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-3">
              <Heart className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">お気に入り</h3>
            <p className="text-sm text-gray-600">保存したメイクを見る</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
              <ShoppingBag className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">ショッピング</h3>
            <p className="text-sm text-gray-600">おすすめの化粧品</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
              <User className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">プロフィール</h3>
            <p className="text-sm text-gray-600">あなたの美容データ</p>
          </div>
        </div>

        {/* Popular Looks Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">人気のルック</h3>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {['ナチュラル', 'グラマラス', 'キュート', 'クール'].map((style, index) => (
              <div key={style} className="min-w-[120px] bg-white p-4 rounded-xl shadow-sm">
                <div className={`w-16 h-16 rounded-full mb-3 mx-auto ${
                  index === 0 ? 'bg-gradient-to-br from-pink-200 to-pink-300' :
                  index === 1 ? 'bg-gradient-to-br from-purple-200 to-purple-300' :
                  index === 2 ? 'bg-gradient-to-br from-yellow-200 to-orange-300' :
                  'bg-gradient-to-br from-blue-200 to-blue-300'
                }`}></div>
                <p className="text-sm font-medium text-center text-gray-700">{style}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around items-center">
          <button 
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
              activeTab === 'home' ? 'text-pink-600 bg-pink-50' : 'text-gray-600'
            }`}
          >
            <Home className="w-6 h-6 mb-1" />
            <span className="text-xs">ホーム</span>
          </button>
          <button 
            onClick={() => setActiveTab('camera')}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
              activeTab === 'camera' ? 'text-pink-600 bg-pink-50' : 'text-gray-600'
            }`}
          >
            <Camera className="w-6 h-6 mb-1" />
            <span className="text-xs">カメラ</span>
          </button>
          <button 
            onClick={() => setActiveTab('trends')}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
              activeTab === 'trends' ? 'text-pink-600 bg-pink-50' : 'text-gray-600'
            }`}
          >
            <Sparkles className="w-6 h-6 mb-1" />
            <span className="text-xs">トレンド</span>
          </button>
          <button 
            onClick={() => setActiveTab('favorites')}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
              activeTab === 'favorites' ? 'text-pink-600 bg-pink-50' : 'text-gray-600'
            }`}
          >
            <Heart className="w-6 h-6 mb-1" />
            <span className="text-xs">お気に入り</span>
          </button>
          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
              activeTab === 'profile' ? 'text-pink-600 bg-pink-50' : 'text-gray-600'
            }`}
          >
            <User className="w-6 h-6 mb-1" />
            <span className="text-xs">プロフィール</span>
          </button>
        </div>
      </div>

      {/* Spacer for bottom navigation */}
      <div className="h-20"></div>
    </div>
  );
};

export default MakeupApp;