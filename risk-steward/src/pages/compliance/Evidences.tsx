import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import { Plus, Search, FileText, Upload, Download, MoreHorizontal, CheckCircle2, Clock, AlertTriangle } from "lucide-react";

const evidences = [
  {
    id: 1,
    name: "Security Policy v2.1",
    type: "PDF",
    size: "2.4 MB",
    status: "approved",
    uploadedBy: "John Doe",
    uploadDate: "2024-01-10",
    lastReviewed: "2024-01-10",
    reviewer: "Jane Smith",
    controls: ["AC-1", "AC-2", "AC-3"],
    framework: "ISO 27001",
    tags: ["policy", "security", "approved"]
  },
  {
    id: 2,
    name: "Network Architecture Diagram",
    type: "DOCX",
    size: "5.2 MB",
    status: "pending",
    uploadedBy: "Mike Johnson",
    uploadDate: "2024-01-12",
    lastReviewed: null,
    reviewer: null,
    controls: ["SC-7", "SC-8"],
    framework: "NIST",
    tags: ["network", "diagram", "pending"]
  },
  {
    id: 3,
    name: "Incident Response Log Q1",
    type: "XLSX",
    size: "1.8 MB",
    status: "rejected",
    uploadedBy: "Sarah Wilson",
    uploadDate: "2024-01-08",
    lastReviewed: "2024-01-09",
    reviewer: "David Brown",
    controls: ["IR-1", "IR-4", "IR-8"],
    framework: "SOC 2",
    tags: ["incident", "response", "rejected"]
  },
  {
    id: 4,
    name: "Vulnerability Scan Report",
    type: "PDF",
    size: "12.7 MB",
    status: "under-review",
    uploadedBy: "Alice Cooper",
    uploadDate: "2024-01-11",
    lastReviewed: null,
    reviewer: "Bob Martinez",
    controls: ["RA-5", "SI-2"],
    framework: "ISO 27001",
    tags: ["vulnerability", "scan", "review"]
  },
  {
    id: 5,
    name: "Employee Training Records",
    type: "PDF",
    size: "3.1 MB",
    status: "approved",
    uploadedBy: "Emma Davis",
    uploadDate: "2024-01-09",
    lastReviewed: "2024-01-09",
    reviewer: "Frank Wilson",
    controls: ["AT-2", "AT-3"],
    framework: "GDPR",
    tags: ["training", "employees", "approved"]
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'approved':
      return 'default';
    case 'pending':
      return 'secondary';
    case 'under-review':
      return 'outline';
    case 'rejected':
      return 'destructive';
    default:
      return 'secondary';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'approved':
      return CheckCircle2;
    case 'pending':
      return Clock;
    case 'under-review':
      return Clock;
    case 'rejected':
      return AlertTriangle;
    default:
      return Clock;
  }
};

const getFileTypeColor = (type: string) => {
  switch (type.toLowerCase()) {
    case 'pdf':
      return 'bg-red-100 text-red-800';
    case 'docx':
      return 'bg-blue-100 text-blue-800';
    case 'xlsx':
      return 'bg-green-100 text-green-800';
    case 'png':
    case 'jpg':
    case 'jpeg':
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function Evidences() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [frameworkFilter, setFrameworkFilter] = useState("all");
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

  const filteredEvidences = evidences.filter(evidence => {
    const matchesSearch = evidence.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         evidence.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         evidence.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === "all" || evidence.status === statusFilter;
    const matchesFramework = frameworkFilter === "all" || evidence.framework === frameworkFilter;
    return matchesSearch && matchesStatus && matchesFramework;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Evidence Collection</h1>
          <p className="text-muted-foreground">Upload and manage compliance evidence</p>
        </div>
        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Upload Evidence
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Evidence</DialogTitle>
              <DialogDescription>
                Upload a new evidence file for compliance controls
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="evidenceName">Evidence Name</Label>
                <Input id="evidenceName" placeholder="Enter evidence name" />
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
                <Label htmlFor="controls">Controls</Label>
                <Input id="controls" placeholder="Enter control IDs (comma separated)" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input id="tags" placeholder="Enter tags (comma separated)" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter evidence description" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="file">File</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-2">
                    <Button variant="outline" size="sm">
                      Choose File
                    </Button>
                    <p className="mt-2 text-sm text-gray-500">
                      PDF, DOCX, XLSX, PNG, JPG up to 10MB
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsUploadDialogOpen(false)}>
                  Upload Evidence
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
            <CardTitle className="text-sm font-medium">Total Evidence</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">124</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search evidence..."
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
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="under-review">Under Review</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
        <Select value={frameworkFilter} onValueChange={setFrameworkFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by framework" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Frameworks</SelectItem>
            <SelectItem value="ISO 27001">ISO 27001</SelectItem>
            <SelectItem value="SOC 2">SOC 2</SelectItem>
            <SelectItem value="GDPR">GDPR</SelectItem>
            <SelectItem value="NIST">NIST</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Evidence List */}
      <Card>
        <CardHeader>
          <CardTitle>Evidence Files</CardTitle>
          <CardDescription>All uploaded evidence files</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredEvidences.map((evidence) => {
              const StatusIcon = getStatusIcon(evidence.status);
              return (
                <div key={evidence.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <FileText className="h-8 w-8 text-primary" />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{evidence.name}</h3>
                        <Badge className={getFileTypeColor(evidence.type)}>
                          {evidence.type}
                        </Badge>
                        <Badge variant="outline">
                          {evidence.framework}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {evidence.size}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Uploaded by: {evidence.uploadedBy}</span>
                        <span>Date: {evidence.uploadDate}</span>
                        {evidence.reviewer && (
                          <span>Reviewer: {evidence.reviewer}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Controls:</span>
                        <div className="flex gap-1">
                          {evidence.controls.map((control) => (
                            <Badge key={control} variant="outline" className="text-xs">
                              {control}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {evidence.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getStatusColor(evidence.status)} className="flex items-center gap-1">
                      <StatusIcon className="h-3 w-3" />
                      {evidence.status.replace('-', ' ')}
                    </Badge>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}