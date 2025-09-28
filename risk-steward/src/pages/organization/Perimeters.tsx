import { useEffect, useRef, useState } from "react";
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

// ✅ setup axios instance
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: { "Content-Type": "application/json" },
});

export default function Perimeters() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [perimeterList, setPerimeterList] = useState([]);
  const [menuOpenId, setMenuOpenId] = useState(null);
  const menuRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "design",
    domain: "",
    default_asigned: false,
  });

  // ✅ Fetch perimeters on mount
  useEffect(() => {
    const fetchPerimeters = async () => {
      try {
        const res = await api.get("/perimeters/");
        setPerimeterList(res.data);
      } catch (err) {
        console.error("Error fetching perimeters:", err);
      }
    };
    fetchPerimeters();
  }, []);

  // ✅ Add Perimeter
  const handleAddPerimeter = async () => {
    try {
      const payload = {
        ...formData,
        domain: formData.domain ? parseInt(formData.domain, 10) : null,
      };

      const res = await api.post("/perimeters/", payload);
      setPerimeterList((prev) => [...prev, res.data]);
      setIsAddDialogOpen(false);
      setFormData({
        name: "",
        description: "",
        status: "design",
        domain: "",
        default_asigned: false,
      });
    } catch (err) {
      console.error("Error creating perimeter:", err.response?.data || err.message);
    }
  };

  // ✅ Filtering perimeters
  const filteredPerimeters = perimeterList.filter((perimeter) =>
    (perimeter.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (perimeter.description || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ handle navigation
  const goTo = (path) => {
    window.location.href = path;
  };

  // ✅ close menu when clicking outside
  useEffect(() => {
    const onDocClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpenId(null);
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Perimeters</h1>
          <p className="text-muted-foreground">Define and manage security perimeters</p>
        </div>

        {/* Add Perimeter Button + Popup */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Perimeter
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Perimeter</DialogTitle>
              <DialogDescription>
                Fill the form to create a new perimeter.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Perimeter Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  className="w-full border rounded-md p-2"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="design">Design</option>
                  <option value="development">Development</option>
                  <option value="production">Production</option>
                  <option value="End of life">End of life</option>
                  <option value="Dropped">Dropped</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="domain">Domain ID</Label>
                <Input
                  id="domain"
                  type="number"
                  value={formData.domain}
                  onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="default_asigned"
                  checked={formData.default_asigned}
                  onChange={(e) =>
                    setFormData({ ...formData, default_asigned: e.target.checked })
                  }
                />
                <Label htmlFor="default_asigned">Default Assigned</Label>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddPerimeter}>Create Perimeter</Button>
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
          <Card
            key={perimeter.id}
            className="relative group cursor-pointer"
            onClick={() => goTo(`/perimeters/${perimeter.id}`)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{perimeter.name}</CardTitle>
                </div>
                <div className="relative" ref={menuRef} onClick={(e) => e.stopPropagation()}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100"
                    onClick={() => setMenuOpenId(menuOpenId === perimeter.id ? null : perimeter.id)}
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>

                  {menuOpenId === perimeter.id && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow z-50">
                      <button
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={() => goTo(`/perimeters/${perimeter.id}?action=update`)}
                      >
                        Update
                      </button>
                      <button
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={() => goTo(`/perimeters/${perimeter.id}?action=delete`)}
                      >
                        Delete
                      </button>
                      <button
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={() => goTo(`/perimeters/${perimeter.id}`)}
                      >
                        View details
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <CardDescription>{perimeter.description}</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Domain</span>
                  <Badge variant="outline">{perimeter.domain}</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Assigned</span>
                  <Badge variant="secondary">
                    {perimeter.default_asigned ? "Yes" : "No"}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge variant="default">{perimeter.status}</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Created</span>
                  <span className="text-xs text-muted-foreground">
                    {perimeter.created_at
                      ? new Date(perimeter.created_at).toLocaleDateString()
                      : "-"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
