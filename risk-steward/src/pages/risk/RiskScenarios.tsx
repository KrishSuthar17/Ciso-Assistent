import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function RiskScenarios() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Risk Scenarios</h1>
          <p className="text-muted-foreground">
            Define potential risk scenarios
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Scenario
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Scenario Modeling</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Risk scenario management</p>
        </CardContent>
      </Card>
    </div>
  );
}
