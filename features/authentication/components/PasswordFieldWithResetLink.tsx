import { FieldPath, FieldValues, UseFormRegister } from "react-hook-form";
import { Lock } from "lucide-react";

import FormField from "@/features/authentication/components/FormField";
import { usePasswordVisibility } from "@/features/authentication/hooks/usePasswordVisibility";

interface PasswordFieldWithResetLinkProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  error?: string;
  name: FieldPath<T>;
}

const PasswordFieldWithResetLink = <T extends FieldValues>({
  register,
  error,
  name,
}: PasswordFieldWithResetLinkProps<T>) => {
  const { showPassword, setShowPassword } = usePasswordVisibility();

  return (
    <div className="flex flex-col gap-2">
      <FormField
        id={name}
        label=""
        type="password"
        placeholder="Enter your password"
        icon={Lock}
        error={error}
        showPassword={showPassword}
        onTogglePassword={setShowPassword}
        name={name}
        register={register}
      />
    </div>
  );
};

export default PasswordFieldWithResetLink;
