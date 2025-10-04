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

export default function Incidents() {
  const mockIncidents = [
    {
      id: 1,
      title: "Unauthorized Access Attempt",
      severity: "High",
      status: "In Progress",
      date: "2025-10-10",
      assignee: "Security Team",
    },
    {
      id: 2,
      title: "Data Leak Detection",
      severity: "Critical",
      status: "Under Review",
      date: "2025-10-08",
      assignee: "CISO",
    },
    {
      id: 3,
      title: "Phishing Email Reported",
      severity: "Medium",
      status: "Resolved",
      date: "2025-10-05",
      assignee: "IT Support",
    },
    {
      id: 4,
      title: "System Outage",
      severity: "High",
      status: "Resolved",
      date: "2025-10-01",
      assignee: "Operations",
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "destructive";
      case "High":
        return "default";
      case "Medium":
        return "secondary";
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
      case "Under Review":
        return "outline";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Incidents</h1>
          <p className="text-muted-foreground">
            Track and manage security incidents
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Report Incident
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Incident Management</CardTitle>
              <CardDescription>
                Monitor and respond to security events
              </CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search incidents..." className="pl-8 w-64" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Incident</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockIncidents.map((incident) => (
                <TableRow key={incident.id}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-destructive" />
                    {incident.title}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getSeverityColor(incident.severity)}>
                      {incident.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(incident.status)}>
                      {incident.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{incident.date}</TableCell>
                  <TableCell>{incident.assignee}</TableCell>
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
