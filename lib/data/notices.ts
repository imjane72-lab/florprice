import { Notice } from "@/lib/types/notice";

export const mockNotices: Notice[] = [
  {
    id: "notice-001",
    title: "FlorPrice 정식 오픈 안내",
    category: "공지사항",
    content:
      "안녕하세요, FlorPrice입니다.\n\nFlorPrice가 정식으로 오픈했습니다. 도매상과 소매 꽃집을 직접 연결하는 B2B 꽃 도매 플랫폼으로, 투명한 가격 비교와 편리한 주문 시스템을 제공합니다.\n\n많은 이용 부탁드립니다.",
    author: "FlorPrice",
    isPinned: true,
    viewCount: 1523,
    createdAt: "2026-01-15",
  },
  {
    id: "notice-002",
    title: "[이용안내] 주문 및 배송 관련 안내",
    category: "공지사항",
    content:
      "주문은 매일 오전 6시부터 오후 2시까지 가능하며, 당일 배송은 오전 10시 이전 주문 건에 한해 적용됩니다.\n\n배송 가능 지역: 서울, 경기, 인천\n추가 지역은 순차적으로 확대 예정입니다.",
    author: "FlorPrice",
    isPinned: true,
    viewCount: 892,
    createdAt: "2026-01-20",
  },
  {
    id: "notice-003",
    title: "[이벤트] 신규 가입 첫 주문 무료배송",
    category: "이벤트",
    content:
      "FlorPrice에 신규 가입하시는 소매 꽃집 사장님께 첫 주문 무료배송 혜택을 드립니다.\n\n기간: 2026년 1월 15일 ~ 3월 31일\n대상: 신규 가입 소매 회원\n혜택: 첫 주문 배송비 무료",
    author: "FlorPrice",
    isPinned: false,
    viewCount: 2341,
    createdAt: "2026-01-15",
  },
  {
    id: "notice-004",
    title: "[업데이트] 도매가 비교 기능 오픈",
    category: "업데이트",
    content:
      "품목별 당일 평균가, 최저가, 최고가를 한눈에 확인할 수 있는 도매가 비교 기능이 오픈되었습니다.\n\n여러 도매상의 판매가를 동시에 비교하여 합리적인 구매 결정을 내릴 수 있습니다.",
    author: "FlorPrice",
    isPinned: false,
    viewCount: 456,
    createdAt: "2026-02-01",
  },
  {
    id: "notice-005",
    title: "[시스템점검] 2월 15일 서비스 점검 안내",
    category: "시스템점검",
    content:
      "서비스 안정성 개선을 위한 정기 점검이 예정되어 있습니다.\n\n점검 일시: 2026년 2월 15일 (토) 02:00 ~ 06:00\n점검 시간 동안 서비스 이용이 제한됩니다.",
    author: "FlorPrice",
    isPinned: false,
    viewCount: 234,
    createdAt: "2026-02-08",
  },
  {
    id: "notice-006",
    title: "[업데이트] 도매상 정산 관리 기능 추가",
    category: "업데이트",
    content:
      "도매상 사장님들을 위한 정산 관리 기능이 추가되었습니다.\n\n- 현금영수증 발급 버튼\n- 거래 내역 및 정산 현황 조회\n- 월별 매출 리포트",
    author: "FlorPrice",
    isPinned: false,
    viewCount: 189,
    createdAt: "2026-02-05",
  },
  {
    id: "notice-007",
    title: "[공지] 봄꽃 시즌 도매상 입점 안내",
    category: "공지사항",
    content:
      "봄꽃 시즌을 맞아 새로운 도매상 입점을 받고 있습니다.\n\n입점 문의: partner@florprice.kr\n전화: 02-1234-5678",
    author: "FlorPrice",
    isPinned: false,
    viewCount: 567,
    createdAt: "2026-02-10",
  },
];
