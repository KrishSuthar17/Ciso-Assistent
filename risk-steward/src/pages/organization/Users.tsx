import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, Mail, Phone, MoreHorizontal, UserCheck } from "lucide-react";
import axios from "axios";

const getRoleColor = (role: string) => {
  switch (role) {
    case 'Owner':
      return 'default';
    case 'Creator':
      return 'secondary';
    case 'Reviewer':
      return 'outline';
    case 'Approver':
      return 'secondary';
    case 'Assessor':
      return 'outline';
    default:
      return 'secondary';
  }
};

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch users dynamically
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/User/");
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // ✅ Filter users
  const filteredUsers = users.filter(user => {
    const matchesSearch =
      (user.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.department || "").toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">Manage user accounts and User</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>
                Create a new user account for your organization
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter full name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter email address" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Creator">Creator</SelectItem>
                    <SelectItem value="Reviewer">Reviewer</SelectItem>
                    <SelectItem value="Approver">Approver</SelectItem>
                    <SelectItem value="Assessor">Assessor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input id="department" placeholder="Enter department" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <input type="checkbox" name="status" id="status" defaultChecked />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>
                  Create User
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
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="Owner">Owner</SelectItem>
            <SelectItem value="Creator">Creator</SelectItem>
            <SelectItem value="Reviewer">Reviewer</SelectItem>
            <SelectItem value="Approver">Approver</SelectItem>
            <SelectItem value="Assessor">Assessor</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Users List */}
      <Card>
        <CardHeader>
          <CardTitle>Organization Users</CardTitle>
          <CardDescription>All users in your organization</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading users...</p>
          ) : (
            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={user.avatar || "/avatars/default.png"} />
                      <AvatarFallback>
                        {user.name ? user.name.split(' ').map(n => n[0]).join('') : "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{user.Full_name}</h3>
                        <Badge variant={getRoleColor(user.Role || "Creator")}>
                          {user.role || "Creator"}
                        </Badge>
                        {user.status === 'active' && (
                          <UserCheck className="h-4 w-4 text-green-500" />
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {user.Email || "no-email@company.com"}
                        </span>

                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        {/* <span>{user.Department || "General"}</span> */}
                        <span>Department: {user.Department || "—"}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={user.is_active ? "default" : "secondary"}>
                      {user.is_active ? "active" : "inactive"}
                    </Badge>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>

                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
