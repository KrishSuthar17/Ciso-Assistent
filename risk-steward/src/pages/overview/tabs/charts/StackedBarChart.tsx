import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface StackedBarChartProps {
    data: Array<{
        name: string;
        [key: string]: string | number;
    }>;
    keys: Array<{
        dataKey: string;
        fill: string;
        name: string;
    }>;
    title?: string;
    vertical?: boolean;
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
                <p className="font-medium text-foreground mb-2">{label}</p>
                {payload.map((entry: any, index: number) => (
                    <p key={index} className="text-sm text-muted-foreground">
                        <span style={{ color: entry.color }}>●</span> {entry.name}: {entry.value}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

export const StackedBarChart = ({ data, keys, title, vertical = false }: StackedBarChartProps) => {
    return (
        <div>
            {title && <h3 className="text-sm font-medium mb-4 text-foreground">{title}</h3>}
            <ResponsiveContainer width="100%" height={200}>
                <BarChart
                    data={data}
                    layout={vertical ? "horizontal" : "vertical"}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    {vertical ? (
                        <>
                            <XAxis type="number" hide />
                            <YAxis
                                type="category"
                                dataKey="name"
                                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                                width={80}
                            />
                        </>
                    ) : (
                        <>
                            <XAxis
                                dataKey="name"
                                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                            />
                            <YAxis hide />
                        </>
                    )}
                    <Tooltip content={<CustomTooltip />} />
                    {keys.map((key) => (
                        <Bar
                            key={key.dataKey}
                            dataKey={key.dataKey}
                            stackId="a"
                            fill={key.fill}
                            radius={vertical ? [0, 2, 2, 0] : [2, 2, 0, 0]}
                        />
                    ))}
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};