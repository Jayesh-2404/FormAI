"use client";

import React, { useState } from "react";
import { SignedIn, UserButton, useUser } from "@clerk/nextjs";
import SideNav from "./_components/SideNav";
import { Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { user } = useUser();

  return (
    <SignedIn>
      <div className="min-h-screen bg-background">
        {sidebarOpen ? <div className="mobile-overlay md:hidden" onClick={() => setSidebarOpen(false)} /> : null}

        <aside
          className={`fixed left-0 top-0 z-50 h-screen border-r border-border bg-white transition-all duration-300 ${
            sidebarCollapsed ? "w-20" : "w-64"
          } ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
        >
          <SideNav onClose={() => setSidebarOpen(false)} isCollapsed={sidebarCollapsed} toggleCollapse={() => setSidebarCollapsed((prev) => !prev)} />
        </aside>

        <div className={`min-h-screen transition-all duration-300 ${sidebarCollapsed ? "md:ml-20" : "md:ml-64"}`}>
          <header className="sticky top-0 z-30 flex h-16 items-center border-b border-border bg-white/85 px-4 backdrop-blur-xl sm:px-6">
            <button className="mr-3 rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground md:hidden" onClick={() => setSidebarOpen(true)} aria-label="Open sidebar">
              <Menu size={20} />
            </button>

            <div className="md:hidden">
              <Link href="/dashboard">
                <Image src="/logo.svg" width={102} height={25} alt="FormAI" />
              </Link>
            </div>

            <div className="ml-auto flex items-center gap-3">
              <span className="hidden text-sm font-medium text-muted-foreground sm:block">{user?.firstName ? `Hi, ${user.firstName}` : "Welcome"}</span>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-9 h-9 border border-border shadow-sm",
                  },
                }}
              />
            </div>
          </header>

          <main className="w-full">{children}</main>
        </div>
      </div>
    </SignedIn>
  );
}

export default DashboardLayout;
