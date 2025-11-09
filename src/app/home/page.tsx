"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Home,
  MessageCircle,
  Play,
  Monitor,
  MapPin,
  Baby,
  Menu,
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import SlideDrawer from "@/components/navigation/SlideDrawer";
import HomeSkeleton from "@/components/skeletons/HomeSkeleton";

// ✅ 動画アップロードカード
const UploadVideoCard: React.FC = () => {
  const [title, setTitle] = React.useState("");
  const [file, setFile] = React.useState<File | null>(null);
  const [uploading, setUploading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = React.useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    setError(null);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("アップロードする動画ファイルを選んでください。");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const supabase = createClient();
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error(userError);
        setError("ログイン情報を取得できませんでした。");
        setUploading(false);
        return;
      }

      const fileName = `${Date.now()}-${file.name}`;
      const filePath = `${user.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("videos")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        console.error(uploadError);
        setError("アップロードに失敗しました。");
        setUploading(false);
        return;
      }

      const { data } = supabase.storage.from("videos").getPublicUrl(filePath);
      const publicUrl = data.publicUrl;
      setUploadedUrl(publicUrl);

      const res = await fetch("/api/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title || file.name,
          user_id: user.id,
          public_url: publicUrl,
          storage_path: filePath,
        }),
      });

      if (!res.ok) {
        console.error(await res.text());
        setError("動画情報の保存に失敗しました。");
        setUploading(false);
        return;
      }

      setTitle("");
      setFile(null);
      setUploading(false);
    } catch (e) {
      console.error(e);
      setError("予期せぬエラーが発生しました。");
      setUploading(false);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg mb-8">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">動画をアップロード</h2>
      <p className="text-sm text-gray-600 mb-4">
        あなたの配信やレクチャー動画をアップロードして、あとで一覧から見返せるようにします！
      </p>

      <div className="space-y-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="動画のタイトルを入力"
          className="w-full mb-1 px-3 py-2 border border-gray-300 rounded-full text-sm"
        />

        <input
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-700
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-full file:border-0
                     file:text-sm file:font-semibold
                     file:bg-pink-100 file:text-pink-700
                     hover:file:bg-pink-200"
        />

        <button
          onClick={handleUpload}
          disabled={uploading || !file}
          className="inline-flex items-center justify-center px-4 py-2 rounded-full
                     bg-gradient-to-r from-pink-500 to-purple-500 text-white text-sm font-medium
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? "アップロード中..." : "アップロードする"}
        </button>

        {error && <p className="text-xs text-red-500">{error}</p>}

        {uploadedUrl && (
          <div className="mt-4">
            <p className="text-xs text-gray-600 mb-1">アップロードされた動画（プレビュー）</p>
            <video src={uploadedUrl} controls className="w-full rounded-xl border border-gray-200" />
          </div>
        )}
      </div>
    </div>
  );
};

// ✅ メインページ
const AppHomeScreen: React.FC = () => {
  const [profile, setProfile] = React.useState<any>(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const router = useRouter();

  // ✅ ページ遷移関数
  const goToLives = () => router.push("/live");
  const goToSearch = () => router.push("/search");
  const goToChat = () => router.push("/chatmama");
  const goToHome = () => router.push("/home");
  const goToMyVideos = () => router.push("/my-videos"); // ← カード用
  const goToAllVideos = () => router.push("/videos");   // ← フッター動画タブ用

  React.useEffect(() => {
    const fetchProfile = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (!error && data) {
        setProfile(data);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) return <HomeSkeleton />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
      <SlideDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        profile={{
          username: profile?.username,
          email: profile?.email,
          avatar_url: profile?.avatar_url,
        }}
      />

      {/* ヘッダー */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setDrawerOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="メニューを開く"
            >
              <Menu className="w-6 h-6 text-gray-700" />
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
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">👤</span>
          </div>
        </div>
      </header>

      {/* メイン */}
      <main className="flex-1 px-4 py-8 pb-28">
        <div className="flex items-center justify-center">
          <div className="w-20 h-20 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <span className="text-pink-500 font-bold text-3xl">👤</span>
            </div>
          </div>
        </div>

        <div className="text-center mb-8 mt-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {profile?.username || "ユーザー"}
          </h1>
          <p className="text-gray-600">{profile?.bio || "よろしくお願いします！"}</p>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">プロフィール</h2>

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

        <UploadVideoCard />

        {/* カード群 */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-500 rounded-xl flex items-center justify-center mb-4">
              <Monitor className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">ライブ配信</h3>
            <p className="text-sm text-gray-600">配信を探す</p>
          </div>

          {/* 🎬 お気に入り動画カード → /my-videos */}
          <div
            onClick={goToMyVideos}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl flex items-center justify-center mb-4">
              <Play className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">動画</h3>
            <p className="text-sm text-gray-600">My Videos</p>
          </div>
        </div>
      </main>

      {/* フッターナビ */}
      <nav className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-sm border-t border-gray-200">
        <div className="flex items-center justify-around py-2">
          <button onClick={goToLives} className="flex flex-col items-center py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors">
            <Monitor className="w-6 h-6 text-gray-600 mb-1" />
            <span className="text-xs text-gray-600">配信</span>
          </button>

          <button onClick={goToSearch} className="flex flex-col items-center py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors">
            <Search className="w-6 h-6 text-gray-600 mb-1" />
            <span className="text-xs text-gray-600">検索</span>
          </button>

          <button className="flex flex-col items-center py-2 px-3 rounded-lg bg-gradient-to-r from-pink-100 to-purple-100">
            <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mb-1">
              <Home className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs text-purple-600 font-medium">ホーム</span>
          </button>

          <button onClick={goToChat} className="flex flex-col items-center py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors">
            <MessageCircle className="w-6 h-6 text-gray-600 mb-1" />
            <span className="text-xs text-gray-600">チャット</span>
          </button>

          {/* 🎥 フッター動画タブ → /videos */}
          <button onClick={goToAllVideos} className="flex flex-col items-center py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors">
            <Play className="w-6 h-6 text-gray-600 mb-1" />
            <span className="text-xs text-gray-600">動画</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default AppHomeScreen;

