import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface DonutChartProps {
    data: Array<{
        name: string;
        value: number;
        color: string;
    }>;
    title?: string;
    centerText?: string;
}

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0];
        return (
            <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
                <p className="font-medium text-foreground">{data.name}</p>
                <p className="text-sm text-muted-foreground">
                    Value: <span className="font-semibold text-foreground">{data.value}</span>
                </p>
            </div>
        );
    }
    return null;
};

export const DonutChart = ({ data, title, centerText }: DonutChartProps) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);

    return (
        <div className="relative">
            {title && <h3 className="text-sm font-medium mb-2 text-foreground">{title}</h3>}
            <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                </PieChart>
            </ResponsiveContainer>
            {centerText && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <div className="text-lg font-bold text-foreground">{total}</div>
                        <div className="text-xs text-muted-foreground">{centerText}</div>
                    </div>
                </div>
            )}
        </div>
    );
};