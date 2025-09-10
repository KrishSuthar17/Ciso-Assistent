import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadarChart } from "./charts/RadarChart";
import { HorizontalBarChart } from "./charts/HorizontalBarChart";
import { DonutChart } from "./charts/DonutChart";
import { StackedBarChart } from "./charts/StackedBarChart";

const threatRadarData = [
    { subject: 'Data leak', value: 65, fullMark: 100 },
    { subject: 'Unavailability', value: 45, fullMark: 100 },
    { subject: 'Supply chain attack', value: 30, fullMark: 100 },
    { subject: 'Rogue Admin', value: 25, fullMark: 100 },
    { subject: 'Ransomware', value: 70, fullMark: 100 },
    { subject: 'Junk Data', value: 20, fullMark: 100 }
];

const riskQualificationsData = [
    { name: 'Integrity', value: 85 },
    { name: 'Confidential', value: 90 },
    { name: 'Availability', value: 75 }
];

const currentRiskData = [
    { name: 'Very low', value: 15, color: 'hsl(var(--risk-very-low))' },
    { name: 'Low', value: 25, color: 'hsl(var(--risk-low))' },
    { name: 'Medium', value: 35, color: 'hsl(var(--risk-medium))' },
    { name: 'High', value: 20, color: 'hsl(var(--risk-high))' },
    { name: 'Very high', value: 5, color: 'hsl(var(--risk-very-high))' }
];

const residualRiskData = [
    { name: 'Very low', value: 30, color: 'hsl(var(--risk-very-low))' },
    { name: 'Low', value: 40, color: 'hsl(var(--risk-low))' },
    { name: 'Medium', value: 25, color: 'hsl(var(--risk-medium))' },
    { name: 'High', value: 5, color: 'hsl(var(--risk-high))' },
    { name: 'Very high', value: 0, color: 'hsl(var(--risk-very-high))' }
];

const appliedControlsStatusData = [
    {
        name: 'To do',
        Planned: 5,
        'In progress': 10,
        'On hold': 3,
        Active: 15,
        Deprecated: 2,
        Undefined: 1
    }
];

const appliedControlsKeys = [
    { dataKey: 'Planned', fill: 'hsl(var(--status-planned))', name: 'Planned' },
    { dataKey: 'In progress', fill: 'hsl(var(--status-review))', name: 'In progress' },
    { dataKey: 'On hold', fill: 'hsl(var(--status-pending))', name: 'On hold' },
    { dataKey: 'Active', fill: 'hsl(var(--status-active))', name: 'Active' },
    { dataKey: 'Deprecated', fill: 'hsl(var(--status-deprecated))', name: 'Deprecated' },
    { dataKey: 'Undefined', fill: 'hsl(var(--chart-neutral))', name: 'Undefined' }
];

export const RiskTab = () => {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium">Threat radar</CardTitle>
                        <p className="text-xs text-muted-foreground">Data leak</p>
                    </CardHeader>
                    <CardContent>
                        <RadarChart data={threatRadarData} />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium">Risk scenarios qualifications</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <HorizontalBarChart data={riskQualificationsData} />
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium">Current risk level per risk scenario</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <DonutChart data={currentRiskData} centerText="Total" />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium">Residual risk level per risk scenario</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <DonutChart data={residualRiskData} centerText="Total" />
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-sm font-medium">Applied controls status</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-64">
                        <StackedBarChart
                            data={appliedControlsStatusData}
                            keys={appliedControlsKeys}
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default RiskTab;