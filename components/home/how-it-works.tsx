"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Store, ShoppingCart, PackageCheck, CreditCard } from "lucide-react";

const retailerSteps = [
  {
    icon: ShoppingCart,
    step: "01",
    title: "상품 탐색",
    description:
      "꽃 종류, 색상, 등급, 산지별로 필터링하여 원하는 상품을 빠르게 찾으세요.",
  },
  {
    icon: CreditCard,
    step: "02",
    title: "주문 & 결제",
    description:
      "장바구니에 담고 주문서를 제출하면 도매상이 확인 후 주문을 확정합니다.",
  },
  {
    icon: PackageCheck,
    step: "03",
    title: "배송 & 수령",
    description:
      "실시간 배송 추적으로 꽃의 이동 상태를 확인하고 신선하게 받아보세요.",
  },
];

const wholesalerSteps = [
  {
    icon: Store,
    step: "01",
    title: "매장 등록",
    description:
      "매장 프로필을 설정하고 상품을 사진과 함께 간편하게 등록하세요.",
  },
  {
    icon: PackageCheck,
    step: "02",
    title: "주문 관리",
    description:
      "실시간 알림으로 새 주문을 확인하고, 수락/거절 처리를 간편하게 하세요.",
  },
  {
    icon: CreditCard,
    step: "03",
    title: "정산 관리",
    description:
      "현금영수증 자동 발급, 거래 내역 조회, 월별 매출 리포트를 받아보세요.",
  },
];

function StepCard({
  icon: Icon,
  step,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  step: string;
  title: string;
  description: string;
}) {
  return (
    <div className="relative flex flex-col items-center text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-lavender-light">
        <Icon className="h-7 w-7 text-primary" />
      </div>
      <span className="mt-4 text-xs font-bold uppercase tracking-widest text-primary">
        Step {step}
      </span>
      <h3 className="mt-2 text-lg font-semibold">{title}</h3>
      <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 md:py-28">
      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
          이용 방법
        </h2>
        <p className="mt-3 text-muted-foreground">
          간단한 3단계로 시작하세요
        </p>
      </div>

      <Tabs defaultValue="retailer" className="mt-12">
        <TabsList className="mx-auto grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="retailer">소매 꽃집</TabsTrigger>
          <TabsTrigger value="wholesaler">도매상</TabsTrigger>
        </TabsList>

        <TabsContent value="retailer" className="mt-12">
          <div className="grid gap-12 md:grid-cols-3">
            {retailerSteps.map((step) => (
              <StepCard key={step.step} {...step} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="wholesaler" className="mt-12">
          <div className="grid gap-12 md:grid-cols-3">
            {wholesalerSteps.map((step) => (
              <StepCard key={step.step} {...step} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
