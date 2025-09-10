// src/pages/GovernanceDashboard.jsx
import React, { useState, useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

const GovernanceDashboard = () => {
    const [activeTab, setActiveTab] = useState("Governance");
    const barChart1Ref = useRef(null);
    const barChart2Ref = useRef(null);
    const donutChartRef = useRef(null);



    const statisticsData = [
        { label: "Domains", value: 4, icon: "🌐" },
        { label: "Perimeters", value: 6, icon: "👥" },
        { label: "Applied controls", value: 42, icon: "🛡️" },
        { label: "Risk assessments", value: 3, icon: "🔍" },
        { label: "Audits", value: 4, icon: "⚙️" },
        { label: "Policies", value: 11, icon: "📄" },
    ];

    const frameworks = [
        "International standard ISO/IEC 27001:20",
        "Adobe CCF v5",
        "NIST CSF v2.0",
        "GDPR checklist for data controllers",
    ];

    const pendingControls = [
        {
            name: "Immutable backups",
            category: "Technical",
            csfFunction: "Protect",
            domain: "DEMO",
            rankingScore: 0,
            eta: "2/28/2025",
            state: "Outdated",
        },
        {
            name: "Deploy EDR solution",
            category: "Technical",
            csfFunction: "Protect",
            domain: "DEMO",
            rankingScore: 0,
            eta: "2/3/2025",
            state: "Outdated",
        },
        {
            name: "Crisis simulation exercise",
            category: "Organizational",
            csfFunction: "Respond",
            domain: "DEMO",
            rankingScore: 0,
            eta: "2/28/2025",
            state: "Outdated",
        },
        {
            name: "Multi regions pattern for Kubernetes",
            category: "Technical",
            csfFunction: "Protect",
            domain: "DEMO",
            rankingScore: 0,
            eta: "2/20/2025",
            state: "Outdated",
        },
        {
            name: "Role Base Access Control (RBAC)",
            category: "Technical",
            csfFunction: "Protect",
            domain: "DEMO",
            rankingScore: 0,
            eta: "1/17/2025",
            state: "Outdated",
        },
    ];

    useEffect(() => {
        // Audits Status Chart
        if (barChart1Ref.current) {
            new Chart(barChart1Ref.current, {
                type: "bar",
                data: {
                    labels: ["Planned", "In progress", "In review", "Done", "Deprecated"],
                    datasets: [
                        {
                            data: [3, 2, 4, 8, 1],
                            backgroundColor: [
                                "#e5e7eb",
                                "#93c5fd",
                                "#3b82f6",
                                "#1d4ed8",
                                "#6b7280",
                            ],
                        },
                    ],
                },
                options: {
                    responsive: true,
                    plugins: { legend: { display: false } },
                    scales: {
                        y: { beginAtZero: true, grid: { display: false } },
                        x: { grid: { display: false } },
                    },
                },
            });
        }

        // Risk Assessment Chart
        if (barChart2Ref.current) {
            new Chart(barChart2Ref.current, {
                type: "bar",
                data: {
                    labels: ["Planned", "In progress", "In review", "Done", "Deprecated"],
                    datasets: [
                        {
                            data: [2, 3, 1, 5, 2],
                            backgroundColor: [
                                "#6b7280",
                                "#93c5fd",
                                "#3b82f6",
                                "#1d4ed8",
                                "#374151",
                            ],
                        },
                    ],
                },
                options: {
                    responsive: true,
                    plugins: { legend: { display: false } },
                    scales: {
                        y: { beginAtZero: true, grid: { display: false } },
                        x: { grid: { display: false } },
                    },
                },
            });
        }

        // Donut Chart
        if (donutChartRef.current) {
            new Chart(donutChartRef.current, {
                type: "doughnut",
                data: {
                    labels: ["Open", "Closed"],
                    datasets: [
                        {
                            data: [75, 25],
                            backgroundColor: ["#fbbf24", "#e5e7eb"],
                        },
                    ],
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: "bottom",
                            labels: { usePointStyle: true },
                        },
                    },
                },
            });
        }
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-1">
            <div className="">
                {/* Navigation Tabs */}


                {/* Statistics Section */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Statistics</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {statisticsData.map((stat, index) => (
                            <div
                                key={index}
                                className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg"
                            >
                                <span className="text-2xl">{stat.icon}</span>
                                <div>
                                    <div className="text-2xl font-bold text-gray-900">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-gray-600">{stat.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Left Column - Bar Charts */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Audits status
                            </h3>
                            <canvas ref={barChart1Ref}></canvas>
                        </div>
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Risk assessments status
                            </h3>
                            <canvas ref={barChart2Ref}></canvas>
                        </div>
                    </div>

                    {/* Right Column - Frameworks & Donut Chart */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Used frameworks
                            </h3>
                            <div className="space-y-3">
                                {frameworks.map((framework, index) => (
                                    <div key={index} className="flex items-center space-x-3">
                                        <div className="w-4 h-4 bg-blue-500 rounded"></div>
                                        <span className="text-sm text-gray-700">{framework}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Risk scenarios status
                            </h3>
                            <canvas ref={donutChartRef}></canvas>
                        </div>
                    </div>
                </div>

                {/* Pending Applied Controls Section */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="mb-4">
                        <h2 className="text-xl font-bold text-gray-900">
                            Your pending applied controls
                        </h2>
                        <p className="text-sm text-gray-600">
                            Over the next 30 days and ordered by ranking score.
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Category
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        CSF Function
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Domain
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Ranking Score
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        ETA
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        State
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {pendingControls.map((control, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {control.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {control.category}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {control.csfFunction}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                                {control.domain}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {control.rankingScore}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {control.eta}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                                                {control.state}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <div className="flex space-x-2">
                                                <button className="text-blue-600 hover:text-blue-800">
                                                    👁️
                                                </button>
                                                <button className="text-blue-600 hover:text-blue-800">
                                                    ✏️
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-4 text-sm text-gray-600">Showing 1 to 5 of 5</div>
                    <div className="mt-2 flex items-center text-sm text-gray-600">
                        <span className="mr-2">ℹ️</span>
                        <span>
                            Ranking score is an adaptive metric that combines the information
                            of effort and current risk level, and crosses it with the other
                            data to assist you for the prioritization.
                        </span>
                    </div>
                </div>

                {/* Watch List Section */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Watch list</h2>
                        <p className="text-sm text-gray-600">
                            Items that have expired or will expire in the next 30 days.
                        </p>
                    </div>

                    {/* Applied Controls to Review */}
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Applied controls to review
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Category
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            CSF Function
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Domain
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            ETA
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Expiry Date
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            State
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    <tr>
                                        <td
                                            colSpan="7"
                                            className="px-6 py-8 text-center text-gray-500"
                                        >
                                            No items to review
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-4 flex justify-center">
                            <nav className="flex items-center space-x-2">
                                <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">
                                    Previous
                                </button>
                                <span className="px-3 py-1 text-sm bg-blue-600 text-white rounded">
                                    1
                                </span>
                                <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">
                                    Next
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* Acceptances to Review */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Acceptances to review
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Risk Scenarios
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Expiry Date
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            State
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    <tr>
                                        <td
                                            colSpan="4"
                                            className="px-6 py-8 text-center text-gray-500"
                                        >
                                            No acceptances to review
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-4 flex justify-center">
                            <nav className="flex items-center space-x-2">
                                <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">
                                    Previous
                                </button>
                                <span className="px-3 py-1 text-sm bg-blue-600 text-white rounded">
                                    1
                                </span>
                                <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">
                                    Next
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GovernanceDashboard;