import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Purposes() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Processing Purposes</h1>
        <p className="text-muted-foreground">Data usage purposes</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Purpose Registry</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Define data processing purposes
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
