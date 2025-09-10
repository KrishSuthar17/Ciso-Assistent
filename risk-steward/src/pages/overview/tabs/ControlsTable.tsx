import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Settings, Eye } from "lucide-react";

interface Control {
    name: string;
    category: string;
    function: string;
    domain: string;
    rankingScore: number;
    eta: string;
    state: 'Planned' | 'In progress' | 'In review' | 'Done' | 'Deprecated';
}

interface ControlsTableProps {
    title: string;
    subtitle?: string;
    controls: Control[];
    showActions?: boolean;
}

const getStateColor = (state: string) => {
    switch (state.toLowerCase()) {
        case 'planned': return 'bg-status-planned text-foreground';
        case 'in progress': return 'bg-status-review text-primary-foreground';
        case 'in review': return 'bg-status-pending text-foreground';
        case 'done': return 'bg-status-active text-primary-foreground';
        case 'deprecated': return 'bg-status-deprecated text-primary-foreground';
        default: return 'bg-muted text-muted-foreground';
    }
};

export const ControlsTable = ({ title, subtitle, controls, showActions = true }: ControlsTableProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">{title}</CardTitle>
                {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-border">
                                <th className="text-left py-2 font-medium text-muted-foreground">NAME</th>
                                <th className="text-left py-2 font-medium text-muted-foreground">CATEGORY</th>
                                <th className="text-left py-2 font-medium text-muted-foreground">CSF FUNCTION</th>
                                <th className="text-left py-2 font-medium text-muted-foreground">DOMAIN</th>
                                <th className="text-left py-2 font-medium text-muted-foreground">RANKING SCORE</th>
                                <th className="text-left py-2 font-medium text-muted-foreground">ETA</th>
                                <th className="text-left py-2 font-medium text-muted-foreground">STATE</th>
                                {showActions && <th className="text-left py-2 font-medium text-muted-foreground">ACTIONS</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {controls.map((control, index) => (
                                <tr key={index} className="border-b border-border hover:bg-muted/50 transition-colors">
                                    <td className="py-3 text-foreground font-medium">{control.name}</td>
                                    <td className="py-3 text-muted-foreground">{control.category}</td>
                                    <td className="py-3 text-muted-foreground">{control.function}</td>
                                    <td className="py-3">
                                        <span className="text-chart-primary hover:underline cursor-pointer">
                                            {control.domain}
                                        </span>
                                    </td>
                                    <td className="py-3 text-muted-foreground">{control.rankingScore}</td>
                                    <td className="py-3 text-muted-foreground">{control.eta}</td>
                                    <td className="py-3">
                                        <Badge variant="secondary" className={getStateColor(control.state)}>
                                            {control.state}
                                        </Badge>
                                    </td>
                                    {showActions && (
                                        <td className="py-3">
                                            <div className="flex gap-1">
                                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                                    <Settings className="h-4 w-4" />
                                                </Button>
                                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                                    <ExternalLink className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {controls.length > 5 && (
                    <div className="mt-4 text-center">
                        <Button variant="outline" size="sm">
                            View All ({controls.length})
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};