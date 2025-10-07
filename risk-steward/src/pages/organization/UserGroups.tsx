import { useEffect, useState } from "react";
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
import API from "@/services/api";

type ApiGroup = { id: number; name: string; description: string };
type ApiUser = { id: number; user_group: number | null };

export default function UserGroups() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [groups, setGroups] = useState<ApiGroup[]>([]);
  const [users, setUsers] = useState<ApiUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");

  useEffect(() => {
    const run = async () => {
      try {
        const [g, u] = await Promise.all([
          API.get("http://127.0.0.1:8000/api/groups/"),
          API.get("http://127.0.0.1:8000/api/users/")
        ]);
        setGroups(g.data);
        setUsers(u.data);
      } catch (e) {
        console.error("Failed loading groups/users", e);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  const handleCreate = async () => {
    setCreating(true);
    try {
      const res = await API.post("http://127.0.0.1:8000/api/groups/", { name: groupName, description: groupDescription });
      setGroups((prev) => [res.data, ...prev]);
      setIsAddDialogOpen(false);
      setGroupName("");
      setGroupDescription("");
    } catch (e) {
      console.error("Failed creating group", e);
    } finally {
      setCreating(false);
    }
  };

  const withCounts = groups.map((g) => ({
    ...g,
    memberCount: users.filter(u => u.user_group === g.id).length,
  }));

  const filteredGroups = withCounts.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (group.description || "").toLowerCase().includes(searchTerm.toLowerCase())
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
                <Input id="groupName" placeholder="Enter group name" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="groupDescription">Description</Label>
                <Textarea id="groupDescription" placeholder="Enter group description" value={groupDescription} onChange={(e) => setGroupDescription(e.target.value)} />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreate} disabled={creating || !groupName}>
                  {creating ? 'Creating...' : 'Create Group'}
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
        {loading ? (
          <div className="text-muted-foreground">Loading...</div>
        ) : filteredGroups.map((group) => (
          <Card key={group.id} className="relative group">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
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
                  <span className="text-sm text-muted-foreground">Recent Members</span>
                  <div className="flex items-center gap-2">
                    {[...Array(Math.min(3, group.memberCount)).keys()].map((idx) => (
                      <Avatar key={idx} className="h-6 w-6">
                        <AvatarFallback className="text-xs">UG</AvatarFallback>
                      </Avatar>
                    ))}
                    {group.memberCount > 3 && (
                      <span className="text-xs text-muted-foreground">+{group.memberCount - 3} more</span>
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