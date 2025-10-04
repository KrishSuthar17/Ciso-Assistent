import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function RiskAssessments() {
  const mockAssessments = [
    {
      id: 1,
      name: "Q4 2025 Risk Assessment",
      status: "In Progress",
      risks: 24,
      critical: 3,
      high: 8,
      date: "2025-10-01",
    },
    {
      id: 2,
      name: "Annual IT Security Review",
      status: "Complete",
      risks: 32,
      critical: 1,
      high: 12,
      date: "2025-09-15",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Risk Assessments</h1>
          <p className="text-muted-foreground">Comprehensive risk evaluation</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Assessment
        </Button>
      </div>

      <div className="grid gap-4">
        {mockAssessments.map((assessment) => (
          <Card key={assessment.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <CardTitle>{assessment.name}</CardTitle>
                    <CardDescription>{assessment.date}</CardDescription>
                    <Badge variant="secondary" className="mt-2">
                      {assessment.status}
                    </Badge>
                  </div>
                </div>
                <Button variant="outline">View Details</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Risks</p>
                  <p className="text-2xl font-bold">{assessment.risks}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Critical</p>
                  <p className="text-2xl font-bold text-destructive">
                    {assessment.critical}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">High</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {assessment.high}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
