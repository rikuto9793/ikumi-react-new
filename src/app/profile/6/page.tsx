"use client"
import React from 'react';

interface VideoItem {
  id: string;
  title: string;
  channel: string;
  views: string;
  uploadTime: string;
  duration: string;
  thumbnail: string;
}

const VideoScrollUI: React.FC = () => {
  // サンプル動画データ
  const videos: VideoItem[] = [
    {
      id: '1',
      title: '新生児のお世話の基本 - 初めてのママ・パパへ',
      channel: '育児チャンネル',
      views: '2.3M',
      uploadTime: '1週間前',
      duration: '15:42',
      thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=225&fit=crop'
    },
    
    {
      id: '3',
      title: '夜泣き対策 - 赤ちゃんがよく眠るコツ',
      channel: '子育てサポート',
      views: '3.1M',
      uploadTime: '2日前',
      duration: '18:23',
      thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=225&fit=crop'
    },
    {
      id: '4',
      title: '赤ちゃんとの遊び方 - 月齢別発達を促すおもちゃ',
      channel: 'こども発達研究所',
      views: '950K',
      uploadTime: '5日前',
      duration: '22:18',
      thumbnail: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=225&fit=crop'
    },
    {
      id: '5',
      title: '産後ケア - ママの心と体のリカバリー',
      channel: 'ママウェルネス',
      views: '1.4M',
      uploadTime: '4日前',
      duration: '25:50',
      thumbnail: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400&h=225&fit=crop'
    },
    {
      id: '6',
      title: 'おむつ交換のコツとポイント - 新米パパママ必見',
      channel: 'パパ育児応援',
      views: '720K',
      uploadTime: '1週間前',
      duration: '8:15',
      thumbnail: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=400&h=225&fit=crop'
    },
    {
      id: '7',
      title: '子どもの安全対策 - 家庭内事故を防ぐ方法',
      channel: '子育て安心ガイド',
      views: '1.1M',
      uploadTime: '6日前',
      duration: '16:42',
      thumbnail: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=225&fit=crop'
    },
    {
      id: '8',
      title: '赤ちゃんの成長記録 - 生後0ヶ月から1歳まで',
      channel: '成長日記チャンネル',
      views: '2.7M',
      uploadTime: '2週間前',
      duration: '28:30',
      thumbnail: 'https://images.unsplash.com/photo-1566004100631-35d015d6a491?w=400&h=225&fit=crop'
    },
  ];

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

      {/* メインコンテンツ */}
      <main className="container mx-auto px-4 py-6">
        {/* 動画グリッド */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map((video) => (
            <div key={video.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer">
              {/* サムネイル */}
              <div className="relative">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* 動画時間 */}
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
                    <span>{video.uploadTime}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* もっと見るボタン */}
        <div className="text-center mt-8">
          <button className="btn bg-gradient-to-r from-pink-500 to-purple-500 text-white border-none hover:from-pink-600 hover:to-purple-600 px-8">
            さらに読み込む
          </button>
        </div>
      </main>

      {/* ボトムナビゲーション */}
      <nav className="bg-white/90 backdrop-blur-sm border-t border-gray-200 fixed bottom-0 left-0 right-0">
        <div className="flex items-center justify-around py-2">
          {/* ライブ配信を探す */}
          <button className="flex flex-col items-center py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors">
            <svg className="w-6 h-6 text-gray-600 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-xs text-gray-600">配信</span>
          </button>

          {/* 検索 */}
          <button className="flex flex-col items-center py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors">
            <svg className="w-6 h-6 text-gray-600 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607z" />
            </svg>
            <span className="text-xs text-gray-600">検索</span>
          </button>

          {/* ホーム（アクティブ状態） */}
          <button className="flex flex-col items-center py-2 px-3 rounded-lg bg-gradient-to-r from-pink-100 to-purple-100">
            <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mb-1">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
            </div>
            <span className="text-xs text-purple-600 font-medium">ホーム</span>
          </button>

          {/* チャット */}
          <button className="flex flex-col items-center py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors">
            <svg className="w-6 h-6 text-gray-600 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
            </svg>
            <span className="text-xs text-gray-600">チャット</span>
          </button>

          {/* 動画 */}
          <button className="flex flex-col items-center py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors">
            <svg className="w-6 h-6 text-gray-600 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="12" rx="2" ry="2" strokeWidth="2"/>
              <polygon points="10,8 16,12 10,16" fill="currentColor"/>
            </svg>
            <span className="text-xs text-gray-600">動画</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default VideoScrollUI;