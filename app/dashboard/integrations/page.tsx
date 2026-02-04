"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/header";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { integrationSettings, partnerBranding } from "@/lib/portal-config";
import {
  Link as LinkIcon,
  Code,
  Key,
  Book,
  Copy,
  Check,
  RefreshCw,
  ExternalLink,
  Webhook,
} from "lucide-react";

export default function IntegrationsPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="flex flex-col">
      <DashboardHeader
        title="Integrations"
        description="Connect the investor portal to your applications"
      />
      <main className="flex-1 p-6">
        <Tabs defaultValue="webview" className="space-y-6">
          <TabsList className="grid w-full max-w-lg grid-cols-5">
            <TabsTrigger value="webview">Webview</TabsTrigger>
            <TabsTrigger value="embed">Embed</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
            <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
            <TabsTrigger value="docs">Docs</TabsTrigger>
          </TabsList>

          {/* Webview Tab */}
          <TabsContent value="webview" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <LinkIcon className="h-5 w-5 text-primary" />
                  <CardTitle className="text-base">Webview Link</CardTitle>
                </div>
                <CardDescription>
                  Direct link to your branded investor portal at{" "}
                  <span className="font-medium">{partnerBranding.customDomain}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={integrationSettings.webviewUrl}
                    readOnly
                    className="font-mono text-sm"
                  />
                  <Button
                    variant="outline"
                    onClick={() =>
                      copyToClipboard(integrationSettings.webviewUrl, "webview")
                    }
                  >
                    {copied === "webview" ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="/portal" target="_blank">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
                <div className="rounded-lg bg-muted p-4">
                  <h4 className="font-medium text-foreground">Usage</h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Share this link directly with your customers or use it in your
                    mobile app as a webview. The portal will display your branding
                    and configured features.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Mobile App Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border border-border p-4">
                    <h4 className="font-medium text-foreground">iOS (Swift)</h4>
                    <pre className="mt-2 overflow-x-auto rounded bg-muted p-3 text-xs">
                      {`let webView = WKWebView()
webView.load(URLRequest(
  url: URL(string: 
    "${integrationSettings.webviewUrl}")!
))`}
                    </pre>
                  </div>
                  <div className="rounded-lg border border-border p-4">
                    <h4 className="font-medium text-foreground">Android (Kotlin)</h4>
                    <pre className="mt-2 overflow-x-auto rounded bg-muted p-3 text-xs">
                      {`webView.loadUrl(
  "${integrationSettings.webviewUrl}"
)`}
                    </pre>
                  </div>
                  <div className="rounded-lg border border-border p-4">
                    <h4 className="font-medium text-foreground">React Native</h4>
                    <pre className="mt-2 overflow-x-auto rounded bg-muted p-3 text-xs">
                      {`<WebView
  source={{ 
    uri: "${integrationSettings.webviewUrl}" 
  }}
/>`}
                    </pre>
                  </div>
                  <div className="rounded-lg border border-border p-4">
                    <h4 className="font-medium text-foreground">Flutter</h4>
                    <pre className="mt-2 overflow-x-auto rounded bg-muted p-3 text-xs">
                      {`WebView(
  initialUrl: 
    "${integrationSettings.webviewUrl}",
)`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Embed Tab */}
          <TabsContent value="embed" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-primary" />
                  <CardTitle className="text-base">Embed Code</CardTitle>
                </div>
                <CardDescription>
                  Add the investor portal to your website
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <pre className="overflow-x-auto rounded-lg bg-muted p-4 font-mono text-sm">
                    {integrationSettings.embedCode}
                  </pre>
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute right-2 top-2 bg-transparent"
                    onClick={() =>
                      copyToClipboard(integrationSettings.embedCode, "embed")
                    }
                  >
                    {copied === "embed" ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <div className="rounded-lg bg-primary/5 p-4">
                  <h4 className="font-medium text-foreground">Preview</h4>
                  <div className="mt-3 h-64 rounded-lg border border-border bg-background">
                    <div className="flex h-full items-center justify-center">
                      <p className="text-sm text-muted-foreground">
                        Embedded portal preview
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* API Tab */}
          <TabsContent value="api" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Key className="h-5 w-5 text-primary" />
                  <CardTitle className="text-base">API Keys</CardTitle>
                </div>
                <CardDescription>
                  Manage your API credentials for server-side integrations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>API Key (Publishable)</Label>
                  <div className="flex gap-2">
                    <Input
                      value={integrationSettings.apiKey}
                      readOnly
                      className="font-mono text-sm"
                    />
                    <Button
                      variant="outline"
                      onClick={() =>
                        copyToClipboard(integrationSettings.apiKey, "api")
                      }
                    >
                      {copied === "api" ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Safe to use in client-side code
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Secret Key</Label>
                  <div className="flex gap-2">
                    <Input
                      type="password"
                      value={integrationSettings.apiSecret}
                      readOnly
                      className="font-mono text-sm"
                    />
                    <Button
                      variant="outline"
                      onClick={() =>
                        copyToClipboard(integrationSettings.apiSecret, "secret")
                      }
                    >
                      {copied === "secret" ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Keep this secure. Never expose in client-side code.
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Rotate Keys
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">API Endpoints</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-lg border border-border p-3">
                    <div>
                      <Badge
                        variant="secondary"
                        className="mr-2 bg-success/10 text-success"
                      >
                        GET
                      </Badge>
                      <code className="text-sm">/api/v1/investors</code>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      List your investors
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-border p-3">
                    <div>
                      <Badge
                        variant="secondary"
                        className="mr-2 bg-success/10 text-success"
                      >
                        GET
                      </Badge>
                      <code className="text-sm">/api/v1/bonds</code>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      List enabled bonds
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-border p-3">
                    <div>
                      <Badge
                        variant="secondary"
                        className="mr-2 bg-success/10 text-success"
                      >
                        GET
                      </Badge>
                      <code className="text-sm">/api/v1/investments</code>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      List investments
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-border p-3">
                    <div>
                      <Badge
                        variant="secondary"
                        className="mr-2 bg-success/10 text-success"
                      >
                        GET
                      </Badge>
                      <code className="text-sm">/api/v1/earnings</code>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Get commission earnings
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Webhooks Tab */}
          <TabsContent value="webhooks" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Webhook className="h-5 w-5 text-primary" />
                  <CardTitle className="text-base">Webhook Configuration</CardTitle>
                </div>
                <CardDescription>
                  Receive real-time notifications for events
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Webhook URL</Label>
                  <div className="flex gap-2">
                    <Input
                      value={integrationSettings.webhookUrl}
                      readOnly
                      className="font-mono text-sm"
                    />
                    <Button
                      variant="outline"
                      onClick={() =>
                        copyToClipboard(integrationSettings.webhookUrl, "webhook")
                      }
                    >
                      {copied === "webhook" ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Webhook Secret</Label>
                  <div className="flex gap-2">
                    <Input
                      type="password"
                      value={integrationSettings.webhookSecret}
                      readOnly
                      className="font-mono text-sm"
                    />
                    <Button variant="outline">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Use this to verify webhook signatures
                  </p>
                </div>

                <div className="space-y-3">
                  <Label>Available Events</Label>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {[
                      "investor.created",
                      "investor.kyc_verified",
                      "investment.created",
                      "investment.matured",
                      "interest.paid",
                      "withdrawal.requested",
                    ].map((event) => (
                      <div
                        key={event}
                        className="flex items-center gap-2 rounded-lg border border-border p-3"
                      >
                        <div className="h-2 w-2 rounded-full bg-success" />
                        <code className="text-sm">{event}</code>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Docs Tab */}
          <TabsContent value="docs" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Book className="h-5 w-5 text-primary" />
                  <CardTitle className="text-base">Documentation</CardTitle>
                </div>
                <CardDescription>
                  Resources to help you integrate the platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  <a
                    href="#"
                    className="flex items-center gap-4 rounded-lg border border-border p-4 transition-colors hover:bg-muted"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Book className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">API Reference</h4>
                      <p className="text-sm text-muted-foreground">
                        Complete API documentation
                      </p>
                    </div>
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-4 rounded-lg border border-border p-4 transition-colors hover:bg-muted"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                      <Code className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">
                        SDK Documentation
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        JavaScript & React SDK guides
                      </p>
                    </div>
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-4 rounded-lg border border-border p-4 transition-colors hover:bg-muted"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success/10">
                      <Webhook className="h-6 w-6 text-success" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">Webhooks Guide</h4>
                      <p className="text-sm text-muted-foreground">
                        Real-time event notifications
                      </p>
                    </div>
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-4 rounded-lg border border-border p-4 transition-colors hover:bg-muted"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-warning/10">
                      <Key className="h-6 w-6 text-warning-foreground" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">Authentication</h4>
                      <p className="text-sm text-muted-foreground">
                        Security best practices
                      </p>
                    </div>
                  </a>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
