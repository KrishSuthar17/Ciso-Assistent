import { useState } from "react";
import { DataTable, Column, StatusBadge } from "@/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import { TrendingUp, DollarSign, Clock, Users } from "lucide-react";

const mockAnalyses = [
    {
        id: 1,
        assetName: "Customer Database",
        analysisType: "Availability Impact",
        businessFunction: "Customer Service",
        impactLevel: "High",
        financialImpact: "$50K/hour",
        operationalImpact: "Service Degradation",
        reputationalImpact: "Medium",
        recoveryTime: "4 hours",
        affectedUsers: "15,000",
        lastReviewed: "2024-01-15",
        status: "Approved"
    },
    {
        id: 2,
        assetName: "Payment Processing API",
        analysisType: "Confidentiality Impact",
        businessFunction: "Payment Processing",
        impactLevel: "Critical",
        financialImpact: "$500K+",
        operationalImpact: "Complete Shutdown",
        reputationalImpact: "High",
        recoveryTime: "24 hours",
        affectedUsers: "50,000",
        lastReviewed: "2024-01-12",
        status: "Approved"
    },
    {
        id: 3,
        assetName: "Employee Workstations",
        analysisType: "Integrity Impact",
        businessFunction: "Daily Operations",
        impactLevel: "Medium",
        financialImpact: "$5K/hour",
        operationalImpact: "Productivity Loss",
        reputationalImpact: "Low",
        recoveryTime: "2 hours",
        affectedUsers: "500",
        lastReviewed: "2024-01-10",
        status: "Under Review"
    },
    {
        id: 4,
        assetName: "Network Infrastructure",
        analysisType: "Availability Impact",
        businessFunction: "All Systems",
        impactLevel: "Critical",
        financialImpact: "$200K/hour",
        operationalImpact: "Total Outage",
        reputationalImpact: "High",
        recoveryTime: "8 hours",
        affectedUsers: "All Users",
        lastReviewed: "2024-01-08",
        status: "Approved"
    }
];

const impactStats = [
    {
        title: "Average Financial Impact",
        value: "$189K/hour",
        icon: DollarSign,
        color: "text-red-600"
    },
    {
        title: "Average Recovery Time",
        value: "9.5 hours",
        icon: Clock,
        color: "text-yellow-600"
    },
    {
        title: "Total Affected Users",
        value: "65,500+",
        icon: Users,
        color: "text-blue-600"
    },
    {
        title: "Critical Assets",
        value: "28%",
        icon: TrendingUp,
        color: "text-purple-600"
    }
];

const columns: Column[] = [
    {
        key: 'assetName',
        title: 'Asset',
        render: (value, record) => (
            <div>
                <div className="font-medium">{value}</div>
                <div className="text-sm text-muted-foreground">{record.analysisType}</div>
            </div>
        )
    },
    { key: 'businessFunction', title: 'Business Function' },
    {
        key: 'impactLevel',
        title: 'Impact Level',
        render: (value) => <StatusBadge status={value} />
    },
    {
        key: 'financialImpact',
        title: 'Financial Impact',
        render: (value) => <span className="font-medium text-red-600">{value}</span>
    },
    { key: 'recoveryTime', title: 'Recovery Time' },
    { key: 'affectedUsers', title: 'Affected Users' },
    {
        key: 'status',
        title: 'Status',
        render: (value) => <StatusBadge status={value} />
    },
    { key: 'lastReviewed', title: 'Last Reviewed' }
];

export default function ImpactAnalysis() {
    const [data, setData] = useState(mockAnalyses);

    const handleAdd = () => {
        toast({
            title: "Add Impact Analysis",
            description: "Opening business impact analysis form...",
        });
    };

    const handleEdit = (record: any) => {
        toast({
            title: "Edit Impact Analysis",
            description: `Editing analysis for ${record.assetName}...`,
        });
    };

    const handleDelete = (record: any) => {
        toast({
            title: "Delete Impact Analysis",
            description: `Deleting analysis for ${record.assetName}...`,
            variant: "destructive",
        });
    };

    const handleView = (record: any) => {
        toast({
            title: "View Impact Analysis",
            description: `Viewing analysis for ${record.assetName}...`,
        });
    };

    return (
        <div className="space-y-6">
            {/* Impact Overview Stats */}
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">Business Impact Analysis</h1>
                <p className="text-muted-foreground mt-1">
                    Assess and quantify the potential business impact of asset disruptions
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {impactStats.map((stat, index) => (
                    <Card key={index}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                {stat.title}
                            </CardTitle>
                            <stat.icon className={`h-4 w-4 ${stat.color}`} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Risk Distribution */}
            <Card>
                <CardHeader>
                    <CardTitle>Impact Level Distribution</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
                                <span className="text-sm">Critical Impact</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Progress value={50} className="w-20" />
                                <span className="text-sm font-medium">2 assets</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-yellow-500 rounded-sm"></div>
                                <span className="text-sm">High Impact</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Progress value={25} className="w-20" />
                                <span className="text-sm font-medium">1 asset</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
                                <span className="text-sm">Medium Impact</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Progress value={25} className="w-20" />
                                <span className="text-sm font-medium">1 asset</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <DataTable
                title=""
                columns={columns}
                data={data}
                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={handleView}
            />
        </div>
    );
}