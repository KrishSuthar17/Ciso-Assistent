import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Solutions() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Solutions</h1>
        <p className="text-muted-foreground">
          Third-party products and services
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Solution Catalog</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Vendor solutions inventory</p>
        </CardContent>
      </Card>
    </div>
  );
}
