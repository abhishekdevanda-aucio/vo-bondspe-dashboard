"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Download,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  CheckCircle2,
  Filter,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { partnerBranding, sampleInvestorProfile, getBondById } from "@/lib/portal-config";

// Get data from shared config
const branding = partnerBranding;
const sampleInvestor = sampleInvestorProfile;

// Map transactions with bond details from shared config
const transactions = sampleInvestor.transactions.map((txn) => {
  const bond = getBondById(txn.bondId || "");
  return {
    id: txn.id,
    type: txn.type === "investment" ? "Investment" : "Interest Payment",
    description: bond?.name || "Account",
    amount: txn.type === "investment" ? -txn.amount : txn.amount,
    units: txn.units,
    status: txn.status,
    date: new Date(txn.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    time: new Date(txn.date).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    }),
  };
});

// Sort by date descending
const sortedTransactions = [...transactions].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

const transactionTypes = ["All", "Investment", "Interest Payment"];

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

  const filteredTransactions = sortedTransactions.filter((txn) => {
    const matchesSearch =
      txn.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "All" || txn.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const totalInvested = transactions
    .filter((t) => t.type === "Investment")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const totalEarned = transactions
    .filter((t) => t.type === "Interest Payment")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1
            className="text-2xl font-semibold"
            style={{ color: branding.colors.primaryDark }}
          >
            Transactions
          </h1>
          <p className="text-gray-500">
            View your complete transaction history
          </p>
        </div>
        <Button
          variant="outline"
          className="w-fit gap-2 bg-transparent"
          style={{
            borderColor: branding.colors.primary,
            color: branding.colors.primary,
          }}
        >
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-gray-200 bg-white">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Invested
                </p>
                <p
                  className="mt-1 text-2xl font-bold"
                  style={{ color: branding.colors.primaryDark }}
                >
                  ${totalInvested.toLocaleString()}
                </p>
              </div>
              <div
                className="rounded-lg p-2.5"
                style={{ backgroundColor: `${branding.colors.primary}15` }}
              >
                <ArrowUpRight
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
                <p className="text-sm font-medium text-gray-500">
                  Total Earned
                </p>
                <p className="mt-1 text-2xl font-bold text-emerald-600">
                  +${totalEarned.toLocaleString()}
                </p>
              </div>
              <div className="rounded-lg bg-emerald-100 p-2.5">
                <TrendingUp className="h-5 w-5 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 bg-white">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Transactions
                </p>
                <p
                  className="mt-1 text-2xl font-bold"
                  style={{ color: branding.colors.primaryDark }}
                >
                  {transactions.length}
                </p>
              </div>
              <div className="rounded-lg bg-blue-100 p-2.5">
                <DollarSign className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-gray-200 bg-white">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search transactions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-gray-200 pl-9"
                />
              </div>
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full border-gray-200 sm:w-48">
                <Filter className="mr-2 h-4 w-4 text-gray-400" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {transactionTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Transactions List */}
      <Card className="border-gray-200 bg-white">
        <CardContent className="p-0">
          {filteredTransactions.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {filteredTransactions.map((txn) => (
                <div
                  key={txn.id}
                  className="flex items-center justify-between p-4 transition-colors hover:bg-gray-50"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`rounded-full p-2.5 ${
                        txn.amount > 0 ? "bg-emerald-100" : ""
                      }`}
                      style={
                        txn.amount <= 0
                          ? { backgroundColor: `${branding.colors.primary}15` }
                          : {}
                      }
                    >
                      {txn.amount > 0 ? (
                        <ArrowDownLeft className="h-5 w-5 text-emerald-600" />
                      ) : (
                        <ArrowUpRight
                          className="h-5 w-5"
                          style={{ color: branding.colors.primary }}
                        />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p
                          className="font-medium"
                          style={{ color: branding.colors.primaryDark }}
                        >
                          {txn.type}
                        </p>
                        <Badge
                          variant="secondary"
                          className="bg-emerald-100 text-xs text-emerald-700"
                        >
                          <CheckCircle2 className="mr-1 h-3 w-3" />
                          {txn.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500">{txn.description}</p>
                      <p className="text-xs text-gray-400">
                        {txn.date} at {txn.time} · {txn.id}
                        {txn.units && ` · ${txn.units} units`}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-lg font-semibold ${
                      txn.amount > 0 ? "text-emerald-600" : ""
                    }`}
                    style={
                      txn.amount <= 0
                        ? { color: branding.colors.primaryDark }
                        : {}
                    }
                  >
                    {txn.amount > 0 ? "+" : ""}$
                    {Math.abs(txn.amount).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-gray-500">No transactions found.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
