"use client"

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  Baby,
  ArrowRight,
  ArrowLeft,
  Heart,
  Utensils,
  Moon,
  TrendingUp,
  AlertCircle,
  School,
  Stethoscope,
  Gamepad2,
  MoreHorizontal,
  Sparkles
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const ChallengesSelectionPage = () => {
  const router = useRouter();

  const [selectedChallenges, setSelectedChallenges] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const challengeOptions = [
    { code: 'feeding', displayName: '授乳・ミルク', description: '授乳やミルクに関する悩み、量や頻度など', icon: Baby, color: 'from-pink-500 to-rose-500', bgColor: 'bg-pink-50 hover:bg-pink-100' },
    { code: 'baby_food', displayName: '離乳食', description: '離乳食の進め方や食べムラ、アレルギーなど', icon: Utensils, color: 'from-orange-500 to-amber-500', bgColor: 'bg-orange-50 hover:bg-orange-100' },
    { code: 'sleep', displayName: '夜泣き・睡眠', description: '寝かしつけや夜泣き対策、睡眠リズムなど', icon: Moon, color: 'from-indigo-500 to-purple-500', bgColor: 'bg-indigo-50 hover:bg-indigo-100' },
    { code: 'development', displayName: '発達・成長', description: '子どもの発達や成長に関する心配や疑問', icon: TrendingUp, color: 'from-green-500 to-emerald-500', bgColor: 'bg-green-50 hover:bg-green-100' },
    { code: 'discipline', displayName: 'しつけ', description: 'しつけや行動の悩み、イヤイヤ期対応など', icon: AlertCircle, color: 'from-yellow-500 to-orange-500', bgColor: 'bg-yellow-50 hover:bg-yellow-100' },
    { code: 'childcare', displayName: '保育園・幼稚園', description: '保育園選びや園生活、入園準備について', icon: School, color: 'from-blue-500 to-cyan-500', bgColor: 'bg-blue-50 hover:bg-blue-100' },
    { code: 'health', displayName: '健康・病気', description: '体調管理や病気への対処、予防接種など', icon: Stethoscope, color: 'from-red-500 to-pink-500', bgColor: 'bg-red-50 hover:bg-red-100' },
    { code: 'play', displayName: '遊び・おもちゃ', description: '年齢に合った遊びやおもちゃ選び、知育など', icon: Gamepad2, color: 'from-purple-500 to-violet-500', bgColor: 'bg-purple-50 hover:bg-purple-100' },
    { code: 'other', displayName: 'その他', description: 'その他の育児に関する悩みや疑問', icon: MoreHorizontal, color: 'from-gray-500 to-slate-500', bgColor: 'bg-gray-50 hover:bg-gray-100' }
  ];

  const handleChallengeToggle = (challengeCode: string) => {
    setSelectedChallenges(prev =>
      prev.includes(challengeCode) ? prev.filter(code => code !== challengeCode) : [...prev, challengeCode]
    );
  };

  const handleNext = async () => {
    setIsLoading(true);
    try {
      console.log('選択された悩み:', selectedChallenges);
      setTimeout(() => {
        setIsLoading(false);
        router.push('/profile/4');
      }, 1000);
    } catch (error) {
      console.error('保存エラー:', error);
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.push('/profile/2');
  };

  return (
    <div className="min-h-dvh w-full bg-neutral-900">
      <div className="min-h-dvh w-full bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 px-4 py-8">
        <div className="mx-auto w-full max-w-2xl">
          {/* プログレスバー */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">プロフィール設定</span>
              <span className="text-sm text-gray-500">3/4</span>
            </div>
            <Progress value={75} className="h-2" />
          </div>

          {/* ヘッダー */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mb-3">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">どんなことで悩んでいますか?</h1>
            <p className="text-gray-600">同じ悩みを持つママ同士でつながることができます</p>
          </div>

          {/* 選択状況 */}
          {selectedChallenges.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center gap-2 justify-center flex-wrap">
                <span className="text-sm text-gray-600">選択中:</span>
                {selectedChallenges.slice(0, 3).map(code => {
                  const option = challengeOptions.find(opt => opt.code === code);
                  return (
                    <Badge key={code} className="bg-purple-100 text-purple-800 text-xs px-2 py-0">
                      {option?.displayName}
                    </Badge>
                  );
                })}
                {selectedChallenges.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{selectedChallenges.length - 3}
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* 選択カード */}
          <Card className="border-0 shadow-xl mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-center flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 text-yellow-500" />
                育児の悩みを選択
              </CardTitle>
              <CardDescription className="text-center">複数選択可能です</CardDescription>
            </CardHeader>

            <CardContent className="pt-2">
              <div className="space-y-3">
                {challengeOptions.map((option) => {
                  const isSelected = selectedChallenges.includes(option.code);
                  const IconComponent = option.icon;

                  return (
                    <div
                      key={option.code}
                      role="button"
                      aria-pressed={isSelected}
                      className={`relative p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                        isSelected ? 'border-purple-500 bg-purple-50 shadow-md' : `border-gray-200 ${option.bgColor}`
                      }`}
                      onClick={() => handleChallengeToggle(option.code)}
                    >
                      <div className="flex items-start gap-3">
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => handleChallengeToggle(option.code)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1.5">
                            <div className={`inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r ${option.color} text-white`}>
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <h3 className="font-semibold text-gray-900 text-sm">{option.displayName}</h3>
                          </div>
                          <p className="text-sm text-gray-600 leading-snug">{option.description}</p>
                        </div>
                      </div>

                      {isSelected && (
                        <div className="absolute top-2 right-2">
                          <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* 説明文 */}
          <div className="text-center mb-6">
            <p className="text-sm text-gray-600 bg-white rounded-full px-4 py-2 shadow-sm inline-block">
              💡 関連する投稿や配信をおすすめします
            </p>
          </div>

          {/* ナビゲーションボタン */}
          <div className="flex justify-between">
            <Button onClick={handleBack} variant="outline" size="lg" className="px-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              戻る
            </Button>

            <Button
              onClick={handleNext}
              disabled={selectedChallenges.length === 0 || isLoading}
              size="lg"
              className="px-8 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  保存中
                </>
              ) : (
                <>
                  次へ
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

export default ChallengesSelectionPage;
