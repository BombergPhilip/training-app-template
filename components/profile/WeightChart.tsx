"use client";

import {
    CartesianGrid,
    Line,
    LineChart,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

type ChartPoint = {
    date: string;
    weight: number;
};

type WeightChartProps = {
    data: ChartPoint[];
    loading: boolean;
};

export default function WeightChart({ data, loading }: WeightChartProps) {
    return (
        <div className="rounded-xl bg-white p-6 shadow">
            <h3 className="mb-4 text-lg font-semibold">weight progression</h3>

            {loading ? (
                <p className="text-sm text-gray-500">Loading...</p>
            ) : data.length === 0 ? (
                <p className="text-sm text-gray-500">no weight data</p>
            ) : (
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
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
            )}
        </div>
    );
}