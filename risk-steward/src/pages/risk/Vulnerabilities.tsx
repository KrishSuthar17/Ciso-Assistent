import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Vulnerabilities() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Vulnerabilities</h1>
          <p className="text-muted-foreground">
            Track security vulnerabilities
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Vulnerability
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Vulnerability Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Vulnerability tracking and remediation
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
