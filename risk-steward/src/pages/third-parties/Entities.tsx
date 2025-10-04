import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export default function Entities() {
  const { data: entities, isLoading } = useQuery({
    queryKey: ["thirdPartyEntities"],
    queryFn: () => api.getThirdPartyEntities(),
  });

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "default";
      case "medium":
        return "secondary";
      case "high":
        return "destructive";
      case "critical":
        return "destructive";
      default:
        return "default";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Third Party Entities</h1>
          <p className="text-muted-foreground">Manage vendor entities</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Entity
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Entity Management</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Risk Level</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Representatives</TableHead>
                  <TableHead>Solutions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {entities?.map((entity: any) => (
                  <TableRow key={entity.id}>
                    <TableCell className="font-medium">{entity.name}</TableCell>
                    <TableCell className="capitalize">
                      {entity.entity_type}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getRiskColor(entity.risk_level)}>
                        {entity.risk_level}
                      </Badge>
                    </TableCell>
                    <TableCell className="capitalize">
                      {entity.status.replace("_", " ")}
                    </TableCell>
                    <TableCell>{entity.representative_count}</TableCell>
                    <TableCell>{entity.solution_count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
