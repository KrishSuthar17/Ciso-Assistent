import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, AlertTriangle } from "lucide-react";
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

export default function Exceptions() {
  const mockExceptions = [
    {
      id: 1,
      control: "MFA Requirement",
      reason: "Legacy system compatibility",
      requestedBy: "Operations",
      approvedBy: "CISO",
      expiryDate: "2025-12-31",
      status: "Active",
    },
    {
      id: 2,
      control: "Encryption Policy",
      reason: "Performance impact",
      requestedBy: "Dev Team",
      approvedBy: "IT Director",
      expiryDate: "2025-11-15",
      status: "Pending Review",
    },
    {
      id: 3,
      control: "Password Complexity",
      reason: "User accessibility",
      requestedBy: "HR",
      approvedBy: "Security Manager",
      expiryDate: "2025-10-31",
      status: "Expired",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "secondary";
      case "Pending Review":
        return "default";
      case "Expired":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Exceptions</h1>
          <p className="text-muted-foreground">
            Control implementation exceptions
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Request Exception
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Exception Management</CardTitle>
              <CardDescription>
                Track and approve control exceptions
              </CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search exceptions..." className="pl-8 w-64" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Control</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Requested By</TableHead>
                <TableHead>Approved By</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockExceptions.map((exception) => (
                <TableRow key={exception.id}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-warning" />
                    {exception.control}
                  </TableCell>
                  <TableCell>{exception.reason}</TableCell>
                  <TableCell>{exception.requestedBy}</TableCell>
                  <TableCell>{exception.approvedBy}</TableCell>
                  <TableCell>{exception.expiryDate}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(exception.status)}>
                      {exception.status}
                    </Badge>
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
