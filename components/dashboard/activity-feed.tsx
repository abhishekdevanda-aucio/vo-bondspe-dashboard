import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserPlus, DollarSign, FileCheck, TrendingUp } from "lucide-react"

const activities = [
  {
    icon: UserPlus,
    iconColor: "bg-success/10 text-success",
    title: "New investor registered",
    description: "Rahul Sharma completed KYC",
    time: "2 min ago",
  },
  {
    icon: DollarSign,
    iconColor: "bg-accent/10 text-accent",
    title: "Investment received",
    description: "$25,000 in HDFC Bond",
    time: "15 min ago",
  },
  {
    icon: FileCheck,
    iconColor: "bg-primary/10 text-primary",
    title: "Payout processed",
    description: "$12,500 commission credited",
    time: "1 hour ago",
  },
  {
    icon: TrendingUp,
    iconColor: "bg-warning/10 text-warning-foreground",
    title: "Bond matured",
    description: "SBI Bond 2024 completed",
    time: "3 hours ago",
  },
  {
    icon: UserPlus,
    iconColor: "bg-success/10 text-success",
    title: "New investor registered",
    description: "Priya Patel started onboarding",
    time: "5 hours ago",
  },
]

export function ActivityFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${activity.iconColor}`}>
              <activity.icon className="h-4 w-4" />
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium text-foreground">{activity.title}</p>
              <p className="text-xs text-muted-foreground">{activity.description}</p>
            </div>
            <span className="text-xs text-muted-foreground">{activity.time}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
