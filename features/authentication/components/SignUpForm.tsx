"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import FormField from "@/features/authentication/components/FormField";
import { usePasswordVisibility } from "@/features/authentication/hooks/usePasswordVisibility";
import { signUpSchema, type SignUpFormData } from "@/features/authentication/schemas/zod";
import { Lock, Mail, User } from "lucide-react";

interface SignUpFormProps {
  onSubmit: (data: SignUpFormData) => void;
  isLoading: boolean;
  error?: string;
}

export default function SignUpForm({ onSubmit, isLoading, error }: SignUpFormProps) {
  const { showPassword, setShowPassword } = usePasswordVisibility();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6" noValidate>
      <FormField
        id="fullName"
        label="Full Name"
        type="text"
        placeholder="Enter your full name"
        icon={User}
        error={errors.fullName?.message}
        name="fullName"
        register={register}
      />

      <FormField
        id="email"
        label="Email address"
        type="email"
        placeholder="Enter your email"
        icon={Mail}
        error={errors.email?.message}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="none"
        spellCheck={false}
        name="email"
        register={register}
      />

      <FormField
        id="password"
        label="Password"
        type="password"
        placeholder="Create a password"
        icon={Lock}
        error={errors.password?.message}
        showPassword={showPassword}
        onTogglePassword={setShowPassword}
        name="password"
        register={register}
      />
      {error && <p className="text-sm font-medium text-red-500">{error}</p>}

      <Button
        type="submit"
        disabled={isLoading}
        className="h-10 w-full bg-gray-900 text-sm font-semibold text-white hover:bg-gray-800"
      >
        {isLoading ? "Creating Account..." : "Continue"}
      </Button>
    </form>
  );
}
