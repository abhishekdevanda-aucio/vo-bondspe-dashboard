"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Wallet,
  PiggyBank,
  Calendar,
  Star,
} from "lucide-react";
import Link from "next/link";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  partnerBranding,
  sampleInvestorProfile,
  getEnabledBonds,
  getTopPicks,
  getBondById,
  formatCurrency,
} from "@/lib/portal-config";

// Get data from shared config
const enabledBonds = getEnabledBonds();
const topPicks = getTopPicks();

// Generate portfolio performance data
const portfolioData = [
  { month: "Jul", value: 95000 },
  { month: "Aug", value: 102000 },
  { month: "Sep", value: 108500 },
  { month: "Oct", value: 112000 },
  { month: "Nov", value: 118500 },
  { month: "Dec", value: 122000 },
  { month: "Jan", value: sampleInvestorProfile.portfolio.totalValue },
];

// Map holdings to display format
const holdings = sampleInvestorProfile.holdings.map((holding) => {
  const bond = getBondById(holding.bondId);
  return {
    name: bond?.name || "Unknown Bond",
    amount: holding.currentValue,
    yield: bond?.yield || 0,
    maturity: bond?.maturityDate
      ? new Date(bond.maturityDate).toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        })
      : "N/A",
    change:
      ((holding.currentValue - holding.investedAmount) / holding.investedAmount) *
      100,
  };
});

// Map recent transactions
const recentActivity = sampleInvestorProfile.transactions.slice(-3).reverse().map((txn) => {
  const bond = getBondById(txn.bondId || "");
  return {
    type: txn.type === "investment" ? "Investment" : "Interest Payment",
    description: bond?.name || "Account",
    amount: txn.type === "investment" ? -txn.amount : txn.amount,
    date: new Date(txn.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
  };
});

// Get upcoming payment
const nextPayment = sampleInvestorProfile.upcomingPayments[0];

export default function PortalDashboard() {
  // Calculate average yield
  const avgYield =
    holdings.reduce((sum, h) => sum + h.yield, 0) / holdings.length;

  return (
    <div className="space-y-6">
      {/* Welcome Section - Uses branding */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1
            className="text-2xl font-semibold"
            style={{ color: partnerBranding.colors.primaryDark }}
          >
            Welcome back, {sampleInvestorProfile.name.split(" ")[0]}
          </h1>
          <p className="text-gray-500">{partnerBranding.welcomeMessage.slice(0, 60)}...</p>
        </div>
        <Button
          asChild
          className="w-fit text-white"
          style={{ backgroundColor: partnerBranding.colors.primary }}
        >
          <Link href="/portal/marketplace">
            Browse Bonds
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Stats Cards - Uses investor portfolio data */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-gray-200 bg-white">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Portfolio Value
                </p>
                <p
                  className="mt-1 text-2xl font-bold"
                  style={{ color: partnerBranding.colors.primaryDark }}
                >
                  {formatCurrency(sampleInvestorProfile.portfolio.totalValue)}
                </p>
                <div className="mt-1 flex items-center gap-1 text-sm text-emerald-600">
                  <TrendingUp className="h-3.5 w-3.5" />
                  <span>
                    +
                    {(
                      ((sampleInvestorProfile.portfolio.totalValue -
                        sampleInvestorProfile.portfolio.totalInvested) /
                        sampleInvestorProfile.portfolio.totalInvested) *
                      100
                    ).toFixed(1)}
                    % all time
                  </span>
                </div>
              </div>
              <div
                className="rounded-lg p-2.5"
                style={{ backgroundColor: `${partnerBranding.colors.primary}15` }}
              >
                <Wallet
                  className="h-5 w-5"
                  style={{ color: partnerBranding.colors.primary }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 bg-white">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Earnings
                </p>
                <p
                  className="mt-1 text-2xl font-bold"
                  style={{ color: partnerBranding.colors.primaryDark }}
                >
                  {formatCurrency(sampleInvestorProfile.portfolio.totalEarnings)}
                </p>
                <div className="mt-1 flex items-center gap-1 text-sm text-emerald-600">
                  <TrendingUp className="h-3.5 w-3.5" />
                  <span>+{formatCurrency(sampleInvestorProfile.portfolio.pendingPayments)} pending</span>
                </div>
              </div>
              <div className="rounded-lg bg-emerald-100 p-2.5">
                <PiggyBank className="h-5 w-5 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 bg-white">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Avg. Yield</p>
                <p
                  className="mt-1 text-2xl font-bold"
                  style={{ color: partnerBranding.colors.primaryDark }}
                >
                  {avgYield.toFixed(2)}%
                </p>
                <div className="mt-1 flex items-center gap-1 text-sm text-gray-500">
                  <span>Across {holdings.length} bonds</span>
                </div>
              </div>
              <div className="rounded-lg bg-amber-100 p-2.5">
                <TrendingUp className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 bg-white">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Next Payment
                </p>
                <p
                  className="mt-1 text-2xl font-bold"
                  style={{ color: partnerBranding.colors.primaryDark }}
                >
                  {formatCurrency(nextPayment?.amount || 0)}
                </p>
                <div className="mt-1 flex items-center gap-1 text-sm text-gray-500">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>
                    {nextPayment
                      ? new Date(nextPayment.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "N/A"}
                  </span>
                </div>
              </div>
              <div className="rounded-lg bg-blue-100 p-2.5">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Portfolio Chart */}
        <Card className="border-gray-200 bg-white lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle
              className="text-lg font-semibold"
              style={{ color: partnerBranding.colors.primaryDark }}
            >
              Portfolio Performance
            </CardTitle>
            <div className="flex gap-2">
              {["1M", "3M", "6M", "1Y"].map((period) => (
                <Button
                  key={period}
                  variant="ghost"
                  size="sm"
                  className={period === "6M" ? "text-white" : "text-gray-500"}
                  style={
                    period === "6M"
                      ? { backgroundColor: `${partnerBranding.colors.primary}20`, color: partnerBranding.colors.primary }
                      : {}
                  }
                >
                  {period}
                </Button>
              ))}
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={portfolioData}>
                  <defs>
                    <linearGradient
                      id="portfolioGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor={partnerBranding.colors.primary}
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="100%"
                        stopColor={partnerBranding.colors.primary}
                        stopOpacity={0.05}
                      />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#64748b", fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#64748b", fontSize: 12 }}
                    tickFormatter={(v) => `${(v / 100000).toFixed(1)}L`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e0e7e7",
                      borderRadius: "8px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                    formatter={(value: number) => [
                      formatCurrency(value),
                      "Value",
                    ]}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={partnerBranding.colors.primary}
                    strokeWidth={2}
                    fill="url(#portfolioGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border-gray-200 bg-white">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle
                className="text-lg font-semibold"
                style={{ color: partnerBranding.colors.primaryDark }}
              >
                Recent Activity
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                asChild
                style={{ color: partnerBranding.colors.primary }}
              >
                <Link href="/portal/transactions">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b border-gray-200 pb-3 last:border-0 last:pb-0"
              >
                <div>
                  <p
                    className="font-medium"
                    style={{ color: partnerBranding.colors.primaryDark }}
                  >
                    {activity.type}
                  </p>
                  <p className="text-sm text-gray-500">{activity.description}</p>
                  <p className="text-xs text-gray-400">{activity.date}</p>
                </div>
                <span
                  className={`font-semibold ${activity.amount > 0 ? "text-emerald-600" : ""}`}
                  style={
                    activity.amount <= 0
                      ? { color: partnerBranding.colors.primaryDark }
                      : {}
                  }
                >
                  {activity.amount > 0 ? "+" : ""}{formatCurrency(Math.abs(activity.amount))}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Holdings - Uses investor holdings from config */}
      <Card className="border-gray-200 bg-white">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle
              className="text-lg font-semibold"
              style={{ color: partnerBranding.colors.primaryDark }}
            >
              Your Holdings
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              asChild
              style={{ color: partnerBranding.colors.primary }}
            >
              <Link href="/portal/portfolio">View Portfolio</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="pb-3 text-left text-sm font-medium text-gray-500">
                    Bond
                  </th>
                  <th className="pb-3 text-right text-sm font-medium text-gray-500">
                    Amount
                  </th>
                  <th className="hidden pb-3 text-right text-sm font-medium text-gray-500 sm:table-cell">
                    Yield
                  </th>
                  <th className="hidden pb-3 text-right text-sm font-medium text-gray-500 md:table-cell">
                    Maturity
                  </th>
                  <th className="pb-3 text-right text-sm font-medium text-gray-500">
                    Change
                  </th>
                </tr>
              </thead>
              <tbody>
                {holdings.map((holding, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 last:border-0"
                  >
                    <td className="py-3.5">
                      <span
                        className="font-medium"
                        style={{ color: partnerBranding.colors.primaryDark }}
                      >
                        {holding.name}
                      </span>
                    </td>
                    <td
                      className="py-3.5 text-right font-semibold"
                      style={{ color: partnerBranding.colors.primaryDark }}
                    >
                      {formatCurrency(holding.amount)}
                    </td>
                    <td
                      className="hidden py-3.5 text-right sm:table-cell"
                      style={{ color: partnerBranding.colors.primary }}
                    >
                      {holding.yield}%
                    </td>
                    <td className="hidden py-3.5 text-right text-gray-500 md:table-cell">
                      {holding.maturity}
                    </td>
                    <td className="py-3.5 text-right">
                      <span
                        className={`flex items-center justify-end gap-1 ${holding.change >= 0 ? "text-emerald-600" : "text-red-500"}`}
                      >
                        {holding.change >= 0 ? (
                          <TrendingUp className="h-3.5 w-3.5" />
                        ) : (
                          <TrendingDown className="h-3.5 w-3.5" />
                        )}
                        {holding.change >= 0 ? "+" : ""}
                        {holding.change.toFixed(1)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Featured Bonds - Uses top picks from dashboard settings */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2
            className="text-lg font-semibold"
            style={{ color: partnerBranding.colors.primaryDark }}
          >
            Featured Bonds
          </h2>
          <Button
            variant="ghost"
            size="sm"
            asChild
            style={{ color: partnerBranding.colors.primary }}
          >
            <Link href="/portal/marketplace">View Marketplace</Link>
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topPicks.slice(0, 3).map((bond) => (
            <Card
              key={bond.id}
              className="border-gray-200 bg-white transition-shadow hover:shadow-md"
            >
              <CardContent className="p-5">
                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3
                        className="font-semibold"
                        style={{ color: partnerBranding.colors.primaryDark }}
                      >
                        {bond.name}
                      </h3>
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    </div>
                    <p className="text-sm text-gray-500">{bond.issuer}</p>
                  </div>
                  <Badge
                    variant="secondary"
                    style={{
                      backgroundColor: `${partnerBranding.colors.primary}15`,
                      color: partnerBranding.colors.primary,
                    }}
                  >
                    {bond.rating}
                  </Badge>
                </div>
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Annual Yield</p>
                    <p
                      className="text-xl font-bold"
                      style={{ color: partnerBranding.colors.primary }}
                    >
                      {bond.yield}%
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Min. Investment</p>
                    <p
                      className="font-semibold"
                      style={{ color: partnerBranding.colors.primaryDark }}
                    >
                      {formatCurrency(bond.minInvestment)}
                    </p>
                  </div>
                </div>
                <Button
                  className="w-full text-white"
                  style={{ backgroundColor: partnerBranding.colors.primary }}
                >
                  Invest Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
