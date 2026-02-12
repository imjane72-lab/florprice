export const NAV_LINKS = [
  { label: "상품", href: "/products" },
  { label: "꽃파트너", href: "/wholesalers" },
  { label: "소품샵", href: "/supplies" },
  { label: "꽃밭", href: "/community" },
  { label: "공지사항", href: "/notice" },
] as const;

export const FLOWER_TYPES = [
  "장미",
  "튤립",
  "백합",
  "카네이션",
  "거베라",
  "국화",
  "안개꽃",
  "수국",
  "리시안셔스",
  "프리지아",
] as const;

export const FLOWER_COLORS = [
  "빨강",
  "분홍",
  "흰색",
  "노랑",
  "보라",
  "주황",
  "혼합",
] as const;

export const MATERIAL_TYPES = [
  "유칼립투스",
  "루스커스",
  "피토스포럼",
  "미스티블루",
  "레더펀",
  "미류나무",
  "살랄",
  "아스피디스트라",
] as const;

export const FLOWER_GRADES = ["특", "상", "중", "하"] as const;

export const FLOWER_ORIGINS = [
  "국산",
  "케냐",
  "에콰도르",
  "콜롬비아",
  "네덜란드",
  "중국",
] as const;

export const PRICE_RANGES = [
  { label: "10,000원 미만", min: 0, max: 10000 },
  { label: "10,000 ~ 20,000원", min: 10000, max: 20000 },
  { label: "20,000 ~ 30,000원", min: 20000, max: 30000 },
  { label: "30,000 ~ 50,000원", min: 30000, max: 50000 },
  { label: "50,000원 이상", min: 50000, max: Infinity },
] as const;

export const SORT_OPTIONS = [
  { label: "최신순", value: "newest" },
  { label: "최저가순", value: "price-asc" },
  { label: "최고가순", value: "price-desc" },
  { label: "인기순", value: "popular" },
] as const;

export const WHOLESALERS = [
  { id: "ws-001", name: "고터꽃도매", location: "고속터미널" },
  { id: "ws-002", name: "양재플라워", location: "양재 화훼공판장" },
  { id: "ws-003", name: "서울꽃시장", location: "고속터미널" },
  { id: "ws-004", name: "한빛플라워", location: "양재 화훼공판장" },
  { id: "ws-005", name: "꽃나라도매", location: "고속터미널" },
] as const;
