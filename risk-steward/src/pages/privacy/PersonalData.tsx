import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PersonalData() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Personal Data</h1>
        <p className="text-muted-foreground">Personal data inventory</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Data Catalog</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Classify personal data types</p>
        </CardContent>
      </Card>
    </div>
  );
}
