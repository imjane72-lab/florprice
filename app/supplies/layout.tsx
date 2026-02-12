import { AnnouncementBanner } from "@/components/layout/announcement-banner";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingActionButton } from "@/components/layout/floating-action-button";

export default function SuppliesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <AnnouncementBanner />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingActionButton />
    </div>
  );
}
