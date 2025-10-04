import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, Shield } from "lucide-react";
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
import { Progress } from "@/components/ui/progress";

export default function AppliedControls() {
  const mockControls = [
    {
      id: 1,
      code: "AC-1",
      name: "Access Control Policy",
      framework: "NIST CSF",
      status: "Implemented",
      owner: "IT Security",
      progress: 100,
    },
    {
      id: 2,
      code: "IA-2",
      name: "Identification and Authentication",
      framework: "NIST CSF",
      status: "In Progress",
      owner: "IT Team",
      progress: 75,
    },
    {
      id: 3,
      code: "A.5.1",
      name: "Policies for Information Security",
      framework: "ISO 27001",
      status: "Implemented",
      owner: "CISO",
      progress: 100,
    },
    {
      id: 4,
      code: "A.8.2",
      name: "Information Classification",
      framework: "ISO 27001",
      status: "Not Started",
      owner: "Data Team",
      progress: 0,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Implemented":
        return "secondary";
      case "In Progress":
        return "default";
      case "Not Started":
        return "outline";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Applied Controls</h1>
          <p className="text-muted-foreground">
            Track implementation of security controls
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Apply Control
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Control Implementation</CardTitle>
              <CardDescription>
                Monitor control deployment and effectiveness
              </CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search controls..." className="pl-8 w-64" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Control</TableHead>
                <TableHead>Framework</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockControls.map((control) => (
                <TableRow key={control.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{control.code}</p>
                        <p className="text-sm text-muted-foreground">
                          {control.name}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{control.framework}</Badge>
                  </TableCell>
                  <TableCell>{control.owner}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(control.status)}>
                      {control.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={control.progress} className="w-20 h-2" />
                      <span className="text-sm">{control.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      Details
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
