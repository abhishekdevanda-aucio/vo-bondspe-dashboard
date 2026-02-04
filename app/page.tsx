import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User, ArrowRight, Briefcase, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="mb-12 text-center">
        <div className="mb-4 flex items-center justify-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
            <TrendingUp className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">BondFlow</h1>
        </div>
        <p className="max-w-md text-muted-foreground">
          White-label bond investment platform. Choose your view below.
        </p>
      </div>

      <div className="grid w-full max-w-3xl gap-6 md:grid-cols-2">
        {/* B2B Dashboard */}
        <Card className="group border-border bg-card transition-all hover:shadow-lg">
          <CardContent className="p-8">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
              <Briefcase className="h-8 w-8 text-primary" />
            </div>
            <h2 className="mb-2 text-xl font-semibold text-card-foreground">
              B2B Dashboard
            </h2>
            <p className="mb-6 text-sm text-muted-foreground">
              Admin portal for businesses to manage their white-label bond
              investment platform - branding, commissions, investors, and more.
            </p>
            <Button
              asChild
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Link href="/dashboard">
                Enter Dashboard
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Investor Portal */}
        <Card className="group border-border bg-card transition-all hover:shadow-lg">
          <CardContent className="p-8">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10">
              <User className="h-8 w-8 text-emerald-600" />
            </div>
            <h2 className="mb-2 text-xl font-semibold text-card-foreground">
              Investor Portal
            </h2>
            <p className="mb-6 text-sm text-muted-foreground">
              End-user experience - the branded portal where investors browse
              bonds, manage portfolios, and track their investments.
            </p>
            <Button
              asChild
              className="w-full bg-emerald-600 text-white hover:bg-emerald-700"
            >
              <Link href="/portal">
                View Portal
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <p className="mt-12 text-center text-sm text-muted-foreground">
        The Investor Portal demonstrates what end-users see after a business
        integrates your platform.
      </p>
    </div>
  );
}
