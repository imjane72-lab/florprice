export type SupplyCategory = "리본" | "포장지" | "플로랄폼" | "와이어/테이프" | "화병/바구니" | "기타";

export interface Supply {
  id: string;
  name: string;
  category: SupplyCategory;
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
