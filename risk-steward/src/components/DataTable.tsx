import { ReactNode, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Plus, Search, Edit, Trash2, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Column {
    key: string;
    title: string;
    render?: (value: any, record: any) => ReactNode;
}

export interface DataTableProps {
    title: string;
    description?: string;
    columns: Column[];
    data: any[];
    onAdd?: () => void;
    onEdit?: (record: any) => void;
    onDelete?: (record: any) => void;
    onView?: (record: any) => void;
    loading?: boolean;
}

export function DataTable({
    title,
    description,
    columns,
    data,
    onAdd,
    onEdit,
    onDelete,
    onView,
    loading = false
}: DataTableProps) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredData = data.filter(record =>
        Object.values(record).some(value =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
                    {description && (
                        <p className="text-muted-foreground mt-1">{description}</p>
                    )}
                </div>
                {onAdd && (
                    <Button onClick={onAdd} className="gap-2">
                        <Plus className="w-4 h-4" />
                        Add New
                    </Button>
                )}
            </div>

            {/* Search */}
            <div className="flex items-center space-x-2">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9"
                    />
                </div>
            </div>

            {/* Table */}
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-lg">
                        {filteredData.length} {filteredData.length === 1 ? 'item' : 'items'}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableHead key={column.key}>{column.title}</TableHead>
                                ))}
                                <TableHead className="w-[100px]">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={columns.length + 1} className="text-center py-8">
                                        <div className="animate-pulse">Loading...</div>
                                    </TableCell>
                                </TableRow>
                            ) : filteredData.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={columns.length + 1} className="text-center py-8">
                                        <div className="text-muted-foreground">
                                            {searchTerm ? 'No items match your search.' : 'No items found.'}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredData.map((record, index) => (
                                    <TableRow key={record.id || index}>
                                        {columns.map((column) => (
                                            <TableCell key={column.key}>
                                                {column.render
                                                    ? column.render(record[column.key], record)
                                                    : record[column.key]
                                                }
                                            </TableCell>
                                        ))}
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="bg-popover border z-50">
                                                    {onView && (
                                                        <DropdownMenuItem onClick={() => onView(record)}>
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            View
                                                        </DropdownMenuItem>
                                                    )}
                                                    {onEdit && (
                                                        <DropdownMenuItem onClick={() => onEdit(record)}>
                                                            <Edit className="mr-2 h-4 w-4" />
                                                            Edit
                                                        </DropdownMenuItem>
                                                    )}
                                                    {onDelete && (
                                                        <DropdownMenuItem
                                                            onClick={() => onDelete(record)}
                                                            className="text-destructive focus:text-destructive"
                                                        >
                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                            Delete
                                                        </DropdownMenuItem>
                                                    )}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}

// Status Badge Component
export function StatusBadge({ status }: { status: string }) {
    const getVariant = (status: string) => {
        switch (status.toLowerCase()) {
            case 'active': return 'default';
            case 'inactive': return 'secondary';
            case 'critical': return 'destructive';
            case 'high': return 'destructive';
            case 'medium': return 'default';
            case 'low': return 'secondary';
            default: return 'outline';
        }
    };

    return (
        <Badge variant={getVariant(status)} className="capitalize">
            {status}
        </Badge>
    );
}