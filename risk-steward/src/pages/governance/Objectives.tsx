import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function Objectives() {
  const mockObjectives = [
    {
      id: 1,
      title: "Achieve ISO 27001 Certification",
      category: "Compliance",
      progress: 85,
      dueDate: "2025-12-31",
      owner: "CISO",
      status: "On Track",
    },
    {
      id: 2,
      title: "Reduce Security Incidents by 30%",
      category: "Security",
      progress: 60,
      dueDate: "2025-11-30",
      owner: "Security Team",
      status: "On Track",
    },
    {
      id: 3,
      title: "Complete SOC 2 Type II Audit",
      category: "Compliance",
      progress: 95,
      dueDate: "2025-10-31",
      owner: "Compliance Manager",
      status: "On Track",
    },
    {
      id: 4,
      title: "Implement Zero Trust Architecture",
      category: "Security",
      progress: 40,
      dueDate: "2026-03-31",
      owner: "IT Director",
      status: "At Risk",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "On Track":
        return "secondary";
      case "At Risk":
        return "default";
      case "Behind":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Objectives (ISO)</h1>
          <p className="text-muted-foreground">Strategic goals and targets</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Objective
        </Button>
      </div>

      <div className="grid gap-4">
        {mockObjectives.map((objective) => (
          <Card key={objective.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <Target className="h-6 w-6 text-primary mt-1" />
                  <div className="flex-1">
                    <CardTitle>{objective.title}</CardTitle>
                    <CardDescription className="mt-1">
                      <div className="flex gap-2 flex-wrap">
                        <Badge variant="outline">{objective.category}</Badge>
                        <Badge variant={getStatusColor(objective.status)}>
                          {objective.status}
                        </Badge>
                      </div>
                    </CardDescription>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Owner</p>
                    <p className="font-medium">{objective.owner}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Target Date</p>
                    <p className="font-medium">{objective.dueDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Progress</p>
                    <p className="font-medium">{objective.progress}%</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Progress value={objective.progress} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    Progress toward target completion
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
