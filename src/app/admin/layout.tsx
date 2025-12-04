'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAppContext } from '@/contexts/AppContext';
import { FileText, Loader2, UploadCloud, Bike } from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarFooter,
} from '@/components/ui/sidebar';
import Image from 'next/image';

function AdminSidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { setActiveSection } = useAppContext();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="border-b border-sidebar-border">
            <div className="flex items-center gap-3 py-2">
                <Image
                    src="https://res.cloudinary.com/dry3pzan6/image/upload/v1763628420/jiupro1owybvcqu9mrgo.png"
                    alt="Nitheesh Garage Logo"
                    width={40}
                    height={40}
                    className="rounded-lg"
                />
                <div className="flex flex-col">
                    <h2 className="text-lg font-semibold tracking-wide text-sidebar-foreground">
                        Admin Panel
                    </h2>
                    <p className="text-xs text-sidebar-foreground/70">Nitheesh Garage</p>
                </div>
            </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                href="/admin"
                isActive={pathname === '/admin'}
                tooltip="Manage your bike inventory"
              >
                <UploadCloud />
                Products
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                href="/admin/invoice"
                isActive={pathname === '/admin/invoice'}
                tooltip="Create and manage invoices"
              >
                <FileText />
                Invoice
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
           <SidebarMenu>
               <SidebarMenuItem>
                   <SidebarMenuButton href="/" onClick={() => setActiveSection('home')}>
                       <Bike />
                       View Site
                   </SidebarMenuButton>
               </SidebarMenuItem>
           </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-[70px] items-center border-b bg-background px-4 md:hidden">
            <SidebarTrigger />
            <h2 className="ml-4 text-lg font-semibold">Admin Panel</h2>
        </header>
        <main className="flex-1 p-4 sm:p-6 md:p-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, authLoading, isAdmin, checkingAdmin } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    const isChecking = authLoading || checkingAdmin;
    if (!isChecking) {
      if (!user || !isAdmin) {
        router.replace('/');
      }
    }
  }, [user, authLoading, isAdmin, checkingAdmin, router]);

  if (authLoading || checkingAdmin) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="sr-only">Loading admin section...</p>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null; 
  }

  return <AdminSidebar>{children}</AdminSidebar>;
}
