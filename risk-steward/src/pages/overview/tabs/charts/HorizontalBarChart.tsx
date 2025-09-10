import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

interface HorizontalBarChartProps {
    data: Array<{
        name: string;
        value: number;
        color?: string;
    }>;
    title?: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
                <p className="font-medium text-foreground">{label}</p>
                <p className="text-sm text-muted-foreground">
                    Value: <span className="font-semibold text-foreground">{payload[0].value}</span>
                </p>
            </div>
        );
    }
    return null;
};

export const HorizontalBarChart = ({ data, title }: HorizontalBarChartProps) => {
    return (
        <div>
            {title && <h3 className="text-sm font-medium mb-4 text-foreground">{title}</h3>}
            <ResponsiveContainer width="100%" height={200}>
                <BarChart data={data} layout="horizontal" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <XAxis type="number" hide />
                    <YAxis
                        type="category"
                        dataKey="name"
                        tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                        width={120}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value" fill="hsl(var(--chart-primary))" radius={[0, 4, 4, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};