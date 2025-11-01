"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // ✅ 追加
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { Mail, Lock, Eye, EyeOff, Baby, Loader2, CheckCircle } from 'lucide-react';
import PageHeader from '@/components/user/Pageheader'; //自作コンポ

const SignupPage = () => {
  const router = useRouter(); // ✅ 追加

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  //パスワードの一致確認
  const validatePassword = () => {
    if (password !== confirmPassword) {
      return 'パスワードが一致しません';
    }
    if (password.length < 8) {
      return 'パスワードは8文字以上である必要があります';
    }
    return null;
  };

  const handleSignup = async () => {
    setError('');

    const passwordError = validatePassword();
    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (!acceptTerms) {
      setError('利用規約に同意してください');
      return;
    }

    setIsLoading(true);

    // ✅ 保存機能なしでそのまま遷移
    setTimeout(() => {
      setIsLoading(false);
      router.push("/profile/1"); // ✅ 新規登録後にプロフィール設定ページへ
    }, 1000);
  };

  // パスワード強度判定
  const passwordStrength = () => {
    if (!password) return null;
    if (password.length < 6) return { text: '弱い', color: 'text-red-500' };
    if (password.length < 8) return { text: '普通', color: 'text-yellow-500' };
    return { text: '強い', color: 'text-green-500' };
  };

  const strength = passwordStrength();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6">
        {/* ヘッダー */}
        <PageHeader text1="はじめまして！" text2="ikumi-に参加" />

        {/* メインカード */}
        <Card className="border-0 shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">新規登録</CardTitle>
            <CardDescription className="text-center">
              簡単な情報入力で今すぐ始められます
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {error && (
              <Alert className="border-red-200 bg-red-50">
                <AlertDescription className="text-red-700">{error}</AlertDescription>
              </Alert>
            )}

            {/* メールアドレス */}
            <div className="space-y-2">
              <Label htmlFor="email">メールアドレス</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* パスワード */}
            <div className="space-y-2">
              <Label htmlFor="password">パスワード</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="8文字以上で入力してください"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}
                </Button>
              </div>
              {strength && (
                <div className="text-xs flex items-center gap-2">
                  <span className="text-gray-500">強度:</span>
                  <span className={strength.color}>{strength.text}</span>
                </div>
              )}
            </div>

            {/* パスワード確認 */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">パスワード（確認）</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="パスワードを再入力してください"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}
                </Button>
              </div>
              {confirmPassword && password === confirmPassword && (
                <div className="text-xs text-green-600 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  パスワードが一致しています
                </div>
              )}
            </div>

            {/* 同意チェック */}
            <div className="flex flex-col items-start space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" checked={acceptTerms} onCheckedChange={() => setAcceptTerms(!acceptTerms)} />
                <Label htmlFor="terms" className="text-sm font-medium leading-none">
                  <span className="text-purple-600 hover:underline">利用規約</span> に同意します
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="privacy" checked={acceptTerms} onCheckedChange={() => setAcceptTerms(!acceptTerms)} />
                <Label htmlFor="privacy" className="text-sm font-medium leading-none">
                  <span className="text-purple-600 hover:underline">プライバシーポリシー</span> に同意します
                </Label>
              </div>
            </div>

            {/* 登録ボタン */}
            <Button
              onClick={handleSignup}
              disabled={isLoading || !email || !password || !confirmPassword || !acceptTerms}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  アカウント作成中...
                </>
              ) : (
                'アカウントを作成'
              )}
            </Button>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Alert className="border-purple-200 bg-purple-50">
              <Baby className="w-4 h-4 text-purple-600" />
              <AlertDescription className="text-purple-700">
                <span className="font-medium">簡単スタート！</span>
                <br />
                アカウント作成後、簡単なプロフィール設定だけですぐにコミュニティに参加できます✨
              </AlertDescription>
            </Alert>

            <div className="w-full text-center space-y-2">
              <div className="text-sm text-gray-600">すでにアカウントをお持ちの場合</div>
              <Button variant="outline" className="w-full border-purple-200 text-purple-600 hover:bg-purple-50">
                ログインはこちら
              </Button>
            </div>
          </CardFooter>
        </Card>

        <div className="text-center text-sm text-gray-500">
          <p>© 2025 ママコミュニティ. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
