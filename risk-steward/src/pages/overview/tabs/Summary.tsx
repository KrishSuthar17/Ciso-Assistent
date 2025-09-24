import React, { useEffect, useState } from 'react'
import { Link, Outlet, useLocation } from "react-router-dom";


import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    Radar,
    PieChart,
    Pie,
    Cell,
} from "recharts";


const controlData = [
    { subject: "Govern", value: 120 },
    { subject: "Identify", value: 80 },
    { subject: "Protect", value: 50 },
    { subject: "Detect", value: 40 },
    { subject: "Respond", value: 30 },
    { subject: "Recover", value: 20 },
    { subject: "(undefined)", value: 10 },
];



const Summary = () => {
    const [data, setData] = useState<any>(null);
    const [activeCurrent, setActiveCurrent] = useState<number | null>(null);
    const [activeResidual, setActiveResidual] = useState<number | null>(null);

    // dynamic data 
    const [controls, setControls] = useState<any[]>([]);
    const [Asset, setAssets] = useState<any[]>([]);
    const [risks, setRisks] = useState<any[]>([]);



    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/dashboard/")
            .then((res) => res.json())
            .then((json) => setData(json))
            .catch((err) => console.error(err));
    }, []);



    if (!data) return <p>Loading...</p>;

    // Controls summary cards
    const controlsSummary = [
        { label: "Total Controls", value: data.controls.total },
        { label: "Active", value: data.controls.active },
        { label: "Deprecated", value: data.controls.deprecated },
        { label: "To Do", value: data.controls.todo },
        { label: "In Progress", value: data.controls.in_progress },
        { label: "On Hold", value: data.controls.on_hold },
        { label: "Pending P1", value: data.controls.pending_p1 },
        { label: "Missed ETA", value: data.controls.missed_eta },
    ];

    // Compliance cards
    const complianceCards = [
        { label: "Used Frameworks", value: data.compliance.frameworks },
        { label: "Active Audits", value: data.compliance.active_audits },
        { label: "Average Progress", value: data.compliance.progress },
        { label: "Non Compliant Items", value: data.compliance.non_compliant_items },
        { label: "Evidences", value: data.compliance.evidences },
    ];

    // Risk cards
    // Risk cards dynamically
    const riskCards = [
        { label: "Assessments", value: data.risks.assessments },
        { label: "Scenarios", value: data.risks.scenarios },
        { label: "Mapped Threats", value: data.risks.mapped_threats },
        { label: "Risk Accepted", value: data.risks.accepted },
    ];

    // Current Risks
    const currentRisksData = data.charts.current_risks.map((risk: any) => ({
        name: risk.name,
        value: risk.value,
        color: risk.color,
    }));

    // Residual Risks
    const residualRisksData = data.charts.residual_risks.map((risk: any) => ({
        name: risk.name,
        value: risk.value,
        color: risk.color,
    }));


    // Radar chart for controls
    const controlData = Object.entries(data.controls)
        .filter(([key, _]) =>
            ["total", "active", "deprecated", "todo", "in_progress", "on_hold", "pending_p1", "missed_eta"].includes(key)
        )
        .map(([key, value]) => ({ subject: key.replace("_", " ").toUpperCase(), value }));

    // Assets bar chart (if needed from audits)
    const assetsData = data.audits.map((audit: any) => ({
        name: audit.name,
        type: audit.notAssessed ? "Not Assessed" : audit.partial ? "Partial" : "Other",
    }));

    // Pie chart data for risks
    const gaugeData = [
        { name: "Low", value: data.charts.current_risks.find((r: any) => r.name === "Low")?.value || 0, color: "#4ade80" },
        { name: "Medium", value: data.charts.current_risks.find((r: any) => r.name === "Medium")?.value || 0, color: "#facc15" },
        { name: "High", value: data.charts.current_risks.find((r: any) => r.name === "High")?.value || 0, color: "#f87171" },
    ];


    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Controls Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {controlsSummary.map((card, i) => (
                        <Card key={i}>
                            <CardContent className="p-4">
                                <p className="text-purple-600 text-xs uppercase">Controls</p>
                                <h3 className="text-2xl font-bold">{card.value}</h3>
                                <p className="text-gray-500">{card.label}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>


                {/* Radar Chart */}
                <Card className="mb-6 flex items-center justify-center">
                    <CardContent className="w-full h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart outerRadius={120} data={controlData}>
                                <PolarGrid />
                                <PolarAngleAxis dataKey="subject" />
                                <Tooltip />
                                <Radar name="Controls" dataKey="value" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

            </div>


            {/* Middle Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="col-span-2">
                    <CardHeader>
                        <CardTitle>Assets Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={assetsData} layout="vertical">
                                <XAxis type="number" hide />
                                <YAxis type="category" dataKey="name" />
                                <Tooltip />
                                <Bar dataKey="type" fill="#38bdf8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mt-6 mb-6">
                    {complianceCards.map((card, i) => (
                        <Card key={i}>
                            <CardContent className="p-4">
                                <p className="text-purple-600 text-xs uppercase">Compliance</p>
                                <h3 className="text-2xl font-bold">{card.value}</h3>
                                <p className="text-gray-500">{card.label}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Gauges Section */}
            {/* Gauges Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                {/* Current Risks */}
                <Card>
                    <CardHeader>
                        <CardTitle>Current Risks</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                                <Pie
                                    data={currentRisksData}
                                    cx="50%"
                                    cy="100%"
                                    startAngle={180}
                                    endAngle={0}
                                    innerRadius={60}
                                    outerRadius={90}
                                    paddingAngle={2}
                                    dataKey="value"
                                    onMouseEnter={(_, index) => setActiveCurrent(index)}
                                    onMouseLeave={() => setActiveCurrent(null)}
                                >
                                    {currentRisksData.map((entry, index) => (
                                        <Cell
                                            key={`cell-current-${index}`}
                                            fill={entry.color}
                                            stroke={index === activeCurrent ? "#000" : "none"}
                                            strokeWidth={index === activeCurrent ? 3 : 0}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value, name) => [
                                        value,
                                        activeCurrent !== null ? currentRisksData[activeCurrent].name : name,
                                    ]}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Middle Risk Info Cards */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    {riskCards.map((card, i) => (
                        <Card key={i}>
                            <CardContent className="p-4">
                                <p className="text-purple-600 text-xs uppercase">Risk</p>
                                <h3 className="text-2xl font-bold">
                                    {typeof card.value === "number" ? card.value : "N/A"}
                                </h3>
                                <p className="text-gray-500">{card.label}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>





                {/* Residual Risks */}
                <Card>
                    <CardHeader>
                        <CardTitle>Residual Risks</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                                <Pie
                                    data={residualRisksData}
                                    cx="50%"
                                    cy="100%"
                                    startAngle={180}
                                    endAngle={0}
                                    innerRadius={60}
                                    outerRadius={90}
                                    paddingAngle={2}
                                    dataKey="value"
                                    onMouseEnter={(_, index) => setActiveResidual(index)}
                                    onMouseLeave={() => setActiveResidual(null)}
                                >
                                    {residualRisksData.map((entry, index) => (
                                        <Cell
                                            key={`cell-residual-${index}`}
                                            fill={entry.color}
                                            stroke={index === activeResidual ? "#000" : "none"}
                                            strokeWidth={index === activeResidual ? 3 : 0}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value, name) => [
                                        value,
                                        activeResidual !== null ? residualRisksData[activeResidual].name : name,
                                    ]}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </>
    )
};

export default Summary