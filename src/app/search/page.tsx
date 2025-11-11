//講師一覧

"use client"

import React, { useState, useMemo } from 'react';
import { Search, Filter, MapPin, Heart, MessageCircle, Calendar, BadgeCheck, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';



interface Instructor {
  id: string;
  name: string;
  avatar: string;
  badge: string;
  years: number;
  rating: number;
  reviews: number;
  area: string;
  tags: string[];
  intro: string;
  online: boolean;
  price: number;
}

// --- Mock data ---
const MOCK_INSTRUCTORS: Instructor[] = [
  {
    id: "1",
    name: "みかママ",
    avatar: "み",
    badge: "ベテランママ",
    years: 8,
    rating: 4.8,
    reviews: 126,
    area: "東京・武蔵野",
    tags: ["離乳食", "初期ケア", "寝かしつけ"],
    intro: "初めての離乳食・寝かしつけを一緒に。肩の力を抜ける伴走が得意です。",
    online: true,
    price: 1800,
  },
  {
    id: "2",
    name: "あやママ",
    avatar: "あ",
    badge: "管理栄養士",
    years: 6,
    rating: 4.8,
    reviews: 89,
    area: "神奈川・横浜",
    tags: ["アレルギー対応", "栄養設計", "後期メニュー"],
    intro: "食物アレルギーの不安に寄り添い、月齢別の献立を提案します。",
    online: true,
    price: 2200,
  },
  {
    id: "3",
    name: "さくら",
    avatar: "さ",
    badge: "助産師",
    years: 12,
    rating: 4.7,
    reviews: 210,
    area: "埼玉・大宮",
    tags: ["母乳相談", "産後ケア", "赤ちゃんの発達"],
    intro: "産前産後の心と体をトータルでサポート。",
    online: false,
    price: 2500,
  },
  {
    id: "4",
    name: "のぞみ",
    avatar: "の",
    badge: "小児科看護師",
    years: 7,
    rating: 4.6,
    reviews: 73,
    area: "千葉・船橋",
    tags: ["発熱時の対応", "お薬相談", "生活リズム"],
    intro: "はじめての発熱・風邪の不安に、看護の視点でアドバイス。",
    online: true,
    price: 2000,
  },
  {
    id: "5",
    name: "りえ",
    avatar: "り",
    badge: "産後ケア",
    years: 5,
    rating: 4.5,
    reviews: 41,
    area: "東京・世田谷",
    tags: ["産後メンタル", "家事両立", "パートナー支援"],
    intro: "育児と自分時間のバランスづくりを二人三脚で。",
    online: false,
    price: 1600,
  },
];



// --- Helpers ---
const StarRow: React.FC<{ rating: number }> = ({ rating }) => {

  const stars = Array.from({ length: 5 }, (_, i) => i + 1);
  return (
    <div className="flex items-center gap-1">
      {stars.map((s) => (
        <svg
          key={s}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className={`w-4 h-4 ${s <= Math.round(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
        >
          <path stroke="currentColor" strokeWidth="1.5" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.57a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.507a.562.562 0 01-.84-.61l1.285-5.386a.563.563 0 00-.182-.557l-4.204-3.57a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345l2.125-5.111z" />
        </svg>
      ))}
      <span className="text-sm text-gray-600 ml-1">{rating.toFixed(1)}</span>
    </div>
  );
};

const Tag: React.FC<React.PropsWithChildren<{ active?: boolean; onClick?: () => void }>> = ({ children, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${active ? "bg-pink-100 text-pink-700 border-pink-200" : "bg-white text-gray-700 border-gray-200 hover:border-pink-200"}`}
  >
    {children}
  </button>
);

const InstructorCard: React.FC<{ i: Instructor; onLike?: (id: string) => void; onReserve?: (i: Instructor) => void }> = ({ i, onLike, onReserve }) => (




  <div className="p-5 rounded-2xl bg-white border border-pink-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-start gap-4">
      <div className={`w-16 h-16 rounded-full grid place-items-center text-white font-semibold text-xl ${i.online ? "bg-gradient-to-r from-pink-500 to-purple-500" : "bg-gray-400"}`}>
        {i.avatar}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{i.name}</h3>
          <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-pink-100 text-pink-700">
            <BadgeCheck size={14} />{i.badge}
          </span>
          <span className="text-sm text-gray-500">{i.years}年経験</span>
          {i.online && (
            <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
              オンライン対応可
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 mb-2">
          <StarRow rating={i.rating} />
          <span className="text-sm text-gray-600">({i.reviews}件のレビュー)</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
          <MapPin size={16} /> {i.area}
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {i.tags.map((t) => (
            <span key={t} className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm">{t}</span>
          ))}
        </div>

        <p className="text-sm text-gray-700 leading-relaxed mb-4">{i.intro}</p>

        <div className="flex items-center gap-3">
          <button className="flex-1 max-w-[150px] h-10 px-4 rounded-full border-2 border-pink-200 text-pink-700 text-sm font-medium flex items-center justify-center gap-2 hover:bg-pink-50 transition-colors">
            <MessageCircle size={16} /> 相談する
          </button>
          <button
            onClick={() => onReserve?.(i)}
            className="flex-1 max-w-[150px] h-10 px-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white text-sm font-medium flex items-center justify-center gap-2 hover:shadow-lg transition-shadow">
            <Calendar size={16} /> 予約する
          </button>
          <button onClick={() => onLike?.(i.id)} className="w-10 h-10 grid place-items-center rounded-full bg-pink-50 text-pink-600 hover:bg-pink-100 transition-colors">
            <Heart size={18} />
          </button>
        </div>
      </div>
    </div>
  </div>
);

// --- Page ---
const InstructorsListPC: React.FC = () => {
  const handleReserve = (i: Instructor) => {
    if (i.id === "2") {
      router.push("/profile/ayamama");
    } else {
      alert(`${i.name} さんの予約ページは準備中です`);
    }
  };

  const router = useRouter();

  const goToHomes = () => {
    router.push("/home");
  };
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<"おすすめ" | "レビュー" | "料金が安い">("おすすめ");
  const [filters, setFilters] = useState<string[]>([]);
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  const data = useMemo(() => {
    let d = [...MOCK_INSTRUCTORS];
    if (q.trim()) {
      const kw = q.trim().toLowerCase();
      d = d.filter((i) =>
        i.name.toLowerCase().includes(kw) ||
        i.area.toLowerCase().includes(kw) ||
        i.tags.some((t) => t.toLowerCase().includes(kw))
      );
    }
    if (filters.length) {
      d = d.filter((i) => filters.every((f) => i.tags.includes(f) || i.badge === f));
    }
    if (sort === "レビュー") d.sort((a, b) => b.reviews - a.reviews);
    if (sort === "料金が安い") d.sort((a, b) => a.price - b.price);
    if (sort === "おすすめ") d.sort((a, b) => Number(b.online) - Number(a.online) || b.rating - a.rating || b.reviews - a.reviews);
    return d;
  }, [q, sort, filters]);

  const toggleFilter = (f: string) => setFilters((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]));

  const allFilterOptions = [
    "離乳食",
    "初期ケア",
    "寝かしつけ",
    "アレルギー対応",
    "栄養設計",
    "母乳相談",
    "産後ケア",
    "お薬相談",
    "生活リズム",
    "助産師",
    "小児科看護師",
    "管理栄養士",
    "ベテランママ",
  ];



  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">Ikumi</span>
              <span className="text-gray-400">|</span>
              <h1 className="text-xl font-semibold text-gray-800">講師一覧</h1>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={goToHomes}
                className="px-4 py-2 rounded-full border border-gray-200 bg-white text-gray-700 text-sm hover:border-pink-200 transition-colors">
                マイページ
              </button>
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white font-semibold cursor-pointer">
                👤
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-1 max-w-2xl flex items-center gap-3 rounded-full border-2 border-pink-200 bg-white px-5 py-3">
              <Search size={20} className="text-gray-600" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="キーワードで検索（例: 離乳食・助産師・世田谷）"
                className="flex-1 text-base outline-none"
              />
            </div>
            <button className="px-5 py-3 rounded-full border-2 border-gray-200 bg-white text-gray-700 text-base flex items-center gap-2 hover:border-pink-200 transition-colors">
              <Filter size={18} />
              詳細検索
            </button>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <span className="text-sm text-gray-600 font-medium">人気タグ:</span>
            <div className="flex flex-wrap gap-2">
              {allFilterOptions.slice(0, 10).map((f) => (
                <Tag key={f} active={filters.includes(f)} onClick={() => toggleFilter(f)}>
                  {f}
                </Tag>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">並び替え:</span>
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as any)}
                  className="appearance-none text-sm pr-8 pl-4 py-2 rounded-full border-2 border-gray-200 bg-white hover:border-pink-200 transition-colors cursor-pointer"
                >
                  <option>おすすめ</option>
                  <option>レビュー</option>
                  <option>料金が安い</option>
                </select>
                <ChevronDown size={18} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
              </div>
            </div>

            <div className="text-sm text-gray-600">
              <span className="font-semibold text-gray-800">{data.length}</span>件の講師が見つかりました
            </div>
          </div>
        </div>
      </header>

      {/* List */}
      <main className="max-w-7xl mx-auto px-6 py-6">
        <div className="space-y-4">
          {data.length === 0 && (
            <div className="text-center text-base text-gray-600 bg-white/70 border-2 border-dashed border-pink-200 rounded-2xl p-12">
              <p className="text-lg font-semibold mb-2">条件に一致する講師が見つかりませんでした</p>
              <p>キーワードやタグを調整してください</p>
            </div>
          )}
          {data.map((i) => (
            <InstructorCard
              key={i.id}
              i={i}
              onLike={(id) => setLiked((prev) => ({ ...prev, [id]: !prev[id] }))}
              onReserve={handleReserve}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default InstructorsListPC;
