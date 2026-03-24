import { Activity, Dumbbell, Heart, Zap } from "lucide-react";
import type { ExerciseEquipment, ExerciseType, PrimaryMuscle } from "@/features/exercise/types";

/**
 * Visningskonfiguration for øvelser: danske labels, ikoner og farver til UI.
 * Selve typerne (ExerciseType, ExerciseLevel, PrimaryMuscle) ligger i types.ts;
 * her beskriver vi kun, hvordan de ser ud i UI (tekst, ikon, Tailwind-klasser).
 */

export const PRIMARY_MUSCLE_LABELS: Record<PrimaryMuscle, string> = {
    chest: "Bryst",
    back: "Ryg",
    legs: "Ben",
    shoulders: "Skulder",
    arms: "Arme",
    core: "Core",
    triceps: "Triceps",
    biceps: "Biceps",
};


export const EXERCISE_TYPE_CONFIG: Record<
    ExerciseType,
    { label: string; icon: typeof Dumbbell; className: string }
> = {
    strength: { label: "Styrke", icon: Dumbbell, className: "bg-slate-100 text-slate-800" },
    conditioning: { label: "Kondition", icon: Zap, className: "bg-amber-100 text-amber-800" },
    cardio: { label: "Cardio", icon: Heart, className: "bg-rose-100 text-rose-800" },
    flexibility: { label: "Fleksibilitet", icon: Activity, className: "bg-teal-100 text-teal-800" },
    mobility: { label: "Mobilitet", icon: Activity, className: "bg-violet-100 text-violet-800" },
};

export const EXERCISE_EQUIPMENT_CONFIG: Record<ExerciseEquipment, { label: string; className: string }> = {
    none: { label: "Ingen udstyr", className: "bg-slate-100 text-slate-800" },
    bodyweight: { label: "Kropsvægt", className: "bg-emerald-100 text-emerald-800" },
    dumbbell: { label: "Håndvægte", className: "bg-amber-100 text-amber-800" },
    barbell: { label: "Stang", className: "bg-rose-100 text-rose-800" },
    machine: { label: "Maskine", className: "bg-indigo-100 text-indigo-800" },
};

/*
EQUIPMENT_OPTIONS OG TYPE_OPTIONS er lister af udstyr og typer, der bruges i ExerciseFilterPopover.tsx komponenten.
*/
export const EQUIPMENT_OPTIONS: ExerciseEquipment[] = Object.keys(EXERCISE_EQUIPMENT_CONFIG) as ExerciseEquipment[];

export const TYPE_OPTIONS: ExerciseType[] = Object.keys(EXERCISE_TYPE_CONFIG) as ExerciseType[];
