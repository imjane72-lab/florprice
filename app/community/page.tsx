"use client";

import { useState } from "react";
import {
  MessageCircle,
  Heart,
  Eye,
  Flame,
  Clock,
  PenLine,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const categories = ["전체", "자유게시판", "꽃 정보", "나의 작품"] as const;

const mockPosts = [
  {
    id: 1,
    category: "꽃 정보",
    title: "봄 시즌 장미 관리법 총정리",
    excerpt:
      "봄이 오면서 장미 입고량이 많아지는데요, 보관 온도별 수명 차이와 물올림 팁을 정리해봤습니다.",
    author: "꽃길플라워",
    likes: 42,
    comments: 15,
    views: 320,
    isHot: true,
    createdAt: "2026-02-11",
  },
  {
    id: 2,
    category: "자유게시판",
    title: "오늘 양재 화훼공판장 시장 분위기",
    excerpt:
      "오늘 양재 가보니 튤립이 대량으로 들어왔더라구요. 네덜란드산 품질 좋은 것들 많았습니다.",
    author: "양재꽃사랑",
    likes: 28,
    comments: 9,
    views: 185,
    isHot: false,
    createdAt: "2026-02-11",
  },
  {
    id: 4,
    category: "나의 작품",
    title: "발렌타인데이 꽃다발 포트폴리오 공유합니다",
    excerpt:
      "올해 발렌타인데이용으로 만든 꽃다발들이에요. 빨간 장미 + 유칼립투스 조합이 반응 좋았습니다!",
    author: "로즈가든",
    likes: 67,
    comments: 31,
    views: 540,
    isHot: true,
    createdAt: "2026-02-10",
  },
  {
    id: 5,
    category: "꽃 정보",
    title: "케냐산 vs 에콰도르산 장미 비교",
    excerpt:
      "케냐산과 에콰도르산 장미를 실제로 비교해봤습니다. 줄기 굵기, 꽃봉오리 크기, 수명 차이를 정리합니다.",
    author: "고터꽃도매",
    likes: 55,
    comments: 18,
    views: 430,
    isHot: true,
    createdAt: "2026-02-09",
  },
  {
    id: 6,
    category: "자유게시판",
    title: "고터에서 리시안셔스 가격이 좀 내려갔네요",
    excerpt:
      "이번주 고터 리시안셔스 가격이 지난주 대비 좀 내린 것 같아서 공유드립니다.",
    author: "꽃나라도매",
    likes: 12,
    comments: 5,
    views: 98,
    isHot: false,
    createdAt: "2026-02-09",
  },
  {
    id: 8,
    category: "나의 작품",
    title: "웨딩 장식 작업 후기 (백합 + 안개꽃)",
    excerpt:
      "지난주 웨딩 장식 작업을 했는데요, 카사블랑카 백합과 밀리언스타 안개꽃 조합이 너무 예뻤어요.",
    author: "한빛플라워",
    likes: 45,
    comments: 20,
    views: 380,
    isHot: false,
    createdAt: "2026-02-08",
  },
];

const categoryColors: Record<string, string> = {
  자유게시판: "bg-muted text-muted-foreground",
  "꽃 정보": "bg-green-50 text-green-800",
"나의 작품": "bg-lavender-light text-foreground",
};

export default function CommunityPage() {
  const [selectedCategory, setSelectedCategory] = useState("전체");

  const filtered =
    selectedCategory === "전체"
      ? mockPosts
      : mockPosts.filter((p) => p.category === selectedCategory);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            소통
          </h1>
          <p className="mt-1 text-muted-foreground">
            꽃 이야기를 나누는 커뮤니티
          </p>
        </div>
        <Button
          variant="outline"
          className="cursor-pointer rounded-full border-border/60 bg-white text-foreground/80 shadow-[0_2px_8px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] transition-all hover:bg-lavender-light/40 hover:border-primary/20 hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]"
        >
          <PenLine className="mr-2 h-4 w-4" />
          글쓰기
        </Button>
      </div>

      {/* Category Filter */}
      <div className="mt-6 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={cn(
              "shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-all",
              selectedCategory === cat
                ? "bg-foreground/85 text-background shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] scale-[0.97]"
                : "bg-white border border-border/60 text-foreground/60 shadow-sm hover:shadow-md hover:bg-muted/30",
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Posts List */}
      <div className="mt-6 space-y-3">
        {filtered.map((post) => (
          <article
            key={post.id}
            className="cursor-pointer rounded-xl border border-border/50 bg-white p-5 transition-all hover:border-primary/20 hover:shadow-sm"
          >
            <div className="flex items-start gap-3">
              <div className="flex-1">
                {/* Category + Hot badge */}
                <div className="flex items-center gap-2">
                  <Badge
                    variant="secondary"
                    className={`text-xs font-bold rounded-sm ${categoryColors[post.category] || ""}`}
                  >
                    {post.category}
                  </Badge>
                  {post.isHot && (
                    <Badge className="gap-0.5 rounded-sm bg-red-500 text-xs font-bold text-white">
                      <Flame className="h-2.5 w-2.5" />
                      HOT
                    </Badge>
                  )}
                </div>

                {/* Title */}
                <h3 className="mt-2 font-semibold leading-snug">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                  {post.excerpt}
                </p>

                {/* Meta */}
                <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{post.author}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.createdAt}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="h-3 w-3" />
                    {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="h-3 w-3" />
                    {post.comments}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {post.views}
                  </span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-20 text-center text-muted-foreground">
          게시글이 없습니다
        </div>
      )}
    </div>
  );
}
