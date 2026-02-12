"use client";

import { Download, Receipt } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

const completedOrders = mockOrders.filter(
  (o) => o.wholesalerId === "ws-001" && o.status === "배송완료"
);
const totalSettlement = completedOrders.reduce(
  (sum, o) => sum + o.totalAmount,
  0
);

export default function SettlementPage() {
  return (
    <DashboardShell role="wholesaler">
      <DashboardHeader title="정산 관리" role="wholesaler" />
      <div className="p-6">
        {/* Summary */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">이번 달 정산 예정</p>
              <p className="mt-1 text-2xl font-bold">
                {totalSettlement.toLocaleString("ko-KR")}
                <span className="text-sm font-normal text-muted-foreground">
                  원
                </span>
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">정산 완료</p>
              <p className="mt-1 text-2xl font-bold">
                0
                <span className="text-sm font-normal text-muted-foreground">
                  원
                </span>
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">총 거래 건수</p>
              <p className="mt-1 text-2xl font-bold">
                {completedOrders.length}
                <span className="text-sm font-normal text-muted-foreground">
                  건
                </span>
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          <Button variant="outline" className="rounded-full">
            <Download className="mr-2 h-4 w-4" />
            월별 리포트 다운로드
          </Button>
          <Button variant="outline" className="rounded-full">
            <Receipt className="mr-2 h-4 w-4" />
            현금영수증 일괄 발급
          </Button>
        </div>

        {/* Transaction History */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-base">거래 내역</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>주문번호</TableHead>
                  <TableHead>소매꽃집</TableHead>
                  <TableHead>금액</TableHead>
                  <TableHead>거래일</TableHead>
                  <TableHead>현금영수증</TableHead>
                  <TableHead>정산 상태</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {completedOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-mono text-sm">
                      {order.orderNumber}
                    </TableCell>
                    <TableCell>{order.retailer}</TableCell>
                    <TableCell className="font-medium">
                      {order.totalAmount.toLocaleString("ko-KR")}원
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {order.orderedAt.split("T")[0]}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 rounded-full text-xs"
                      >
                        발급
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className="bg-amber-50 text-xs text-amber-600"
                      >
                        정산 대기
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
                {completedOrders.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="py-8 text-center text-muted-foreground"
                    >
                      거래 내역이 없습니다
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
