import { ExerciseEquipment, ExerciseType } from "../types";

// TODO: Udskift med data fra database (det her er midlertidige data)

export const EXERCISE_IN_MEMORY_DATA = [
    { exerciseType: "strength" as ExerciseType, name: "Bænkpress", primaryMuscle: "chest" as const, equipment: "barbell" as const },
    { exerciseType: "strength" as ExerciseType, name: "Pullups", primaryMuscle: "back" as const, equipment: "bodyweight" as const },
    { exerciseType: "cardio" as ExerciseType, name: "Incline Løbebånd", primaryMuscle: "legs" as const, equipment: "machine" as const },
]