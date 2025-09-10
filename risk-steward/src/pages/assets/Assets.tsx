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
import { Plus, Search, HardDrive, Server, Smartphone, Building, MoreHorizontal } from "lucide-react";

const assets = [
  {
    id: 1,
    name: "Primary Database Server",
    type: "Server",
    criticality: "Critical",
    owner: "John Doe",
    location: "Data Center A",
    status: "active",
    lastAssessed: "2024-01-08",
    riskScore: 8.5
  },
  {
    id: 2,
    name: "Corporate Website",
    type: "Application",
    criticality: "High",
    owner: "Jane Smith",
    location: "AWS US-East-1",
    status: "active",
    lastAssessed: "2024-01-05",
    riskScore: 6.2
  },
  {
    id: 3,
    name: "Employee Laptops",
    type: "Hardware",
    criticality: "Medium",
    owner: "IT Department",
    location: "Various",
    status: "active",
    lastAssessed: "2024-01-03",
    riskScore: 4.1
  },
  {
    id: 4,
    name: "Customer Database",
    type: "Data",
    criticality: "Critical",
    owner: "Sarah Wilson",
    location: "Data Center B",
    status: "active",
    lastAssessed: "2024-01-10",
    riskScore: 9.1
  },
  {
    id: 5,
    name: "Legacy System",
    type: "Application",
    criticality: "Low",
    owner: "Mike Johnson",
    location: "On-premise",
    status: "deprecated",
    lastAssessed: "2023-12-15",
    riskScore: 3.2
  }
];

const getCriticalityColor = (criticality: string) => {
  switch (criticality) {
    case 'Critical':
      return 'destructive';
    case 'High':
      return 'secondary';
    case 'Medium':
      return 'outline';
    case 'Low':
      return 'outline';
    default:
      return 'secondary';
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'Server':
      return Server;
    case 'Application':
      return Smartphone;
    case 'Hardware':
      return HardDrive;
    case 'Data':
      return Building;
    default:
      return HardDrive;
  }
};

const getRiskColor = (score: number) => {
  if (score >= 8) return 'text-red-600';
  if (score >= 6) return 'text-yellow-600';
  if (score >= 4) return 'text-blue-600';
  return 'text-green-600';
};

export default function Assets() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || asset.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Assets</h1>
          <p className="text-muted-foreground">Manage and track organizational assets</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Asset
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Asset</DialogTitle>
              <DialogDescription>
                Register a new asset in your organization
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="assetName">Asset Name</Label>
                <Input id="assetName" placeholder="Enter asset name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="assetType">Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select asset type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="server">Server</SelectItem>
                    <SelectItem value="application">Application</SelectItem>
                    <SelectItem value="hardware">Hardware</SelectItem>
                    <SelectItem value="data">Data</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="criticality">Criticality</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select criticality level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="owner">Owner</Label>
                <Input id="owner" placeholder="Enter asset owner" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="Enter asset location" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter asset description" />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>
                  Create Asset
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
            <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Assets</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Risk</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Risk Score</CardTitle>
            <Smartphone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6.2</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search assets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Server">Server</SelectItem>
            <SelectItem value="Application">Application</SelectItem>
            <SelectItem value="Hardware">Hardware</SelectItem>
            <SelectItem value="Data">Data</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Assets List */}
      <Card>
        <CardHeader>
          <CardTitle>Asset Registry</CardTitle>
          <CardDescription>Complete list of organizational assets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAssets.map((asset) => {
              const IconComponent = getTypeIcon(asset.type);
              return (
                <div key={asset.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <IconComponent className="h-8 w-8 text-primary" />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{asset.name}</h3>
                        <Badge variant={getCriticalityColor(asset.criticality)}>
                          {asset.criticality}
                        </Badge>
                        <Badge variant="outline">{asset.type}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Owner: {asset.owner}</span>
                        <span>Location: {asset.location}</span>
                        <span>Last assessed: {asset.lastAssessed}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Risk Score:</span>
                        <span className={`text-sm font-medium ${getRiskColor(asset.riskScore)}`}>
                          {asset.riskScore}/10
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={asset.status === 'active' ? 'default' : 'secondary'}>
                      {asset.status}
                    </Badge>
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