"use client";

import React from "react"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  Shield,
  Bell,
  CreditCard,
  Key,
  CheckCircle2,
  AlertCircle,
  Upload,
  Building2,
  FileText,
} from "lucide-react";
import { partnerBranding, sampleInvestorProfile, partnerFeatures } from "@/lib/portal-config";

// Get data from shared config
const branding = partnerBranding;
const sampleInvestor = sampleInvestorProfile;
const features = partnerFeatures;

// Get investor initials
const investorInitials = sampleInvestor.name
  .split(" ")
  .map((n) => n[0])
  .join("");

export default function AccountPage() {
  const [notifications, setNotifications] = useState({
    payments: true,
    newBonds: true,
    marketUpdates: features.priceAlerts,
    newsletters: true,
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1
          className="text-2xl font-semibold"
          style={{ color: branding.colors.primaryDark }}
        >
          My Account
        </h1>
        <p className="text-gray-500">
          Manage your profile, security, and preferences
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList style={{ backgroundColor: branding.colors.background }}>
          <TabsTrigger
            value="profile"
            className="data-[state=active]:text-white"
            style={
              {
                "--tw-bg-active": branding.colors.primary,
              } as React.CSSProperties
            }
          >
            Profile
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="data-[state=active]:text-white"
          >
            Security
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="data-[state=active]:text-white"
          >
            Notifications
          </TabsTrigger>
          <TabsTrigger
            value="documents"
            className="data-[state=active]:text-white"
          >
            Documents
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          {/* Profile Header */}
          <Card className="border-gray-200 bg-white">
            <CardContent className="p-6">
              <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback
                      className="text-2xl text-white"
                      style={{ backgroundColor: branding.colors.primary }}
                    >
                      {investorInitials}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute bottom-0 right-0 h-8 w-8 rounded-full border-2 border-white"
                    style={{ backgroundColor: branding.colors.background }}
                  >
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex-1">
                  <h2
                    className="text-xl font-semibold"
                    style={{ color: branding.colors.primaryDark }}
                  >
                    {sampleInvestor.name}
                  </h2>
                  <p className="text-gray-500">{sampleInvestor.email}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Badge className="bg-emerald-100 text-emerald-700">
                      <CheckCircle2 className="mr-1 h-3 w-3" />
                      {sampleInvestor.kycStatus === "verified"
                        ? "Verified Investor"
                        : "Pending Verification"}
                    </Badge>
                    <Badge
                      variant="secondary"
                      style={{
                        backgroundColor: `${branding.colors.primary}15`,
                        color: branding.colors.primary,
                      }}
                    >
                      {branding.companyName} Member
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card className="border-gray-200 bg-white">
            <CardHeader>
              <CardTitle
                className="flex items-center gap-2 text-lg"
                style={{ color: branding.colors.primaryDark }}
              >
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label className="text-gray-500">First Name</Label>
                  <Input
                    defaultValue={sampleInvestor.name.split(" ")[0]}
                    className="mt-1.5 border-gray-200"
                  />
                </div>
                <div>
                  <Label className="text-gray-500">Last Name</Label>
                  <Input
                    defaultValue={sampleInvestor.name.split(" ")[1] || ""}
                    className="mt-1.5 border-gray-200"
                  />
                </div>
              </div>
              <div>
                <Label className="text-gray-500">Email Address</Label>
                <Input
                  type="email"
                  defaultValue={sampleInvestor.email}
                  className="mt-1.5 border-gray-200"
                />
              </div>
              <div>
                <Label className="text-gray-500">Phone Number</Label>
                <Input
                  type="tel"
                  defaultValue={sampleInvestor.phone}
                  className="mt-1.5 border-gray-200"
                />
              </div>
              <div>
                <Label className="text-gray-500">Member Since</Label>
                <Input
                  defaultValue={new Date(sampleInvestor.joinDate).toLocaleDateString(
                    "en-US",
                    { month: "long", day: "numeric", year: "numeric" }
                  )}
                  className="mt-1.5 border-gray-200"
                  disabled
                />
              </div>
              <div className="pt-2">
                <Button
                  className="text-white"
                  style={{ backgroundColor: branding.colors.primary }}
                >
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Bank Account */}
          <Card className="border-gray-200 bg-white">
            <CardHeader>
              <CardTitle
                className="flex items-center gap-2 text-lg"
                style={{ color: branding.colors.primaryDark }}
              >
                <Building2 className="h-5 w-5" />
                Linked Bank Account
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="flex items-center justify-between rounded-lg p-4"
                style={{ backgroundColor: branding.colors.background }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="rounded-lg p-3"
                    style={{ backgroundColor: `${branding.colors.primary}15` }}
                  >
                    <CreditCard
                      className="h-6 w-6"
                      style={{ color: branding.colors.primary }}
                    />
                  </div>
                  <div>
                    <p
                      className="font-medium"
                      style={{ color: branding.colors.primaryDark }}
                    >
                      Chase Bank ****4567
                    </p>
                    <p className="text-sm text-gray-500">Checking Account</p>
                  </div>
                </div>
                <Badge className="bg-emerald-100 text-emerald-700">
                  <CheckCircle2 className="mr-1 h-3 w-3" />
                  Verified
                </Badge>
              </div>
              <Button
                variant="outline"
                className="mt-4 border-gray-200 bg-transparent text-gray-500"
              >
                Change Bank Account
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card className="border-gray-200 bg-white">
            <CardHeader>
              <CardTitle
                className="flex items-center gap-2 text-lg"
                style={{ color: branding.colors.primaryDark }}
              >
                <Key className="h-5 w-5" />
                Password
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-gray-500">Current Password</Label>
                <Input type="password" className="mt-1.5 border-gray-200" />
              </div>
              <div>
                <Label className="text-gray-500">New Password</Label>
                <Input type="password" className="mt-1.5 border-gray-200" />
              </div>
              <div>
                <Label className="text-gray-500">Confirm New Password</Label>
                <Input type="password" className="mt-1.5 border-gray-200" />
              </div>
              <Button
                className="text-white"
                style={{ backgroundColor: branding.colors.primary }}
              >
                Update Password
              </Button>
            </CardContent>
          </Card>

          <Card className="border-gray-200 bg-white">
            <CardHeader>
              <CardTitle
                className="flex items-center gap-2 text-lg"
                style={{ color: branding.colors.primaryDark }}
              >
                <Shield className="h-5 w-5" />
                Two-Factor Authentication
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className="font-medium"
                    style={{ color: branding.colors.primaryDark }}
                  >
                    Authenticator App
                  </p>
                  <p className="text-sm text-gray-500">
                    Use an authenticator app for additional security
                  </p>
                </div>
                <Badge className="bg-emerald-100 text-emerald-700">
                  <CheckCircle2 className="mr-1 h-3 w-3" />
                  Enabled
                </Badge>
              </div>
              <Separator className="my-4" />
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className="font-medium"
                    style={{ color: branding.colors.primaryDark }}
                  >
                    SMS Verification
                  </p>
                  <p className="text-sm text-gray-500">
                    Receive codes via text message
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 bg-white">
            <CardHeader>
              <CardTitle
                className="flex items-center gap-2 text-lg"
                style={{ color: branding.colors.primaryDark }}
              >
                <AlertCircle className="h-5 w-5" />
                Active Sessions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  device: "MacBook Pro",
                  location: "New York, US",
                  current: true,
                },
                { device: "iPhone 15", location: "New York, US", current: false },
              ].map((session, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg p-4"
                  style={{ backgroundColor: branding.colors.background }}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <p
                        className="font-medium"
                        style={{ color: branding.colors.primaryDark }}
                      >
                        {session.device}
                      </p>
                      {session.current && (
                        <Badge
                          variant="secondary"
                          style={{
                            backgroundColor: `${branding.colors.primary}15`,
                            color: branding.colors.primary,
                          }}
                          className="text-xs"
                        >
                          Current
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{session.location}</p>
                  </div>
                  {!session.current && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:bg-red-50 hover:text-red-700"
                    >
                      Revoke
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="border-gray-200 bg-white">
            <CardHeader>
              <CardTitle
                className="flex items-center gap-2 text-lg"
                style={{ color: branding.colors.primaryDark }}
              >
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className="font-medium"
                    style={{ color: branding.colors.primaryDark }}
                  >
                    Payment Alerts
                  </p>
                  <p className="text-sm text-gray-500">
                    Get notified when you receive interest payments
                  </p>
                </div>
                <Switch
                  checked={notifications.payments}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, payments: checked })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className="font-medium"
                    style={{ color: branding.colors.primaryDark }}
                  >
                    New Bond Alerts
                  </p>
                  <p className="text-sm text-gray-500">
                    Be notified when new bonds become available
                  </p>
                </div>
                <Switch
                  checked={notifications.newBonds}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, newBonds: checked })
                  }
                />
              </div>
              {features.priceAlerts && (
                <>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p
                        className="font-medium"
                        style={{ color: branding.colors.primaryDark }}
                      >
                        Price Alerts
                      </p>
                      <p className="text-sm text-gray-500">
                        Get notified about significant price changes
                      </p>
                    </div>
                    <Switch
                      checked={notifications.marketUpdates}
                      onCheckedChange={(checked) =>
                        setNotifications({
                          ...notifications,
                          marketUpdates: checked,
                        })
                      }
                    />
                  </div>
                </>
              )}
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className="font-medium"
                    style={{ color: branding.colors.primaryDark }}
                  >
                    Newsletter
                  </p>
                  <p className="text-sm text-gray-500">
                    Monthly newsletter with investment tips from{" "}
                    {branding.companyName}
                  </p>
                </div>
                <Switch
                  checked={notifications.newsletters}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, newsletters: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-6">
          <Card className="border-gray-200 bg-white">
            <CardHeader>
              <CardTitle
                className="flex items-center gap-2 text-lg"
                style={{ color: branding.colors.primaryDark }}
              >
                <FileText className="h-5 w-5" />
                KYC Documents
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  name: "Government ID",
                  status: "verified",
                  date: "Jun 15, 2023",
                },
                {
                  name: "Proof of Address",
                  status: "verified",
                  date: "Jun 15, 2023",
                },
                {
                  name: "Tax Information (W-9)",
                  status: "verified",
                  date: "Jun 17, 2023",
                },
              ].map((doc, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg p-4"
                  style={{ backgroundColor: branding.colors.background }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="rounded-lg p-2"
                      style={{ backgroundColor: `${branding.colors.primary}15` }}
                    >
                      <FileText
                        className="h-5 w-5"
                        style={{ color: branding.colors.primary }}
                      />
                    </div>
                    <div>
                      <p
                        className="font-medium"
                        style={{ color: branding.colors.primaryDark }}
                      >
                        {doc.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Submitted {doc.date}
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-700">
                    <CheckCircle2 className="mr-1 h-3 w-3" />
                    Verified
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {features.taxReports && (
            <Card className="border-gray-200 bg-white">
              <CardHeader>
                <CardTitle
                  className="flex items-center gap-2 text-lg"
                  style={{ color: branding.colors.primaryDark }}
                >
                  <FileText className="h-5 w-5" />
                  Tax Documents
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "1099-INT 2025", year: "2025", available: true },
                  { name: "1099-INT 2024", year: "2024", available: false },
                ].map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg p-4"
                    style={{ backgroundColor: branding.colors.background }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="rounded-lg p-2"
                        style={{
                          backgroundColor: `${branding.colors.primary}15`,
                        }}
                      >
                        <FileText
                          className="h-5 w-5"
                          style={{ color: branding.colors.primary }}
                        />
                      </div>
                      <div>
                        <p
                          className="font-medium"
                          style={{ color: branding.colors.primaryDark }}
                        >
                          {doc.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          Tax Year {doc.year}
                        </p>
                      </div>
                    </div>
                    {doc.available ? (
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-transparent"
                        style={{
                          borderColor: branding.colors.primary,
                          color: branding.colors.primary,
                        }}
                      >
                        Download
                      </Button>
                    ) : (
                      <Badge
                        variant="secondary"
                        style={{ backgroundColor: branding.colors.background }}
                      >
                        Coming Soon
                      </Badge>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
