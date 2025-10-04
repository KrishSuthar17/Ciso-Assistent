import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function Issues() {
  const mockIssues = [
    {
      id: 1,
      title: "Missing documentation for control A.5.1",
      severity: "Medium",
      status: "Open",
      assignee: "Documentation Team",
      dueDate: "2025-10-20",
    },
    {
      id: 2,
      title: "Incomplete risk assessment",
      severity: "High",
      status: "In Progress",
      assignee: "Risk Manager",
      dueDate: "2025-10-15",
    },
    {
      id: 3,
      title: "Policy review overdue",
      severity: "High",
      status: "Open",
      assignee: "Compliance Team",
      dueDate: "2025-10-12",
    },
    {
      id: 4,
      title: "Training completion rate low",
      severity: "Low",
      status: "Resolved",
      assignee: "HR",
      dueDate: "2025-10-10",
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "High":
        return "default";
      case "Medium":
        return "secondary";
      case "Low":
        return "outline";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Issues (ISO)</h1>
          <p className="text-muted-foreground">
            Track compliance issues and non-conformities
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Report Issue
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Issue Tracking</CardTitle>
              <CardDescription>
                Monitor and resolve compliance issues
              </CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search issues..." className="pl-8 w-64" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Issue</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockIssues.map((issue) => (
                <TableRow key={issue.id}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-warning" />
                    {issue.title}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getSeverityColor(issue.severity)}>
                      {issue.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{issue.status}</Badge>
                  </TableCell>
                  <TableCell>{issue.assignee}</TableCell>
                  <TableCell>{issue.dueDate}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
