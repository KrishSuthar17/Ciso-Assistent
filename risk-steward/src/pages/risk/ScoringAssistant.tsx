import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

export default function ScoringAssistant() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Scoring Assistant</h1>
          <p className="text-muted-foreground">Automated risk scoring</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Scenario
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Risk Scoring Tool</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">AI-powered risk assessment</p>
        </CardContent>
      </Card>
    </div>
  );
}
