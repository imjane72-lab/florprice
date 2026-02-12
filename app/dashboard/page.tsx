"use client";

import {
  ShoppingCart,
  Package,
  Truck,
  CheckCircle2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { mockOrders } from "@/lib/data/orders";

const statusConfig: Record<
  string,
  { icon: React.ComponentType<{ className?: string }>; color: string }
> = {
  주문접수: { icon: ShoppingCart, color: "bg-blue-50 text-blue-600" },
  준비중: { icon: Package, color: "bg-amber-50 text-amber-600" },
  배송중: { icon: Truck, color: "bg-primary/10 text-primary" },
  배송완료: { icon: CheckCircle2, color: "bg-green-50 text-green-600" },
  취소: { icon: ShoppingCart, color: "bg-red-50 text-red-500" },
};

const summaryCards = [
  {
    title: "주문접수",
    count: mockOrders.filter((o) => o.status === "주문접수").length,
    icon: ShoppingCart,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    title: "준비중",
    count: mockOrders.filter((o) => o.status === "준비중").length,
    icon: Package,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    title: "배송중",
    count: mockOrders.filter((o) => o.status === "배송중").length,
    icon: Truck,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    title: "배송완료",
    count: mockOrders.filter((o) => o.status === "배송완료").length,
    icon: CheckCircle2,
    color: "text-green-600",
    bg: "bg-green-50",
  },
];

export default function RetailerDashboardPage() {
  const retailerOrders = mockOrders.filter(
    (o) => o.retailerId === "rt-001"
  );
  const totalSpent = retailerOrders
    .filter((o) => o.status !== "취소")
    .reduce((sum, o) => sum + o.totalAmount, 0);

  return (
    <DashboardShell role="retailer">
      <DashboardHeader title="대시보드" role="retailer" />
      <div className="p-6">
        {/* Summary Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {summaryCards.map((card) => (
            <Card key={card.title}>
              <CardContent className="flex items-center gap-4 p-5">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${card.bg}`}
                >
                  <card.icon className={`h-6 w-6 ${card.color}`} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{card.title}</p>
                  <p className="text-2xl font-bold">{card.count}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Monthly Summary */}
        <Card className="mt-6">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  이번 달 총 구매 금액
                </p>
                <p className="text-2xl font-bold">
                  {totalSpent.toLocaleString("ko-KR")}원
                </p>
              </div>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                2월
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-base">최근 주문</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>주문번호</TableHead>
                  <TableHead>도매상</TableHead>
                  <TableHead>상품</TableHead>
                  <TableHead>금액</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead>주문일</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockOrders.slice(0, 5).map((order) => {
                  const config = statusConfig[order.status];
                  return (
                    <TableRow key={order.id}>
                      <TableCell className="font-mono text-sm">
                        {order.orderNumber}
                      </TableCell>
                      <TableCell>{order.wholesaler}</TableCell>
                      <TableCell>
                        {order.items[0].productName}
                        {order.items.length > 1 &&
                          ` 외 ${order.items.length - 1}건`}
                      </TableCell>
                      <TableCell className="font-medium">
                        {order.totalAmount.toLocaleString("ko-KR")}원
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={`text-xs ${config.color}`}
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {order.orderedAt.split("T")[0]}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
