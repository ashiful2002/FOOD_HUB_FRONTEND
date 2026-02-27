import { AppSidebar } from "@/components/app-sidebar";
import React from "react";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getUser } from "@/services/auth";
export default async function DashboardLayout({
  admin,
  provider,
  customer,
}: {
  admin: React.ReactNode;
  provider: React.ReactNode;
  customer: React.ReactNode;
}) {
  const user = await getUser();

  return (
    <SidebarProvider>
      <AppSidebar userRole={user?.role} />
      <SidebarInset>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {user.role === "CUSTOMER" && customer}
          {user.role === "PROVIDER" && provider}
          {user.role === "ADMIN" && admin}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
