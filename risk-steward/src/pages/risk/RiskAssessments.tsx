import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, AlertTriangle, FileText, Calendar, MoreHorizontal } from "lucide-react";

const assessments = [
  {
    id: 1,
    name: "Q1 2024 Cybersecurity Risk Assessment",
    type: "Quarterly",
    framework: "ISO 27001",
    status: "completed",
    progress: 100,
    riskCount: 23,
    highRisks: 3,
    assessor: "John Doe",
    startDate: "2024-01-01",
    endDate: "2024-01-15",
    lastUpdated: "2024-01-15"
  },
  {
    id: 2,
    name: "Data Privacy Impact Assessment",
    type: "DPIA",
    framework: "GDPR",
    status: "in-progress",
    progress: 67,
    riskCount: 12,
    highRisks: 2,
    assessor: "Jane Smith",
    startDate: "2024-01-10",
    endDate: "2024-01-25",
    lastUpdated: "2024-01-12"
  },
  {
    id: 3,
    name: "Third-Party Vendor Assessment",
    type: "Vendor",
    framework: "SOC 2",
    status: "pending",
    progress: 0,
    riskCount: 0,
    highRisks: 0,
    assessor: "Mike Johnson",
    startDate: "2024-01-20",
    endDate: "2024-02-05",
    lastUpdated: "2024-01-10"
  },
  {
    id: 4,
    name: "Infrastructure Security Review",
    type: "Technical",
    framework: "NIST",
    status: "in-progress",
    progress: 34,
    riskCount: 8,
    highRisks: 1,
    assessor: "Sarah Wilson",
    startDate: "2024-01-08",
    endDate: "2024-01-30",
    lastUpdated: "2024-01-11"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'default';
    case 'in-progress':
      return 'secondary';
    case 'pending':
      return 'outline';
    case 'overdue':
      return 'destructive';
    default:
      return 'secondary';
  }
};

const getProgressColor = (progress: number) => {
  if (progress >= 90) return 'bg-green-500';
  if (progress >= 50) return 'bg-blue-500';
  return 'bg-yellow-500';
};

export default function RiskAssessments() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredAssessments = assessments.filter(assessment => {
    const matchesSearch = assessment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assessment.framework.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assessment.assessor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || assessment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Risk Assessments</h1>
          <p className="text-muted-foreground">Conduct and manage risk assessments</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Assessment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Risk Assessment</DialogTitle>
              <DialogDescription>
                Start a new risk assessment for your organization
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="assessmentName">Assessment Name</Label>
                <Input id="assessmentName" placeholder="Enter assessment name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="assessmentType">Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select assessment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="annual">Annual</SelectItem>
                    <SelectItem value="dpia">DPIA</SelectItem>
                    <SelectItem value="vendor">Vendor</SelectItem>
                    <SelectItem value="technical">Technical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="framework">Framework</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select framework" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="iso27001">ISO 27001</SelectItem>
                    <SelectItem value="soc2">SOC 2</SelectItem>
                    <SelectItem value="gdpr">GDPR</SelectItem>
                    <SelectItem value="nist">NIST</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="assessor">Assessor</Label>
                <Input id="assessor" placeholder="Enter assessor name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter assessment description" />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>
                  Create Assessment
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assessments</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Risks Found</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed This Month</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search assessments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Assessments List */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Assessments</CardTitle>
          <CardDescription>All risk assessments in your organization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAssessments.map((assessment) => (
              <div key={assessment.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <AlertTriangle className="h-8 w-8 text-primary" />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{assessment.name}</h3>
                      <Badge variant="outline">{assessment.type}</Badge>
                      <Badge variant="outline">{assessment.framework}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Assessor: {assessment.assessor}</span>
                      <span>Start: {assessment.startDate}</span>
                      <span>End: {assessment.endDate}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Progress:</span>
                        <Progress value={assessment.progress} className="w-24 h-2" />
                        <span className="font-medium">{assessment.progress}%</span>
                      </div>
                      <span className="text-muted-foreground">
                        Risks: {assessment.riskCount} ({assessment.highRisks} high)
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={getStatusColor(assessment.status)}>
                    {assessment.status.replace('-', ' ')}
                  </Badge>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
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