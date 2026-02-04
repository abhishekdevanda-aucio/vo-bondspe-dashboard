import { DashboardHeader } from "@/components/dashboard/header";
import { StatsCard } from "@/components/dashboard/stats-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  partnerData,
  partnerStats,
  partnerEarnings,
  recentActivity,
  getTopPicks,
  formatCurrency,
  formatDate,
} from "@/lib/portal-config";
import {
  IndianRupee,
  TrendingUp,
  Users,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  UserPlus,
  BadgeCheck,
  Clock,
  Star,
} from "lucide-react";

// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// Monthly data for chart
const monthlyData = [
  { month: "Sep", investments: 1250000, commission: 9375 },
  { month: "Oct", investments: 1875000, commission: 14063 },
  { month: "Nov", investments: 2500000, commission: 18750 },
  { month: "Dec", investments: 3125000, commission: 23438 },
  { month: "Jan", investments: 4500000, commission: 33750 },
  { month: "Feb", investments: 5725000, commission: 42938 },
];

export default function DashboardOverview() {
  const topPicks = getTopPicks();

  return (
    <div className="flex flex-col">
      <DashboardHeader
        title="Partner Dashboard"
        description={`Welcome back, ${partnerData.companyName}`}
      />
      <main className="flex-1 p-6">
        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Investment by Users"
            value={formatCurrency(partnerStats.totalInvestmentByUsers)}
            change={`+${partnerStats.growthRate}%`}
            trend="up"
            icon={IndianRupee}
            iconColor="bg-primary/10 text-primary"
          />
          <StatsCard
            title="Commission Earned"
            value={formatCurrency(partnerStats.totalCommissionEarned)}
            change="+22.4%"
            trend="up"
            icon={TrendingUp}
            iconColor="bg-accent/10 text-accent"
          />
          <StatsCard
            title="Active Investors"
            value={partnerStats.activeInvestors.toString()}
            change={`${partnerStats.pendingKyc} pending KYC`}
            trend="up"
            icon={Users}
            iconColor="bg-success/10 text-success"
          />
          <StatsCard
            title="Monthly Earnings"
            value={formatCurrency(partnerStats.monthlyEarnings)}
            change={`Next payout: ${formatDate(partnerEarnings.nextPayoutDate)}`}
            trend="up"
            icon={Wallet}
            iconColor="bg-warning/10 text-warning-foreground"
          />
        </div>

        {/* Charts & Activity */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* Investment Growth Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base font-medium">Investment Growth</CardTitle>
            </CardHeader>
            {/* <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyData}>
                    <defs>
                      <linearGradient id="investmentGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" className="text-xs" />
                    <YAxis
                      className="text-xs"
                      tickFormatter={(value) => `${(value / 100000).toFixed(0)}L`}
                    />
                    <Tooltip
                      formatter={(value: number) => [formatCurrency(value), "Investments"]}
                      labelFormatter={(label) => `Month: ${label}`}
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="investments"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      fill="url(#investmentGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent> */}
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.slice(0, 5).map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                      activity.type === "investment"
                        ? "bg-success/10 text-success"
                        : activity.type === "withdrawal"
                          ? "bg-destructive/10 text-destructive"
                          : activity.type === "kyc_verified"
                            ? "bg-primary/10 text-primary"
                            : activity.type === "new_investor"
                              ? "bg-accent/10 text-accent"
                              : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {activity.type === "investment" && <ArrowUpRight className="h-4 w-4" />}
                    {activity.type === "withdrawal" && <ArrowDownRight className="h-4 w-4" />}
                    {activity.type === "kyc_verified" && <BadgeCheck className="h-4 w-4" />}
                    {activity.type === "new_investor" && <UserPlus className="h-4 w-4" />}
                    {activity.type === "interest_payout" && <Wallet className="h-4 w-4" />}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{activity.investorName}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.type === "investment" &&
                        `Invested ${formatCurrency(activity.amount!)} in ${activity.bondName}`}
                      {activity.type === "withdrawal" &&
                        `Withdrew ${formatCurrency(activity.amount!)} from ${activity.bondName}`}
                      {activity.type === "kyc_verified" && "KYC verification completed"}
                      {activity.type === "new_investor" && "Joined as new investor"}
                      {activity.type === "interest_payout" &&
                        `Received ${formatCurrency(activity.amount!)} interest`}
                    </p>
                    <p className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {new Date(activity.timestamp).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Top Performing Bonds & Recent Investors */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* Top Picks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base font-medium">
                <Star className="h-4 w-4 text-amber-500" />
                Top Performing Bonds
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {topPicks.map((bond) => (
                <div
                  key={bond.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="space-y-1">
                    <p className="font-medium">{bond.name}</p>
                    <p className="text-sm text-muted-foreground">{bond.issuer}</p>
                    <div className="flex gap-2">
                      <Badge variant="secondary">{bond.type}</Badge>
                      <Badge variant="outline">{bond.rating}</Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-success">{bond.yield}%</p>
                    <p className="text-xs text-muted-foreground">Annual Yield</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Earnings Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium">Earnings Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-muted/50 p-4">
                    <p className="text-sm text-muted-foreground">Total Earned</p>
                    <p className="text-2xl font-bold">
                      {formatCurrency(partnerEarnings.totalEarned)}
                    </p>
                  </div>
                  <div className="rounded-lg bg-success/10 p-4">
                    <p className="text-sm text-muted-foreground">Pending Payout</p>
                    <p className="text-2xl font-bold text-success">
                      {formatCurrency(partnerEarnings.pendingPayout)}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="mb-3 text-sm font-medium">Recent Payouts</p>
                  <div className="space-y-2">
                    {partnerEarnings.payoutHistory.slice(0, 3).map((payout) => (
                      <div
                        key={payout.id}
                        className="flex items-center justify-between rounded-lg border px-4 py-3"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8 bg-primary/10">
                            <AvatarFallback className="bg-transparent text-primary">
                              <Wallet className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">
                              {formatCurrency(payout.amount)}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatDate(payout.date)}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant="secondary"
                          className="bg-success/10 text-success"
                        >
                          Completed
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
