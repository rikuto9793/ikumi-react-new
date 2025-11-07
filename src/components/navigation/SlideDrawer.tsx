"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { X, Edit, Settings, LogOut, ChevronRight } from 'lucide-react';
import { createClient } from "@/utils/supabase/client";

interface SlideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  profile: {
    username?: string;
    email?: string;
    avatar_url?: string;
  } | null;
}

const SlideDrawer: React.FC<SlideDrawerProps> = ({ isOpen, onClose, profile }) => {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    onClose();
    router.push("/login");
  };

  const handleEditProfile = () => {
    onClose();
    router.push("/profile/edit");
  };

  const handleSettings = () => {
    onClose();
    router.push("/settings");
  };

  return (
    <>
      {/* オーバーレイ */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* ドロワーメニュー */}
      <div className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* ドロワーヘッダー */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-6 pb-8">
          <div className="flex justify-end mb-4">
            <button 
              onClick={onClose}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
              {profile?.avatar_url ? (
                <img 
                  src={profile.avatar_url} 
                  alt="Profile" 
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-pink-500 font-bold text-2xl">👤</span>
              )}
            </div>
            <div>
              <h2 className="text-white font-bold text-xl">{profile?.username || "ユーザー"}</h2>
              <p className="text-white/80 text-sm">{profile?.email || ""}</p>
            </div>
          </div>
        </div>

        {/* メニューアイテム */}
        <div className="py-4">
          {/* プロフィール編集 */}
          <button
            onClick={handleEditProfile}
            className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full flex items-center justify-center">
                <Edit className="w-5 h-5 text-pink-500" />
              </div>
              <span className="font-medium text-gray-800">プロフィール編集</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          {/* 設定 */}
          <button
            onClick={handleSettings}
            className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                <Settings className="w-5 h-5 text-purple-500" />
              </div>
              <span className="font-medium text-gray-800">設定</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          {/* 区切り線 */}
          <div className="border-t border-gray-200 my-4 mx-6" />

          {/* ログアウト */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-between px-6 py-4 hover:bg-red-50 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <LogOut className="w-5 h-5 text-red-500" />
              </div>
              <span className="font-medium text-red-600">ログアウト</span>
            </div>
          </button>
        </div>

        {/* ドロワーフッター */}
        <div className="absolute bottom-0 left-0 w-full p-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">Ikumi v1.0.0</p>
        </div>
      </div>
    </>
  );
};

export default SlideDrawer;