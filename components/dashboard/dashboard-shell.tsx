import { Sidebar } from "./sidebar";

interface DashboardShellProps {
  role: "retailer" | "wholesaler";
  children: React.ReactNode;
}

export function DashboardShell({ role, children }: DashboardShellProps) {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="hidden lg:block">
        <Sidebar role={role} />
      </div>
      <div className="flex flex-1 flex-col overflow-auto">{children}</div>
    </div>
  );
}
