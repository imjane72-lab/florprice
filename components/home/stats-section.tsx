const stats = [
  { value: "150+", label: "입점 도매상" },
  { value: "2,400+", label: "등록 상품" },
  { value: "8,500+", label: "누적 거래" },
  { value: "4.8", label: "평균 평점" },
];

export function StatsSection() {
  return (
    <section className="border-y bg-foreground py-16 text-background">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold tracking-tight md:text-4xl">
                {stat.value}
              </div>
              <div className="mt-2 text-sm text-background/60">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
