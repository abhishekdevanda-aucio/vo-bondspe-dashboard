import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const topBonds = [
  {
    name: "HDFC Ltd Bond",
    yield: "8.5%",
    invested: "$2.4M",
    tag: "Safe",
    tagColor: "bg-success/10 text-success",
  },
  {
    name: "ICICI Bank Bond",
    yield: "9.2%",
    invested: "$1.8M",
    tag: "High Yield",
    tagColor: "bg-accent/10 text-accent",
  },
  {
    name: "SBI Infrastructure",
    yield: "7.8%",
    invested: "$1.5M",
    tag: "Monthly",
    tagColor: "bg-warning/10 text-warning-foreground",
  },
  {
    name: "Tata Capital Bond",
    yield: "8.1%",
    invested: "$1.2M",
    tag: "Safe",
    tagColor: "bg-success/10 text-success",
  },
  {
    name: "L&T Finance Bond",
    yield: "9.5%",
    invested: "$980K",
    tag: "High Yield",
    tagColor: "bg-accent/10 text-accent",
  },
]

export function TopBonds() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">Top Performing Bonds</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {topBonds.map((bond, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-lg border border-border p-3"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-sm font-semibold text-muted-foreground">
                {index + 1}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{bond.name}</p>
                <p className="text-xs text-muted-foreground">Yield: {bond.yield}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className={bond.tagColor}>
                {bond.tag}
              </Badge>
              <span className="text-sm font-semibold text-foreground">{bond.invested}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
