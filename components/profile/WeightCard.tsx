"use client"
import { useState } from "react"

export default function WeightCard() {

    const [weight, setWeight] = useState("")
    const [savedWeight, setSavedWeight] = useState("75")

    const saveWeight = () => {
        setSavedWeight(weight)
        setWeight("")
    }

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
                    className="rounded-lg bg-black px-4 py-2 text-white"
                >
                    save
                </button>
            </div>

            <p className="mt-3 text-sm text-gray-500">
                Current weight: <span className="font-medium">{savedWeight} kg</span>
            </p>
        </div>
    )
}