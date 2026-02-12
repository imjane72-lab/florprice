"use client";

import {
  ShoppingCart,
  Package,
  TrendingUp,
  AlertTriangle,
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
import { Button } from "@/components/ui/button";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { mockOrders } from "@/lib/data/orders";
import { mockProducts } from "@/lib/data/products";

const wholesalerOrders = mockOrders.filter((o) => o.wholesalerId === "ws-001");

const statusColors: Record<string, string> = {
  주문접수: "bg-blue-50 text-blue-600",
  준비중: "bg-amber-50 text-amber-600",
  배송중: "bg-primary/10 text-primary",
  배송완료: "bg-green-50 text-green-600",
  취소: "bg-red-50 text-red-500",
};

export default function WholesalerDashboardPage() {
  const todayOrders = wholesalerOrders.filter(
    (o) => o.orderedAt.startsWith("2026-02-11")
  );
  const totalRevenue = wholesalerOrders
    .filter((o) => o.status !== "취소")
    .reduce((sum, o) => sum + o.totalAmount, 0);
  const lowStockProducts = mockProducts
    .filter((p) => p.wholesalerId === "ws-001" && p.stock < 15)
    .slice(0, 3);

  return (
    <DashboardShell role="wholesaler">
      <DashboardHeader title="도매상 대시보드" role="wholesaler" />
      <div className="p-6">
        {/* Summary Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                <ShoppingCart className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">오늘 신규 주문</p>
                <p className="text-2xl font-bold">{todayOrders.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">이번 달 매출</p>
                <p className="text-2xl font-bold">
                  {totalRevenue.toLocaleString("ko-KR")}
                  <span className="text-sm font-normal text-muted-foreground">
                    원
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">등록 상품</p>
                <p className="text-2xl font-bold">
                  {
                    mockProducts.filter((p) => p.wholesalerId === "ws-001")
                      .length
                  }
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50">
                <AlertTriangle className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">재고 부족</p>
                <p className="text-2xl font-bold">{lowStockProducts.length}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders */}
        <Card className="mt-6">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="text-base">최근 주문</CardTitle>
            <Button variant="ghost" size="sm" className="text-primary">
              전체 보기
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>주문번호</TableHead>
                  <TableHead>소매꽃집</TableHead>
                  <TableHead>상품</TableHead>
                  <TableHead>금액</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead>액션</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {wholesalerOrders.slice(0, 5).map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-mono text-sm">
                      {order.orderNumber}
                    </TableCell>
                    <TableCell>{order.retailer}</TableCell>
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
                        className={`text-xs ${statusColors[order.status] || ""}`}
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {order.status === "주문접수" && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 rounded-full text-xs"
                          >
                            수락
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 rounded-full text-xs text-destructive"
                          >
                            거절
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Low Stock Alert */}
        {lowStockProducts.length > 0 && (
          <Card className="mt-6 border-amber-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base text-amber-600">
                <AlertTriangle className="h-4 w-4" />
                재고 부족 상품
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {lowStockProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div>
                      <p className="font-medium">
                        {product.name} {product.variety}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        남은 재고: {product.stock}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-full"
                    >
                      재고 수정
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardShell>
  );
}
