"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Send } from "lucide-react";
import BottomNav from "@/components/navigation/BottomNav";

interface ChatMessage {
  id: number;
  sender: "veteran" | "newbie";
  text: string;
  timestamp: Date;
}

/** ▼ 高さは固定値で統一 */
const TAB_BAR_H = 64;    // BottomNav の見た目の高さ
const INPUT_BAR_H = 64;  // 入力バーの高さ
const EXTRA_BOTTOM_SPACE_MESSAGES = 24; // メッセージ末尾の余白（調整用）
const SAFE_BOTTOM = "env(safe-area-inset-bottom, 0px)"; // ← 追加

const formatTime = (d: Date) =>
  new Intl.DateTimeFormat(undefined, { hour: "2-digit", minute: "2-digit" }).format(d);

const ChatPage: React.FC = () => {
  const router = useRouter();

  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, sender: "veteran", text: "こんにちは！今日はどんなことで困ってますか？😊", timestamp: new Date() },
    { id: 2, sender: "newbie", text: "離乳食を始めたばかりで、どんな食材からがいいのか不安です…", timestamp: new Date() },
    { id: 3, sender: "veteran", text: "いい質問ですね！最初はにんじんやかぼちゃのペーストがおすすめですよ🥕🎃", timestamp: new Date() },
    { id: 4, sender: "newbie", text: "やっぱり甘めの野菜からがいいんですね！ブレンダーを使っても大丈夫ですか？", timestamp: new Date() },
    { id: 5, sender: "veteran", text: "もちろんOK。なめらかになって食べやすいです✨", timestamp: new Date() },
    { id: 6, sender: "newbie", text: "保存はどうしたら？まとめて作って冷凍でも平気？", timestamp: new Date() },
    { id: 7, sender: "veteran", text: "製氷皿に小分けで冷凍🧊 1週間以内を目安に使い切ってね。", timestamp: new Date() },
    { id: 8, sender: "newbie", text: "助かります！ありがとうございます😊", timestamp: new Date() },
  ]);

  const [input, setInput] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const me: ChatMessage = {
      id: Date.now(),
      sender: "newbie",
      text: input.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, me]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "veteran",
          text: "とても頑張ってますね。他にも不安があれば何でも聞いてください🌸",
          timestamp: new Date(),
        },
      ]);
    }, 900);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isComposing) return;
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="relative min-h-[100svh] w-[100vw] bg-gradient-to-br from-pink-50 to-purple-50 text-gray-900 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-sm border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="text-lg font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Ikumi
          </div>
          <span className="text-[10px] text-pink-600 bg-pink-100 px-2 py-0.5 rounded-full">
            サポート中
          </span>
        </div>
      </header>

      {/* Messages（入力バー＋ナビ分の余白を確保） */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-3 space-y-3"
        style={{
          paddingBottom: `calc(${INPUT_BAR_H}px + ${TAB_BAR_H}px + ${EXTRA_BOTTOM_SPACE_MESSAGES}px + ${SAFE_BOTTOM})`,
        }}
      >
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === "newbie" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[75%] px-3 py-2 rounded-xl text-sm shadow-sm leading-snug ${msg.sender === "newbie"
                  ? "bg-purple-500 text-white rounded-br-none"
                  : "bg-pink-100 text-gray-800 rounded-bl-none"
                }`}
            >
              {msg.text}
              <div className={`mt-1 text-[10px] ${msg.sender === "newbie" ? "text-purple-100/90" : "text-gray-500"}`}>
                {formatTime(msg.timestamp)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ▼ 固定レイヤー（上：入力バー / 下：ボトムナビ） */}
      <div
        className="fixed inset-x-0 bottom-0 z-30 pointer-events-none"
        style={{ bottom: `calc(${TAB_BAR_H}px + ${SAFE_BOTTOM})` }} // ← ここだけ変更
      >
        {/* 入力バー */}
        <div
          className="bg-white/95 backdrop-blur border-t border-gray-200 mb-8"
          style={{ height: INPUT_BAR_H, paddingBottom: SAFE_BOTTOM }}
        >
          <div className="max-w-screen-sm mx-auto h-full px-4 pointer-events-auto">
            <div className="flex h-full items-center gap-2 border border-gray-300 rounded-full px-3 bg-white focus-within:ring-2 focus-within:ring-pink-500">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                onCompositionStart={() => setIsComposing(true)}
                onCompositionEnd={() => setIsComposing(false)}
                placeholder="メッセージを入力..."
                className="flex-1 text-sm outline-none"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="w-9 h-9 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white grid place-items-center disabled:opacity-40"
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ボトムナビ（固定は親が担当） */}
      <div
        className="bg-white/95 backdrop-blur border-t border-gray-200"
        style={{ height: TAB_BAR_H }}
      >
        <BottomNav />
      </div>
    </div>
  );
};

export default ChatPage;
