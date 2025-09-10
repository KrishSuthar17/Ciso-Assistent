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
import { Plus, Search, Users2, MoreHorizontal, Shield } from "lucide-react";

const userGroups = [
  {
    id: 1,
    name: "IT Security Team",
    description: "Information security professionals responsible for cybersecurity",
    memberCount: 8,
    permissions: ["Read", "Write", "Review"],
    color: "bg-blue-100 text-blue-800",
    members: ["John Doe", "Jane Smith", "Mike Johnson"]
  },
  {
    id: 2,
    name: "Compliance Officers",
    description: "Team responsible for regulatory compliance and audits",
    memberCount: 5,
    permissions: ["Read", "Approve", "Audit"],
    color: "bg-green-100 text-green-800",
    members: ["Sarah Wilson", "David Brown"]
  },
  {
    id: 3,
    name: "Risk Management",
    description: "Risk assessment and mitigation strategy team",
    memberCount: 6,
    permissions: ["Read", "Write", "Assess"],
    color: "bg-yellow-100 text-yellow-800",
    members: ["Alice Cooper", "Bob Martinez"]
  },
  {
    id: 4,
    name: "Executive Team",
    description: "Senior leadership and decision makers",
    memberCount: 4,
    permissions: ["Read", "Approve", "Admin"],
    color: "bg-purple-100 text-purple-800",
    members: ["CEO", "CTO", "CISO"]
  }
];

export default function UserGroups() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredGroups = userGroups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Groups</h1>
          <p className="text-muted-foreground">Organize users into groups with specific permissions</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Group
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New User Group</DialogTitle>
              <DialogDescription>
                Create a new user group with specific permissions
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="groupName">Group Name</Label>
                <Input id="groupName" placeholder="Enter group name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="groupDescription">Description</Label>
                <Textarea id="groupDescription" placeholder="Enter group description" />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>
                  Create Group
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search user groups..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Groups Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredGroups.map((group) => (
          <Card key={group.id} className="relative group">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${group.color.split(' ')[0]}`}></div>
                  <CardTitle className="text-lg">{group.name}</CardTitle>
                </div>
                <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription>{group.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users2 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Members</span>
                  </div>
                  <Badge variant="secondary">{group.memberCount}</Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Permissions</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {group.permissions.map((permission) => (
                      <Badge key={permission} variant="outline" className="text-xs">
                        {permission}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-sm text-muted-foreground">Recent Members</span>
                  <div className="flex items-center gap-2">
                    {group.members.slice(0, 3).map((member, index) => (
                      <Avatar key={index} className="h-6 w-6">
                        <AvatarFallback className="text-xs">
                          {member.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {group.memberCount > 3 && (
                      <span className="text-xs text-muted-foreground">
                        +{group.memberCount - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}