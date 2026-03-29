import { ExerciseLevel, ExerciseType } from "@/app/(dashboard)/exercises/types";

// TODO: Udskift med data fra database (det her er midlertidige data)

export const EXERCISE_IN_MEMORY_DATA = [
    { exerciseType: "strength" as ExerciseType, name: "Bænkpress", primaryMuscle: "chest" as const, level: "intermediate" as ExerciseLevel },
    { exerciseType: "strength" as ExerciseType, name: "Pullups", primaryMuscle: "back" as const, level: "intermediate" as ExerciseLevel },
    { exerciseType: "cardio" as ExerciseType, name: "Incline Løbebånd", primaryMuscle: "legs" as const, level: "beginner" as ExerciseLevel },
]