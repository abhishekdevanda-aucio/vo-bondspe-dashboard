"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const data = [
  { month: "Jan", revenue: 42000, investments: 380000 },
  { month: "Feb", revenue: 48000, investments: 420000 },
  { month: "Mar", revenue: 52000, investments: 480000 },
  { month: "Apr", revenue: 47000, investments: 450000 },
  { month: "May", revenue: 58000, investments: 520000 },
  { month: "Jun", revenue: 62000, investments: 580000 },
  { month: "Jul", revenue: 68000, investments: 640000 },
  { month: "Aug", revenue: 72000, investments: 710000 },
  { month: "Sep", revenue: 78000, investments: 780000 },
  { month: "Oct", revenue: 85000, investments: 850000 },
  { month: "Nov", revenue: 92000, investments: 920000 },
  { month: "Dec", revenue: 98000, investments: 980000 },
]

export function RevenueChart() {
  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Monthly Revenue & Investments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.35 0.12 250)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="oklch(0.35 0.12 250)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorInvestments" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.55 0.18 250)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="oklch(0.55 0.18 250)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "oklch(0.5 0.02 250)", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "oklch(0.5 0.02 250)", fontSize: 12 }}
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(1 0 0)",
                  border: "1px solid oklch(0.91 0.01 250)",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
              />
              <Area
                type="monotone"
                dataKey="investments"
                stroke="oklch(0.55 0.18 250)"
                strokeWidth={2}
                fill="url(#colorInvestments)"
                name="Investments"
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="oklch(0.35 0.12 250)"
                strokeWidth={2}
                fill="url(#colorRevenue)"
                name="Revenue"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-primary" />
            <span className="text-sm text-muted-foreground">Revenue</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-accent" />
            <span className="text-sm text-muted-foreground">Investments</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
