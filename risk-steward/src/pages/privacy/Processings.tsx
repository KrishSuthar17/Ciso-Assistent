import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Processings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Data Processings</h1>
        <p className="text-muted-foreground">Data processing activities</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Processing Register</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Track data processing operations
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
