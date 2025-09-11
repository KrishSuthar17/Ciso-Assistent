import React, { useState } from 'react'
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



const auditsData = [
    { name: "CSF baseline", notAssessed: 23, partial: 18, nonCompliant: 15, compliant: 31, notApplicable: 13 },
    { name: "GDPR review", notAssessed: 5, partial: 26, nonCompliant: 16, compliant: 37, notApplicable: 16 },
    { name: "ISO 27002 SOA", notAssessed: 1, partial: 37, nonCompliant: 19, compliant: 32, notApplicable: 11 },
    { name: "Quick start audit", notAssessed: 100 },
];

const controlData = [
    { subject: "Govern", value: 120 },
    { subject: "Identify", value: 80 },
    { subject: "Protect", value: 50 },
    { subject: "Detect", value: 40 },
    { subject: "Respond", value: 30 },
    { subject: "Recover", value: 20 },
    { subject: "(undefined)", value: 10 },
];

const gaugeData = [
    { name: "Very Low", value: 20, color: "#bbf7d0" },
    { name: "Low", value: 20, color: "#86efac" },
    { name: "Medium", value: 20, color: "#fde047" },
    { name: "High", value: 20, color: "#f97316" },
];

const Summary = () => {

    const [activeCurrent, setActiveCurrent] = useState<number | null>(null);
    const [activeResidual, setActiveResidual] = useState<number | null>(null);

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Controls Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: "Total Controls", value: 42 },
                        { label: "Active", value: 3 },
                        { label: "Deprecated", value: 1 },
                        { label: "To Do", value: 1 },
                        { label: "In Progress", value: 5 },
                        { label: "On Hold", value: 0 },
                        { label: "Pending P1", value: 1 },
                        { label: "Missed ETA", value: 5 },
                    ].map((card, i) => (
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
                <Card className="flex items-center justify-center">
                    <CardContent className="w-full h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart outerRadius={120} data={controlData}>
                                <PolarGrid />
                                <PolarAngleAxis dataKey="subject" />
                                <Tooltip />
                                <Radar
                                    name="Controls"
                                    dataKey="value"
                                    stroke="#8b5cf6"
                                    fill="#8b5cf6"
                                    fillOpacity={0.6}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>


            {/* Middle Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="col-span-2">
                    <CardHeader>
                        <CardTitle>Recently updated audits</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={auditsData} layout="vertical">
                                <XAxis type="number" hide />
                                <YAxis type="category" dataKey="name" />
                                <Tooltip />
                                <Bar dataKey="notAssessed" stackId="a" fill="#cbd5e1" />
                                <Bar dataKey="partial" stackId="a" fill="#38bdf8" />
                                <Bar dataKey="nonCompliant" stackId="a" fill="#f87171" />
                                <Bar dataKey="compliant" stackId="a" fill="#4ade80" />
                                <Bar dataKey="notApplicable" stackId="a" fill="#e5e5e5" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mt-6">
                    {[
                        { label: "Used Frameworks", value: 4 },
                        { label: "Active Audits", value: "0/4" },
                        { label: "Average Progress", value: "68%" },
                        { label: "Non Compliant Items", value: 42 },
                        { label: "Evidences", value: 5 },
                    ].map((card, i) => (
                        <Card key={i}>
                            <CardContent className="p-4">
                                <p className="text-purple-600 text-xs uppercase">
                                    {card.label.includes("Frameworks") ||
                                        card.label.includes("Audits") ||
                                        card.label.includes("Progress") ||
                                        card.label.includes("Items") ||
                                        card.label.includes("Evidences")
                                        ? "Compliance"
                                        : "Risk"}
                                </p>
                                <h3 className="text-2xl font-bold">{card.value}</h3>
                                <p className="text-gray-500">{card.label}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

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
                                    data={gaugeData}
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
                                    {gaugeData.map((entry, index) => (
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
                                        `${value}`,
                                        `${activeCurrent !== null ? gaugeData[activeCurrent].name : name}`,
                                    ]}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Middle Risk Info Cards */}
                <div className="grid grid-cols-2 gap-4">
                    {[
                        { label: "Assessments", value: 3 },
                        { label: "Scenarios", value: 8 },
                        { label: "Mapped Threats", value: 7 },
                        { label: "Risk Accepted", value: 0 },
                    ].map((card, i) => (
                        <Card key={i}>
                            <CardContent className="p-4">
                                <p className="text-purple-600 text-xs uppercase">Risk</p>
                                <h3 className="text-2xl font-bold">{card.value}</h3>
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
                                    data={gaugeData}
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
                                    {gaugeData.map((entry, index) => (
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
                                        `${value}`,
                                        `${activeResidual !== null ? gaugeData[activeResidual].name : name}`,
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