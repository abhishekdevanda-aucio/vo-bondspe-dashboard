"use client";

import { useParams } from "next/navigation";
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
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getBondById,
  getInvestorsByBondId,
  getBondStats,
  formatCurrency,
  formatDate,
} from "@/lib/portal-config";
import {
  ArrowLeft,
  Shield,
  TrendingUp,
  Leaf,
  Building2,
  Landmark,
  Users,
  IndianRupee,
  Calendar,
  Award,
  AlertTriangle,
  Mail,
  Phone,
  ExternalLink,
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
      return <Landmark className="mr-1 h-4 w-4" />;
    case "Corporate":
      return <Building2 className="mr-1 h-4 w-4" />;
    case "PSU":
      return <Shield className="mr-1 h-4 w-4" />;
    case "Green":
      return <Leaf className="mr-1 h-4 w-4" />;
    default:
      return <TrendingUp className="mr-1 h-4 w-4" />;
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

function getKycBadge(status: string) {
  switch (status) {
    case "verified":
      return <Badge className="bg-success/10 text-success">Verified</Badge>;
    case "pending":
      return <Badge className="bg-warning/10 text-warning-foreground">Pending</Badge>;
    case "rejected":
      return <Badge className="bg-destructive/10 text-destructive">Rejected</Badge>;
    default:
      return <Badge variant="secondary">Unknown</Badge>;
  }
}

export default function BondDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  const bond = getBondById(id);
  const investors = getInvestorsByBondId(id);
  const stats = getBondStats(id);

  if (!bond) {
    return (
      <div className="flex flex-col">
        <DashboardHeader title="Bond Not Found" description="" />
        <main className="flex-1 p-6">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <AlertTriangle className="h-12 w-12 text-muted-foreground mb-4" />
              <h2 className="text-lg font-semibold mb-2">Bond not found</h2>
              <p className="text-muted-foreground mb-4">
                The bond you are looking for does not exist.
              </p>
              <Link href="/dashboard/bonds">
                <Button>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Bonds
                </Button>
              </Link>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <DashboardHeader
        title={bond.name}
        description={`Issued by ${bond.issuer}`}
      />
      <main className="flex-1 p-6">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/dashboard/bonds">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Bonds
            </Button>
          </Link>
        </div>

        {/* Bond Details */}
        <div className="grid gap-6 lg:grid-cols-3 mb-6">
          {/* Main Info */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{bond.name}</CardTitle>
                  <CardDescription className="mt-1">{bond.issuer}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Badge variant="secondary" className={getTypeStyle(bond.type)}>
                    {getTypeIcon(bond.type)}
                    {bond.type}
                  </Badge>
                  <Badge variant="secondary" className={getRiskStyle(bond.riskLevel)}>
                    {bond.riskLevel} Risk
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">{bond.description}</p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg border border-border p-4">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm">Yield</span>
                  </div>
                  <p className="text-2xl font-bold text-success">{bond.yield}%</p>
                </div>
                <div className="rounded-lg border border-border p-4">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Award className="h-4 w-4" />
                    <span className="text-sm">Rating</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">{bond.rating}</p>
                </div>
                <div className="rounded-lg border border-border p-4">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <IndianRupee className="h-4 w-4" />
                    <span className="text-sm">Min. Investment</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">{formatCurrency(bond.minInvestment)}</p>
                </div>
                <div className="rounded-lg border border-border p-4">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">Maturity Date</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">
                    {new Date(bond.maturityDate).toLocaleDateString("en-IN", {
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Investment Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Investment Summary</CardTitle>
              <CardDescription>From your investors</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Investors</p>
                  <p className="text-2xl font-bold text-foreground">{stats.investorCount}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success/10">
                  <IndianRupee className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Invested</p>
                  <p className="text-2xl font-bold text-foreground">{formatCurrency(stats.totalInvested)}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                  <TrendingUp className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Units</p>
                  <p className="text-2xl font-bold text-foreground">{stats.totalUnits}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Investors Table */}
        <Card>
          <CardHeader>
            <CardTitle>Investors in this Bond</CardTitle>
            <CardDescription>
              {investors.length} investor{investors.length !== 1 ? "s" : ""} have invested in this bond through your platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            {investors.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Users className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No investors yet</h3>
                <p className="text-muted-foreground">
                  No investors have invested in this bond through your platform yet.
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Investor</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>KYC Status</TableHead>
                    <TableHead className="text-right">Units</TableHead>
                    <TableHead className="text-right">Amount Invested</TableHead>
                    <TableHead>Investment Date</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {investors.map((investment) => (
                    <TableRow key={`${investment.investorId}-${investment.date}`}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarFallback className="bg-primary/10 text-primary text-sm">
                              {investment.investor?.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-foreground">
                              {investment.investor?.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              PAN: {investment.investor?.pan}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Mail className="h-3 w-3" />
                            {investment.investor?.email}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Phone className="h-3 w-3" />
                            {investment.investor?.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getKycBadge(investment.investor?.kycStatus || "")}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {investment.units}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {formatCurrency(investment.amount)}
                      </TableCell>
                      <TableCell>
                        {formatDate(investment.date)}
                      </TableCell>
                      <TableCell>
                        <Link href={`/dashboard/investors?id=${investment.investorId}`}>
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
