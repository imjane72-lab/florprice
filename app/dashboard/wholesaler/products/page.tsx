"use client";

import { Plus, Pencil } from "lucide-react";
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
import { mockProducts } from "@/lib/data/products";

const wholesalerProducts = mockProducts.filter(
  (p) => p.wholesalerId === "ws-001"
);

export default function WholesalerProductsPage() {
  return (
    <DashboardShell role="wholesaler">
      <DashboardHeader title="상품 관리" role="wholesaler" />
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">
              총 {wholesalerProducts.length}개 상품
            </p>
          </div>
          <Button className="rounded-full">
            <Plus className="mr-2 h-4 w-4" />
            상품 등록
          </Button>
        </div>

        {/* Products Table */}
        <div className="mt-6 rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>상품명</TableHead>
                <TableHead>품종</TableHead>
                <TableHead>등급</TableHead>
                <TableHead>색상</TableHead>
                <TableHead>산지</TableHead>
                <TableHead>가격</TableHead>
                <TableHead>재고</TableHead>
                <TableHead>상태</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {wholesalerProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.variety || "-"}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-xs">
                      {product.grade}
                    </Badge>
                  </TableCell>
                  <TableCell>{product.color}</TableCell>
                  <TableCell>{product.origin}</TableCell>
                  <TableCell className="font-mono">
                    {product.price.toLocaleString("ko-KR")}원
                    <span className="text-xs text-muted-foreground">
                      /{product.unit}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={
                        product.stock < 10
                          ? "font-semibold text-destructive"
                          : ""
                      }
                    >
                      {product.stock}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={
                        product.stock > 0
                          ? "bg-green-50 text-green-600 text-xs"
                          : "bg-red-50 text-red-500 text-xs"
                      }
                    >
                      {product.stock > 0 ? "판매중" : "품절"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
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
