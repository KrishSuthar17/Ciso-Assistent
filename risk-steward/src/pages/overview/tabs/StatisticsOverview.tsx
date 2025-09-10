import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface StatisticsOverviewProps {
    stats: {
        domains: number;
        perimeters: number;
        appliedControls: number;
        riskAssessments: number;
        audits: number;
        policies: number;
    };
}

export const StatisticsOverview = ({ stats }: StatisticsOverviewProps) => {
    const statItems = [
        { label: "Domains", value: stats.domains, icon: "🏢" },
        { label: "Perimeters", value: stats.perimeters, icon: "⚙️" },
        { label: "Applied controls", value: stats.appliedControls, icon: "🛡️" },
        { label: "Risk assessments", value: stats.riskAssessments, icon: "📊" },
        { label: "Audits", value: stats.audits, icon: "🔍" },
        { label: "Policies", value: stats.policies, icon: "📋" },
    ];

    return (
        <div>
            <h2 className="text-lg font-semibold mb-4 text-foreground">Statistics</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {statItems.map((item, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4 text-center">
                            <div className="text-2xl mb-2">{item.icon}</div>
                            <div className="text-2xl font-bold text-foreground mb-1">{item.value}</div>
                            <div className="text-sm text-muted-foreground">{item.label}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};