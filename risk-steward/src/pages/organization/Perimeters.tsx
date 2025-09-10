import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import { Plus, Search, Shield, Network, MoreHorizontal } from "lucide-react";

const perimeters = [
  {
    id: 1,
    name: "Corporate Network",
    description: "Main corporate network infrastructure including all internal systems",
    type: "Network",
    assetCount: 156,
    riskLevel: "Medium",
    status: "active"
  },
  {
    id: 2,
    name: "DMZ Zone",
    description: "Demilitarized zone for public-facing services and applications",
    type: "Network",
    assetCount: 23,
    riskLevel: "High",
    status: "active"
  },
  {
    id: 3,
    name: "Data Center",
    description: "Physical data center containing critical infrastructure",
    type: "Physical",
    assetCount: 87,
    riskLevel: "High",
    status: "active"
  },
  {
    id: 4,
    name: "Cloud Environment",
    description: "AWS cloud infrastructure for scalable applications",
    type: "Cloud",
    assetCount: 234,
    riskLevel: "Medium",
    status: "active"
  }
];

const getRiskColor = (risk: string) => {
  switch (risk) {
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

export default function Perimeters() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredPerimeters = perimeters.filter(perimeter =>
    perimeter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    perimeter.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Perimeters</h1>
          <p className="text-muted-foreground">Define and manage security perimeters</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Perimeter
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Perimeter</DialogTitle>
              <DialogDescription>
                Define a new security perimeter for your organization
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Perimeter Name</Label>
                <Input id="name" placeholder="Enter perimeter name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Input id="type" placeholder="Network, Physical, Cloud, etc." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter perimeter description" />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>
                  Create Perimeter
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search perimeters..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Perimeters Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPerimeters.map((perimeter) => (
          <Card key={perimeter.id} className="relative group">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{perimeter.name}</CardTitle>
                </div>
                <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription>{perimeter.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Network className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Type</span>
                  </div>
                  <Badge variant="outline">{perimeter.type}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Assets</span>
                  <Badge variant="secondary">{perimeter.assetCount}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Risk Level</span>
                  <Badge variant={getRiskColor(perimeter.riskLevel)}>{perimeter.riskLevel}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge variant="default">{perimeter.status}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}