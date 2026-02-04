"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { partnerData } from "@/lib/portal-config";
import {
  LayoutDashboard,
  Palette,
  Users,
  Briefcase,
  Wallet,
  BarChart3,
  ToggleLeft,
  Code,
  Settings,
  Building2,
  ChevronLeft,
  ChevronRight,
  BadgeCheck,
} from "lucide-react";
import { useState } from "react";

const navigation = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Branding", href: "/dashboard/branding", icon: Palette },
  { name: "Investors", href: "/dashboard/investors", icon: Users },
  { name: "Bond Catalog", href: "/dashboard/bonds", icon: Briefcase },
  { name: "Earnings", href: "/dashboard/payouts", icon: Wallet },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Features", href: "/dashboard/features", icon: ToggleLeft },
  { name: "Integrations", href: "/dashboard/integrations", icon: Code },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar text-sidebar-foreground transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
          {!collapsed && (
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
                <Building2 className="h-5 w-5 text-sidebar-primary-foreground" />
              </div>
              <span className="text-lg font-semibold">BondFlow</span>
            </Link>
          )}
          {collapsed && (
            <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
              <Building2 className="h-5 w-5 text-sidebar-primary-foreground" />
            </div>
          )}
        </div>

        {/* Partner Tier Badge */}
        {!collapsed && (
          <div className="border-b border-sidebar-border px-4 py-3">
            <div className="flex items-center gap-2 rounded-lg bg-sidebar-accent/50 px-3 py-2">
              <BadgeCheck className="h-4 w-4 text-amber-400" />
              <span className="text-xs font-medium text-amber-400">
                {partnerData.partnerTier} Partner
              </span>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-2 py-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-muted hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Settings & Collapse */}
        <div className="border-t border-sidebar-border p-2">
          <Link
            href="/dashboard/settings"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-muted transition-colors hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
              pathname === "/dashboard/settings" &&
                "bg-sidebar-accent text-sidebar-accent-foreground"
            )}
          >
            <Settings className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span>Settings</span>}
          </Link>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="mt-2 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-muted transition-colors hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
          >
            {collapsed ? (
              <ChevronRight className="h-5 w-5 flex-shrink-0" />
            ) : (
              <>
                <ChevronLeft className="h-5 w-5 flex-shrink-0" />
                <span>Collapse</span>
              </>
            )}
          </button>
        </div>

        {/* Partner Info */}
        {!collapsed && (
          <div className="border-t border-sidebar-border p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sidebar-accent text-sm font-medium">
                {partnerData.companyName
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <div className="flex-1 truncate">
                <p className="text-sm font-medium">{partnerData.companyName}</p>
                <p className="text-xs text-sidebar-muted">{partnerData.email}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
