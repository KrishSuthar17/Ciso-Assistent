import { RadarChart as RechartsRadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';

interface RadarChartProps {
    data: Array<{
        subject: string;
        value: number;
        fullMark: number;
    }>;
    title?: string;
}

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0];
        return (
            <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
                <p className="font-medium text-foreground">{data.payload.subject}</p>
                <p className="text-sm text-muted-foreground">
                    Score: <span className="font-semibold text-foreground">{data.value}</span>
                </p>
            </div>
        );
    }
    return null;
};

export const RadarChart = ({ data, title }: RadarChartProps) => {
    return (
        <div>
            {title && <h3 className="text-sm font-medium mb-4 text-foreground">{title}</h3>}
            <ResponsiveContainer width="100%" height={300}>
                <RechartsRadarChart data={data}>
                    <PolarGrid stroke="hsl(var(--border))" />
                    <PolarAngleAxis
                        dataKey="subject"
                        tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <PolarRadiusAxis
                        tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                        domain={[0, 'dataMax']}
                    />
                    <Radar
                        name="Risk Score"
                        dataKey="value"
                        stroke="hsl(var(--chart-primary))"
                        fill="hsl(var(--chart-primary))"
                        fillOpacity={0.3}
                        strokeWidth={2}
                    />
                    <Tooltip content={<CustomTooltip />} />
                </RechartsRadarChart>
            </ResponsiveContainer>
        </div>
    );
};