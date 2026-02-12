export type OrderStatus =
  | "주문접수"
  | "준비중"
  | "배송중"
  | "배송완료"
  | "취소";

export interface OrderItem {
  productId: string;
  productName: string;
  variety?: string;
  quantity: number;
  unitPrice: number;
  unit: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  wholesaler: string;
  wholesalerId: string;
  retailer: string;
  retailerId: string;
  shippingAddress: string;
  orderedAt: string;
  deliveryNote?: string;
}
