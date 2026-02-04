"use client";

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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { partnerEarnings, formatCurrency, formatDate } from "@/lib/portal-config";
import {
  Wallet,
  Clock,
  CheckCircle,
  Download,
  Building,
  CreditCard,
  IndianRupee,
} from "lucide-react";

export default function PayoutsPage() {
  return (
    <div className="flex flex-col">
      <DashboardHeader
        title="Earnings & Payouts"
        description="View your commission earnings and payout history"
      />
      <main className="flex-1 p-6">
        {/* Stats */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success/10">
                  <Wallet className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Earnings</p>
                  <p className="text-2xl font-bold text-foreground">
                    {formatCurrency(partnerEarnings.totalEarned)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                  <Clock className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pending Payout</p>
                  <p className="text-2xl font-bold text-foreground">
                    {formatCurrency(partnerEarnings.pendingPayout)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Payout</p>
                  <p className="text-2xl font-bold text-foreground">
                    {formatCurrency(partnerEarnings.lastPayoutAmount)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-warning/10">
                  <CreditCard className="h-6 w-6 text-warning-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Next Payout</p>
                  <p className="text-2xl font-bold text-foreground">
                    {formatDate(partnerEarnings.nextPayoutDate)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Payout History */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Payout History</CardTitle>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Payout ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-[100px]">Invoice</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {partnerEarnings.payoutHistory.map((payout) => (
                        <TableRow key={payout.id}>
                          <TableCell className="font-mono text-sm">
                            {payout.id.toUpperCase()}
                          </TableCell>
                          <TableCell>{formatDate(payout.date)}</TableCell>
                          <TableCell className="font-semibold">
                            {formatCurrency(payout.amount)}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="secondary"
                              className="bg-success/10 text-success"
                            >
                              {payout.status.charAt(0).toUpperCase() +
                                payout.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bank Account & Next Payout */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Bank Account</CardTitle>
                <CardDescription>Your payout destination</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border border-border p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Building className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {partnerEarnings.bankDetails.bankName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {partnerEarnings.bankDetails.accountNumber}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Account Holder</span>
                      <span className="text-foreground">
                        {partnerEarnings.bankDetails.accountName}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">IFSC Code</span>
                      <span className="font-mono text-foreground">
                        {partnerEarnings.bankDetails.ifscCode}
                      </span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  Change Bank Account
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Next Payout</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg bg-accent/5 p-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      Estimated Amount
                    </p>
                    <p className="flex items-center justify-center gap-1 text-3xl font-bold text-accent">
                      <IndianRupee className="h-6 w-6" />
                      {partnerEarnings.nextPayoutEstimate.toLocaleString("en-IN")}
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Processing on {formatDate(partnerEarnings.nextPayoutDate)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-muted p-3">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Payouts processed on the 15th of each month
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
