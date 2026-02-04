"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Calculator, TrendingUp, Percent } from "lucide-react"

const bondCommissions = [
  { name: "HDFC Ltd Bond", baseRate: 0.5, yourRate: 0.8, yield: "8.5%" },
  { name: "ICICI Bank Bond", baseRate: 0.4, yourRate: 0.7, yield: "9.2%" },
  { name: "SBI Infrastructure", baseRate: 0.6, yourRate: 1.0, yield: "7.8%" },
  { name: "Tata Capital Bond", baseRate: 0.5, yourRate: 0.9, yield: "8.1%" },
  { name: "L&T Finance Bond", baseRate: 0.45, yourRate: 0.85, yield: "9.5%" },
]

export default function CommissionPage() {
  const [defaultCommission, setDefaultCommission] = useState([0.75])
  const [investmentAmount, setInvestmentAmount] = useState("100000")

  const projectedRevenue = (parseFloat(investmentAmount) * defaultCommission[0]) / 100

  return (
    <div className="flex flex-col">
      <DashboardHeader
        title="Commission & Revenue"
        description="Configure your commission rates and view projections"
      />
      <main className="flex-1 p-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Commission Settings */}
          <div className="space-y-6 lg:col-span-2">
            {/* Default Commission */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Default Commission Rate</CardTitle>
                <CardDescription>Set your base commission percentage for all bonds</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Commission Rate</Label>
                    <span className="text-2xl font-bold text-primary">{defaultCommission[0]}%</span>
                  </div>
                  <Slider
                    value={defaultCommission}
                    onValueChange={setDefaultCommission}
                    max={2}
                    min={0.1}
                    step={0.05}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0.1%</span>
                    <span>1%</span>
                    <span>2%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bond-Specific Commissions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Bond-Specific Commissions</CardTitle>
                <CardDescription>Override commission rates for individual bonds</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bondCommissions.map((bond, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg border border-border p-4"
                    >
                      <div>
                        <p className="font-medium text-foreground">{bond.name}</p>
                        <p className="text-sm text-muted-foreground">Yield: {bond.yield}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">Base: {bond.baseRate}%</p>
                          <Badge variant="secondary" className="bg-primary/10 text-primary">
                            Your Rate: {bond.yourRate}%
                          </Badge>
                        </div>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Markup Rules */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Markup Rules</CardTitle>
                <CardDescription>Define automatic markup based on investment tiers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="rounded-lg border border-border p-4">
                      <p className="text-sm text-muted-foreground">Up to $50K</p>
                      <p className="text-lg font-semibold text-foreground">+0.25%</p>
                    </div>
                    <div className="rounded-lg border border-border p-4">
                      <p className="text-sm text-muted-foreground">$50K - $200K</p>
                      <p className="text-lg font-semibold text-foreground">+0.15%</p>
                    </div>
                    <div className="rounded-lg border border-border p-4">
                      <p className="text-sm text-muted-foreground">Above $200K</p>
                      <p className="text-lg font-semibold text-foreground">+0.10%</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">Customize Markup Rules</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Revenue Calculator */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-primary" />
                  <CardTitle className="text-base">Revenue Calculator</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="investment">Investment Amount ($)</Label>
                  <Input
                    id="investment"
                    type="number"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Commission Rate</Label>
                  <p className="text-2xl font-bold text-primary">{defaultCommission[0]}%</p>
                </div>
                <div className="rounded-lg bg-primary/5 p-4">
                  <p className="text-sm text-muted-foreground">Projected Revenue</p>
                  <p className="text-3xl font-bold text-primary">
                    ${projectedRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-success" />
                  <CardTitle className="text-base">Revenue Stats</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">This Month</span>
                  <span className="font-semibold text-foreground">$48,250</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Last Month</span>
                  <span className="font-semibold text-foreground">$42,180</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">YTD Total</span>
                  <span className="font-semibold text-foreground">$485,420</span>
                </div>
                <div className="flex items-center justify-between border-t border-border pt-4">
                  <span className="text-sm text-muted-foreground">Avg. Commission</span>
                  <Badge className="bg-success/10 text-success">
                    <Percent className="mr-1 h-3 w-3" />
                    0.78%
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Button className="w-full">Save Commission Settings</Button>
          </div>
        </div>
      </main>
    </div>
  )
}
