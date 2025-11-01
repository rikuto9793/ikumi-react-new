"use client";

import React, { useState } from 'react';
import { useRouter } from "next/navigation"; // ✅ 追加
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Users,
  ArrowLeft,
  MessageCircle,
  Search,
  UserPlus,
  Share,
  Video,
  Camera,
  HeartHandshake,
  GraduationCap,
  Sparkles,
  CheckCircle
} from 'lucide-react';

const CommunityGoalsSelection = () => {
  const router = useRouter(); // ✅
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // コミュニティ参加目的の選択肢
  const goalOptions = [
    {
      code: 'advice',
      displayName: '育児の悩み相談',
      description: 'ベテランママからアドバイスをもらいたい',
      icon: MessageCircle,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50 hover:bg-blue-100',
      category: 'receive'
    },
    {
      code: 'info',
      displayName: '情報収集',
      description: '育児に役立つ情報や最新のトレンドを知りたい',
      icon: Search,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50 hover:bg-green-100',
      category: 'receive'
    },
    {
      code: 'friends',
      displayName: 'ママ友作り',
      description: '同じ境遇のママ友と繋がりたい',
      icon: UserPlus,
      color: 'from-pink-500 to-rose-500',
      bgColor: 'bg-pink-50 hover:bg-pink-100',
      category: 'connect'
    },
    {
      code: 'share',
      displayName: '経験をシェア',
      description: '自分の経験を他のママに伝えたい',
      icon: Share,
      color: 'from-orange-500 to-amber-500',
      bgColor: 'bg-orange-50 hover:bg-orange-100',
      category: 'give'
    },
    {
      code: 'watch_live',
      displayName: 'ライブ配信を見る',
      description: 'ベテランママの配信を視聴したい',
      icon: Video,
      color: 'from-purple-500 to-violet-500',
      bgColor: 'bg-purple-50 hover:bg-purple-100',
      category: 'receive'
    },
    {
      code: 'do_live',
      displayName: 'ライブ配信をする',
      description: '自分の経験をライブで配信したい',
      icon: Camera,
      color: 'from-red-500 to-pink-500',
      bgColor: 'bg-red-50 hover:bg-red-100',
      category: 'give'
    },
    {
      code: 'support',
      displayName: '他のママを支援',
      description: '新米ママをサポートしたい',
      icon: HeartHandshake,
      color: 'from-teal-500 to-cyan-500',
      bgColor: 'bg-teal-50 hover:bg-teal-100',
      category: 'give'
    },
    {
      code: 'learn',
      displayName: '育児スキル向上',
      description: '育児のスキルアップを図りたい',
      icon: GraduationCap,
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'bg-indigo-50 hover:bg-indigo-100',
      category: 'receive'
    }
  ];

  const handleGoalToggle = (goalCode: string) => {
    setSelectedGoals(prev =>
      prev.includes(goalCode)
        ? prev.filter(code => code !== goalCode)
        : [...prev, goalCode]
    );
  };

  const handleComplete = async () => {
    setIsLoading(true);
    try {
      console.log('選択されたコミュニティ目的:', selectedGoals);
      console.log('プロフィール設定完了!');

      setTimeout(() => {
        setIsLoading(false);
        setIsCompleted(true);

        // ✅ 完了後に /profile/5 へ遷移
        setTimeout(() => {
          router.push("/profile/5");
        }, 2000);
      }, 1000);
    } catch (error) {
      console.error('保存エラー:', error);
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.push("/profile/3"); // ✅ 前に戻る
  };

  const categories = {
    receive: { name: '学ぶ・受け取る', emoji: '📚' },
    connect: { name: 'つながる', emoji: '🤝' },
    give: { name: '教える・与える', emoji: '💝' }
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-0 shadow-xl text-center">
          <CardContent className="pt-8 pb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              プロフィール設定完了！🎉
            </h1>
            <p className="text-gray-600 mb-6">
              ママコミュニティへようこそ！<br />
              素敵な出会いと学びの場をお楽しみください。
            </p>
            <Button
              size="lg"
              onClick={() => router.push("/profile/5")} // ✅ 追加
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              ダッシュボードへ
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* プログレスバー */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">プロフィール設定</span>
            <span className="text-sm text-gray-500">4/4</span>
          </div>
          <Progress value={100} className="h-2" />
        </div>

        {/* ヘッダー */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mb-4">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            コミュニティでの目的は？
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            あなたの参加目的を教えてください。最適なコンテンツや機能をおすすめします。
          </p>
        </div>

        {/* 選択状況 */}
        {selectedGoals.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 justify-center flex-wrap">
              <span className="text-sm text-gray-600">選択中:</span>
              {selectedGoals.map(code => {
                const option = goalOptions.find(opt => opt.code === code);
                return (
                  <Badge key={code} variant="secondary" className="bg-purple-100 text-purple-800">
                    {option?.displayName}
                  </Badge>
                );
              })}
              <Badge variant="outline">
                {selectedGoals.length}個選択
              </Badge>
            </div>
          </div>
        )}

        {/* 選択カード */}
        <Card className="border-0 shadow-xl mb-6">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              コミュニティでの目的
            </CardTitle>
            <CardDescription className="text-center">
              複数選択可能です。あとからいつでも変更できます。
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-6">
              {Object.entries(categories).map(([categoryKey, category]) => (
                <div key={categoryKey}>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <span className="text-xl">{category.emoji}</span>
                    {category.name}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {goalOptions
                      .filter(option => option.category === categoryKey)
                      .map((option) => {
                        const isSelected = selectedGoals.includes(option.code);
                        const IconComponent = option.icon;
                        
                        return (
                          <div
                            key={option.code}
                            className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                              isSelected 
                                ? 'border-purple-500 bg-purple-50 shadow-lg transform scale-[1.02]' 
                                : `border-gray-200 ${option.bgColor} hover:border-gray-300 hover:shadow-md`
                            }`}
                            onClick={() => handleGoalToggle(option.code)}
                          >
                            <div className="flex items-start space-x-3">
                              <Checkbox
                                checked={isSelected}
                                onChange={() => handleGoalToggle(option.code)}
                                className="mt-1"
                              />
                              
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r ${option.color} text-white`}>
                                    <IconComponent className="w-5 h-5" />
                                  </div>
                                  <h4 className="font-semibold text-gray-900">
                                    {option.displayName}
                                  </h4>
                                </div>
                                
                                <p className="text-sm text-gray-600 leading-relaxed">
                                  {option.description}
                                </p>
                              </div>
                            </div>
                            
                            {isSelected && (
                              <div className="absolute top-2 right-2">
                                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 完了の説明 */}
        <Alert className="mb-6 border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-700">
            <strong>もうすぐ完了です！</strong> この選択でプロフィール設定が完了し、ママコミュニティをご利用いただけるようになります。
          </AlertDescription>
        </Alert>

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
            onClick={handleComplete}
            disabled={selectedGoals.length === 0 || isLoading}
            size="lg"
            className="px-8 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                設定完了中...
              </>
            ) : (
              <>
                プロフィール設定完了
                <CheckCircle className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>

        {/* スキップオプション */}
        <div className="text-center mt-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleComplete}
            className="text-gray-500 hover:text-gray-700"
          >
            スキップして完了
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommunityGoalsSelection;
