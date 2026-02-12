"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function LoginPage() {
  return (
    <div className="w-full max-w-sm">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight">로그인</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          FlorPrice에 오신 것을 환영합니다
        </p>
      </div>

      <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            이메일
          </label>
          <Input id="email" type="email" placeholder="example@florprice.kr" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-medium">
              비밀번호
            </label>
            <Link
              href="/forgot-password"
              className="text-xs text-primary hover:underline"
            >
              비밀번호 찾기
            </Link>
          </div>
          <Input id="password" type="password" placeholder="••••••••" />
        </div>
        <Button
          type="submit"
          className="w-full rounded-full bg-foreground text-background hover:bg-foreground/90 cursor-pointer"
        >
          로그인
        </Button>
      </form>

      <div className="my-6 flex items-center gap-4">
        <Separator className="flex-1" />
        <span className="text-xs text-muted-foreground">또는</span>
        <Separator className="flex-1" />
      </div>

      {/* Social Login */}
      <div className="space-y-3">
        <Button
          variant="outline"
          className="w-full rounded-full hover:bg-primary/10 hover:text-primary hover:border-primary/30 cursor-pointer"
          type="button"
        >
          <span className="mr-2 text-base">💬</span>
          카카오로 로그인
        </Button>
        <Button
          variant="outline"
          className="w-full rounded-full hover:bg-primary/10 hover:text-primary hover:border-primary/30 cursor-pointer"
          type="button"
        >
          <span className="mr-2 text-sm font-bold text-green-500">N</span>
          네이버로 로그인
        </Button>
      </div>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        아직 회원이 아니신가요?{" "}
        <Link
          href="/register"
          className="font-medium text-primary hover:underline"
        >
          회원가입
        </Link>
      </p>
    </div>
  );
}
