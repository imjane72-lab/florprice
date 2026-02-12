import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockNotices } from "@/lib/data/notices";
import { notFound } from "next/navigation";

const categoryColors: Record<string, string> = {
  공지사항: "bg-primary/10 text-primary",
  이벤트: "bg-rose-pink-light text-rose-pink",
  업데이트: "bg-blue-50 text-blue-600",
  시스템점검: "bg-amber-50 text-amber-600",
};

export function generateStaticParams() {
  return mockNotices.map((notice) => ({ id: notice.id }));
}

export default async function NoticeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const notice = mockNotices.find((n) => n.id === id);

  if (!notice) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <Button
        asChild
        variant="ghost"
        className="mb-8 -ml-2 text-muted-foreground"
      >
        <Link href="/notice">
          <ArrowLeft className="mr-2 h-4 w-4" />
          목록으로
        </Link>
      </Button>

      <article>
        <div className="flex items-center gap-2">
          <Badge
            variant="secondary"
            className={`text-xs ${categoryColors[notice.category] || ""}`}
          >
            {notice.category}
          </Badge>
          {notice.isPinned && (
            <Badge variant="outline" className="text-xs">
              고정
            </Badge>
          )}
        </div>

        <h1 className="mt-4 text-2xl font-bold tracking-tight md:text-3xl">
          {notice.title}
        </h1>

        <div className="mt-4 flex gap-4 text-sm text-muted-foreground">
          <span>{notice.author}</span>
          <span>{notice.createdAt}</span>
          <span>조회 {notice.viewCount}</span>
        </div>

        <div className="mt-8 border-t pt-8">
          <div className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/80">
            {notice.content}
          </div>
        </div>
      </article>

      <div className="mt-12 border-t pt-8">
        <Button asChild variant="outline" className="w-full">
          <Link href="/notice">목록으로 돌아가기</Link>
        </Button>
      </div>
    </div>
  );
}
