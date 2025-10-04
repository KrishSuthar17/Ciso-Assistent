import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Representatives() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Representatives</h1>
        <p className="text-muted-foreground">Third-party contacts</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Contact Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Vendor representative directory
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
