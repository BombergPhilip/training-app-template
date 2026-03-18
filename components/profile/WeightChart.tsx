"use client"

import {
    CartesianGrid,
    Line,
    LineChart,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts"

const chartData = [
    { month: "Jan", weight: 170 },
    { month: "Feb", weight: 140 },
    { month: "Mar", weight: 120 },
    { month: "Apr", weight: 100 },
    { month: "Maj", weight: 78 },
    { month: "Jun", weight: 50 },
    { month: "Jul", weight: 160 },
    { month: "Aug", weight: 90 },
    { month: "Sep", weight: 85 },
    { month: "Okt", weight: 80 },
    { month: "Nov", weight: 75 },
    { month: "Dec", weight: 60 },
]

export default function WeightChart() {
    return (
        <div className="rounded-xl bg-white p-6 shadow">
            <h3 className="mb-4 text-lg font-semibold">weight progression</h3>

            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="month" />

                        <YAxis
                            label={{
                                value: "kg",
                                angle: -90,
                                position: "insideLeft",
                            }}
                        />

                        <Tooltip />

                        <Line
                            type="monotone"
                            dataKey="weight"
                            stroke="#3b82f6"
                            strokeWidth={3}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}