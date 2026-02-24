export type FlowerGrade = "특" | "상" | "중" | "하";
export type FlowerColor =
  | "빨강"
  | "분홍"
  | "흰색"
  | "노랑"
  | "보라"
  | "주황"
  | "혼합";
export type FlowerOrigin =
  | "국산"
  | "케냐"
  | "에콰도르"
  | "콜롬비아"
  | "네덜란드"
  | "중국";

export type ProductCategory = "절화" | "소재";
export type FlowerRole = "메인" | "필러" | "소재";

export interface Product {
  id: string;
  name: string;
  variety?: string;
  color: FlowerColor;
  grade: FlowerGrade;
  origin: FlowerOrigin;
  category: ProductCategory;
  wholesaler: string;
  wholesalerId: string;
  market: "고속터미널" | "양재 화훼공판장";
  price: number;
  unit: string;
  minOrderQty: number;
  stock: number;
  images: string[];
  description?: string;
  stemLength?: number;
  bloomSize?: number;
  flowerRole?: FlowerRole;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isSale?: boolean;
  salePrice?: number;
  createdAt: string;
}
