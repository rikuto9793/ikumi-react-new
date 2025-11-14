"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Camera,
  Save,
  Loader2,
  Baby,
  MapPin,
  Calendar,
  Mail,
  User,
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";

const ProfileEdit: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  // フォーム
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [childrenInfo, setChildrenInfo] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const normalizeDateForInput = (value: any) => {
    if (!value) return "";
    try {
      if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
      const d = new Date(value);
      if (Number.isNaN(d.getTime())) return "";
      return d.toISOString().slice(0, 10);
    } catch {
      return "";
    }
  };

  const fetchProfile = async () => {
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        // レコードが無ければ作成
        if ((error as any).code !== "PGRST116") throw error;
        const { error: insertErr } = await supabase
          .from("profiles")
          .insert({ id: user.id, email: user.email ?? null });
        if (insertErr) throw insertErr;

        setUsername("");
        setBio("");
        setEmail(user.email || "");
        setLocation("");
        setChildrenInfo("");
        setBirthdate("");
        setAvatarUrl("");
      } else if (data) {
        setUsername(data.username || "");
        setBio(data.bio || "");
        setEmail(user.email || "");
        setLocation(data.location || "");
        setChildrenInfo(data.children_info || "");
        setBirthdate(normalizeDateForInput(data.birthdate));
        setAvatarUrl(data.avatar_url || "");
      }

      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("プロフィールの取得に失敗しました");
      setLoading(false);
    }
  };

  // === 画像アップロード（Publicバケット前提） ==========================
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  setUploadingAvatar(true);
  setError(null);

  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("ログインしていません");

    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const filePath = `${user.id}/${Date.now()}.${ext}`; // ✅ バケット名は含めない

    const { error: uploadError } = await supabase
      .storage
      .from("avatars")
      .upload(filePath, file, {
        upsert: true,
        cacheControl: "3600",
        contentType: file.type || "image/jpeg",
      });

    if (uploadError) throw uploadError;

    // Public バケットならこれでOK
    const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
    const publicUrl = data.publicUrl;

    setAvatarUrl(publicUrl);

    // profiles.avatar_url に保存（Home で表示される）
    const { error: updateErr } = await supabase
      .from("profiles")
      .update({ avatar_url: publicUrl, updated_at: new Date().toISOString() })
      .eq("id", user.id);
    if (updateErr) throw updateErr;

    setUploadingAvatar(false);
  } catch (err) {
    console.error(err);
    setError("画像のアップロードに失敗しました");
    setUploadingAvatar(false);
  }
};


  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("ログインしていません");

      const payload = {
        id: user.id,
        username,
        bio,
        location,
        children_info: childrenInfo,
        birthdate: birthdate || null,
        avatar_url: avatarUrl,
        updated_at: new Date().toISOString(),
        email: user.email ?? null,
      };

      const { error } = await supabase
        .from("profiles")
        .upsert(payload, { onConflict: "id" });

      if (error) throw error;

      setSuccess(true);
      setSaving(false);
      setTimeout(() => router.push("/home"), 900);
    } catch (err) {
      console.error(err);
      setError("プロフィールの更新に失敗しました");
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-pink-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
      {/* ヘッダー */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="戻る"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-lg font-bold text-gray-800">プロフィール編集</h1>
          <div className="w-10" />
        </div>
      </header>

      {/* メイン */}
      <main className="px-4 py-6 pb-24 max-w-2xl mx-auto">
        {/* アバター編集 */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-r from-pink-400 to-purple-500 flex items-center justify-center shadow-lg">
              {avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="text-white font-bold text-3xl">👤</span>
              )}
            </div>

            <label className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:scale-110 transition-transform" aria-label="画像を選択">
              {uploadingAvatar ? (
                <Loader2 className="w-4 h-4 text-white animate-spin" />
              ) : (
                <Camera className="w-4 h-4 text-white" />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
                disabled={uploadingAvatar}
              />
            </label>
          </div>
          <p className="text-xs text-gray-500 mt-2">タップして画像を変更</p>
        </div>

        {/* フォーム */}
        <div className="space-y-4">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
            <label className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-pink-500" />
              </div>
              <span className="font-medium text-gray-700">ユーザー名</span>
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="山田 花子"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
            <label className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                <Mail className="w-5 h-5 text-purple-500" />
              </div>
              <span className="font-medium text-gray-700">メールアドレス</span>
            </label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-gray-50 text-gray-500"
            />
            <p className="text-xs text-gray-500 mt-1">メールアドレスは変更できません</p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
            <label className="font-medium text-gray-700 mb-2 block">自己紹介</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="よろしくお願いします！"
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
            />
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
            <label className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-pink-500" />
              </div>
              <span className="font-medium text-gray-700">住んでいる町</span>
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="東京都渋谷区"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
            <label className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                <Baby className="w-5 h-5 text-purple-500" />
              </div>
              <span className="font-medium text-gray-700">お子様</span>
            </label>
            <input
              type="text"
              value={childrenInfo}
              onChange={(e) => setChildrenInfo(e.target.value)}
              placeholder="2人（5歳・3歳）"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
            <label className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full flex items-center justify-center">
                <Calendar className="w-5 h-5 text-pink-500" />
              </div>
              <span className="font-medium text-gray-700">生年月日</span>
            </label>
            <input
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
        </div>

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {success && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
            <p className="text-sm text-green-600">✓ プロフィールを更新しました！</p>
          </div>
        )}

        <button
          onClick={handleSave}
          disabled={saving}
          className="mt-8 w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {saving ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>保存中...</span>
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              <span>保存する</span>
            </>
          )}
        </button>
      </main>
    </div>
  );
};

export default ProfileEdit;
