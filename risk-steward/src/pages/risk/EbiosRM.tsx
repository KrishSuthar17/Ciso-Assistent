import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function EbiosRM() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Ebios RM</h1>
        <p className="text-muted-foreground">Risk management methodology</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Ebios Risk Manager</CardTitle>
          <CardDescription>
            French cybersecurity risk assessment method
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center border-2 border-dashed rounded-lg">
            <p className="text-muted-foreground">
              Ebios RM methodology implementation
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
