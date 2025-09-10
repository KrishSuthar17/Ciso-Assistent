import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatisticsOverview } from "./StatisticsOverview";
import { DonutChart } from "./charts/DonutChart";
import { HorizontalBarChart } from "./charts/HorizontalBarChart";
import { StackedBarChart } from "./charts/StackedBarChart";
import { ControlsTable } from "./ControlsTable";

const auditStatusData = [
    { name: 'Planned', value: 1, color: 'hsl(var(--status-planned))' },
    { name: 'In progress', value: 2, color: 'hsl(var(--status-review))' },
    { name: 'In review', value: 0, color: 'hsl(var(--status-pending))' },
    { name: 'Done', value: 0, color: 'hsl(var(--status-active))' },
    { name: 'Deprecated', value: 0, color: 'hsl(var(--status-deprecated))' }
];

const riskAssessmentData = [
    { name: 'Planned', value: 1, color: 'hsl(var(--status-planned))' },
    { name: 'In progress', value: 1, color: 'hsl(var(--status-review))' },
    { name: 'In review', value: 0, color: 'hsl(var(--status-pending))' },
    { name: 'Done', value: 0, color: 'hsl(var(--status-active))' },
    { name: 'Deprecated', value: 0, color: 'hsl(var(--status-deprecated))' }
];

const frameworksData = [
    { name: 'International standard ISO/IEC 27001:20', value: 80 },
    { name: 'Adobe CCF v4', value: 65 },
    { name: 'NIST CSF v2.0', value: 45 },
    { name: 'GDPR Checklist for data controllers', value: 30 }
];

const riskScenariosData = [
    { name: 'Open', value: 1, color: 'hsl(var(--chart-accent))' }
];

const pendingControls = [
    {
        name: 'Immutable backups',
        category: '-',
        function: 'Protect',
        domain: 'DEMO',
        rankingScore: 0,
        eta: '2/28/2025',
        state: 'Planned' as const
    },
    {
        name: 'Deploy EDS solution',
        category: '-',
        function: 'Protect',
        domain: 'DEMO',
        rankingScore: 0,
        eta: '2/2/2025',
        state: 'Planned' as const
    },
    {
        name: 'CMS simulation exercise',
        category: '-',
        function: 'Respond',
        domain: 'DEMO',
        rankingScore: 0,
        eta: '2/28/2025',
        state: 'Planned' as const
    },
    {
        name: 'Multi-regions pattern for vulnerabilities',
        category: 'Technical',
        function: 'Protect',
        domain: 'DEMO',
        rankingScore: 0,
        eta: '2/28/2025',
        state: 'Planned' as const
    },
    {
        name: 'Role Base Access Control (RBAC)',
        category: 'Technical',
        function: 'Protect',
        domain: 'DEMO',
        rankingScore: 0,
        eta: '1/17/2025',
        state: 'Planned' as const
    }
];

const watchListItems = [
    {
        name: 'Items that have expired or will expire in the next 30 days',
        category: '',
        function: '',
        domain: '',
        rankingScore: 0,
        eta: '',
        state: 'Planned' as const
    }
];

const acceptanceItems: any[] = [];

const stats = {
    domains: 4,
    perimeters: 6,
    appliedControls: 42,
    riskAssessments: 3,
    audits: 4,
    policies: 11
};

export const SummaryTab = () => {
    return (
        <div className="space-y-6">
            <StatisticsOverview stats={stats} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium">Audit status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <StackedBarChart
                            data={[{ name: 'Status', ...auditStatusData.reduce((acc, item) => ({ ...acc, [item.name]: item.value }), {}) }]}
                            keys={auditStatusData.map(item => ({ dataKey: item.name, fill: item.color, name: item.name }))}
                            vertical
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium">Risk assessment status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <StackedBarChart
                            data={[{ name: 'Status', ...riskAssessmentData.reduce((acc, item) => ({ ...acc, [item.name]: item.value }), {}) }]}
                            keys={riskAssessmentData.map(item => ({ dataKey: item.name, fill: item.color, name: item.name }))}
                            vertical
                        />
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium">Used frameworks</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <HorizontalBarChart data={frameworksData} />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium">Risk scenarios status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <DonutChart data={riskScenariosData} centerText="Total" />
                    </CardContent>
                </Card>
            </div>

            <ControlsTable
                title="Your pending applied controls"
                subtitle="Over the next 30 days and ordered by ranking score"
                controls={pendingControls}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ControlsTable
                    title="Watch list"
                    subtitle="Items that have expired or will expire in the next 30 days"
                    controls={watchListItems}
                    showActions={false}
                />

                <ControlsTable
                    title="Acceptances to review"
                    controls={acceptanceItems}
                    showActions={false}
                />
            </div>
        </div>
    );
};

export default SummaryTab;