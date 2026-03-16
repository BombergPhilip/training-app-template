import type { ExerciseLevel, ExerciseType, PrimaryMuscle } from "@/features/exercise/types";
import {
    EXERCISE_LEVEL_CONFIG,
    EXERCISE_TYPE_CONFIG,
    PRIMARY_MUSCLE_LABELS,
} from "@/features/exercise/config/exerciseDisplayConfig";

/*
PRIMARY_MUSCLE_OPTIONS er en liste af objekter, der definerer de mulige valg for primær muskel.
Det indeholder label og value properties, der definerer de mulige valg.
*/

export const PRIMARY_MUSCLE_OPTIONS: { label: string; value: PrimaryMuscle }[] = (
    Object.entries(PRIMARY_MUSCLE_LABELS) as [PrimaryMuscle, string][]
).map(([value, label]) => ({ label, value }));


/*
EXERCISE_TYPE_OPTIONS er en liste af objekter, der definerer de mulige valg for træningstype.
Det indeholder label og value properties, der definerer de mulige valg.
*/
export const EXERCISE_TYPE_OPTIONS: { label: string; value: ExerciseType }[] = (
    Object.entries(EXERCISE_TYPE_CONFIG) as [ExerciseType, { label: string }][]
).map(([value, config]) => ({ label: config.label, value }));

/*
LEVEL_OPTIONS er en liste af objekter, der definerer de mulige valg for niveau.
Det indeholder label og value properties, der definerer de mulige valg.
*/
export const LEVEL_OPTIONS: { label: string; value: ExerciseLevel }[] = (
    Object.entries(EXERCISE_LEVEL_CONFIG) as [ExerciseLevel, { label: string }][]
).map(([value, config]) => ({ label: config.label, value }));
