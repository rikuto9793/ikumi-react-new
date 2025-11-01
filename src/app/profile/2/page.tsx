"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import {
  User,
  AtSign,
  ArrowRight,
  ArrowLeft,
  Check,
  RefreshCw,
  AlertCircle,
  Sparkles,
  Copy
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const UsernameSetupPage = () => {
  const router = useRouter();

  const [userIdentifier, setUserIdentifier] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [isCheckingIdentifier, setIsCheckingIdentifier] = useState<boolean>(false);
  const [isCheckingUsername, setIsCheckingUsername] = useState<boolean>(false);
  const [identifierAvailable, setIdentifierAvailable] = useState<boolean | null>(null);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 自動生成のuser_identifier
  const generateUserIdentifier = (): string => {
    const randomNum = Math.floor(Math.random() * 9999) + 1;
    const paddedNum = randomNum.toString().padStart(4, '0');
    return `mama${paddedNum}`;
  };

  // 初回ロード時に自動生成
  useEffect(() => {
    setUserIdentifier(generateUserIdentifier());
  }, []);

  // user_identifier重複チェック（デバウンス付き）
  useEffect(() => {
    if (!userIdentifier || userIdentifier.length < 5) {
      setIdentifierAvailable(null);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setIsCheckingIdentifier(true);
      try {
        // 実際の実装ではSupabaseで重複チェック
        const isAvailable = !['mama1234', 'mama5678'].includes(userIdentifier);
        setIdentifierAvailable(isAvailable);
      } catch (error) {
        console.error('ID重複チェックエラー:', error);
      } finally {
        setIsCheckingIdentifier(false);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [userIdentifier]);

  // username重複チェック（デバウンス付き）
  useEffect(() => {
    if (!username || username.length < 2) {
      setUsernameAvailable(null);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setIsCheckingUsername(true);
      try {
        // 実際の実装ではSupabaseで重複チェック
        const isAvailable = !['テストママ', 'サンプルユーザー'].includes(username);
        setUsernameAvailable(isAvailable);
      } catch (error) {
        console.error('ユーザー名重複チェックエラー:', error);
      } finally {
        setIsCheckingUsername(false);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [username]);

  // バリデーション関数（boolean を返すように明示）
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!userIdentifier) {
      newErrors.userIdentifier = 'ユーザーIDは必須です';
    } else if (!/^mama\d{4}$/.test(userIdentifier)) {
      newErrors.userIdentifier = 'ユーザーIDは「mama + 4桁の数字」の形式で入力してください';
    } else if (identifierAvailable === false) {
      newErrors.userIdentifier = 'このユーザーIDは既に使用されています';
    }

    if (!username) {
      newErrors.username = 'ユーザー名は必須です';
    } else if (username.length < 2) {
      newErrors.username = 'ユーザー名は2文字以上で入力してください';
    } else if (username.length > 20) {
      newErrors.username = 'ユーザー名は20文字以下で入力してください';
    } else if (usernameAvailable === false) {
      newErrors.username = 'このユーザー名は既に使用されています';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // ここでSupabaseにuser_identifierとusernameを保存
      console.log('保存データ:', { userIdentifier, username });

      // 実際の実装では次のページへ遷移
      setTimeout(() => {
        setIsLoading(false);
        router.push("/profile/3"); // ✅ 次のページへ
      }, 1000);
    } catch (error) {
      console.error('保存エラー:', error);
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    console.log('前のページに戻る');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    console.log('コピーしました:', text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
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
            <CardDescription>
              これらの情報は後からいつでも変更できます
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* ユーザーID */}
            <div className="space-y-2">
              <Label htmlFor="userIdentifier" className="flex items-center gap-2">
                <AtSign className="w-4 h-4" />
                ユーザーID
                <span className="text-xs text-gray-500">（他の人からの検索やメンションで使用）</span>
              </Label>
              <div className="relative">
                <Input
                  id="userIdentifier"
                  value={userIdentifier}
                  onChange={(e) => setUserIdentifier(e.target.value)}
                  placeholder="mama1234"
                  className={`pr-20 ${errors.userIdentifier ? 'border-red-500' :
                    identifierAvailable === true ? 'border-green-500' : ''}`}
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
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
                <span className="text-xs text-gray-500">（コミュニティ内で表示される名前）</span>
              </Label>
              <div className="relative">
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="例: はじめてママ、3児のママ、みか など"
                  className={`pr-10 ${errors.username ? 'border-red-500' :
                    usernameAvailable === true ? 'border-green-500' : ''}`}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
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

            {/* 説明 */}
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>ユーザーID</strong>は他の人があなたを検索する時に使用され、<strong>表示名</strong>は投稿やコメントに表示される名前です。
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* ナビゲーションボタン */}
        <div className="flex justify-between">
          <Button
            onClick={handleBack}
            variant="outline"
            size="lg"
            className="px-6"
          >
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
              isLoading
            }
            size="lg"
            className="px-8 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
          >
            {isLoading ? (
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
  );
};

export default UsernameSetupPage;
