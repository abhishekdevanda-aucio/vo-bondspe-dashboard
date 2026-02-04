"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  PieChart,
  Calendar,
  DollarSign,
} from "lucide-react";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { partnerBranding, sampleInvestorProfile, getBondById } from "@/lib/portal-config";


// Get data from shared config
const branding = partnerBranding;
const sampleInvestor = sampleInvestorProfile;

// Map holdings with bond details
const holdings = sampleInvestor.holdings.map((holding) => {
  const bond = getBondById(holding.bondId);
  return {
    id: holding.bondId,
    name: bond?.name || "Unknown Bond",
    issuer: bond?.issuer || "Unknown",
    category: bond?.type || "Other",
    amount: holding.currentValue,
    yield: bond?.yield || 0,
    maturity: bond?.maturityDate
      ? new Date(bond.maturityDate).toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        })
      : "N/A",
    purchaseDate: new Date(holding.purchaseDate).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    change:
      ((holding.currentValue - holding.investedAmount) / holding.investedAmount) *
      100,
    earned: holding.currentValue - holding.investedAmount,
  };
});

// Calculate allocation by category
const allocationMap = holdings.reduce(
  (acc, h) => {
    acc[h.category] = (acc[h.category] || 0) + h.amount;
    return acc;
  },
  {} as Record<string, number>
);

const allocationColors: Record<string, string> = {
  Government: branding.colors.primary,
  Corporate: "#3b82f6",
  Municipal: "#8b5cf6",
  Green: "#10b981",
};

const allocationData = Object.entries(allocationMap).map(([name, value]) => ({
  name,
  value,
  color: allocationColors[name] || "#94a3b8",
}));

// Map upcoming payments
const upcomingPayments = sampleInvestor.upcomingPayments.map((payment) => {
  const bond = getBondById(payment.bondId);
  return {
    bond: bond?.name || "Unknown Bond",
    date: new Date(payment.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    amount: payment.amount,
  };
});

export default function PortfolioPage() {
  const totalValue = sampleInvestor.portfolio.totalValue;
  const totalEarned = sampleInvestor.portfolio.totalEarnings;
  const avgYield =
    holdings.reduce((sum, h) => sum + h.yield * h.amount, 0) / totalValue;
  const upcomingTotal = upcomingPayments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1
          className="text-2xl font-semibold"
          style={{ color: branding.colors.primaryDark }}
        >
          My Portfolio
        </h1>
        <p className="text-gray-500">Track and manage your bond investments</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-gray-200 bg-white">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Value</p>
                <p
                  className="mt-1 text-2xl font-bold"
                  style={{ color: branding.colors.primaryDark }}
                >
                  ${totalValue.toLocaleString()}
                </p>
              </div>
              <div
                className="rounded-lg p-2.5"
                style={{ backgroundColor: `${branding.colors.primary}15` }}
              >
                <Wallet
                  className="h-5 w-5"
                  style={{ color: branding.colors.primary }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 bg-white">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Earned</p>
                <p className="mt-1 text-2xl font-bold text-emerald-600">
                  +${totalEarned.toLocaleString()}
                </p>
              </div>
              <div className="rounded-lg bg-emerald-100 p-2.5">
                <DollarSign className="h-5 w-5 text-emerald-600" />
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
                  style={{ color: branding.colors.primaryDark }}
                >
                  {avgYield.toFixed(2)}%
                </p>
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
                  Upcoming Payments
                </p>
                <p
                  className="mt-1 text-2xl font-bold"
                  style={{ color: branding.colors.primaryDark }}
                >
                  ${upcomingTotal.toFixed(0)}
                </p>
              </div>
              <div className="rounded-lg bg-blue-100 p-2.5">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Allocation Chart */}
        <Card className="border-gray-200 bg-white">
          <CardHeader className="pb-2">
            <CardTitle
              className="flex items-center gap-2 text-lg font-semibold"
              style={{ color: branding.colors.primaryDark }}
            >
              <PieChart className="h-5 w-5" />
              Asset Allocation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={allocationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {allocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [
                      `$${value.toLocaleString()}`,
                      "Value",
                    ]}
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {allocationData.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-gray-500">{item.name}</span>
                  </div>
                  <span
                    className="text-sm font-medium"
                    style={{ color: branding.colors.primaryDark }}
                  >
                    {((item.value / totalValue) * 100).toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Payments */}
        <Card className="border-gray-200 bg-white lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle
              className="flex items-center gap-2 text-lg font-semibold"
              style={{ color: branding.colors.primaryDark }}
            >
              <Calendar className="h-5 w-5" />
              Upcoming Payments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingPayments.map((payment, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg p-4"
                  style={{ backgroundColor: branding.colors.background }}
                >
                  <div>
                    <p
                      className="font-medium"
                      style={{ color: branding.colors.primaryDark }}
                    >
                      {payment.bond}
                    </p>
                    <p className="text-sm text-gray-500">{payment.date}</p>
                  </div>
                  <span className="text-lg font-semibold text-emerald-600">
                    +${payment.amount.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Holdings Table */}
      <Card className="border-gray-200 bg-white">
        <CardHeader className="pb-2">
          <CardTitle
            className="text-lg font-semibold"
            style={{ color: branding.colors.primaryDark }}
          >
            Holdings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList
              className="mb-4"
              style={{ backgroundColor: branding.colors.background }}
            >
              <TabsTrigger
                value="all"
                className="data-[state=active]:text-white"
                style={
                  {
                    "--tw-bg-active": branding.colors.primary,
                  } as React.CSSProperties
                }
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="government"
                className="data-[state=active]:text-white"
              >
                Government
              </TabsTrigger>
              <TabsTrigger
                value="corporate"
                className="data-[state=active]:text-white"
              >
                Corporate
              </TabsTrigger>
              <TabsTrigger
                value="other"
                className="data-[state=active]:text-white"
              >
                Other
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-0">
              <HoldingsTable holdings={holdings} branding={branding} />
            </TabsContent>
            <TabsContent value="government" className="mt-0">
              <HoldingsTable
                holdings={holdings.filter((h) => h.category === "Government")}
                branding={branding}
              />
            </TabsContent>
            <TabsContent value="corporate" className="mt-0">
              <HoldingsTable
                holdings={holdings.filter((h) => h.category === "Corporate")}
                branding={branding}
              />
            </TabsContent>
            <TabsContent value="other" className="mt-0">
              <HoldingsTable
                holdings={holdings.filter(
                  (h) => h.category !== "Government" && h.category !== "Corporate"
                )}
                branding={branding}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

function HoldingsTable({
  holdings,
  branding,
}: {
  holdings: typeof holdings;
  branding: typeof partnerBranding;
}) {
  if (holdings.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500">
        No holdings in this category.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="pb-3 text-left text-sm font-medium text-gray-500">
              Bond
            </th>
            <th className="pb-3 text-right text-sm font-medium text-gray-500">
              Value
            </th>
            <th className="hidden pb-3 text-right text-sm font-medium text-gray-500 sm:table-cell">
              Yield
            </th>
            <th className="hidden pb-3 text-right text-sm font-medium text-gray-500 md:table-cell">
              Earned
            </th>
            <th className="hidden pb-3 text-right text-sm font-medium text-gray-500 lg:table-cell">
              Maturity
            </th>
            <th className="pb-3 text-right text-sm font-medium text-gray-500">
              Change
            </th>
          </tr>
        </thead>
        <tbody>
          {holdings.map((holding) => (
            <tr
              key={holding.id}
              className="border-b border-gray-200 last:border-0"
            >
              <td className="py-4">
                <div>
                  <p
                    className="font-medium"
                    style={{ color: branding.colors.primaryDark }}
                  >
                    {holding.name}
                  </p>
                  <p className="text-sm text-gray-500">{holding.issuer}</p>
                </div>
              </td>
              <td
                className="py-4 text-right font-semibold"
                style={{ color: branding.colors.primaryDark }}
              >
                ${holding.amount.toLocaleString()}
              </td>
              <td
                className="hidden py-4 text-right sm:table-cell"
                style={{ color: branding.colors.primary }}
              >
                {holding.yield}%
              </td>
              <td className="hidden py-4 text-right font-medium text-emerald-600 md:table-cell">
                +${holding.earned.toLocaleString()}
              </td>
              <td className="hidden py-4 text-right text-gray-500 lg:table-cell">
                {holding.maturity}
              </td>
              <td className="py-4 text-right">
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
  );
}
