import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays, Clock, FileText, AlertCircle, CheckCircle2 } from "lucide-react";

const assignments = [
  {
    id: 1,
    title: "Review ISO 27001 Risk Assessment",
    type: "Review",
    framework: "ISO 27001",
    priority: "High",
    dueDate: "2024-01-15",
    assignedBy: "John Doe",
    status: "pending"
  },
  {
    id: 2,
    title: "Approve SOC 2 Controls Implementation",
    type: "Approval",
    framework: "SOC 2",
    priority: "Medium",
    dueDate: "2024-01-18",
    assignedBy: "Jane Smith",
    status: "pending"
  },
  {
    id: 3,
    title: "Complete Vulnerability Assessment",
    type: "Assessment",
    framework: "NIST",
    priority: "Critical",
    dueDate: "2024-01-12",
    assignedBy: "Mike Johnson",
    status: "overdue"
  },
  {
    id: 4,
    title: "Update Privacy Policy Documentation",
    type: "Documentation",
    framework: "GDPR",
    priority: "Low",
    dueDate: "2024-01-20",
    assignedBy: "Sarah Wilson",
    status: "completed"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'default';
    case 'overdue':
      return 'destructive';
    case 'pending':
      return 'secondary';
    default:
      return 'secondary';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'Critical':
      return 'destructive';
    case 'High':
      return 'destructive';
    case 'Medium':
      return 'secondary';
    case 'Low':
      return 'outline';
    default:
      return 'secondary';
  }
};

export default function Assignments() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Assignments</h1>
          <p className="text-muted-foreground">Tasks and activities assigned to you</p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
          </CardContent>
        </Card>
      </div>

      {/* Assignments List */}
      <Card>
        <CardHeader>
          <CardTitle>Current Assignments</CardTitle>
          <CardDescription>Your active tasks and assignments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {assignments.map((assignment) => (
              <div key={assignment.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-start space-x-4">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{assignment.title}</h3>
                      <Badge variant={getPriorityColor(assignment.priority)}>
                        {assignment.priority}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <FileText className="h-3 w-3" />
                        {assignment.type}
                      </span>
                      <span>{assignment.framework}</span>
                      <span className="flex items-center gap-1">
                        <CalendarDays className="h-3 w-3" />
                        Due: {assignment.dueDate}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Assigned by:</span>
                      <Avatar className="h-5 w-5">
                        <AvatarFallback className="text-xs">
                          {assignment.assignedBy.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{assignment.assignedBy}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={getStatusColor(assignment.status)}>
                    {assignment.status}
                  </Badge>
                  <Button size="sm" variant="outline">
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}