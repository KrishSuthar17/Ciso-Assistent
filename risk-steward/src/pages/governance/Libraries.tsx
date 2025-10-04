import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function Libraries() {
  const mockLibraries = [
    {
      id: 1,
      name: "Policy Templates",
      type: "Policies",
      items: 24,
      lastUpdated: "2025-10-01",
    },
    {
      id: 2,
      name: "Procedure Documents",
      type: "Procedures",
      items: 18,
      lastUpdated: "2025-09-28",
    },
    {
      id: 3,
      name: "Standards Library",
      type: "Standards",
      items: 12,
      lastUpdated: "2025-09-25",
    },
    {
      id: 4,
      name: "Guidelines Repository",
      type: "Guidelines",
      items: 32,
      lastUpdated: "2025-09-20",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Libraries</h1>
          <p className="text-muted-foreground">
            Document repositories and templates
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Library
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Document Libraries</CardTitle>
              <CardDescription>Centralized document management</CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search libraries..." className="pl-8 w-64" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {mockLibraries.map((library) => (
              <Card key={library.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <BookOpen className="h-6 w-6 text-primary mt-1" />
                      <div>
                        <CardTitle className="text-lg">
                          {library.name}
                        </CardTitle>
                        <CardDescription>
                          <Badge variant="outline" className="mt-2">
                            {library.type}
                          </Badge>
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Documents</span>
                      <span className="font-medium">{library.items}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Last Updated
                      </span>
                      <span className="font-medium">{library.lastUpdated}</span>
                    </div>
                    <Button variant="outline" className="w-full mt-4">
                      Browse
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
