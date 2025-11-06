"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import {
  User,
  AtSign,
  ArrowRight,
  ArrowLeft,
  Check,
  RefreshCw,
  AlertCircle,
  Sparkles,
  Copy,
  Image as ImageIcon,
  X,
} from "lucide-react";

const UsernameSetupPage = () => {
  const router = useRouter();
  const supabase = createClient();

  const [userIdentifier, setUserIdentifier] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const [isCheckingIdentifier, setIsCheckingIdentifier] = useState<boolean>(false);
  const [isCheckingUsername, setIsCheckingUsername] = useState<boolean>(false);
  const [identifierAvailable, setIdentifierAvailable] = useState<boolean | null>(null);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 画像アップロード用
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState<string | null>(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState<boolean>(false);

  // ① ログインしていなければ /login へ
  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) router.replace("/login");
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ② デフォルトIDを生成（mama0001〜mama9999）
  const generateUserIdentifier = (): string => {
    const randomNum = Math.floor(Math.random() * 9999) + 1;
    const paddedNum = randomNum.toString().padStart(4, "0");
    return `mama${paddedNum}`;
  };
  useEffect(() => {
    setUserIdentifier(generateUserIdentifier());
  }, []);

  
  // ③ ユーザーID(public_id) 重複チェック（DB問い合わせ）
useEffect(() => {
  if (!userIdentifier || userIdentifier.length < 5) {
    setIdentifierAvailable(null);
    return;
  }
  const t = setTimeout(async () => {
    setIsCheckingIdentifier(true);
    try {
      const { count, error, status } = await supabase
        .from("profiles")
        .select("id", { count: "exact", head: true }) // ← rowsは返さず件数だけ
        .eq("public_id", userIdentifier);

      // 406はHEAD要求の仕様由来なので異常扱いしない
      if (error && status !== 406) {
        console.error("ID重複チェックエラー:", (error as any)?.message ?? error);
        setIdentifierAvailable(null);
      } else {
        setIdentifierAvailable((count ?? 0) === 0);
      }
    } catch (e: any) {
      console.error("ID重複チェック例外:", e?.message ?? e);
      setIdentifierAvailable(null);
    } finally {
      setIsCheckingIdentifier(false);
    }
  }, 400);
  return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [userIdentifier]);


  // ④ ユーザー名(username) 重複チェック（大文字小文字無視の完全一致）
useEffect(() => {
  if (!username || username.length < 2) {
    setUsernameAvailable(null);
    return;
  }
  const t = setTimeout(async () => {
    setIsCheckingUsername(true);
    try {
      const { count, error, status } = await supabase
        .from("profiles")
        .select("id", { count: "exact", head: true })
        .ilike("username", username); // ワイルドカードなし=大小無視の完全一致

      if (error && status !== 406) {
        console.error("ユーザー名重複チェックエラー:", (error as any)?.message ?? error);
        setUsernameAvailable(null);
      } else {
        setUsernameAvailable((count ?? 0) === 0);
      }
    } catch (e: any) {
      console.error("ユーザー名重複チェック例外:", e?.message ?? e);
      setUsernameAvailable(null);
    } finally {
      setIsCheckingUsername(false);
    }
  }, 400);
  return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [username]);


  // 入力バリデーション
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!userIdentifier) {
      newErrors.userIdentifier = "ユーザーIDは必須です";
    } else if (!/^mama\d{4}$/.test(userIdentifier)) {
      newErrors.userIdentifier = "ユーザーIDは「mama + 4桁の数字」の形式で入力してください";
    } else if (identifierAvailable === false) {
      newErrors.userIdentifier = "このユーザーIDは既に使用されています";
    }
    if (!username) {
      newErrors.username = "ユーザー名は必須です";
    } else if (username.length < 2) {
      newErrors.username = "ユーザー名は2文字以上で入力してください";
    } else if (username.length > 20) {
      newErrors.username = "ユーザー名は20文字以下で入力してください";
    } else if (usernameAvailable === false) {
      newErrors.username = "このユーザー名は既に使用されています";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 画像選択
  const onPickAvatar = (file: File | null) => {
    setAvatarFile(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarPreviewUrl(url);
    } else {
      setAvatarPreviewUrl(null);
    }
  };

  // 保存処理：profiles を更新 + 画像あれば Storage に保存（RLS: auth.uid() = id）
  const handleNext = async () => {
    if (!validateForm()) return;
    setIsLoading(true);
    setErrors((e) => ({ ...e, form: "" }));
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setErrors({ form: "ログインしてください" });
        setIsLoading(false);
        return;
      }

      // 念のため：public_id 生成の衝突時は数回リトライ
      let chosenId = userIdentifier;
      if (identifierAvailable !== true) {
        for (let i = 0; i < 3; i++) {
          const candidate = generateUserIdentifier();
          const { data } = await supabase
            .from("profiles")
            .select("id")
            .eq("public_id", candidate)
            .limit(1);
          if ((data?.length ?? 0) === 0) {
            chosenId = candidate;
            break;
          }
        }
      }

      // まず username / public_id を更新
      const { error: updateErr1 } = await supabase
        .from("profiles")
        .update({ username, public_id: chosenId })
        .eq("id", user.id);

      if (updateErr1) {
        // @ts-ignore
        if (updateErr1.code === "23505") {
          setErrors({ form: "すでに使用されている名前/IDです。別のものを試してください。" });
        } else {
          setErrors({ form: updateErr1.message ?? "保存に失敗しました" });
        }
        setIsLoading(false);
        return;
      }

      // 画像が選択されていれば、アップロード → URL を profiles.avatar_url に保存
      let avatarUrl: string | null = null;
      if (avatarFile) {
        setIsUploadingAvatar(true);
        const ext = avatarFile.name.split(".").pop()?.toLowerCase() || "png";
        const path = `${user.id}/avatar.${ext}`;

        // Storage へアップロード（同名上書き）
        const { error: upErr } = await supabase.storage
          .from("avatars")
          .upload(path, avatarFile, {
            upsert: true,
            contentType: avatarFile.type || "image/png",
            cacheControl: "3600",
          });

        if (upErr) {
          console.error("avatar upload error:", upErr);
          // 画像は後で設定できるので致命的にしない
        } else {
          // 公開バケット運用なら public URL、非公開ならここでは path を保存してサーバーで署名URL生成
          const { data } = supabase.storage.from("avatars").getPublicUrl(path);
          avatarUrl = data.publicUrl;

          const { error: updateErr2 } = await supabase
            .from("profiles")
            .update({ avatar_url: avatarUrl })
            .eq("id", user.id);

          if (updateErr2) {
            console.error("avatar url update error:", updateErr2);
          }
        }
        setIsUploadingAvatar(false);
      }

      setIsLoading(false);
      router.push("/onboarding/1");// 必要に応じて変更
    } catch (e: any) {
      console.error("保存エラー:", e);
      setErrors({ form: "保存中にエラーが発生しました" });
      setIsLoading(false);
      setIsUploadingAvatar(false);
    }
  };

  const handleBack = () => router.back();

  const copyToClipboard = (text: string) => navigator.clipboard.writeText(text);

  return (
    <div className="min-h-dvh w-full bg-neutral-900">
      <div className="min-h-dvh w-full bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 px-4 py-8">
        <div className="mx-auto w-full max-w-2xl">
          {/* プログレスバー */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">プロフィール設定</span>
              <span className="text-sm text-gray-500">2/4</span>
            </div>
            <Progress value={50} className="h-2" />
          </div>

          {/* ヘッダー */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              あなたを呼ぶ名前を決めましょう
            </h1>
            <p className="text-gray-600 max-w-md mx-auto">
              コミュニティ内で使用する名前を設定してください
            </p>
          </div>

          {/* 入力フォーム */}
          <Card className="border-0 shadow-xl mb-6">
            <CardHeader>
              <CardTitle>プロフィール情報</CardTitle>
              <CardDescription>これらの情報は後からいつでも変更できます</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* サーバーエラー */}
              {errors.form && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertDescription className="text-red-700">{errors.form}</AlertDescription>
                </Alert>
              )}

              {/* ユーザーID */}
              <div className="space-y-2">
                <Label htmlFor="userIdentifier" className="flex items-center gap-2">
                  <AtSign className="w-4 h-4" />
                  ユーザーID
                  <span className="text-xs text-gray-500">（検索やメンションで使用）</span>
                </Label>
                <div className="relative">
                  <Input
                    id="userIdentifier"
                    value={userIdentifier}
                    onChange={(e) => setUserIdentifier(e.target.value)}
                    placeholder="mama1234"
                    className={`pr-20 ${
                      errors.userIdentifier
                        ? "border-red-500"
                        : identifierAvailable === true
                        ? "border-green-500"
                        : ""
                    }`}
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    {isCheckingIdentifier ? (
                      <RefreshCw className="w-4 h-4 animate-spin text-gray-400" />
                    ) : identifierAvailable === true ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : identifierAvailable === false ? (
                      <AlertCircle className="w-4 h-4 text-red-500" />
                    ) : null}

                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setUserIdentifier(generateUserIdentifier())}
                      className="h-6 px-2 text-xs"
                    >
                      <RefreshCw className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                {identifierAvailable === true && (
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <Check className="w-3 h-3" />
                    このIDは利用可能です
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(userIdentifier)}
                      className="h-5 px-1"
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                )}

                {errors.userIdentifier && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.userIdentifier}
                  </p>
                )}
              </div>

              {/* ユーザー名 */}
              <div className="space-y-2">
                <Label htmlFor="username" className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  表示名・ニックネーム
                  <span className="text-xs text-gray-500">（コミュニティ内で表示）</span>
                </Label>
                <div className="relative">
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="例: はじめてママ、3児のママ、みか など"
                    className={`pr-10 ${
                      errors.username
                        ? "border-red-500"
                        : usernameAvailable === true
                        ? "border-green-500"
                        : ""
                    }`}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {isCheckingUsername ? (
                      <RefreshCw className="w-4 h-4 animate-spin text-gray-400" />
                    ) : usernameAvailable === true ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : usernameAvailable === false ? (
                      <AlertCircle className="w-4 h-4 text-red-500" />
                    ) : null}
                  </div>
                </div>

                {usernameAvailable === true && (
                  <p className="text-sm text-green-600 flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    この名前は利用可能です
                  </p>
                )}

                {errors.username && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.username}
                  </p>
                )}

                <p className="text-xs text-gray-500">
                  2〜20文字で入力してください。ひらがな、カタカナ、漢字、英数字が使用できます。
                </p>
              </div>

              {/* アバター画像アップロード */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  プロフィール画像（任意）
                </Label>

                <div className="flex items-center gap-3">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => onPickAvatar(e.target.files?.[0] ?? null)}
                    className="max-w-xs"
                  />
                  {avatarFile ? (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => onPickAvatar(null)}
                      className="h-8"
                    >
                      <X className="w-4 h-4 mr-1" />
                      取り消す
                    </Button>
                  ) : null}
                </div>

                {avatarPreviewUrl && (
                  <div className="mt-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={avatarPreviewUrl}
                      alt="avatar preview"
                      className="w-20 h-20 rounded-full object-cover ring-2 ring-white shadow"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      アップロードは「次へ進む」で保存されます
                    </p>
                  </div>
                )}
              </div>

              {/* 説明 */}
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>ユーザーID</strong>は他の人があなたを検索する時に使用され、
                  <strong>表示名</strong>は投稿やコメントに表示される名前です。画像は後から変更できます。
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* ナビゲーションボタン */}
          <div className="flex justify-between">
            <Button onClick={handleBack} variant="outline" size="lg" className="px-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              戻る
            </Button>

            <Button
              onClick={handleNext}
              disabled={
                !userIdentifier ||
                !username ||
                identifierAvailable !== true ||
                usernameAvailable !== true ||
                isLoading ||
                isUploadingAvatar
              }
              size="lg"
              className="px-8 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
            >
              {isLoading || isUploadingAvatar ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  保存中...
                </>
              ) : (
                <>
                  次へ進む
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsernameSetupPage;
