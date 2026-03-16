import { useCallback, useState } from "react";
import type { ExerciseLevel, ExerciseType, PrimaryMuscle } from "@/features/exercise/types";
import { matchesExerciseFilters } from "@/features/exercise/utils/exerciseFilterUtils";


/*
useExerciseFilters er en hook, der håndterer filtrering af øvelser baseret på niveau, type og muskelgruppe.

UseCallback bruges til at optimisere performance ved at cache funktionen og kun kalde den igen, hvis dependencies ændrer sig.
toggleLevel, toggleType og toggleMuscleGroup har ikke dependencies, da de ikke afhænger af nogen andre værdier.
*/
const useExerciseFilters = () => {
    const [filterLevels, setFilterLevels] = useState<ExerciseLevel[]>([]);
    const [filterTypes, setFilterTypes] = useState<ExerciseType[]>([]);
    const [filterMuscleGroupIds, setFilterMuscleGroupIds] = useState<string[]>([]);

    const toggleLevel = useCallback((level: ExerciseLevel) => {
        setFilterLevels((prev) =>
            prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
        );
    }, []);

    const toggleType = useCallback((type: ExerciseType) => {
        setFilterTypes((prev) =>
            prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
        );
    }, []);

    const toggleMuscleGroup = useCallback((id: string) => {
        setFilterMuscleGroupIds((prev) =>
            prev.includes(id) ? prev.filter((value) => value !== id) : [...prev, id]
        );
    }, []);

    const matchesFilters = useCallback(
        (item: { level: ExerciseLevel; exerciseType: ExerciseType; primaryMuscle: PrimaryMuscle }) =>
            matchesExerciseFilters(
                { filterLevels, filterTypes, filterMuscleGroupIds },
                item
            ),
        [filterLevels, filterTypes, filterMuscleGroupIds]
    );

    return {
        filterLevels,
        filterTypes,
        filterMuscleGroupIds,
        toggleLevel,
        toggleType,
        toggleMuscleGroup,
        matchesFilters,
    };
};

export default useExerciseFilters;
