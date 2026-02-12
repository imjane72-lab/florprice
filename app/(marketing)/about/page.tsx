import { BarChart3, Shield, Truck, Users } from "lucide-react";

const values = [
  {
    icon: BarChart3,
    title: "가격 투명성",
    description:
      "도매상 가격을 투명하게 비교하여 소매 꽃집 사장님들이 합리적인 구매 결정을 내릴 수 있도록 지원합니다.",
  },
  {
    icon: Users,
    title: "공정한 연결",
    description:
      "도매상과 소매 꽃집을 직접 연결하여 유통 단계를 줄이고, 양쪽 모두에게 이로운 거래 환경을 만듭니다.",
  },
  {
    icon: Truck,
    title: "전국 접근성",
    description:
      "서울 외 지역의 플로리스트도 동등하게 도매 시장에 접근할 수 있는 디지털 인프라를 구축합니다.",
  },
  {
    icon: Shield,
    title: "신뢰와 효율",
    description:
      "디지털 정산, 리뷰 시스템, 현금영수증 자동 발급으로 투명하고 효율적인 거래를 보장합니다.",
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-linear-to-b from-lavender-light to-background py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
            꽃 유통의 미래를
            <br />
            만들어 갑니다
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            FlorPrice는 한국 꽃 도매 유통 시장의 가격 불투명성 문제를 해결하기
            위해 탄생한 B2B 마켓플레이스 플랫폼입니다.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:py-28">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-2xl font-bold tracking-tight md:text-3xl">
            우리의 비전
          </h2>
          <p className="mt-6 text-center text-lg leading-relaxed text-muted-foreground">
            전국 각지의 모든 플로리스트들이 투명한 도매 가격에 동등하게 접근하고
            안정적인 배송을 받을 수 있는 꽃 산업의 핵심 디지털 인프라가 되는 것.
          </p>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border bg-card p-8">
              <h3 className="text-lg font-semibold">문제점</h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
                <li className="flex gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive" />
                  서울 외 지역 소매 꽃집의 도매 시장 접근 어려움
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive" />
                  파편화되고 불투명한 가격 정보
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive" />
                  오후 잔여 재고 폐기로 인한 도매상 손실
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive" />
                  전화, 카톡, 현금 기반의 비효율적 거래
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border bg-card p-8">
              <h3 className="text-lg font-semibold">FlorPrice 솔루션</h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
                <li className="flex gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  온라인 주문과 전국 배송 서비스
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  실시간 도매가 비교 플랫폼
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  온라인 판로 확대로 재고 소진 촉진
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  주문·결제·정산 디지털화
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-t bg-surface py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-center text-2xl font-bold tracking-tight md:text-3xl">
            핵심 가치
          </h2>
          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div key={value.title} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-lavender-light">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 font-semibold">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Context */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            시장 현황
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            전국 꽃집 수는 약 20,000곳(2022)에서 30,000곳(2025)으로 3년간 약 50%
            증가했습니다. 꽃집은 늘어나는데 정보는 부족하고, 도매는 줄어드는데
            판로는 제한적 — 이 양쪽의 페인포인트를 FlorPrice가 연결하여
            해결합니다.
          </p>

          <div className="mt-12 grid grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold text-primary">30,000+</div>
              <div className="mt-1 text-sm text-muted-foreground">
                전국 꽃집 수
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">3.5x</div>
              <div className="mt-1 text-sm text-muted-foreground">
                장미 수입량 증가
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">50%</div>
              <div className="mt-1 text-sm text-muted-foreground">
                3년간 꽃집 성장률
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
