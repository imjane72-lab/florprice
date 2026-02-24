export type SupplyCategory = "리본" | "포장지" | "플로랄폼" | "와이어/테이프" | "화병/바구니" | "기타";
export type SupplyColor = "흰색" | "아이보리" | "분홍" | "빨강" | "검정" | "연보라" | "골드" | "내추럴" | "파스텔" | "투명" | "녹색";

export interface Supply {
  id: string;
  name: string;
  category: SupplyCategory;
  color?: SupplyColor;
  description: string;
  price: number;
  unit: string;
  stock: number;
  seller: string;
  isSale?: boolean;
  salePrice?: number;
  isNewArrival?: boolean;
  createdAt: string;
}
