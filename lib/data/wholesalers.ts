export type PartnerType = "꽃도매" | "부자재도매";

export interface WholesalerProfile {
  id: string;
  name: string;
  type: PartnerType;
  location: string;
  address: string;
  description: string;
  specialties: string[];
  rating: number;
  reviewCount: number;
  productCount: number;
  totalOrders: number;
  responseRate: number;
  joinedAt: string;
  isVerified: boolean;
}

export const mockWholesalers: WholesalerProfile[] = [
  {
    id: "ws-001",
    name: "고터꽃도매",
    type: "꽃도매",
    location: "고속터미널",
    address: "서울 서초구 신반포로 176, 고속터미널 꽃시장 A동 112호",
    description:
      "30년 전통의 고속터미널 꽃 도매 전문점입니다. 케냐·에콰도르산 수입 장미와 국산 절화를 합리적인 가격으로 공급합니다.",
    specialties: ["장미", "카네이션", "안개꽃", "프리지아"],
    rating: 4.8,
    reviewCount: 124,
    productCount: 6,
    totalOrders: 1520,
    responseRate: 98,
    joinedAt: "2025-06-01",
    isVerified: true,
  },
  {
    id: "ws-002",
    name: "양재플라워",
    type: "꽃도매",
    location: "양재 화훼공판장",
    address: "서울 서초구 강남대로 27, 양재 화훼공판장 B동 201호",
    description:
      "양재 화훼공판장에서 프리미엄 수입꽃과 국산 절화를 전문으로 취급합니다. 에콰도르 딥퍼플, 콜롬비아 수국 등 품질 좋은 수입꽃을 보유하고 있습니다.",
    specialties: ["장미", "튤립", "수국", "카네이션"],
    rating: 4.9,
    reviewCount: 89,
    productCount: 6,
    totalOrders: 980,
    responseRate: 99,
    joinedAt: "2025-07-15",
    isVerified: true,
  },
  {
    id: "ws-003",
    name: "서울꽃시장",
    type: "꽃도매",
    location: "고속터미널",
    address: "서울 서초구 신반포로 176, 고속터미널 꽃시장 B동 305호",
    description:
      "다양한 종류의 절화를 합리적인 가격에 공급합니다. 수입 장미부터 국산 리시안셔스까지 폭넓은 상품 구색을 갖추고 있습니다.",
    specialties: ["장미", "거베라", "리시안셔스"],
    rating: 4.6,
    reviewCount: 67,
    productCount: 4,
    totalOrders: 750,
    responseRate: 95,
    joinedAt: "2025-08-20",
    isVerified: true,
  },
  {
    id: "ws-004",
    name: "한빛플라워",
    type: "꽃도매",
    location: "양재 화훼공판장",
    address: "서울 서초구 강남대로 27, 양재 화훼공판장 C동 108호",
    description:
      "백합, 수국 등 프리미엄 절화 전문입니다. 국산 카사블랑카 백합과 거베라를 최상의 품질로 공급합니다.",
    specialties: ["백합", "수국", "거베라", "튤립"],
    rating: 4.7,
    reviewCount: 53,
    productCount: 5,
    totalOrders: 620,
    responseRate: 97,
    joinedAt: "2025-09-10",
    isVerified: true,
  },
  {
    id: "ws-005",
    name: "꽃나라도매",
    type: "꽃도매",
    location: "고속터미널",
    address: "서울 서초구 신반포로 176, 고속터미널 꽃시장 A동 208호",
    description:
      "가성비 좋은 꽃을 찾으신다면 꽃나라도매입니다. 국산 백합, 리시안셔스, 카네이션을 경쟁력 있는 가격으로 제공합니다.",
    specialties: ["백합", "국화", "리시안셔스", "카네이션"],
    rating: 4.5,
    reviewCount: 41,
    productCount: 4,
    totalOrders: 480,
    responseRate: 93,
    joinedAt: "2025-10-05",
    isVerified: true,
  },
  {
    id: "ws-006",
    name: "경부부자재",
    type: "부자재도매",
    location: "고속터미널",
    address: "서울 서초구 신반포로 176, 고속터미널 꽃시장 C동 101호",
    description:
      "고속터미널 꽃시장에서 30년 넘게 부자재를 전문으로 취급하는 경부부자재입니다. 리본, 포장지, 플로랄폼 등 꽃 작업에 필요한 모든 소품을 갖추고 있습니다.",
    specialties: ["리본", "포장지", "셀로판지", "플로랄폼"],
    rating: 4.7,
    reviewCount: 68,
    productCount: 45,
    totalOrders: 890,
    responseRate: 96,
    joinedAt: "2025-06-15",
    isVerified: true,
  },
  {
    id: "ws-007",
    name: "양재소품마켓",
    type: "부자재도매",
    location: "양재 화훼공판장",
    address: "서울 서초구 강남대로 27, 양재 화훼공판장 D동 105호",
    description:
      "양재 화훼공판장 내 부자재 전문 매장입니다. 프리미엄 수입 포장지부터 가성비 좋은 국산 리본까지 다양한 소품을 제공합니다.",
    specialties: ["포장지", "리본", "화병", "바구니"],
    rating: 4.6,
    reviewCount: 42,
    productCount: 38,
    totalOrders: 650,
    responseRate: 97,
    joinedAt: "2025-08-01",
    isVerified: true,
  },
  {
    id: "ws-008",
    name: "플로라소품",
    type: "부자재도매",
    location: "고속터미널",
    address: "서울 서초구 신반포로 176, 고속터미널 꽃시장 C동 205호",
    description:
      "와이어, 테이프, 오아시스 등 플로리스트 전문 자재를 취급합니다. 대량 주문 시 특별 할인 가능합니다.",
    specialties: ["플로랄폼", "와이어", "테이프", "꽃 영양제"],
    rating: 4.5,
    reviewCount: 35,
    productCount: 30,
    totalOrders: 520,
    responseRate: 94,
    joinedAt: "2025-09-20",
    isVerified: true,
  },
  {
    id: "ws-009",
    name: "꽃누리포장",
    type: "부자재도매",
    location: "양재 화훼공판장",
    address: "서울 서초구 강남대로 27, 양재 화훼공판장 D동 210호",
    description:
      "고급 포장지와 메시지 카드 전문점입니다. 웨딩, 기념일 등 특수 주문용 프리미엄 포장재를 전문으로 공급합니다.",
    specialties: ["포장지", "메시지카드", "리본", "셀로판지"],
    rating: 4.8,
    reviewCount: 51,
    productCount: 35,
    totalOrders: 720,
    responseRate: 98,
    joinedAt: "2025-07-10",
    isVerified: true,
  },
];
