import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ThirdPartiesOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Third Parties Overview</h1>
        <p className="text-muted-foreground">Vendor and partner management</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Third Party Risk Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Monitor third-party relationships
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
