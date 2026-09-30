import { AdminHeader } from "@/widgets/admin/admin-header";

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-page-bg">
      {/* Figma frame is 1440px wide; keep it centered on wider screens. */}
      <div className="relative mx-auto min-h-screen w-360 max-w-full">
        <div className="absolute inset-x-5 top-5 z-10">
          <AdminHeader />
        </div>
        {children}
      </div>
    </div>
  );
}
