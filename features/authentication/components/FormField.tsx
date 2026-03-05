import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { UseFormRegister, FieldPath, FieldValues } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

interface FormFieldProps<T extends FieldValues = FieldValues> {
  id: string;
  label: string;
  type?: "text" | "email" | "password";
  placeholder: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  error?: string;
  showPassword?: boolean;
  onTogglePassword?: (show: boolean) => void;
  autoComplete?: string;
  autoCorrect?: string;
  autoCapitalize?: string;
  spellCheck?: boolean;
  name: FieldPath<T>;
  register: UseFormRegister<T>;
}

const FormField = <T extends FieldValues = FieldValues>({
  id,
  type,
  placeholder,
  error,
  icon: Icon,
  showPassword,
  autoComplete = "off",
  autoCorrect,
  autoCapitalize,
  spellCheck,
  name,
  onTogglePassword,
  register,
}: FormFieldProps<T>) => {
  const isPassword = type === "password";
  const hasPasswordToggle = isPassword && showPassword !== undefined && onTogglePassword;

  return (
    <div className="flex flex-col gap-2">
      <InputGroup className={`${error ? "border-2 border-red-500" : ""}`} data-formfield="true">
        {Icon && (
          <InputGroupAddon>
            <Icon className="h-4! w-4!" />
          </InputGroupAddon>
        )}
        <InputGroupInput
          id={id}
          type={isPassword ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          autoCorrect={autoCorrect}
          autoCapitalize={autoCapitalize}
          spellCheck={spellCheck}
          {...register(name)}
        />
        {hasPasswordToggle && (
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              type="button"
              onClick={() => onTogglePassword(!showPassword)}
              className="mr-0! cursor-pointer"
            >
              {showPassword ? <EyeOff className="h-4! w-4!" /> : <Eye className="h-4! w-4!" />}
            </InputGroupButton>
          </InputGroupAddon>
        )}
      </InputGroup>
      {error && <p className="text-sm font-medium text-red-500">{error}</p>}
    </div>
  );
};

export default FormField;
