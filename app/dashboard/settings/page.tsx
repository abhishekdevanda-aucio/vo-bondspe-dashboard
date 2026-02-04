"use client"

import { DashboardHeader } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Building2, Mail, Phone, MapPin, Globe, Shield, Users } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="flex flex-col">
      <DashboardHeader
        title="Settings"
        description="Manage your account and platform settings"
      />
      <main className="flex-1 p-6">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            {/* Company Information */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  <CardTitle className="text-base">Company Information</CardTitle>
                </div>
                <CardDescription>Update your business details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input id="companyName" defaultValue="Acme Corp Pvt Ltd" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="regNumber">Registration Number</Label>
                    <Input id="regNumber" defaultValue="U74999MH2020PTC123456" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Business Address</Label>
                  <div className="flex gap-2">
                    <MapPin className="mt-3 h-4 w-4 text-muted-foreground" />
                    <Input id="address" defaultValue="123 Financial District, Mumbai, MH 400001" className="flex-1" />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">Business Email</Label>
                    <div className="flex gap-2">
                      <Mail className="mt-3 h-4 w-4 text-muted-foreground" />
                      <Input id="email" type="email" defaultValue="contact@acme.com" className="flex-1" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="flex gap-2">
                      <Phone className="mt-3 h-4 w-4 text-muted-foreground" />
                      <Input id="phone" defaultValue="+91 22 1234 5678" className="flex-1" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <div className="flex gap-2">
                    <Globe className="mt-3 h-4 w-4 text-muted-foreground" />
                    <Input id="website" defaultValue="https://www.acme.com" className="flex-1" />
                  </div>
                </div>
                <Button>Save Changes</Button>
              </CardContent>
            </Card>

            {/* Team Members */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    <CardTitle className="text-base">Team Members</CardTitle>
                  </div>
                  <Button variant="outline" size="sm">Invite Member</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg border border-border p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                        RK
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Rajesh Kumar</p>
                        <p className="text-sm text-muted-foreground">rajesh@acme.com</p>
                      </div>
                    </div>
                    <Badge>Owner</Badge>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-border p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-sm font-medium text-accent">
                        AS
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Anita Singh</p>
                        <p className="text-sm text-muted-foreground">anita@acme.com</p>
                      </div>
                    </div>
                    <Badge variant="secondary">Admin</Badge>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-border p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/10 text-sm font-medium text-success">
                        VP
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Vikram Patel</p>
                        <p className="text-sm text-muted-foreground">vikram@acme.com</p>
                      </div>
                    </div>
                    <Badge variant="secondary">Member</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Plan Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Current Plan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg bg-primary/5 p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-primary">Business Pro</span>
                    <Badge className="bg-primary text-primary-foreground">Active</Badge>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">$299/month</p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Investors Limit</span>
                    <span className="font-medium text-foreground">Unlimited</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Custom Domain</span>
                    <span className="font-medium text-success">Included</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">API Access</span>
                    <span className="font-medium text-success">Included</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">White-label</span>
                    <span className="font-medium text-success">Included</span>
                  </div>
                </div>
                <Separator />
                <Button variant="outline" className="w-full bg-transparent">Manage Subscription</Button>
              </CardContent>
            </Card>

            {/* Security */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <CardTitle className="text-base">Security</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Two-Factor Auth</p>
                    <p className="text-xs text-muted-foreground">Enhanced security</p>
                  </div>
                  <Badge className="bg-success/10 text-success">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Password</p>
                    <p className="text-xs text-muted-foreground">Last changed 30 days ago</p>
                  </div>
                  <Button variant="ghost" size="sm">Change</Button>
                </div>
                <Separator />
                <Button variant="outline" className="w-full text-destructive hover:text-destructive bg-transparent">
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
