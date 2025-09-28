import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Search, Shield, MoreHorizontal } from "lucide-react";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/domains/";
export default function Domains() {
  const [domainList, setDomainList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "design",
    domain: "",
    default_asigned: false,
  });

  // 🔹 Fetch Domains from backend
  useEffect(() => {
    axios.get(API_URL).then((res) => setDomainList(res.data));
  }, []);

  // 🔹 Handle Add Domain (POST)
  const handleAddDomain = async () => {
    try {
      const res = await axios.post(API_URL, formData);
      setDomainList((prev) => [...prev, res.data]); // update UI
      setIsAddDialogOpen(false);
      setFormData({
        name: "",
        description: "",
        status: "design",
        domain: "",
        default_asigned: false,
      });
    } catch (err) {
      console.error("Error adding perimeter:", err);
    }
  };

  // 🔹 Filter domains
  const filteredDomains = domainList.filter(
    (d) =>
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Domain</h1>
          <p className="text-muted-foreground">
            Manage your organization’s Domain
          </p>
        </div>

        {/* 🔹 Add Perimeter Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Perimeter
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Perimeter</DialogTitle>
              <DialogDescription>
                Create a new perimeter linked to a domain
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Perimeter Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>



              {/* <div className="space-y-2">
                <Label htmlFor="domain">Domain ID</Label>
                <Input
                  id="domain"
                  type="number"
                  value={formData.domain}
                  onChange={(e) =>
                    setFormData({ ...formData, domain: e.target.value })
                  }
                />
              </div> */}

              {/* <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="default_asigned"
                  checked={formData.default_asigned}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      default_asigned: e.target.checked,
                    })
                  }
                />
                <Label htmlFor="default_asigned">Default Assigned</Label>
              </div> */}

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleAddDomain}>Create Domain</Button>
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

      {/* Domains Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredDomains.map((domain) => (
          <Card key={domain.id} className="relative group">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{domain.name}</CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="opacity-0 group-hover:opacity-100"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription>{domain.description}</CardDescription>
            </CardHeader>

            {/* <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Domain</span>
                  <Badge variant="outline">{domain.domain}</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Assigned</span>
                  <Badge variant="secondary">
                    {domain.default_asigned ? "Yes" : "No"}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge variant="default">{domain.status}</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Created</span>
                  <span className="text-xs text-muted-foreground">
                    {domain.created_at
                      ? new Date(domain.created_at).toLocaleDateString()
                      : "-"}
                  </span>
                </div>
              </div>
            </CardContent> */}
          </Card>
        ))}
      </div>
    </div>
  );
}