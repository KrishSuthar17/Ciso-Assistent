import { useState } from "react";
import { DataTable, Column, StatusBadge } from "@/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

const mockThreats = [
    {
        id: 1,
        name: "Advanced Persistent Threat (APT)",
        category: "Cyber Attack",
        severity: "Critical",
        likelihood: "Medium",
        description: "Sophisticated, long-term cyberattack targeting specific entities",
        affectedAssets: ["Network Infrastructure", "Databases", "User Accounts"],
        lastAssessed: "2024-01-15",
        mitigationStatus: "In Progress"
    },
    {
        id: 2,
        name: "Ransomware Attack",
        category: "Malware",
        severity: "High",
        likelihood: "High",
        description: "Malicious software that encrypts data and demands payment",
        affectedAssets: ["File Systems", "Databases", "Backup Systems"],
        lastAssessed: "2024-01-12",
        mitigationStatus: "Active"
    },
    {
        id: 3,
        name: "Insider Threat",
        category: "Human Factor",
        severity: "High",
        likelihood: "Medium",
        description: "Security threat from individuals within the organization",
        affectedAssets: ["Confidential Data", "System Access", "IP"],
        lastAssessed: "2024-01-08",
        mitigationStatus: "Monitoring"
    },
    {
        id: 4,
        name: "DDoS Attack",
        category: "Network Attack",
        severity: "Medium",
        likelihood: "High",
        description: "Distributed denial-of-service attack overwhelming system resources",
        affectedAssets: ["Web Services", "API Endpoints", "CDN"],
        lastAssessed: "2024-01-05",
        mitigationStatus: "Active"
    },
    {
        id: 5,
        name: "Supply Chain Attack",
        category: "Third Party",
        severity: "High",
        likelihood: "Low",
        description: "Attack targeting less-secure elements in the supply network",
        affectedAssets: ["Third-party Software", "Vendor Access", "Dependencies"],
        lastAssessed: "2023-12-28",
        mitigationStatus: "Planning"
    }
];

const columns: Column[] = [
    {
        key: 'name',
        title: 'Threat Name',
        render: (value, record) => (
            <div>
                <div className="font-medium">{value}</div>
                <div className="text-sm text-muted-foreground">{record.description}</div>
            </div>
        )
    },
    { key: 'category', title: 'Category' },
    {
        key: 'severity',
        title: 'Severity',
        render: (value) => <StatusBadge status={value} />
    },
    {
        key: 'likelihood',
        title: 'Likelihood',
        render: (value) => <StatusBadge status={value} />
    },
    {
        key: 'affectedAssets',
        title: 'Affected Assets',
        render: (value) => (
            <div className="flex flex-wrap gap-1">
                {value.slice(0, 2).map((asset: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-xs">
                        {asset}
                    </Badge>
                ))}
                {value.length > 2 && (
                    <Badge variant="secondary" className="text-xs">
                        +{value.length - 2} more
                    </Badge>
                )}
            </div>
        )
    },
    { key: 'lastAssessed', title: 'Last Assessed' }
];

export default function Threats() {
    const [data, setData] = useState(mockThreats);

    const handleAdd = () => {
        toast({
            title: "Add Threat",
            description: "Opening threat assessment form...",
        });
    };

    const handleEdit = (record: any) => {
        toast({
            title: "Edit Threat",
            description: `Editing ${record.name}...`,
        });
    };

    const handleDelete = (record: any) => {
        toast({
            title: "Delete Threat",
            description: `Deleting ${record.name}...`,
            variant: "destructive",
        });
    };

    const handleView = (record: any) => {
        toast({
            title: "View Threat",
            description: `Viewing details for ${record.name}...`,
        });
    };

    return (
        <DataTable
            title="Threats"
            description="Identify and manage security threats across your organization"
            columns={columns}
            data={data}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
        />
    );
}