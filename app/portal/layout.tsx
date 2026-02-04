"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  TrendingUp,
  Wallet,
  Clock,
  User,
  Bell,
  LogOut,
  Menu,
  HelpCircle,
  FileText,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { partnerBranding, sampleInvestorProfile } from "@/lib/portal-config";

const navItems = [
  { href: "/portal", icon: Home, label: "Dashboard" },
  { href: "/portal/marketplace", icon: TrendingUp, label: "Marketplace" },
  { href: "/portal/portfolio", icon: Wallet, label: "Portfolio" },
  { href: "/portal/transactions", icon: Clock, label: "Transactions" },
];

const bottomNavItems = [
  { href: "/portal/account", icon: User, label: "Account" },
  { href: "#", icon: HelpCircle, label: "Help & Support" },
  { href: "#", icon: FileText, label: "Documents" },
];

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  // Get investor initials
  const investorInitials = sampleInvestorProfile.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  const SidebarContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className="flex h-full flex-col">
      {/* Logo - Uses branding from dashboard */}
      <div
        className={cn(
          "flex h-16 items-center border-b px-4",
          collapsed && !isMobile ? "justify-center" : "gap-3"
        )}
        style={{ borderColor: `${partnerBranding.colors.primaryDark}40` }}
      >
        <div
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl"
          style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
        >
          <span className="text-xl font-bold text-white">
            {partnerBranding.logoInitial}
          </span>
        </div>
        {(!collapsed || isMobile) && (
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-white">
              {partnerBranding.displayName}
            </span>
            <span
              className="text-xs"
              style={{ color: partnerBranding.colors.primaryLight }}
            >
              {partnerBranding.tagline}
            </span>
          </div>
        )}
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 space-y-1 p-3">
        <div
          className={cn(
            "mb-3 text-xs font-medium uppercase tracking-wider",
            collapsed && !isMobile ? "text-center" : "px-3"
          )}
          style={{ color: `${partnerBranding.colors.primaryLight}80` }}
        >
          {collapsed && !isMobile ? "Nav" : "Navigation"}
        </div>
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/portal" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                isActive
                  ? "bg-white/15 text-white shadow-sm"
                  : "hover:bg-white/10 hover:text-white",
                collapsed && !isMobile && "justify-center px-2"
              )}
              style={{
                color: isActive ? "#fff" : partnerBranding.colors.primaryLight,
              }}
              title={collapsed && !isMobile ? item.label : undefined}
            >
              <item.icon
                className={cn("h-5 w-5 flex-shrink-0 transition-colors")}
                style={{
                  color: isActive
                    ? partnerBranding.colors.primaryLight
                    : `${partnerBranding.colors.primaryLight}90`,
                }}
              />
              {(!collapsed || isMobile) && item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Navigation */}
      <div
        className="border-t p-3"
        style={{ borderColor: `${partnerBranding.colors.primaryDark}40` }}
      >
        <div
          className={cn(
            "mb-3 text-xs font-medium uppercase tracking-wider",
            collapsed && !isMobile ? "text-center" : "px-3"
          )}
          style={{ color: `${partnerBranding.colors.primaryLight}80` }}
        >
          {collapsed && !isMobile ? "More" : "Account"}
        </div>
        {bottomNavItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                isActive
                  ? "bg-white/15 text-white shadow-sm"
                  : "hover:bg-white/10 hover:text-white",
                collapsed && !isMobile && "justify-center px-2"
              )}
              style={{
                color: isActive ? "#fff" : partnerBranding.colors.primaryLight,
              }}
              title={collapsed && !isMobile ? item.label : undefined}
            >
              <item.icon
                className="h-5 w-5 flex-shrink-0 transition-colors"
                style={{
                  color: isActive
                    ? partnerBranding.colors.primaryLight
                    : `${partnerBranding.colors.primaryLight}90`,
                }}
              />
              {(!collapsed || isMobile) && item.label}
            </Link>
          );
        })}
      </div>

      {/* User Profile - Uses investor data from config */}
      <div
        className="border-t p-3"
        style={{ borderColor: `${partnerBranding.colors.primaryDark}40` }}
      >
        <div
          className={cn(
            "flex items-center gap-3 rounded-xl bg-white/5 p-3",
            collapsed && !isMobile && "justify-center p-2"
          )}
        >
          <Avatar
            className="h-9 w-9 flex-shrink-0 ring-2"
            style={{ ringColor: `${partnerBranding.colors.primaryLight}50` }}
          >
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback
              className="text-sm font-medium"
              style={{
                backgroundColor: partnerBranding.colors.primaryLight,
                color: partnerBranding.colors.primaryDark,
              }}
            >
              {investorInitials}
            </AvatarFallback>
          </Avatar>
          {(!collapsed || isMobile) && (
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium text-white">
                {sampleInvestorProfile.name}
              </p>
              <p
                className="truncate text-xs"
                style={{ color: `${partnerBranding.colors.primaryLight}90` }}
              >
                {sampleInvestorProfile.email}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: partnerBranding.colors.background }}>
      {/* Desktop Sidebar - Uses brand colors */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 hidden h-screen flex-col transition-all duration-300 lg:flex",
          collapsed ? "w-[72px]" : "w-64"
        )}
        style={{
          background: `linear-gradient(to bottom, ${partnerBranding.colors.primary}, ${partnerBranding.colors.primaryDark})`,
        }}
      >
        <SidebarContent />

        {/* Collapse Toggle */}
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full border bg-white shadow-sm transition-colors hover:bg-gray-50"
          style={{
            borderColor: "#e0e7e7",
            color: partnerBranding.colors.primary,
          }}
        >
          {collapsed ? (
            <ChevronRight className="h-3.5 w-3.5" />
          ) : (
            <ChevronLeft className="h-3.5 w-3.5" />
          )}
        </button>
      </aside>

      {/* Main Content Area */}
      <div
        className={cn(
          "flex flex-1 flex-col transition-all duration-300",
          collapsed ? "lg:ml-[72px]" : "lg:ml-64"
        )}
      >
        {/* Top Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white/80 px-4 backdrop-blur-md lg:px-6">
          {/* Mobile Menu */}
          <div className="flex items-center gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu
                    className="h-5 w-5"
                    style={{ color: partnerBranding.colors.primaryDark }}
                  />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-64 p-0"
                style={{
                  background: `linear-gradient(to bottom, ${partnerBranding.colors.primary}, ${partnerBranding.colors.primaryDark})`,
                }}
              >
                <SidebarContent isMobile />
              </SheetContent>
            </Sheet>

            {/* Mobile Logo */}
            <Link href="/portal" className="flex items-center gap-2 lg:hidden">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{ backgroundColor: partnerBranding.colors.primary }}
              >
                <span className="text-base font-bold text-white">
                  {partnerBranding.logoInitial}
                </span>
              </div>
              <span
                className="text-lg font-semibold"
                style={{ color: partnerBranding.colors.primaryDark }}
              >
                {partnerBranding.displayName}
              </span>
            </Link>

            {/* Page Title - Desktop */}
            <div className="hidden lg:block">
              <h1
                className="text-lg font-semibold"
                style={{ color: partnerBranding.colors.primaryDark }}
              >
                {navItems.find(
                  (item) =>
                    pathname === item.href ||
                    (item.href !== "/portal" && pathname.startsWith(item.href))
                )?.label ||
                  bottomNavItems.find((item) => pathname === item.href)
                    ?.label ||
                  "Dashboard"}
              </h1>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="relative text-gray-500 hover:bg-gray-100"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 flex h-2 w-2">
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                  style={{ backgroundColor: partnerBranding.colors.primary }}
                />
                <span
                  className="relative inline-flex h-2 w-2 rounded-full"
                  style={{ backgroundColor: partnerBranding.colors.primary }}
                />
              </span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-9 gap-2 rounded-full pl-1 pr-3 hover:bg-gray-100"
                >
                  <Avatar className="h-7 w-7">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback
                      className="text-xs text-white"
                      style={{ backgroundColor: partnerBranding.colors.primary }}
                    >
                      {investorInitials}
                    </AvatarFallback>
                  </Avatar>
                  <span
                    className="hidden text-sm font-medium sm:inline"
                    style={{ color: partnerBranding.colors.primaryDark }}
                  >
                    {sampleInvestorProfile.name}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/portal/account" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    My Account
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Help Center
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6">{children}</main>

        {/* Footer - Uses branding */}
        <footer className="border-t border-gray-200 bg-white px-4 py-4 lg:px-6">
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <div className="flex flex-col items-center gap-1 sm:items-start">
              <p className="text-xs text-gray-500">
                Powered by BondFlow. All investments carry risk.
              </p>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <a
                  href={`mailto:${partnerBranding.supportEmail}`}
                  className="flex items-center gap-1 hover:text-gray-700"
                >
                  <Mail className="h-3 w-3" />
                  {partnerBranding.supportEmail}
                </a>
                <span className="flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  {partnerBranding.supportPhone}
                </span>
              </div>
            </div>
            <div className="flex gap-4">
              <Link
                href="#"
                className="text-xs text-gray-500 transition-colors"
                style={{ ["--hover-color" as string]: partnerBranding.colors.primary }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = partnerBranding.colors.primary)
                }
                onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7280")}
              >
                Terms
              </Link>
              <Link
                href="#"
                className="text-xs text-gray-500 transition-colors"
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = partnerBranding.colors.primary)
                }
                onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7280")}
              >
                Privacy
              </Link>
              <Link
                href="#"
                className="text-xs text-gray-500 transition-colors"
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = partnerBranding.colors.primary)
                }
                onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7280")}
              >
                Support
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
