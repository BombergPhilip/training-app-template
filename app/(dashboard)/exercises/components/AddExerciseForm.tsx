"use client";

import { Button } from "@/components/ui/button";
import FormField from "@/components/shared/FormField";
import { Controller, type Control, type FieldErrors, type UseFormRegister } from "react-hook-form";
import { DialogClose } from "@/components/ui/dialog";
import DropdownSelect from "@/app/(dashboard)/exercises/components/DropdownSelect";
import type { AddExerciseFormData } from "@/app/(dashboard)/exercises/schemas/zod";
import {
    EXERCISE_TYPE_OPTIONS,
    EQUIPMENT_OPTIONS,
    PRIMARY_MUSCLE_OPTIONS,
} from "@/app/(dashboard)/exercises/config/exerciseFormOptions";

/*
AddExerciseForm er en UI-komponent, der bruges til at oprette en ny øvelse i systemet.
Den indeholder felter til navn, primær muskel, type og udstyr, og håndterer validering af brugerinput.
Formularen benytter react-hook-form til håndtering af formularstatus og valideringsfejl.

Komponent modtager en række props som er defineret i interface AddExerciseFormProps.
- register: En funktion der bruges til at registrere felter i formular.
- control: En funktion der bruges til at håndtere formularstate.
- errors: En funktion der bruges til at håndtere formularfejl.
- onSubmit: En funktion der bruges til at håndtere formularsubmit.
*/


interface AddExerciseFormProps {
    register: UseFormRegister<AddExerciseFormData>;
    control: Control<AddExerciseFormData>;
    errors: FieldErrors<AddExerciseFormData>;
    onSubmit: React.ChangeEventHandler<HTMLFormElement>;
};

const AddExerciseForm = ({ register, control, errors, onSubmit }: AddExerciseFormProps) => {
    return (
        <form className="pb-4 flex flex-col gap-4" onSubmit={onSubmit}>
            <div className="flex flex-col gap-4 pb-4">
                <div className="flex flex-col gap-2">
                    <label className="text-gray-800 font-medium" htmlFor="exercise-name">
                        Navn
                    </label>
                    <FormField
                        id="exercise-name"
                        label="Navn"
                        type="text"
                        placeholder="Indtast navn på øvelse"
                        name="name"
                        register={register}
                        error={errors.name?.message}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-gray-800 font-medium" htmlFor="primaryMuscle">
                        Primær muskel
                    </label>
                    <Controller
                        name="primaryMuscle"
                        control={control}
                        render={({ field }) => (
                            <DropdownSelect
                                placeholder="Vælg primær muskel"
                                options={PRIMARY_MUSCLE_OPTIONS}
                                value={field.value}
                                onValueChange={field.onChange}
                                onBlur={field.onBlur}
                                error={!!errors.primaryMuscle}
                            />
                        )}
                    />
                    {errors.primaryMuscle?.message && (
                        <p className="text-sm font-medium text-red-500">{errors.primaryMuscle.message}</p>
                    )}
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-gray-800 font-medium" htmlFor="exerciseType">
                        Type
                    </label>
                    <Controller
                        name="exerciseType"
                        control={control}
                        render={({ field }) => (
                            <DropdownSelect
                                placeholder="Vælg type"
                                options={EXERCISE_TYPE_OPTIONS}
                                value={field.value}
                                onValueChange={field.onChange}
                                onBlur={field.onBlur}
                                error={!!errors.exerciseType}
                            />
                        )}
                    />
                    {errors.exerciseType?.message && (
                        <p className="text-sm font-medium text-red-500">{errors.exerciseType.message}</p>
                    )}
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-gray-800 font-medium" htmlFor="equipment">
                        Udstyr
                    </label>
                    <Controller
                        name="equipment"
                        control={control}
                        render={({ field }) => (
                            <DropdownSelect
                                placeholder="Vælg udstyr"
                                options={EQUIPMENT_OPTIONS}
                                value={field.value}
                                onValueChange={field.onChange}
                                onBlur={field.onBlur}
                                error={!!errors.equipment}
                            />
                        )}
                    />
                    {errors.equipment?.message && (
                        <p className="text-sm font-medium text-red-500">{errors.equipment.message}</p>
                    )}
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <div className="border-t h-px -mx-4" />
                <div className="flex flex-row justify-end gap-2 pt-2">
                    <DialogClose asChild>
                        <Button
                            type="button"
                            size="sm"
                            weight="medium"
                            variant="outline"
                            className="border-gray-300 bg-white text-gray-900 hover:bg-gray-50 text-sm"
                        >
                            Annuller
                        </Button>
                    </DialogClose>
                    <Button
                        type="submit"
                        size="sm"
                        weight="medium"
                        variant="default"
                        className="bg-blue-600 text-white hover:bg-blue-700 text-sm"
                    >
                        Opret
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default AddExerciseForm;
