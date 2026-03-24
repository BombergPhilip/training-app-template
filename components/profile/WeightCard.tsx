"use client";

import { useState } from "react";

type WeightCardProps = {
    currentWeight: number | null;
    onSave: (weight: number) => Promise<void>;
    saving: boolean;
};

export default function WeightCard({
    currentWeight,
    onSave,
    saving,
}: WeightCardProps) {
    const [weight, setWeight] = useState("");

    const saveWeight = async () => {
        const numericWeight = Number(weight);

        if (!Number.isFinite(numericWeight) || numericWeight <= 0) {
            return;
        }

        await onSave(numericWeight);
        setWeight("");
    };

    return (
        <div className="rounded-xl bg-white p-6 shadow">
            <h3 className="mb-3 text-lg font-semibold">weight</h3>

            <div className="flex gap-3">
                <input
                    type="number"
                    placeholder="kg"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2"
                />

                <button
                    onClick={saveWeight}
                    disabled={saving}
                    className="rounded-lg bg-black px-4 py-2 text-white disabled:opacity-50"
                >
                    {saving ? "saving..." : "save"}
                </button>
            </div>

            <p className="mt-3 text-sm text-gray-500">
                Current weight:{" "}
                <span className="font-medium">
                    {currentWeight !== null ? `${currentWeight} kg` : "-"}
                </span>
            </p>
        </div>
    );
}