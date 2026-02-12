import Link from "next/link";

const footerLinks = [
  {
    title: "서비스",
    links: [
      { label: "상품 둘러보기", href: "/products" },
      { label: "도매상 찾기", href: "/wholesalers" },
      { label: "도매상 입점", href: "/register" },
    ],
  },
  {
    title: "고객지원",
    links: [
      { label: "공지사항", href: "/notice" },
      { label: "자주 묻는 질문", href: "/faq" },
      { label: "1:1 문의", href: "/contact" },
    ],
  },
  {
    title: "회사",
    links: [
      { label: "브랜드 소개", href: "/about" },
      { label: "이용약관", href: "/terms" },
      { label: "개인정보처리방침", href: "/privacy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-xl font-bold">
              FlorPrice
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-background/60">
              도매상과 소매 꽃집을 직접 연결하는
              <br />
              B2B 꽃 도매 플랫폼
            </p>
          </div>

          {/* Links */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold">{group.title}</h3>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-background/50 transition-colors hover:text-background/80"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-background/10 pt-8">
          <div className="flex flex-col gap-4 text-xs text-background/40 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <p>
                주식회사 플로프라이스 | 대표: 홍길동 | 사업자등록번호:
                123-45-67890
              </p>
              <p>
                서울특별시 서초구 강남대로 123, 4층 | 통신판매업신고:
                2026-서울서초-1234
              </p>
              <p>고객센터: 02-1234-5678 | 이메일: help@florprice.kr</p>
            </div>
            <p>&copy; 2026 FlorPrice. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
