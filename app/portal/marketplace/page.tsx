"use client";

import React from "react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
import { Slider } from "@/components/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Search,
  Star,
  Building2,
  Leaf,
  Landmark,
  Factory,
} from "lucide-react";
import {
  partnerBranding,
  commissionSettings,
  getEnabledBonds,
  getTopPicks,
  type Bond,
} from "@/lib/portal-config";


// Get branding and bonds from shared config
const branding = partnerBranding;
const commission = commissionSettings;
const enabledBonds = getEnabledBonds();
const topPicks = getTopPicks();

// Map category to icon
const categoryIcons: Record<string, typeof Landmark> = {
  "govt-bonds": Landmark,
  "corp-bonds": Building2,
  "muni-bonds": Factory,
  "green-bonds": Leaf,
};

// Get unique categories from enabled bonds
const categories = ["All", ...Array.from(new Set(enabledBonds.map((b) => b.type)))];

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [yieldRange, setYieldRange] = useState([0, 10]);
  const [selectedBond, setSelectedBond] = useState<Bond | null>(null);
  const [investAmount, setInvestAmount] = useState("");

  const filteredBonds = enabledBonds.filter((bond) => {
    const matchesSearch =
      bond.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bond.issuer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || bond.type === selectedCategory;
    const matchesYield =
      bond.yield >= yieldRange[0] && bond.yield <= yieldRange[1];
    return matchesSearch && matchesCategory && matchesYield;
  });

  const featuredBonds = filteredBonds.filter((b) => b.isTopPick);
  const otherBonds = filteredBonds.filter((b) => !b.isTopPick);

  // Calculate effective yield after commission
  const getEffectiveYield = (bond: Bond) => {
    const categoryRate =
      commission.bondSpecificRates[bond.category] ?? commission.defaultRate;
    return bond.yield - categoryRate;
  };

  return (
    <div className="space-y-6">
      {/* Header - Uses branding */}
      <div>
        <h1
          className="text-2xl font-semibold"
          style={{ color: branding.colors.primaryDark }}
        >
          Bond Marketplace
        </h1>
        <p className="text-gray-500">
          Discover and invest in carefully curated bonds from {branding.companyName}
        </p>
      </div>

      {/* Filters */}
      <Card className="border-gray-200 bg-white">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
            {/* Search */}
            <div className="flex-1">
              <Label className="mb-1.5 text-sm text-gray-500">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search bonds..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-gray-200 pl-9"
                  style={
                    {
                      "--tw-ring-color": branding.colors.primary,
                    } as React.CSSProperties
                  }
                />
              </div>
            </div>

            {/* Category */}
            <div className="w-full lg:w-48">
              <Label className="mb-1.5 text-sm text-gray-500">Category</Label>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="border-gray-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Yield Range */}
            <div className="w-full lg:w-64">
              <Label className="mb-1.5 text-sm text-gray-500">
                Yield Range: {yieldRange[0]}% - {yieldRange[1]}%
              </Label>
              <Slider
                value={yieldRange}
                onValueChange={setYieldRange}
                min={0}
                max={10}
                step={0.5}
                className="py-2"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Featured Bonds (Top Picks from Dashboard) */}
      {featuredBonds.length > 0 && (
        <div>
          <div className="mb-4 flex items-center gap-2">
            <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
            <h2
              className="text-lg font-semibold"
              style={{ color: branding.colors.primaryDark }}
            >
              Top Picks
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featuredBonds.map((bond) => (
              <BondCard
                key={bond.id}
                bond={bond}
                branding={branding}
                effectiveYield={getEffectiveYield(bond)}
                onInvest={() => {
                  setSelectedBond(bond);
                  setInvestAmount(bond.minInvestment.toString());
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* All Bonds */}
      <div>
        <h2
          className="mb-4 text-lg font-semibold"
          style={{ color: branding.colors.primaryDark }}
        >
          All Bonds
        </h2>
        {otherBonds.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {otherBonds.map((bond) => (
              <BondCard
                key={bond.id}
                bond={bond}
                branding={branding}
                effectiveYield={getEffectiveYield(bond)}
                onInvest={() => {
                  setSelectedBond(bond);
                  setInvestAmount(bond.minInvestment.toString());
                }}
              />
            ))}
          </div>
        ) : filteredBonds.length === 0 ? (
          <Card className="border-gray-200 bg-white">
            <CardContent className="py-12 text-center">
              <p className="text-gray-500">
                No bonds match your current filters.
              </p>
            </CardContent>
          </Card>
        ) : null}
      </div>

      {/* Investment Dialog */}
      <Dialog open={!!selectedBond} onOpenChange={() => setSelectedBond(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle style={{ color: branding.colors.primaryDark }}>
              Invest in {selectedBond?.name}
            </DialogTitle>
            <DialogDescription>
              Review the details and enter your investment amount.
            </DialogDescription>
          </DialogHeader>
          {selectedBond && (
            <div className="space-y-4 py-4">
              <div
                className="grid grid-cols-2 gap-4 rounded-lg p-4"
                style={{ backgroundColor: branding.colors.background }}
              >
                <div>
                  <p className="text-sm text-gray-500">Annual Yield</p>
                  <p
                    className="text-lg font-bold"
                    style={{ color: branding.colors.primary }}
                  >
                    {selectedBond.yield}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Rating</p>
                  <p
                    className="text-lg font-semibold"
                    style={{ color: branding.colors.primaryDark }}
                  >
                    {selectedBond.rating}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Maturity</p>
                  <p
                    className="font-medium"
                    style={{ color: branding.colors.primaryDark }}
                  >
                    {new Date(selectedBond.maturityDate).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Min. Investment</p>
                  <p
                    className="font-medium"
                    style={{ color: branding.colors.primaryDark }}
                  >
                    ${selectedBond.minInvestment.toLocaleString()}
                  </p>
                </div>
              </div>

              <div>
                <Label
                  htmlFor="amount"
                  style={{ color: branding.colors.primaryDark }}
                >
                  Investment Amount
                </Label>
                <div className="relative mt-1.5">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <Input
                    id="amount"
                    type="number"
                    value={investAmount}
                    onChange={(e) => setInvestAmount(e.target.value)}
                    className="border-gray-200 pl-7"
                    min={selectedBond.minInvestment}
                  />
                </div>
                {Number(investAmount) >= selectedBond.minInvestment && (
                  <p className="mt-2 text-sm text-gray-500">
                    Estimated annual return:{" "}
                    <span
                      className="font-semibold"
                      style={{ color: branding.colors.primary }}
                    >
                      $
                      {(
                        (Number(investAmount) *
                          getEffectiveYield(selectedBond)) /
                        100
                      ).toFixed(2)}
                    </span>
                  </p>
                )}
              </div>
            </div>
          )}
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setSelectedBond(null)}
              className="border-gray-200 text-gray-500"
            >
              Cancel
            </Button>
            <Button
              className="text-white"
              style={{ backgroundColor: branding.colors.primary }}
              disabled={
                !investAmount ||
                Number(investAmount) < (selectedBond?.minInvestment || 0)
              }
            >
              Confirm Investment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function BondCard({
  bond,
  branding,
  effectiveYield,
  onInvest,
}: {
  bond: Bond;
  branding: typeof partnerBranding;
  effectiveYield: number;
  onInvest: () => void;
}) {
  const Icon = categoryIcons[bond.category] || Building2;

  // Calculate term in years
  const maturityDate = new Date(bond.maturityDate);
  const now = new Date();
  const yearsToMaturity = Math.ceil(
    (maturityDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24 * 365)
  );

  return (
    <Card className="border-gray-200 bg-white transition-all hover:shadow-md">
      <CardContent className="p-5">
        <div className="mb-3 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className="rounded-lg p-2"
              style={{ backgroundColor: `${branding.colors.primary}15` }}
            >
              <Icon
                className="h-5 w-5"
                style={{ color: branding.colors.primary }}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3
                  className="font-semibold"
                  style={{ color: branding.colors.primaryDark }}
                >
                  {bond.name}
                </h3>
                {bond.isTopPick && (
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                )}
              </div>
              <p className="text-sm text-gray-500">{bond.issuer}</p>
            </div>
          </div>
        </div>

        <p className="mb-4 line-clamp-2 text-sm text-gray-500">
          {bond.description}
        </p>

        <div className="mb-4 grid grid-cols-3 gap-2">
          <div
            className="rounded-lg p-2 text-center"
            style={{ backgroundColor: branding.colors.background }}
          >
            <p className="text-xs text-gray-500">Yield</p>
            <p
              className="font-bold"
              style={{ color: branding.colors.primary }}
            >
              {bond.yield}%
            </p>
          </div>
          <div
            className="rounded-lg p-2 text-center"
            style={{ backgroundColor: branding.colors.background }}
          >
            <p className="text-xs text-gray-500">Rating</p>
            <p
              className="font-semibold"
              style={{ color: branding.colors.primaryDark }}
            >
              {bond.rating}
            </p>
          </div>
          <div
            className="rounded-lg p-2 text-center"
            style={{ backgroundColor: branding.colors.background }}
          >
            <p className="text-xs text-gray-500">Term</p>
            <p
              className="font-semibold"
              style={{ color: branding.colors.primaryDark }}
            >
              {yearsToMaturity} {yearsToMaturity === 1 ? "year" : "years"}
            </p>
          </div>
        </div>

        <div className="mb-3 flex items-center justify-between text-xs">
          <Badge
            variant="secondary"
            style={{
              backgroundColor: `${branding.colors.primary}15`,
              color: branding.colors.primary,
            }}
          >
            {bond.type}
          </Badge>
          <span className="text-gray-400">
            Risk: <span className="font-medium">{bond.riskLevel}</span>
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500">Min. Investment</p>
            <p
              className="font-semibold"
              style={{ color: branding.colors.primaryDark }}
            >
              ${bond.minInvestment.toLocaleString()}
            </p>
          </div>
          <Button
            onClick={onInvest}
            className="text-white"
            style={{ backgroundColor: branding.colors.primary }}
          >
            Invest
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
