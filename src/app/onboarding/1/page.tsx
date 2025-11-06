"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, ArrowRight, Star, Sparkles, BookOpen, Award, Baby } from "lucide-react";

const ExperienceLevelPage = () => {
  const [selectedLevel, setSelectedLevel] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleNext = async () => {
    if (!selectedLevel) return;
    setIsLoading(true);
    router.push("/onboarding/2");
    try {
      console.log("選択された経験レベル:", selectedLevel);
      setTimeout(() => setIsLoading(false), 1000);
    } catch (error) {
      console.error("保存エラー:", error);
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
  router.prefetch("/onboarding/2");
}, [router]);


  const experienceOptions = [
    {
      value: "beginner",
      title: "新米ママ",
      subtitle: "初めての育児、不安がいっぱい",
      description: "妊娠中・産後間もない方、初めての育児で分からないことが多い方",
      icon: Baby,
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50 border-pink-200",
      features: ["経験豊富なママからアドバイスを受けられる", "同じ悩みを持つママ同士で情報交換", "ライブ配信で実践的な育児方法を学習"],
    },
    {
      value: "experienced",
      title: "ベテランママ",
      subtitle: "育児経験を活かして他のママを支援",
      description: "複数の子育て経験がある方、他のママにアドバイスできる方",
      icon: Award,
      color: "from-purple-500 to-indigo-500",
      bgColor: "bg-purple-50 border-purple-200",
      features: ["新米ママの相談に答えてサポート", "ライブ配信で育児ノウハウを共有", "豊富な経験を活かして情報発信"],
    },
  ];

  return (
    // 画面全体に適用（PC/モバイル両対応）
    <div className="min-h-dvh w-full bg-neutral-900">
      {/* 背景グラデーションとパディング */}
      <div className="min-h-dvh w-full bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 px-4 py-8">
        {/* 中央寄せのレスポンシブコンテナ */}
        <div className="mx-auto w-full max-w-4xl">
          {/* プログレスバー */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">プロフィール設定</span>
              <span className="text-sm text-gray-500">1/4</span>
            </div>
            <Progress value={25} className="h-2" />
          </div>

          {/* ヘッダー */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">どちらに当てはまりますか？</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              あなたの育児経験に合わせて、最適なサポートを提供します
            </p>
          </div>

          {/* 選択カード */}
          <Card className="border-0 shadow-xl mb-6">
            <CardHeader>
              <CardTitle className="text-center">育児経験レベルを選択してください</CardTitle>
              <CardDescription className="text-center">後からいつでも変更できます</CardDescription>
            </CardHeader>

            <CardContent className="p-6">
              <RadioGroup value={selectedLevel} onValueChange={setSelectedLevel} className="space-y-6">
                {experienceOptions.map((option) => (
                  <div key={option.value} className="relative">
                    <Label
                      htmlFor={option.value}
                      className={`block cursor-pointer rounded-xl border-2 p-6 transition-all hover:shadow-lg ${
                        selectedLevel === option.value
                          ? option.bgColor + " border-current shadow-lg transform scale-[1.01]"
                          : "bg-white border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <RadioGroupItem value={option.value} id={option.value} className="mt-1" />

                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <div
                              className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r ${option.color} text-white`}
                            >
                              <option.icon className="w-6 h-6" />
                            </div>

                            <div>
                              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                {option.title}
                                {selectedLevel === option.value && (
                                  <Badge className="bg-green-100 text-green-800">選択中</Badge>
                                )}
                              </h3>
                              <p className="text-purple-600 font-medium">{option.subtitle}</p>
                            </div>
                          </div>

                          <p className="text-gray-600 mb-4">{option.description}</p>

                          <div className="space-y-2">
                            <p className="text-sm font-medium text-gray-700 flex items-center gap-2">
                              <Sparkles className="w-4 h-4" />
                              このレベルでできること
                            </p>
                            <ul className="space-y-1">
                              {option.features.map((feature, index) => (
                                <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                                  <Star className="w-3 h-3 flex-shrink-0" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          {/* 次へボタン */}
          <div className="flex justify-center">
            <Button
              onClick={handleNext}
              disabled={!selectedLevel || isLoading}
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

          {/* 説明文 */}
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 text-sm text-gray-600 bg-white rounded-full px-4 py-2 shadow-sm">
              <BookOpen className="w-4 h-4" />
              選択したレベルに応じて最適な機能をご提案します
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceLevelPage;
