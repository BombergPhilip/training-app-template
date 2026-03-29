import { z } from "zod";

const primaryMuscleValues = ["chest", "back", "legs", "shoulders", "arms", "core", "triceps", "biceps"] as const;
const exerciseTypeValues = ["strength", "conditioning", "cardio", "flexibility", "mobility"] as const;
const levelValues = ["beginner", "intermediate", "advanced"] as const;

// Bruges til atvalidere data i tiløj øvelse formular, når en bruger prøver at submitte formular uden at have udfyldt alle felter smider klienten en fejlmeddelelse.
export const addExerciseSchema = z
    .object({
        name: z.string().min(1, "Navn er påkrævet").max(30, "Navn må max være 30 tegn"),
        primaryMuscle: z.enum(primaryMuscleValues).optional(),
        exerciseType: z.enum(exerciseTypeValues).optional(),
        level: z.enum(levelValues).optional(),
    })
    .refine((data) => data.primaryMuscle != null, {
        message: "Vælg primær muskel",
        path: ["primaryMuscle"],
    })
    .refine((data) => data.exerciseType != null, {
        message: "Vælg type",
        path: ["exerciseType"],
    })
    .refine((data) => data.level != null, {
        message: "Vælg niveau",
        path: ["level"],
    });

export type AddExerciseFormData = z.infer<typeof addExerciseSchema>;