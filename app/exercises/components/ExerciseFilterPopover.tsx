"use client";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import type { ExerciseLevel, ExerciseType } from "@/app/exercises/types";
import {
    EXERCISE_LEVEL_CONFIG,
    EXERCISE_TYPE_CONFIG,
    LEVEL_OPTIONS,
    TYPE_OPTIONS,
} from "@/app/exercises/config/exerciseDisplayConfig";
import { ChevronDown, ListFilter } from "lucide-react";

/*
ExerciseFilterPopover er en UI-komponent, der bruges til at filtrere øvelser baseret på niveau og type.
Den bruger Popover-komponenten fra ShadCN UI til at vælge filtre (komponenenten er i components/ui folderen).

Komponent modtager en række props som er defineret i interface ExerciseFilterPopoverProps.
- filterLevels: En liste af niveauer, der er valgt.
- filterTypes: En liste af typer, der er valgt.
- onToggleLevel: En funktion der kaldes når et niveau vælges.
- onToggleType: En funktion der kaldes når en træningstype vælges.
*/

type ExerciseFilterPopoverProps = {
    filterLevels: ExerciseLevel[];
    filterTypes: ExerciseType[];
    onToggleLevel: (level: ExerciseLevel) => void;
    onToggleType: (type: ExerciseType) => void;
};

const ExerciseFilterPopover = ({
    filterLevels,
    filterTypes,
    onToggleLevel,
    onToggleType,
}: ExerciseFilterPopoverProps) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    type="button"
                    className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-2 text-gray-800 hover:bg-gray-50"
                >
                    <ListFilter size={16} />
                    <span className="text-sm font-medium">Filter</span>
                    <ChevronDown size={16} className="text-gray-500" />
                </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-72 rounded-xl border-gray-200 bg-white p-5 shadow-lg">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-bold text-gray-800">Niveau</h3>
                        <div className="flex flex-wrap gap-2">
                            {LEVEL_OPTIONS.map((level) => {
                                const config = EXERCISE_LEVEL_CONFIG[level];
                                const isSelected = filterLevels.includes(level);
                                return (
                                    <button
                                        key={level}
                                        type="button"
                                        onClick={() => onToggleLevel(level)}
                                        className={`cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-colors ${isSelected ? config.className : "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700"}`}
                                    >
                                        {config.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-bold text-gray-800">Træningstype</h3>
                        <div className="flex flex-wrap gap-2">
                            {TYPE_OPTIONS.map((type) => {
                                const config = EXERCISE_TYPE_CONFIG[type];
                                const isSelected = filterTypes.includes(type);
                                return (
                                    <button
                                        key={type}
                                        type="button"
                                        onClick={() => onToggleType(type)}
                                        className={`cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-colors ${isSelected ? config.className : "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700"}`}
                                    >
                                        {config.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default ExerciseFilterPopover