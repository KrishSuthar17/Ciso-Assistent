import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, CheckCircle2 } from "lucide-react";
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

export default function RiskAcceptances() {
  const mockAcceptances = [
    {
      id: 1,
      risk: "Legacy System Vulnerabilities",
      level: "Medium",
      acceptedBy: "CTO",
      date: "2025-09-15",
      expiryDate: "2026-03-15",
      status: "Active",
    },
    {
      id: 2,
      risk: "Third-Party API Risk",
      level: "Low",
      acceptedBy: "IT Director",
      date: "2025-08-20",
      expiryDate: "2026-02-20",
      status: "Active",
    },
    {
      id: 3,
      risk: "Remote Work Security Gaps",
      level: "Medium",
      acceptedBy: "CISO",
      date: "2025-07-10",
      expiryDate: "2026-01-10",
      status: "Under Review",
    },
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
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
          <h1 className="text-3xl font-bold">Risk Acceptances</h1>
          <p className="text-muted-foreground">
            Manage accepted risks and waivers
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Acceptance
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Risk Acceptance Register</CardTitle>
              <CardDescription>Track formally accepted risks</CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search acceptances..."
                className="pl-8 w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Risk</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Accepted By</TableHead>
                <TableHead>Date Accepted</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAcceptances.map((acceptance) => (
                <TableRow key={acceptance.id}>
                  <TableCell className="font-medium">
                    {acceptance.risk}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getLevelColor(acceptance.level)}>
                      {acceptance.level}
                    </Badge>
                  </TableCell>
                  <TableCell>{acceptance.acceptedBy}</TableCell>
                  <TableCell>{acceptance.date}</TableCell>
                  <TableCell>{acceptance.expiryDate}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{acceptance.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      Review
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
