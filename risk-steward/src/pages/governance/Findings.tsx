import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, FileSearch } from "lucide-react";
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

export default function Findings() {
  const mockFindings = [
    {
      id: 1,
      title: "Insufficient Access Logging",
      source: "Internal Audit",
      severity: "High",
      status: "Open",
      assignee: "IT Security",
      dueDate: "2025-10-25",
    },
    {
      id: 2,
      title: "Missing Backup Verification",
      source: "Risk Assessment",
      severity: "Medium",
      status: "In Progress",
      assignee: "Operations",
      dueDate: "2025-10-30",
    },
    {
      id: 3,
      title: "Outdated Security Training",
      source: "Compliance Review",
      severity: "Medium",
      status: "Resolved",
      assignee: "HR",
      dueDate: "2025-10-15",
    },
    {
      id: 4,
      title: "Weak Password Policy",
      source: "External Audit",
      severity: "High",
      status: "Open",
      assignee: "Security Team",
      dueDate: "2025-10-20",
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Resolved":
        return "secondary";
      case "In Progress":
        return "default";
      case "Open":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Findings</h1>
          <p className="text-muted-foreground">
            Track audit findings and recommendations
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Finding
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Findings Tracker</CardTitle>
              <CardDescription>
                Monitor and remediate identified issues
              </CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search findings..." className="pl-8 w-64" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Finding</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockFindings.map((finding) => (
                <TableRow key={finding.id}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <FileSearch className="h-4 w-4 text-muted-foreground" />
                    {finding.title}
                  </TableCell>
                  <TableCell>{finding.source}</TableCell>
                  <TableCell>
                    <Badge variant={getSeverityColor(finding.severity)}>
                      {finding.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(finding.status)}>
                      {finding.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{finding.assignee}</TableCell>
                  <TableCell>{finding.dueDate}</TableCell>
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
