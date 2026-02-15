"use client";

import React from "react";
import { useUser } from "@clerk/nextjs";
import { BarChart3, ChevronLeft, ChevronRight, LibraryBig, MessageSquare, Sparkles, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function SideNav({ onClose, isCollapsed, toggleCollapse }) {
  const menuList = [
    { id: 1, name: "My Forms", icon: LibraryBig, path: "/dashboard" },
    { id: 2, name: "Analytics", icon: BarChart3, path: "/dashboard/analytics" },
    { id: 3, name: "Responses", icon: MessageSquare, path: "/dashboard/responses" },
  ];

  const { user } = useUser();
  const path = usePathname();

  return (
    <div className={`relative flex h-full flex-col bg-white ${isCollapsed ? "w-20" : "w-64"}`}>
      <button
        onClick={toggleCollapse}
        className="absolute -right-3 top-8 hidden rounded-full border border-border bg-white p-1 text-muted-foreground shadow-sm transition-colors hover:text-foreground md:flex"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      <div className={`flex items-center border-b border-border p-5 ${isCollapsed ? "justify-center" : "justify-between"}`}>
        {!isCollapsed ? (
          <Link href="/dashboard" onClick={onClose}>
            <Image src="/logo.svg" width={130} height={32} alt="FormAI logo" />
          </Link>
        ) : (
          <Link href="/dashboard" onClick={onClose}>
            <Image src="/file.svg" width={28} height={28} alt="FormAI icon" />
          </Link>
        )}
        <button className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground md:hidden" onClick={onClose}>
          <X size={18} />
        </button>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {!isCollapsed ? <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Navigation</p> : null}
        {menuList.map((menu) => {
          const active = path === menu.path;
          return (
            <Link
              key={menu.id}
              href={menu.path}
              onClick={onClose}
              className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                active ? "sidebar-active" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              } ${isCollapsed ? "justify-center px-2" : ""}`}
            >
              <menu.icon size={19} className="flex-shrink-0" />
              {!isCollapsed ? <span className="truncate">{menu.name}</span> : null}
              {isCollapsed ? (
                <span className="pointer-events-none absolute left-full ml-2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs text-background opacity-0 shadow-md transition-opacity group-hover:opacity-100">
                  {menu.name}
                </span>
              ) : null}
            </Link>
          );
        })}
      </nav>

      {!isCollapsed ? (
        <div className="px-4 pb-4">
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
              <Sparkles size={15} className="text-primary" />
              Upgrade plan
            </div>
            <p className="text-xs text-muted-foreground">Unlock unlimited form generation and advanced insights.</p>
            <Link href="/dashboard/upgrade" className="mt-3 inline-flex w-full items-center justify-center rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-primary/90">
              Upgrade now
            </Link>
          </div>
        </div>
      ) : null}

      <div className={`mt-auto border-t border-border p-4 ${isCollapsed ? "flex justify-center" : ""}`}>
        <div className="flex w-full items-center gap-3">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
            {user?.firstName?.charAt(0) || "U"}
          </div>
          {!isCollapsed ? (
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">{user?.fullName || "User"}</p>
              <p className="truncate text-xs text-muted-foreground">{user?.primaryEmailAddress?.emailAddress}</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default SideNav;
