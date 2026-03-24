"use client";

import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import Exercise from "@/features/exercise/components/ExerciseItem";
import MuscleGroupsFilter from "@/features/exercise/components/MuscleGroupsFilter";
import AddExercise from "@/features/exercise/components/AddExercise";
import ExerciseFilterPopover from "@/features/exercise/components/ExerciseFilterPopover";
import useExerciseFilters from "@/features/exercise/hooks/useExerciseFilters";
import { EXERCISE_IN_MEMORY_DATA } from "@/features/exercise/data/ExerciseInMemoryData";

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
        <div className="flex min-h-screen w-full flex-col lg:flex-row">
            <Sidebar />
            <div className="flex flex-1 min-w-0 flex-col">
                <Header />
                <main className="flex flex-1 flex-col gap-6 overflow-auto bg-gray-100 p-4 sm:px-10 sm:pt-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
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
                    <div className="flex flex-col gap-3 w-full">
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
                </main>
            </div>
        </div>
    );
};

export default ExercisePage;