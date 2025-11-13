"use client";

import { Monitor, Search, Home, MessageCircle, Play } from "lucide-react";
import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

type Item = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

const NAV_ITEMS: Item[] = [
  { label: "配信", href: "/live", icon: Monitor },
  { label: "検索", href: "/search", icon: Search },
  { label: "ホーム", href: "/home", icon: Home },
  { label: "チャット", href: "/chatmama", icon: MessageCircle },
  { label: "動画", href: "/videos", icon: Play },
];

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 bg-white/90 backdrop-blur-sm border-t border-gray-200 z-[9999] pointer-events-auto"
      role="navigation"
      aria-label="ボトムナビゲーション"
    >
      {/* iOS セーフエリア対応 */}
      <div className="pb-[env(safe-area-inset-bottom)]">
        <div className="flex items-center justify-around py-2">
          {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
            const isActive =
              href === "/home" ? pathname === "/home" : pathname?.startsWith(href);

            // Link クリックが上層の透明レイヤーに阻害されるケースへのフォールバック
            const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
              // 修飾キー付きはブラウザに任せる
              if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
              // Next の Link が何らかで阻害されても遷移させる
              e.currentTarget.blur();
              // setTimeoutで描画・フォーカス競合を回避
              setTimeout(() => router.push(href), 0);
            };

            return (
              <Link
                key={href}
                href={href}
                onClick={handleClick}
                className={[
                  "flex flex-col items-center py-2 px-3 rounded-lg transition-colors outline-none",
                  "relative z-[1] pointer-events-auto", // 念のため
                  isActive
                    ? "bg-gradient-to-r from-pink-100 to-purple-100"
                    : "hover:bg-gray-100",
                ].join(" ")}
                aria-current={isActive ? "page" : undefined}
                prefetch
                scroll
              >
                <div
                  className={[
                    "mb-1",
                    isActive
                      ? "w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center"
                      : "",
                  ].join(" ")}
                >
                  <Icon className={isActive ? "w-4 h-4 text-white" : "w-6 h-6 text-gray-600"} />
                </div>
                <span className={["text-xs", isActive ? "text-purple-600 font-medium" : "text-gray-600"].join(" ")}>
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
      {/* 下の余白（コンテンツが隠れないように） */}
      <div className="h-4" aria-hidden />
    </nav>
  );
}
