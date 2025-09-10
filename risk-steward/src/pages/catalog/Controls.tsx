import { useState } from "react";
import { DataTable, Column, StatusBadge } from "@/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

const mockControls = [
    {
        id: 1,
        controlId: "AC-001",
        name: "Account Management",
        description: "Manages information system accounts including establishment, activation, modification, review, and removal",
        category: "Access Control",
        type: "Administrative",
        implementation: "Implemented",
        effectiveness: "High",
        frameworks: ["NIST", "ISO 27001", "SOC 2"],
        owner: "IT Security Team",
        lastReview: "2024-01-10"
    },
    {
        id: 2,
        controlId: "AC-002",
        name: "Account Management - Automated",
        description: "Automated mechanisms to support the management of information system accounts",
        category: "Access Control",
        type: "Technical",
        implementation: "Planned",
        effectiveness: "Medium",
        frameworks: ["NIST", "ISO 27001"],
        owner: "DevOps Team",
        lastReview: "2024-01-05"
    },
    {
        id: 3,
        controlId: "IA-001",
        name: "Identification and Authentication Policy",
        description: "Establishes policy for identification and authentication of users and devices",
        category: "Identity & Authentication",
        type: "Administrative",
        implementation: "Implemented",
        effectiveness: "High",
        frameworks: ["NIST", "PCI DSS"],
        owner: "Security Officer",
        lastReview: "2024-01-08"
    },
    {
        id: 4,
        controlId: "SC-001",
        name: "System and Communications Protection",
        description: "Monitors, controls, and protects communications at system boundaries",
        category: "System Protection",
        type: "Technical",
        implementation: "Partially Implemented",
        effectiveness: "Medium",
        frameworks: ["NIST", "ISO 27001", "SOC 2"],
        owner: "Network Team",
        lastReview: "2023-12-28"
    },
    {
        id: 5,
        controlId: "AU-001",
        name: "Audit and Accountability Policy",
        description: "Establishes policy and procedures for audit logging and monitoring",
        category: "Audit & Accountability",
        type: "Administrative",
        implementation: "Implemented",
        effectiveness: "High",
        frameworks: ["NIST", "SOC 2", "PCI DSS"],
        owner: "Compliance Team",
        lastReview: "2024-01-12"
    }
];

const columns: Column[] = [
    {
        key: 'controlId',
        title: 'Control ID',
        render: (value, record) => (
            <div>
                <div className="font-mono font-medium text-primary">{value}</div>
                <div className="font-medium">{record.name}</div>
                <div className="text-sm text-muted-foreground">{record.description}</div>
            </div>
        )
    },
    { key: 'category', title: 'Category' },
    { key: 'type', title: 'Type' },
    {
        key: 'implementation',
        title: 'Implementation',
        render: (value) => <StatusBadge status={value} />
    },
    {
        key: 'frameworks',
        title: 'Frameworks',
        render: (value) => (
            <div className="flex flex-wrap gap-1">
                {value.map((framework: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-xs">
                        {framework}
                    </Badge>
                ))}
            </div>
        )
    },
    { key: 'owner', title: 'Owner' },
    { key: 'lastReview', title: 'Last Review' }
];

export default function Controls() {
    const [data, setData] = useState(mockControls);

    const handleAdd = () => {
        toast({
            title: "Add Control",
            description: "Opening control creation form...",
        });
    };

    const handleEdit = (record: any) => {
        toast({
            title: "Edit Control",
            description: `Editing ${record.controlId} - ${record.name}...`,
        });
    };

    const handleDelete = (record: any) => {
        toast({
            title: "Delete Control",
            description: `Deleting ${record.controlId}...`,
            variant: "destructive",
        });
    };

    const handleView = (record: any) => {
        toast({
            title: "View Control",
            description: `Viewing details for ${record.controlId}...`,
        });
    };

    return (
        <DataTable
            title="Reference Controls"
            description="Manage security controls and their implementation across frameworks"
            columns={columns}
            data={data}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
        />
    );
}