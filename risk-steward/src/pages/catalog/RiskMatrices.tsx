import { useState } from "react";
import { DataTable, Column, StatusBadge } from "@/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

const mockRiskMatrices = [
    {
        id: 1,
        name: "Enterprise Risk Matrix",
        description: "Primary risk assessment matrix for enterprise-wide threats",
        dimensions: "5x5",
        probabilityLevels: ["Very Low", "Low", "Medium", "High", "Very High"],
        impactLevels: ["Negligible", "Minor", "Moderate", "Major", "Catastrophic"],
        riskLevels: ["Low", "Medium", "High", "Critical"],
        status: "Active",
        applicableTo: "All Assets",
        lastUpdated: "2024-01-15",
        createdBy: "Risk Management Team"
    },
    {
        id: 2,
        name: "Financial Impact Matrix",
        description: "Specialized matrix for financial and monetary impact assessment",
        dimensions: "4x4",
        probabilityLevels: ["Rare", "Unlikely", "Possible", "Likely"],
        impactLevels: ["< $10K", "$10K-$100K", "$100K-$1M", "> $1M"],
        riskLevels: ["Acceptable", "Moderate", "High", "Unacceptable"],
        status: "Active",
        applicableTo: "Financial Systems",
        lastUpdated: "2024-01-12",
        createdBy: "Finance Security Team"
    },
    {
        id: 3,
        name: "Operational Risk Matrix",
        description: "Matrix for assessing operational and business continuity risks",
        dimensions: "3x5",
        probabilityLevels: ["Low", "Medium", "High"],
        impactLevels: ["Minimal", "Minor", "Moderate", "Major", "Severe"],
        riskLevels: ["Green", "Yellow", "Orange", "Red"],
        status: "Draft",
        applicableTo: "Operations",
        lastUpdated: "2024-01-08",
        createdBy: "Operations Team"
    },
    {
        id: 4,
        name: "Privacy Risk Matrix",
        description: "Specialized matrix for privacy and data protection risks",
        dimensions: "4x5",
        probabilityLevels: ["Very Unlikely", "Unlikely", "Possible", "Likely"],
        impactLevels: ["Limited", "Significant", "Substantial", "Major", "Severe"],
        riskLevels: ["Low", "Medium", "High", "Very High"],
        status: "Active",
        applicableTo: "Data Processing",
        lastUpdated: "2024-01-10",
        createdBy: "Privacy Office"
    }
];

const columns: Column[] = [
    {
        key: 'name',
        title: 'Matrix Name',
        render: (value, record) => (
            <div>
                <div className="font-medium">{value}</div>
                <div className="text-sm text-muted-foreground">{record.description}</div>
            </div>
        )
    },
    {
        key: 'dimensions',
        title: 'Dimensions',
        render: (value) => (
            <Badge variant="outline" className="font-mono">
                {value}
            </Badge>
        )
    },
    {
        key: 'riskLevels',
        title: 'Risk Levels',
        render: (value) => (
            <div className="flex flex-wrap gap-1">
                {value.slice(0, 3).map((level: string, index: number) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                        {level}
                    </Badge>
                ))}
                {value.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                        +{value.length - 3}
                    </Badge>
                )}
            </div>
        )
    },
    {
        key: 'status',
        title: 'Status',
        render: (value) => <StatusBadge status={value} />
    },
    { key: 'applicableTo', title: 'Applicable To' },
    { key: 'createdBy', title: 'Created By' },
    { key: 'lastUpdated', title: 'Last Updated' }
];

export default function RiskMatrices() {
    const [data, setData] = useState(mockRiskMatrices);

    const handleAdd = () => {
        toast({
            title: "Add Risk Matrix",
            description: "Opening risk matrix builder...",
        });
    };

    const handleEdit = (record: any) => {
        toast({
            title: "Edit Risk Matrix",
            description: `Editing ${record.name}...`,
        });
    };

    const handleDelete = (record: any) => {
        toast({
            title: "Delete Risk Matrix",
            description: `Deleting ${record.name}...`,
            variant: "destructive",
        });
    };

    const handleView = (record: any) => {
        toast({
            title: "View Risk Matrix",
            description: `Viewing ${record.name} details...`,
        });
    };

    return (
        <DataTable
            title="Risk Matrices"
            description="Define and manage risk assessment matrices for different asset types"
            columns={columns}
            data={data}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
        />
    );
}