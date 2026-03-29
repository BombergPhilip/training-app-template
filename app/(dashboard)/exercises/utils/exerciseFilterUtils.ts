import type { ExerciseLevel, ExerciseType, PrimaryMuscle } from "@/app/(dashboard)/exercises/types";


/*
MUSCLE_GROUP_TO_PRIMARY er en objekt, der definerer hvilke primære muskler, der hører til hvilke muskelgrupper.
*/
export const MUSCLE_GROUP_TO_PRIMARY: Record<string, PrimaryMuscle[]> = {
    bryst: ["chest"],
    ryg: ["back"],
    ben: ["legs"],
    skulder: ["shoulders"],
    arme: ["arms", "triceps", "biceps"],
    core: ["core"],
};

/*
ExerciseFilterState er en objekt, der definerer filtreringsstaten for øvelser.
Det indeholder filterLevels, filterTypes og filterMuscleGroupIds.
*/
export type ExerciseFilterState = {
    filterLevels: ExerciseLevel[];
    filterTypes: ExerciseType[];
    filterMuscleGroupIds: string[];
};

/*
ExerciseFilterItem er en objekt, der definerer en øvelse.
Det indeholder level, exerciseType og primaryMuscle.
*/
export type ExerciseFilterItem = {
    level: ExerciseLevel;
    exerciseType: ExerciseType;
    primaryMuscle: PrimaryMuscle;
};


/*
matchesExerciseFilters er en funktion, der checker om en øvelse matcher filtrene.
Det checker om niveauet, træningstypen og primære musklerne matcher filtrene.
*/
export const matchesExerciseFilters = (
    filters: ExerciseFilterState,
    item: ExerciseFilterItem
): boolean => {
    if (filters.filterLevels.length > 0 && !filters.filterLevels.includes(item.level)) return false;
    if (filters.filterTypes.length > 0 && !filters.filterTypes.includes(item.exerciseType)) return false;

    if (filters.filterMuscleGroupIds.length > 0) {
        const allowedMuscles: PrimaryMuscle[] = [];

        filters.filterMuscleGroupIds.forEach((id) => {
            const muscles = MUSCLE_GROUP_TO_PRIMARY[id];
            if (muscles) {
                muscles.forEach((m) => {
                    if (!allowedMuscles.includes(m)) {
                        allowedMuscles.push(m);
                    }
                });
            }
        });

        if (!allowedMuscles.includes(item.primaryMuscle)) return false;
    }

    return true;
};
