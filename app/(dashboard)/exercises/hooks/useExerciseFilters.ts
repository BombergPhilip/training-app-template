import { useCallback, useState } from "react";
import type { ExerciseLevel, ExerciseType, PrimaryMuscle } from "@/app/(dashboard)/exercises/types";
import { matchesExerciseFilters } from "@/app/(dashboard)/exercises/utils/exerciseFilterUtils";


/*
useExerciseFilters er en hook, der håndterer filtrering af øvelser baseret på udstyr, type og muskelgruppe.

UseCallback bruges til at optimisere performance ved at cache funktionen og kun kalde den igen, hvis dependencies ændrer sig.
toggleLevel, toggleType og toggleMuscleGroup har ikke dependencies, da de ikke afhænger af nogen andre værdier.
*/
const useExerciseFilters = () => {
    const [filterEquipment, setFilterEquipment] = useState<ExerciseEquipment[]>([]);
    const [filterTypes, setFilterTypes] = useState<ExerciseType[]>([]);
    const [filterMuscleGroupIds, setFilterMuscleGroupIds] = useState<string[]>([]);

    const toggleEquipment = useCallback((equipment: ExerciseEquipment) => {
        setFilterEquipment((prev) =>
            prev.includes(equipment) ? prev.filter((e) => e !== equipment) : [...prev, equipment]
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
        (item: { equipment: ExerciseEquipment; exerciseType: ExerciseType; primaryMuscle: PrimaryMuscle }) =>
            matchesExerciseFilters(
                { filterEquipment, filterTypes, filterMuscleGroupIds },
                item
            ),
        [filterEquipment, filterTypes, filterMuscleGroupIds]
    );

    return {
        filterEquipment,
        filterTypes,
        filterMuscleGroupIds,
        toggleEquipment,
        toggleType,
        toggleMuscleGroup,
        matchesFilters,
    };
};

export default useExerciseFilters;
