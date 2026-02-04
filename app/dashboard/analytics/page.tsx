"use client"

import { DashboardHeader } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts"
import { Download, Calendar } from "lucide-react"

const investmentTrends = [
  { month: "Jul", amount: 640000 },
  { month: "Aug", amount: 710000 },
  { month: "Sep", amount: 780000 },
  { month: "Oct", amount: 850000 },
  { month: "Nov", amount: 920000 },
  { month: "Dec", amount: 980000 },
]

const investorGrowth = [
  { month: "Jul", investors: 980 },
  { month: "Aug", investors: 1050 },
  { month: "Sep", investors: 1120 },
  { month: "Oct", investors: 1180 },
  { month: "Nov", investors: 1230 },
  { month: "Dec", investors: 1284 },
]

const bondPopularity = [
  { name: "HDFC Bond", value: 28, color: "oklch(0.35 0.12 250)" },
  { name: "ICICI Bond", value: 22, color: "oklch(0.55 0.18 250)" },
  { name: "SBI Bond", value: 18, color: "oklch(0.55 0.16 145)" },
  { name: "Tata Bond", value: 15, color: "oklch(0.75 0.15 75)" },
  { name: "Others", value: 17, color: "oklch(0.65 0.04 250)" },
]

const revenueByMonth = [
  { month: "Jul", revenue: 68000 },
  { month: "Aug", revenue: 72000 },
  { month: "Sep", revenue: 78000 },
  { month: "Oct", revenue: 85000 },
  { month: "Nov", revenue: 92000 },
  { month: "Dec", revenue: 98000 },
]

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col">
      <DashboardHeader
        title="Reports & Analytics"
        description="Detailed insights into your platform performance"
      />
      <main className="flex-1 p-6">
        {/* Actions */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              Last 6 Months
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export PDF
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Investment Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Investment Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={investmentTrends}>
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
                      }}
                      formatter={(value: number) => [`$${value.toLocaleString()}`, "Investments"]}
                    />
                    <Bar dataKey="amount" fill="oklch(0.35 0.12 250)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Investor Growth */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Investor Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={investorGrowth}>
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
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "oklch(1 0 0)",
                        border: "1px solid oklch(0.91 0.01 250)",
                        borderRadius: "8px",
                      }}
                      formatter={(value: number) => [value, "Investors"]}
                    />
                    <Line
                      type="monotone"
                      dataKey="investors"
                      stroke="oklch(0.55 0.16 145)"
                      strokeWidth={3}
                      dot={{ fill: "oklch(0.55 0.16 145)", strokeWidth: 0, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Bond Popularity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Bond Popularity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-8">
                <div className="h-[200px] w-[200px] flex-shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={bondPopularity}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={2}
                      >
                        {bondPopularity.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "oklch(1 0 0)",
                          border: "1px solid oklch(0.91 0.01 250)",
                          borderRadius: "8px",
                        }}
                        formatter={(value: number) => [`${value}%`, ""]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex-1 space-y-3 w-full">
                  {bondPopularity.map((item) => (
                    <div key={item.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm text-muted-foreground">{item.name}</span>
                      </div>
                      <span className="font-medium text-foreground">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Revenue Analytics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Revenue Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueByMonth}>
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
                      }}
                      formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
                    />
                    <Bar dataKey="revenue" fill="oklch(0.55 0.18 250)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Key Metrics */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-base">Key Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Avg. Investment Size</p>
                <p className="text-2xl font-bold text-foreground">$15,120</p>
                <p className="text-sm text-success">+8.2% from last month</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Conversion Rate</p>
                <p className="text-2xl font-bold text-foreground">24.5%</p>
                <p className="text-sm text-success">+2.1% from last month</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Retention Rate</p>
                <p className="text-2xl font-bold text-foreground">92%</p>
                <p className="text-sm text-success">+1.5% from last month</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Avg. Commission</p>
                <p className="text-2xl font-bold text-foreground">0.78%</p>
                <p className="text-sm text-muted-foreground">Stable</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
