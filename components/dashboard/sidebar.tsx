"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingCart,
  Heart,
  History,
  Settings,
  LogOut,
  Store,
  Package,
  Receipt,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const retailerNavItems: NavItem[] = [
  { label: "대시보드", href: "/dashboard", icon: LayoutDashboard },
  { label: "주문 관리", href: "/dashboard/orders", icon: ShoppingCart },
  { label: "즐겨찾기", href: "/dashboard/favorites", icon: Heart },
];

const wholesalerNavItems: NavItem[] = [
  { label: "대시보드", href: "/dashboard/wholesaler", icon: LayoutDashboard },
  {
    label: "상품 관리",
    href: "/dashboard/wholesaler/products",
    icon: Package,
  },
  {
    label: "주문 관리",
    href: "/dashboard/wholesaler/orders",
    icon: ShoppingCart,
  },
  {
    label: "정산 관리",
    href: "/dashboard/wholesaler/settlement",
    icon: Receipt,
  },
];

export function Sidebar({ role }: { role: "retailer" | "wholesaler" }) {
  const pathname = usePathname();
  const navItems = role === "wholesaler" ? wholesalerNavItems : retailerNavItems;

  return (
    <aside className="flex h-full w-64 flex-col border-r bg-card">
      {/* Logo */}
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/" className="text-lg font-bold tracking-tight">
          FlorPrice
        </Link>
      </div>

      {/* User Info */}
      <div className="border-b px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-lavender-light">
            {role === "wholesaler" ? (
              <Store className="h-4 w-4 text-primary" />
            ) : (
              <BarChart3 className="h-4 w-4 text-primary" />
            )}
          </div>
          <div>
            <p className="text-sm font-semibold">
              {role === "wholesaler" ? "고터꽃도매" : "블룸플라워"}
            </p>
            <p className="text-xs text-muted-foreground">
              {role === "wholesaler" ? "도매상" : "소매 꽃집"}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-lavender-light text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t p-3">
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <Settings className="h-4 w-4" />
          설정
        </Link>
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
          <LogOut className="h-4 w-4" />
          로그아웃
        </button>
      </div>
    </aside>
  );
}
