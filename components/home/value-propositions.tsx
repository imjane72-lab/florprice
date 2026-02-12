import { BarChart3, Truck, Receipt } from "lucide-react";

const propositions = [
  {
    icon: BarChart3,
    title: "도매상 가격 비교",
    description:
      "여러 도매상의 판매가를 한눈에 비교하세요. 품목별 최저가부터 등급별 가격까지, 합리적인 선택을 도와드립니다.",
  },
  {
    icon: Truck,
    title: "전국 배송 연계",
    description:
      "서울 외 지역에서도 걱정없이 주문하세요. 도매시장을 직접 방문하지 않아도 신선한 꽃을 전국 어디서나 받으실 수 있습니다.",
  },
  {
    icon: Receipt,
    title: "디지털 정산",
    description:
      "현금영수증 자동 발급부터 월별 매출 리포트까지. 주문, 결제, 정산을 체계적으로 디지털 관리합니다.",
  },
];

export function ValuePropositions() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 md:py-28">
      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
          왜 FlorPrice인가요?
        </h2>
        <p className="mt-3 text-muted-foreground">
          꽃 유통의 모든 문제를 해결합니다
        </p>
      </div>

      <div className="mt-14 grid gap-8 md:grid-cols-3">
        {propositions.map((item) => (
          <div
            key={item.title}
            className="group rounded-2xl border border-border/50 bg-white p-8 transition-all hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-lavender-light">
              <item.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
