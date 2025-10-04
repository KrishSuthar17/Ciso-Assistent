import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, FileText, Upload } from "lucide-react";
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

export default function Policies() {
  const mockPolicies = [
    {
      id: 1,
      name: "Information Security Policy",
      version: "2.1",
      status: "Active",
      owner: "CISO",
      controls: ["A.5.1", "AC-1"],
      lastReview: "2025-09-01",
    },
    {
      id: 2,
      name: "Access Control Policy",
      version: "1.5",
      status: "Active",
      owner: "IT Director",
      controls: ["IA-2", "AC-2"],
      lastReview: "2025-08-15",
    },
    {
      id: 3,
      name: "Data Protection Policy",
      version: "3.0",
      status: "Draft",
      owner: "DPO",
      controls: ["A.8.2"],
      lastReview: "2025-10-01",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "secondary";
      case "Draft":
        return "outline";
      case "Under Review":
        return "default";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Policies</h1>
          <p className="text-muted-foreground">
            Manage organizational policies and procedures
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Upload
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Policy
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Policy Management</CardTitle>
              <CardDescription>
                Track policies and map to controls
              </CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search policies..." className="pl-8 w-64" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Policy Name</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Mapped Controls</TableHead>
                <TableHead>Last Review</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPolicies.map((policy) => (
                <TableRow key={policy.id}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    {policy.name}
                  </TableCell>
                  <TableCell>v{policy.version}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(policy.status)}>
                      {policy.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{policy.owner}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {policy.controls.map((control, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {control}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{policy.lastReview}</TableCell>
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
