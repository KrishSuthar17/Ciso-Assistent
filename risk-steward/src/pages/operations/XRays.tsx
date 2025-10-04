import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Scan, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function XRays() {
  const mockXRays = [
    {
      id: 1,
      name: "Q4 2025 Compliance Snapshot",
      date: "2025-10-01",
      frameworks: ["ISO 27001", "NIST CSF"],
      completion: 87,
      findings: 12,
    },
    {
      id: 2,
      name: "Annual Security Posture",
      date: "2025-09-15",
      frameworks: ["SOC 2", "GDPR"],
      completion: 100,
      findings: 8,
    },
    {
      id: 3,
      name: "Mid-Year Assessment",
      date: "2025-06-30",
      frameworks: ["ISO 27001"],
      completion: 100,
      findings: 15,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">X-rays</h1>
          <p className="text-muted-foreground">
            Point-in-time compliance snapshots
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create X-ray
        </Button>
      </div>

      <div className="grid gap-4">
        {mockXRays.map((xray) => (
          <Card key={xray.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <Scan className="h-8 w-8 text-primary mt-1" />
                  <div>
                    <CardTitle>{xray.name}</CardTitle>
                    <CardDescription>Created on {xray.date}</CardDescription>
                    <div className="flex gap-2 mt-2">
                      {xray.frameworks.map((framework, idx) => (
                        <Badge key={idx} variant="outline">
                          {framework}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <Button variant="outline">View Report</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Completion</span>
                    <span className="font-medium">{xray.completion}%</span>
                  </div>
                  <Progress value={xray.completion} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Findings</span>
                    <Badge variant="secondary">{xray.findings} issues</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Identified gaps and recommendations
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
