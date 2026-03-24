"use client"
import { useState } from "react"

export default function HeightCard() {

    const [height, setHeight] = useState("")
    const [savedHeight, setSavedHeight] = useState("180")

    const saveHeight = () => {
        setSavedHeight(height)
        setHeight("")
    }

    return (
        <div className="rounded-xl bg-white p-6 shadow">
            <h3 className="mb-3 text-lg font-semibold">height</h3>

            <div className="flex gap-3">
                <input
                    type="number"
                    placeholder="cm"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2"
                />

                <button
                    onClick={saveHeight}
                    className="rounded-lg bg-black px-4 py-2 text-white"
                >
                    save
                </button>
            </div>

            <p className="mt-3 text-sm text-gray-500">
                Current height: <span className="font-medium">{savedHeight} cm</span>
            </p>
        </div>
    )
}