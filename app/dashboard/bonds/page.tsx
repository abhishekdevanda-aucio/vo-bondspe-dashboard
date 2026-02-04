"use client";

import { useState } from "react";
import Link from "next/link";
import { DashboardHeader } from "@/components/dashboard/header";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  bondCatalog,
  formatCurrency,
  getBondStats,
  type Bond,
} from "@/lib/portal-config";
import {
  Search,
  Shield,
  TrendingUp,
  Leaf,
  Building2,
  Landmark,
  ChevronRight,
  Users,
  IndianRupee,
  BarChart3,
} from "lucide-react";

function getTypeStyle(type: string) {
  switch (type) {
    case "Government":
      return "bg-primary/10 text-primary";
    case "Corporate":
      return "bg-accent/10 text-accent";
    case "PSU":
      return "bg-success/10 text-success";
    case "Green":
      return "bg-emerald-500/10 text-emerald-600";
    case "Municipal":
      return "bg-warning/10 text-warning-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
}

function getTypeIcon(type: string) {
  switch (type) {
    case "Government":
      return <Landmark className="mr-1 h-3 w-3" />;
    case "Corporate":
      return <Building2 className="mr-1 h-3 w-3" />;
    case "PSU":
      return <Shield className="mr-1 h-3 w-3" />;
    case "Green":
      return <Leaf className="mr-1 h-3 w-3" />;
    default:
      return <TrendingUp className="mr-1 h-3 w-3" />;
  }
}

function getRiskStyle(risk: string) {
  switch (risk) {
    case "Low":
      return "bg-success/10 text-success";
    case "Medium":
      return "bg-warning/10 text-warning-foreground";
    case "High":
      return "bg-destructive/10 text-destructive";
    default:
      return "bg-muted text-muted-foreground";
  }
}

export default function BondsPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredBonds = bondCatalog.filter((bond) => {
    const matchesSearch =
      bond.name.toLowerCase().includes(search.toLowerCase()) ||
      bond.issuer.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === "all" || bond.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const bondTypes = [...new Set(bondCatalog.map((b) => b.type))];

  // Calculate total stats
  const totalInvestorsCount = new Set(
    bondCatalog.flatMap((bond) => {
      const stats = getBondStats(bond.id);
      return stats.investorCount;
    })
  ).size;

  const totalInvestedAmount = bondCatalog.reduce((sum, bond) => {
    const stats = getBondStats(bond.id);
    return sum + stats.totalInvested;
  }, 0);

  return (
    <div className="flex flex-col">
      <DashboardHeader
        title="Bonds Catalog"
        description="View all available bonds and investor activity"
      />
      <main className="flex-1 p-6">
        {/* Summary Stats */}
        <div className="mb-6 grid gap-4 sm:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <BarChart3 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Bonds</p>
                  <p className="text-2xl font-bold text-foreground">{bondCatalog.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                  <IndianRupee className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Invested</p>
                  <p className="text-2xl font-bold text-foreground">{formatCurrency(totalInvestedAmount)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <Users className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Investors</p>
                  <p className="text-2xl font-bold text-foreground">6</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                  <TrendingUp className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Yield</p>
                  <p className="text-2xl font-bold text-foreground">
                    {(bondCatalog.reduce((sum, b) => sum + b.yield, 0) / bondCatalog.length).toFixed(2)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search & Filter */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative max-w-md flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search bonds by name or issuer..."
                  className="pl-9"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={typeFilter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTypeFilter("all")}
                >
                  All
                </Button>
                {bondTypes.map((type) => (
                  <Button
                    key={type}
                    variant={typeFilter === type ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTypeFilter(type)}
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bonds Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Bonds</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bond Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Yield</TableHead>
                  <TableHead className="text-right">Min. Investment</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Risk</TableHead>
                  <TableHead className="text-right">Investors</TableHead>
                  <TableHead className="text-right">Total Invested</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBonds.map((bond) => {
                  const stats = getBondStats(bond.id);
                  return (
                    <TableRow key={bond.id} className="group">
                      <TableCell>
                        <div>
                          <p className="font-medium text-foreground">{bond.name}</p>
                          <p className="text-sm text-muted-foreground">{bond.issuer}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={getTypeStyle(bond.type)}>
                          {getTypeIcon(bond.type)}
                          {bond.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="font-semibold text-success">{bond.yield}%</span>
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(bond.minInvestment)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{bond.rating}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={getRiskStyle(bond.riskLevel)}>
                          {bond.riskLevel}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="font-medium">{stats.investorCount}</span>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="font-medium">{formatCurrency(stats.totalInvested)}</span>
                      </TableCell>
                      <TableCell>
                        <Link href={`/dashboard/bonds/${bond.id}`}>
                          <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                            View Details
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
