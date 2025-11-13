"use client";
import React, { useState, useEffect, useRef } from "react";
import { Heart, Share2, Users, Send, Search, Home, MessageCircle, Play, Monitor } from "lucide-react";
import { useRouter } from "next/navigation";
import BottomNav from "@/components/navigation/BottomNav";

interface ChatMessage {
  id: number;
  user: string;
  avatar: string;
  text: string;
  timestamp: Date;
}

interface StreamerInfo {
  name: string;
  badge: string;
  avatar: string;
  description: string;
}

const LiveStreamPage: React.FC = () => {
  const router = useRouter();
  const goToLives = () => router.push("/live");
  const goToSearch = () => router.push("/search");
  const goToHome = () => router.push("/home");
  const goToVideos = () => router.push("/videos");
  const goToChat = () => router.push("/chatmama");

  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, user: "あやママ", avatar: "あ", text: "離乳食作り頑張って！応援してます✨", timestamp: new Date() },
    { id: 2, user: "えみ", avatar: "え", text: "うちも6ヶ月です！一緒に学ばせてもらいます🍼", timestamp: new Date() },
  ]);

  const [inputMessage, setInputMessage] = useState<string>("");
  const [viewerCount, setViewerCount] = useState<number>(128);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const sampleMessages: Omit<ChatMessage, "id" | "timestamp">[] = [
    { user: "さくらママ", avatar: "さ", text: "初めての離乳食作り、懐かしいです💕" },
    { user: "たなか", avatar: "た", text: "手作りは愛情がこもってて素敵ですね" },
    { user: "のぞみ", avatar: "の", text: "レシピ教えてください！" },
    { user: "ひろママ", avatar: "ひ", text: "冷凍保存のコツも知りたいです🧊" },
    { user: "りえ", avatar: "り", text: "みんなで支え合えるって素晴らしい✨" },
  ];

  useEffect(() => {
    let messageIndex = 0;
    const interval = setInterval(() => {
      const newMessage: ChatMessage = {
        id: Date.now(),
        ...sampleMessages[messageIndex % sampleMessages.length],
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev.slice(-9), newMessage]);
      messageIndex++;
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount((prev) => prev + Math.floor(Math.random() * 3) - 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (): void => {
    if (!inputMessage.trim()) return;
    const newMessage: ChatMessage = {
      id: Date.now(),
      user: "あなた",
      avatar: "あ",
      text: inputMessage.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev.slice(-9), newMessage]);
    setInputMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") handleSendMessage();
  };

  const handleHeartClick = (): void => {
    document.querySelectorAll(".heart-effect").forEach((el) => el.remove());
    const heart = document.createElement("div");
    heart.textContent = "❤️";
    heart.className = "heart-effect";
    heart.style.cssText = `
      position: fixed;
      left: ${Math.random() * window.innerWidth}px;
      top: 50%;
      font-size: 24px;
      pointer-events: none;
      animation: heartFloat 2s ease-out forwards;
      z-index: 1000;
    `;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 2000);
  };

  const liveBgUrl =
    "https://tse1.mm.bing.net/th/id/OIP.JV3Dn4UDbK8U5v8uUOdn9gHaE8?r=0&pid=Api";

  // ✅ ここから JSX ---------------------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 pb-20">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-pink-100 px-4 py-3">
        <div className="flex items-center gap-3">
          <button className="btn btn-ghost btn-circle">
            <div className="space-y-1.5">
              <span className="block h-0.5 w-5 rounded bg-gray-800" />
              <span className="block h-0.5 w-5 rounded bg-gray-800" />
              <span className="block h-0.5 w-5 rounded bg-gray-800" />
            </div>
          </button>

          <span className="text-lg font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Ikumi-
          </span>

          <div className="ml-auto bg-pink-100 text-pink-600 px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1">
            <Users size={16} />
            {viewerCount}人が視聴中
          </div>
        </div>
      </header>

      {/* Main */}
      <div className="flex h-[calc(100vh-65px)]">
        
        {/* Video */}
        <div className="flex-1 p-5">
          <div className="bg-black rounded-2xl relative overflow-hidden shadow-2xl mb-5 h-[70vh]">
            <div style={{ backgroundImage: `url("${liveBgUrl}")` }} className="w-full h-full bg-cover bg-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60"></div>
            <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
              🔴 LIVE
            </div>
            <div className="absolute bottom-4 left-4 text-white">
              <h2 className="text-2xl font-bold">新米ママの離乳食作り</h2>
              <p className="text-white/90">みんなで一緒に学びましょう！</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-lg border border-pink-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                み
              </div>
              <h3 className="font-semibold text-gray-800">みかママ</h3>
              <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-2 py-1 rounded-lg text-xs font-medium">
                新米ママ
              </span>
            </div>

            <p className="text-gray-600 mb-4">
              初めての離乳食作りに挑戦中！質問やアドバイスもお気軽にどうぞ♪
            </p>

            <div className="flex gap-3">
              <button onClick={handleHeartClick} className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-3 rounded-full font-medium">
                ❤️ 応援する
              </button>
              <button className="flex-1 bg-pink-100 text-pink-600 px-4 py-3 rounded-full font-medium border-2 border-pink-200">
                <Share2 size={18} /> シェア
              </button>
            </div>
          </div>
        </div>

        {/* Chat */}
        <div className="w-80 bg-white border-l border-pink-100 flex flex-col">
          <div className="p-5 border-b">
            <h3 className="font-semibold text-gray-800">チャット</h3>
            <p className="text-sm text-gray-500">ママ同士で応援し合いましょう</p>
          </div>

          <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m) => (
              <div key={m.id} className="flex gap-3 p-3 bg-pink-50 rounded-xl">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white">
                  {m.avatar}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-pink-600">{m.user}</div>
                  <div className="text-sm text-gray-700">{m.text}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="メッセージを入力..."
                className="flex-1 px-4 py-3 border-2 border-pink-200 rounded-full"
              />
              <button onClick={handleSendMessage} className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full flex items-center justify-center">
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ 統一ボトムナビ */}
      < BottomNav/>
    </div>
  );
};

export default LiveStreamPage;
