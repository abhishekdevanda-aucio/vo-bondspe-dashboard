"use client";

import { useState } from "react";
import Link from "next/link";
import { DashboardHeader } from "@/components/dashboard/header";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { partnerBranding, formatCurrency } from "@/lib/portal-config";
import { Upload, Globe, ExternalLink, Check, AlertCircle } from "lucide-react";

export default function BrandingPage() {
  const [primaryColor, setPrimaryColor] = useState(partnerBranding.colors.primary);
  const [companyName, setCompanyName] = useState(partnerBranding.displayName);
  const [tagline, setTagline] = useState(partnerBranding.tagline);
  const [welcomeText, setWelcomeText] = useState(partnerBranding.welcomeMessage);
  const [domain, setDomain] = useState(partnerBranding.customDomain);
  const [supportEmail, setSupportEmail] = useState(partnerBranding.supportEmail);
  const [supportPhone, setSupportPhone] = useState(partnerBranding.supportPhone);

  return (
    <div className="flex flex-col">
      <DashboardHeader
        title="Branding Manager"
        description="Customize how your investor portal looks to your customers"
      />
      <main className="flex-1 p-6">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Branding Settings */}
          <div className="space-y-6">
            {/* Logo Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Company Logo</CardTitle>
                <CardDescription>
                  Upload your company logo (PNG, SVG recommended)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted">
                    <div
                      className="flex h-14 w-14 items-center justify-center rounded-lg text-xl font-bold text-white"
                      style={{ backgroundColor: primaryColor }}
                    >
                      {partnerBranding.logoInitial}
                    </div>
                  </div>
                  <div className="flex-1">
                    <Button variant="outline" className="w-full bg-transparent">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Logo
                    </Button>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Max file size: 2MB
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Brand Colors */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Brand Colors</CardTitle>
                <CardDescription>Set your primary brand color</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <div className="flex gap-3">
                    <input
                      type="color"
                      id="primaryColor"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="h-10 w-20 cursor-pointer rounded border border-input"
                    />
                    <Input
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  {["#0d9488", "#1E3A8A", "#7C3AED", "#DC2626", "#EA580C"].map(
                    (color) => (
                      <button
                        key={color}
                        onClick={() => setPrimaryColor(color)}
                        className="h-8 w-8 rounded-full border-2 border-border transition-transform hover:scale-110"
                        style={{ backgroundColor: color }}
                      />
                    )
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Company Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Portal Content</CardTitle>
                <CardDescription>
                  Customize text displayed on your portal
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Display Name</Label>
                  <Input
                    id="companyName"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tagline">Tagline</Label>
                  <Input
                    id="tagline"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="welcomeText">Welcome Message</Label>
                  <Textarea
                    id="welcomeText"
                    value={welcomeText}
                    onChange={(e) => setWelcomeText(e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Support Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Support Contact</CardTitle>
                <CardDescription>
                  How investors can reach your support team
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="supportEmail">Support Email</Label>
                  <Input
                    id="supportEmail"
                    type="email"
                    value={supportEmail}
                    onChange={(e) => setSupportEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supportPhone">Support Phone</Label>
                  <Input
                    id="supportPhone"
                    value={supportPhone}
                    onChange={(e) => setSupportPhone(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Custom Domain */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Custom Domain</CardTitle>
                <CardDescription>Set up your branded portal URL</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="domain">Domain</Label>
                  <div className="flex gap-2">
                    <div className="flex items-center rounded-l-md border border-r-0 border-input bg-muted px-3">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Input
                      id="domain"
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                      className="rounded-l-none"
                    />
                  </div>
                </div>
                {partnerBranding.domainStatus === "active" ? (
                  <div className="flex items-center gap-2 rounded-lg bg-success/10 p-3">
                    <Check className="h-4 w-4 text-success" />
                    <span className="text-sm text-success">
                      Domain verified and active
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 rounded-lg bg-warning/10 p-3">
                    <AlertCircle className="h-4 w-4 text-warning-foreground" />
                    <span className="text-sm text-warning-foreground">
                      Domain verification pending
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>

            <Button className="w-full">Save Branding Changes</Button>
          </div>

          {/* Live Preview */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Live Preview</CardTitle>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/portal" target="_blank">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Open Portal
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-hidden rounded-lg border border-border shadow-lg">
                  {/* Preview Header */}
                  <div className="p-4" style={{ backgroundColor: primaryColor }}>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 font-bold text-white">
                        {partnerBranding.logoInitial}
                      </div>
                      <div>
                        <span className="text-lg font-semibold text-white">
                          {companyName}
                        </span>
                        <p className="text-xs text-white/80">{tagline}</p>
                      </div>
                    </div>
                  </div>
                  {/* Preview Content */}
                  <div className="bg-background p-6">
                    <h2 className="text-xl font-bold text-foreground">Welcome</h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {welcomeText}
                    </p>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      <div className="rounded-lg border border-border p-4">
                        <p
                          className="text-2xl font-bold"
                          style={{ color: primaryColor }}
                        >
                          {formatCurrency(812500)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Your Investments
                        </p>
                      </div>
                      <div className="rounded-lg border border-border p-4">
                        <p
                          className="text-2xl font-bold"
                          style={{ color: primaryColor }}
                        >
                          7.85%
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Avg. Returns
                        </p>
                      </div>
                    </div>
                    <Button
                      className="mt-6 w-full text-white"
                      style={{ backgroundColor: primaryColor }}
                    >
                      Explore Bonds
                    </Button>
                    <div className="mt-4 border-t border-border pt-4 text-center">
                      <p className="text-xs text-muted-foreground">
                        Need help? Contact us at{" "}
                        <span style={{ color: primaryColor }}>{supportEmail}</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    <Globe className="mr-1 h-3 w-3" />
                    {domain}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
