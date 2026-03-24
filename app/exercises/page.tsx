"use client";

import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import Exercise from "@/app/exercises/components/ExerciseItem";
import MuscleGroupsFilter from "@/app/exercises/components/MuscleGroupsFilter";
import AddExercise from "@/app/exercises/components/AddExercise";
import ExerciseFilterPopover from "@/app/exercises/components/ExerciseFilterPopover";
import useExerciseFilters from "@/app/exercises/hooks/useExerciseFilters";
import { EXERCISE_IN_MEMORY_DATA } from "@/app/exercises/data/ExerciseInMemoryData";

const ExercisePage = () => {
    const {
        filterLevels,
        filterTypes,
        filterMuscleGroupIds,
        toggleLevel,
        toggleType,
        toggleMuscleGroup,
        matchesFilters,
    } = useExerciseFilters();

    return (
        <div className="flex flex-1 min-w-0 flex-col">
            <div className="flex flex-col gap-6 overflow-auto bg-gray-100">
                <div className="flex justify-between">
                    <ExerciseFilterPopover
                        filterLevels={filterLevels}
                        filterTypes={filterTypes}
                        onToggleLevel={toggleLevel}
                        onToggleType={toggleType}
                    />
                    <AddExercise />
                </div>
                <MuscleGroupsFilter
                    selectedIds={filterMuscleGroupIds}
                    onToggle={toggleMuscleGroup}
                />
                <div className="flex flex-col gap-3">
                    {
                        EXERCISE_IN_MEMORY_DATA.filter(matchesFilters)
                            .map((ex) => (
                                <Exercise
                                    key={ex.name}
                                    exerciseType={ex.exerciseType}
                                    name={ex.name}
                                    primaryMuscle={ex.primaryMuscle}
                                    level={ex.level}
                                />
                            ))}
                </div>
            </div>
        </div>
    );
};

export default ExercisePage;