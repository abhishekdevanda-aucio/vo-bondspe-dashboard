"use client"

import React from "react"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  RefreshCw,
  PieChart,
  FileText,
  Bell,
  CalendarDays,
  Sparkles,
  Shield,
  TrendingUp,
} from "lucide-react"

interface Feature {
  id: string
  name: string
  description: string
  icon: React.ElementType
  enabled: boolean
  badge?: string
}

const initialFeatures: Feature[] = [
  {
    id: "auto-reinvest",
    name: "Auto-Reinvest",
    description: "Automatically reinvest matured bonds into similar options",
    icon: RefreshCw,
    enabled: true,
  },
  {
    id: "portfolio-insights",
    name: "Portfolio Insights",
    description: "AI-powered portfolio analysis and recommendations",
    icon: PieChart,
    enabled: true,
    badge: "Popular",
  },
  {
    id: "tax-reports",
    name: "Tax Reports",
    description: "Generate tax-ready investment reports for investors",
    icon: FileText,
    enabled: true,
  },
  {
    id: "notifications",
    name: "Email Notifications",
    description: "Send investment updates and alerts to investors",
    icon: Bell,
    enabled: true,
  },
  {
    id: "monthly-income",
    name: "Monthly Income Section",
    description: "Highlight bonds with monthly income payouts",
    icon: CalendarDays,
    enabled: false,
  },
  {
    id: "smart-recommendations",
    name: "Smart Recommendations",
    description: "Show personalized bond recommendations to investors",
    icon: Sparkles,
    enabled: true,
    badge: "New",
  },
  {
    id: "risk-assessment",
    name: "Risk Assessment Tool",
    description: "Interactive risk profiling for investors",
    icon: Shield,
    enabled: false,
  },
  {
    id: "performance-tracker",
    name: "Performance Tracker",
    description: "Real-time portfolio performance tracking",
    icon: TrendingUp,
    enabled: true,
  },
]

export default function FeaturesPage() {
  const [features, setFeatures] = useState<Feature[]>(initialFeatures)

  const toggleFeature = (id: string) => {
    setFeatures(features.map(feature =>
      feature.id === id ? { ...feature, enabled: !feature.enabled } : feature
    ))
  }

  const enabledCount = features.filter(f => f.enabled).length

  return (
    <div className="flex flex-col">
      <DashboardHeader
        title="Feature Toggles"
        description="Enable or disable features for your investor portal"
      />
      <main className="flex-1 p-6">
        {/* Stats */}
        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Total Features</p>
              <p className="text-2xl font-bold text-foreground">{features.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Enabled</p>
              <p className="text-2xl font-bold text-success">{enabledCount}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Disabled</p>
              <p className="text-2xl font-bold text-muted-foreground">{features.length - enabledCount}</p>
            </CardContent>
          </Card>
        </div>

        {/* Feature Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          {features.map((feature) => (
            <Card key={feature.id} className={!feature.enabled ? "opacity-70" : ""}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${feature.enabled ? "bg-primary/10" : "bg-muted"}`}>
                      <feature.icon className={`h-6 w-6 ${feature.enabled ? "text-primary" : "text-muted-foreground"}`} />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">{feature.name}</h3>
                        {feature.badge && (
                          <Badge
                            variant="secondary"
                            className={feature.badge === "New" ? "bg-accent/10 text-accent" : "bg-primary/10 text-primary"}
                          >
                            {feature.badge}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                  <Switch
                    checked={feature.enabled}
                    onCheckedChange={() => toggleFeature(feature.id)}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-base">About Feature Toggles</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Feature toggles control what functionality is available to your investors on their portal.
              Changes take effect immediately. Disabled features will be hidden from the investor experience
              but can be re-enabled at any time without data loss.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
