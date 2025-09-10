import { useState } from "react";
import { DataTable, Column, StatusBadge } from "@/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

const mockMappings = [
    {
        id: 1,
        name: "NIST to ISO 27001 Mapping",
        sourceFramework: "NIST Cybersecurity Framework",
        targetFramework: "ISO 27001:2022",
        mappingType: "Direct",
        completeness: "95%",
        status: "Active",
        controlsMapped: 147,
        totalControls: 156,
        lastUpdated: "2024-01-15",
        validator: "Security Team"
    },
    {
        id: 2,
        name: "SOC 2 to NIST Mapping",
        sourceFramework: "SOC 2 Type II",
        targetFramework: "NIST Cybersecurity Framework",
        mappingType: "Partial",
        completeness: "78%",
        status: "In Progress",
        controlsMapped: 61,
        totalControls: 78,
        lastUpdated: "2024-01-10",
        validator: "Compliance Officer"
    },
    {
        id: 3,
        name: "PCI DSS to ISO 27001 Mapping",
        sourceFramework: "PCI DSS v4.0",
        targetFramework: "ISO 27001:2022",
        mappingType: "Cross-Reference",
        completeness: "100%",
        status: "Active",
        controlsMapped: 45,
        totalControls: 45,
        lastUpdated: "2024-01-08",
        validator: "Payment Security Team"
    },
    {
        id: 4,
        name: "Custom Framework Mapping",
        sourceFramework: "Internal Security Framework",
        targetFramework: "NIST Cybersecurity Framework",
        mappingType: "Custom",
        completeness: "65%",
        status: "Draft",
        controlsMapped: 89,
        totalControls: 137,
        lastUpdated: "2024-01-05",
        validator: "Internal Audit"
    }
];

const columns: Column[] = [
    {
        key: 'name',
        title: 'Mapping Name',
        render: (value, record) => (
            <div>
                <div className="font-medium">{value}</div>
                <div className="text-sm text-muted-foreground">
                    {record.sourceFramework} → {record.targetFramework}
                </div>
            </div>
        )
    },
    {
        key: 'mappingType',
        title: 'Type',
        render: (value) => (
            <Badge variant="outline" className="capitalize">
                {value}
            </Badge>
        )
    },
    {
        key: 'completeness',
        title: 'Completeness',
        render: (value, record) => (
            <div>
                <div className="font-medium">{value}</div>
                <div className="text-sm text-muted-foreground">
                    {record.controlsMapped}/{record.totalControls} controls
                </div>
            </div>
        )
    },
    {
        key: 'status',
        title: 'Status',
        render: (value) => <StatusBadge status={value} />
    },
    { key: 'validator', title: 'Validator' },
    { key: 'lastUpdated', title: 'Last Updated' }
];

export default function Mappings() {
    const [data, setData] = useState(mockMappings);

    const handleAdd = () => {
        toast({
            title: "Add Mapping",
            description: "Opening framework mapping wizard...",
        });
    };

    const handleEdit = (record: any) => {
        toast({
            title: "Edit Mapping",
            description: `Editing ${record.name}...`,
        });
    };

    const handleDelete = (record: any) => {
        toast({
            title: "Delete Mapping",
            description: `Deleting ${record.name}...`,
            variant: "destructive",
        });
    };

    const handleView = (record: any) => {
        toast({
            title: "View Mapping",
            description: `Viewing details for ${record.name}...`,
        });
    };

    return (
        <DataTable
            title="Mappings"
            description="Create and manage mappings between different security frameworks"
            columns={columns}
            data={data}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
        />
    );
}