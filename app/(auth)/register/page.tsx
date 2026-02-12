"use client";

import { useState } from "react";
import Link from "next/link";
import { Store, ShoppingBag, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type UserRole = "wholesaler" | "retailer" | null;

export default function RegisterPage() {
  const [role, setRole] = useState<UserRole>(null);

  return (
    <div className="w-full max-w-lg">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight">회원가입</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          FlorPrice와 함께 꽃 거래를 시작하세요
        </p>
      </div>

      {/* Role Selection */}
      <div className="mt-8">
        <label className="text-sm font-medium">회원 유형 선택</label>
        <div className="mt-3 grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setRole("wholesaler")}
            className={cn(
              "flex flex-col items-center gap-3 rounded-2xl border-2 p-6 transition-all cursor-pointer",
              role === "wholesaler"
                ? "border-primary/20 bg-lavender-light"
                : "border-border hover:border-primary/30",
            )}
          >
            <Store
              className={cn(
                "h-8 w-8",
                role === "wholesaler"
                  ? "text-primary"
                  : "text-muted-foreground",
              )}
            />
            <div>
              <div className="font-semibold">도매상</div>
              <div className="mt-1 text-xs text-muted-foreground">
                상품을 등록하고 판매합니다
              </div>
            </div>
          </button>
          <button
            type="button"
            onClick={() => setRole("retailer")}
            className={cn(
              "flex flex-col items-center gap-3 rounded-2xl border-2 p-6 transition-all cursor-pointer",
              role === "retailer"
                ? "border-primary/20 bg-lavender-light"
                : "border-border hover:border-primary/30",
            )}
          >
            <ShoppingBag
              className={cn(
                "h-8 w-8",
                role === "retailer" ? "text-primary" : "text-muted-foreground",
              )}
            />
            <div>
              <div className="font-semibold">소매 꽃집</div>
              <div className="mt-1 text-xs text-muted-foreground">
                상품을 탐색하고 주문합니다
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Registration Form */}
      {role && (
        <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                대표자명
              </label>
              <Input id="name" placeholder="홍길동" />
            </div>
            <div className="space-y-2">
              <label htmlFor="businessName" className="text-sm font-medium">
                상호명
              </label>
              <Input
                id="businessName"
                placeholder={
                  role === "wholesaler" ? "고터꽃도매" : "블룸플라워"
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="businessNumber" className="text-sm font-medium">
              사업자등록번호
            </label>
            <Input id="businessNumber" placeholder="123-45-67890" />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              이메일
            </label>
            <Input id="email" type="email" placeholder="example@florprice.kr" />
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium">
              연락처
            </label>
            <Input id="phone" placeholder="010-1234-5678" />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              비밀번호
            </label>
            <Input id="password" type="password" placeholder="8자 이상" />
          </div>

          <div className="space-y-2">
            <label htmlFor="passwordConfirm" className="text-sm font-medium">
              비밀번호 확인
            </label>
            <Input
              id="passwordConfirm"
              type="password"
              placeholder="비밀번호를 다시 입력"
            />
          </div>

          {/* Business License Upload */}
          <div className="space-y-2">
            <label className="text-sm font-medium">사업자등록증</label>
            <div className="flex cursor-pointer flex-col items-center gap-3 rounded-xl border-2 border-dashed border-border py-8 text-center transition-colors hover:border-primary/30 hover:bg-muted/30">
              <Upload className="h-8 w-8 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">
                  클릭하여 파일을 업로드하세요
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  JPG, PNG, PDF (최대 10MB)
                </p>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full rounded-full bg-foreground text-background hover:bg-foreground/90"
          >
            가입하기
          </Button>
        </form>
      )}

      <p className="mt-8 text-center text-sm text-muted-foreground">
        이미 회원이신가요?{" "}
        <Link
          href="/login"
          className="font-medium text-primary hover:underline"
        >
          로그인
        </Link>
      </p>
    </div>
  );
}
