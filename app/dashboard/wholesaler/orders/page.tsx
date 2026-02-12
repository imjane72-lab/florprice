"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { cn } from "@/lib/utils";

const statusFilters = ["전체", "주문접수", "준비중", "배송중", "배송완료"];
const statusColors: Record<string, string> = {
  주문접수: "bg-blue-50 text-blue-600",
  준비중: "bg-amber-50 text-amber-600",
  배송중: "bg-primary/10 text-primary",
  배송완료: "bg-green-50 text-green-600",
  취소: "bg-red-50 text-red-500",
};

const wholesalerOrders = mockOrders.filter((o) => o.wholesalerId === "ws-001");

export default function WholesalerOrdersPage() {
  const [filter, setFilter] = useState("전체");

  const filtered =
    filter === "전체"
      ? wholesalerOrders
      : wholesalerOrders.filter((o) => o.status === filter);

  return (
    <DashboardShell role="wholesaler">
      <DashboardHeader title="주문 관리" role="wholesaler" />
      <div className="p-6">
        {/* Status Filter */}
        <div className="flex flex-wrap gap-2">
          {statusFilters.map((s) => (
            <Button
              key={s}
              variant="outline"
              size="sm"
              onClick={() => setFilter(s)}
              className={cn(
                "rounded-full",
                filter === s && "border-primary bg-lavender-light text-primary"
              )}
            >
              {s}
            </Button>
          ))}
        </div>

        {/* Orders Table */}
        <div className="mt-6 rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>주문번호</TableHead>
                <TableHead>소매꽃집</TableHead>
                <TableHead>상품</TableHead>
                <TableHead>수량</TableHead>
                <TableHead>금액</TableHead>
                <TableHead>상태</TableHead>
                <TableHead>배송지</TableHead>
                <TableHead>액션</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono text-sm">
                    {order.orderNumber}
                  </TableCell>
                  <TableCell>{order.retailer}</TableCell>
                  <TableCell>
                    {order.items.map((item) => (
                      <div key={item.productId} className="text-sm">
                        {item.productName}
                        {item.variety && (
                          <span className="text-muted-foreground">
                            {" "}
                            {item.variety}
                          </span>
                        )}
                      </div>
                    ))}
                  </TableCell>
                  <TableCell>
                    {order.items.reduce((sum, i) => sum + i.quantity, 0)}
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
                  <TableCell className="max-w-[150px] truncate text-sm text-muted-foreground">
                    {order.shippingAddress}
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
                    {order.status === "준비중" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 rounded-full text-xs"
                      >
                        배송 시작
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardShell>
  );
}
