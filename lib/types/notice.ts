export type NoticeCategory = "공지사항" | "이벤트" | "업데이트" | "시스템점검";

export interface Notice {
  id: string;
  title: string;
  category: NoticeCategory;
  content: string;
  author: string;
  isPinned: boolean;
  viewCount: number;
  createdAt: string;
}
