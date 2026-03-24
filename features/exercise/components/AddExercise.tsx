"use client";

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddExerciseFormData, addExerciseSchema } from "@/features/exercise/schemas/zod";
import AddExerciseForm from "@/features/exercise/components/AddExerciseForm";

/*
AddExercise er en container-komponen som ejer state og logik for at tilføje en ny øvelse til systemet 
og den bruger UI-komponenter som AddExerciseForm, DropdownSelect til at vise og håndtere formularindholdet.
*/

const AddExercise = () => {
    const { register, control, handleSubmit, formState: { errors } } = useForm<AddExerciseFormData>({
        resolver: zodResolver(addExerciseSchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            primaryMuscle: undefined,
            exerciseType: undefined,
            equipment: undefined,
        },
    });

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="lg" weight="medium" variant="default" className="bg-blue-600 text-white hover:bg-blue-700">
                    <Plus size={16} />
                    <span className="text-sm">Tilføj øvelse</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="min-w-lg">
                <DialogHeader>
                    <DialogTitle>Opret øvelse</DialogTitle>
                    <DialogDescription>Tilføj en ny øvelse til din træningsbibliotek.</DialogDescription>
                </DialogHeader>
                <div className="border-t h-px -mx-4" />
                <AddExerciseForm
                    register={register}
                    control={control}
                    errors={errors}
                    onSubmit={handleSubmit((data) => console.log(data))}
                />
            </DialogContent>
        </Dialog>
    );
};

export default AddExercise;
