import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Privacy Overview</h1>
        <p className="text-muted-foreground">Data privacy management</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Privacy Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">GDPR and privacy compliance</p>
        </CardContent>
      </Card>
    </div>
  );
}
