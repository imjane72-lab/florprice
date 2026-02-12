"use client";

import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { mockNotices } from "@/lib/data/notices";

const categoryColors: Record<string, string> = {
  공지사항: "bg-primary/10 text-primary",
  이벤트: "bg-rose-pink-light text-rose-pink",
  업데이트: "bg-blue-50 text-blue-600",
  시스템점검: "bg-amber-50 text-amber-600",
};

export default function NoticePage() {
  const [search, setSearch] = useState("");

  const filteredNotices = mockNotices
    .filter(
      (n) =>
        n.title.toLowerCase().includes(search.toLowerCase()) ||
        n.content.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          공지사항
        </h1>
        <p className="mt-3 text-muted-foreground">
          FlorPrice의 새로운 소식을 확인하세요
        </p>
      </div>

      {/* Table */}
      <div className="mt-12">
        {/* Desktop Table */}
        <div className="hidden md:block">
          <div className="grid grid-cols-[60px_1fr_100px_120px_60px] gap-4 border-b-2 border-foreground pb-3 text-sm font-semibold text-muted-foreground">
            <span>번호</span>
            <span>제목</span>
            <span>작성자</span>
            <span>작성일</span>
            <span className="text-right">조회</span>
          </div>
          {filteredNotices.map((notice, index) => (
            <Link
              key={notice.id}
              href={`/notice/${notice.id}`}
              className="grid grid-cols-[60px_1fr_100px_120px_60px] items-center gap-4 border-b py-4 text-sm transition-colors hover:bg-muted/30"
            >
              <span className="text-muted-foreground">
                {notice.isPinned ? (
                  <Badge variant="outline" className="text-[10px]">
                    공지
                  </Badge>
                ) : (
                  filteredNotices.length - index
                )}
              </span>
              <span className="flex items-center gap-2">
                <Badge
                  variant="secondary"
                  className={`text-[10px] ${categoryColors[notice.category] || ""}`}
                >
                  {notice.category}
                </Badge>
                <span className="truncate font-medium">{notice.title}</span>
              </span>
              <span className="text-muted-foreground">{notice.author}</span>
              <span className="text-muted-foreground">{notice.createdAt}</span>
              <span className="text-right text-muted-foreground">
                {notice.viewCount}
              </span>
            </Link>
          ))}
        </div>

        {/* Mobile List */}
        <div className="space-y-4 md:hidden">
          {filteredNotices.map((notice) => (
            <Link
              key={notice.id}
              href={`/notice/${notice.id}`}
              className="block rounded-xl border p-4 transition-colors hover:bg-muted/30"
            >
              <div className="flex items-center gap-2">
                <Badge
                  variant="secondary"
                  className={`text-[10px] ${categoryColors[notice.category] || ""}`}
                >
                  {notice.category}
                </Badge>
                {notice.isPinned && (
                  <Badge variant="outline" className="text-[10px]">
                    공지
                  </Badge>
                )}
              </div>
              <h3 className="mt-2 font-medium">{notice.title}</h3>
              <div className="mt-2 flex gap-3 text-xs text-muted-foreground">
                <span>{notice.createdAt}</span>
                <span>조회 {notice.viewCount}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="mt-8 flex justify-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="제목 또는 내용 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
    </div>
  );
}
