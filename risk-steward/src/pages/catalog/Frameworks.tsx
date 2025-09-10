import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Search, Shield, CheckCircle2, Clock, AlertTriangle } from "lucide-react";

const frameworks = [
  {
    id: 1,
    name: "ISO 27001",
    description: "Information Security Management System standard",
    version: "2022",
    controlCount: 114,
    implementedCount: 105,
    status: "licensed",
    completionRate: 92,
    category: "Security"
  },
  {
    id: 2,
    name: "SOC 2 Type II",
    description: "Service Organization Control audit framework",
    version: "2017",
    controlCount: 64,
    implementedCount: 50,
    status: "licensed",
    completionRate: 78,
    category: "Compliance"
  },
  {
    id: 3,
    name: "GDPR",
    description: "General Data Protection Regulation",
    version: "2018",
    controlCount: 47,
    implementedCount: 40,
    status: "licensed",
    completionRate: 85,
    category: "Privacy"
  },
  {
    id: 4,
    name: "NIST CSF",
    description: "Cybersecurity Framework",
    version: "2.0",
    controlCount: 108,
    implementedCount: 73,
    status: "licensed",
    completionRate: 68,
    category: "Security"
  },
  {
    id: 5,
    name: "PCI DSS",
    description: "Payment Card Industry Data Security Standard",
    version: "4.0",
    controlCount: 78,
    implementedCount: 0,
    status: "available",
    completionRate: 0,
    category: "Compliance"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'licensed':
      return 'default';
    case 'available':
      return 'outline';
    default:
      return 'secondary';
  }
};

const getCompletionColor = (rate: number) => {
  if (rate >= 90) return 'text-green-600';
  if (rate >= 70) return 'text-yellow-600';
  return 'text-red-600';
};

export default function Frameworks() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredFrameworks = frameworks.filter(framework => {
    const matchesSearch = framework.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         framework.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || framework.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Frameworks</h1>
          <p className="text-muted-foreground">Manage compliance frameworks and standards</p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Licensed Frameworks</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Controls</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">333</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Implemented</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">268</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Completion</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">81%</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search frameworks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button 
            variant={categoryFilter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setCategoryFilter("all")}
          >
            All
          </Button>
          <Button 
            variant={categoryFilter === "Security" ? "default" : "outline"}
            size="sm"
            onClick={() => setCategoryFilter("Security")}
          >
            Security
          </Button>
          <Button 
            variant={categoryFilter === "Compliance" ? "default" : "outline"}
            size="sm"
            onClick={() => setCategoryFilter("Compliance")}
          >
            Compliance
          </Button>
          <Button 
            variant={categoryFilter === "Privacy" ? "default" : "outline"}
            size="sm"
            onClick={() => setCategoryFilter("Privacy")}
          >
            Privacy
          </Button>
        </div>
      </div>

      {/* Frameworks Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredFrameworks.map((framework) => (
          <Card key={framework.id} className="relative group">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <div>
                    <CardTitle className="text-lg">{framework.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">v{framework.version}</p>
                  </div>
                </div>
                <Badge variant={getStatusColor(framework.status)}>
                  {framework.status}
                </Badge>
              </div>
              <CardDescription>{framework.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Category</span>
                  <Badge variant="outline">{framework.category}</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Controls</span>
                  <span className="text-sm font-medium">
                    {framework.implementedCount}/{framework.controlCount}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Completion</span>
                    <span className={`text-sm font-medium ${getCompletionColor(framework.completionRate)}`}>
                      {framework.completionRate}%
                    </span>
                  </div>
                  <Progress value={framework.completionRate} className="h-2" />
                </div>

                {framework.status === 'licensed' && (
                  <Button className="w-full" size="sm">
                    View Details
                  </Button>
                )}
                
                {framework.status === 'available' && (
                  <Button variant="outline" className="w-full" size="sm">
                    Request License
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}