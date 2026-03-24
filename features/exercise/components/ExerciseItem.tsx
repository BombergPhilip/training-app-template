import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";
import type { ExerciseEquipment, ExerciseType, PrimaryMuscle } from "@/features/exercise/types";
import {
    EXERCISE_EQUIPMENT_CONFIG,
    EXERCISE_TYPE_CONFIG,
    PRIMARY_MUSCLE_LABELS,
} from "@/features/exercise/config/exerciseDisplayConfig";

/*
ExerciseItem er en UI-komponent, der bruges til at vise en øvelse i systemet.
Den bruger Badge-komponenten fra ShadCN UI til at vise udstyr og træningstype (komponenenten er i components/ui folderen).

Komponent modtager en række props som er defineret i interface ExerciseProps.
- name: Navnet på øvelsen.
- primaryMuscle: Primær muskel for øvelsen.
- exerciseType: Træningstype for øvelsen.
- equipment: Udstyr for øvelsen.

Komponenten viser navnet på øvelsen, primær muskel, træningstype og udstyr.
Der er også knapper til at redigere og slette øvelsen.
*/


interface ExerciseProps {
    name?: string;
    primaryMuscle?: PrimaryMuscle;
    exerciseType: ExerciseType;
    equipment?: ExerciseEquipment;
};

const ExerciseItem = ({ name, primaryMuscle, exerciseType, equipment }: ExerciseProps) => {
    const typeConfig = EXERCISE_TYPE_CONFIG[exerciseType];
    const TypeIcon = typeConfig.icon;
    const equipmentConfig = equipment ? EXERCISE_EQUIPMENT_CONFIG[equipment] : null;
    const primaryMuscleLabel = primaryMuscle ? PRIMARY_MUSCLE_LABELS[primaryMuscle] : null;

    return (
        <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 md:flex-row md:items-center md:px-6 md:py-5">
            <div className="flex min-w-0 flex-1 flex-col gap-1">
                <h3 className="text-base font-semibold text-gray-900 truncate">{name}</h3>
                {primaryMuscleLabel && <p className="text-sm text-gray-500">{primaryMuscleLabel}</p>}
            </div>

            <div className="flex flex-1 flex-wrap items-center justify-start gap-2">
                <span className={`inline-flex items-center gap-1.5 rounded-full border-0 px-3 py-1 text-xs font-medium ${typeConfig.className}`}>
                    <TypeIcon size={12} className="opacity-80" />
                    {typeConfig.label}
                </span>
                {equipmentConfig && (
                    <Badge className={`rounded-full border-0 px-3 py-1 text-xs font-medium ${equipmentConfig.className}`}>
                        {equipmentConfig.label}
                    </Badge>
                )}
            </div>

            <div className="flex flex-1 items-center justify-end gap-1">
                <button
                    type="button"
                    aria-label="Rediger"
                    className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                    <Pencil size={18} />
                </button>
                <button
                    type="button"
                    aria-label="Slet"
                    className="rounded-lg p-2 text-gray-500 hover:bg-red-50 hover:text-red-600"
                >
                    <Trash2 size={18} />
                </button>
            </div>
        </div>
    );
};

export default ExerciseItem