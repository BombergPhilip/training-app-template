"use client";

import FormField from "@/components/shared/FormField";
import { Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, type SignInFormData } from "@/app/auth/schemas/zod";
import { Button } from "@/components/ui/button";
import PasswordFieldWithResetLink from "@/app/auth/components/PasswordFieldWithResetLink";

interface SignInFormProps {
    onSubmit: (data: SignInFormData) => void;
    isLoading: boolean;
    error?: string;
}

const SignInForm = ({ onSubmit, isLoading, error }: SignInFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInFormData>({
        resolver: zodResolver(signInSchema),
        mode: "onChange",
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6" noValidate>
            <FormField
                id="email"
                label="Email address"
                type="email"
                placeholder="Enter your email"
                icon={Mail}
                error={errors.email?.message}
                name="email"
                register={register}
                autoComplete="off"
            />

            <PasswordFieldWithResetLink
                register={register}
                error={errors.password?.message}
                name="password"
            />
            {error && <p className="text-sm font-medium text-red-500">{error}</p>}

            <Button
                type="submit"
                className="h-10 w-full bg-gray-900 text-sm font-semibold text-white hover:bg-gray-800"
                disabled={isLoading}
            >
                {isLoading ? "Logging in..." : "Login"}
            </Button>
        </form>
    );
};

export default SignInForm;
