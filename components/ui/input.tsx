import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const inputVariants = cva(
    "file:text-foreground selection:bg-primary selection:text-primary-foreground border-input h-10 w-full min-w-0 rounded-md border px-3 py-1 shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 text-base",
    {
        variants: {
            variant: {
                default: "border-input bg-transparent dark:bg-input/30",
                outline: "border-gray-300 bg-white dark:bg-input/30 dark:border-input",
                ghost: "border-transparent bg-transparent shadow-none",
                gray: "bg-gray-100 shadow-none border-none text-gray-800",
            },
            size: {
                default: "h-10 px-3 text-sm",
                sm: "h-8 px-2.5 text-sm",
                lg: "h-12 px-4 text-base",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
);

type InputProps = Omit<React.ComponentProps<"input">, "size"> & VariantProps<typeof inputVariants>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type = "text", variant, size, ...props }, ref) => {
        return (
            <input
                ref={ref}
                type={type}
                data-slot="input"
                className={cn(inputVariants({ variant, size }), className)}
                {...props}
            />
        );
    },
);

Input.displayName = "Input";

export { Input, inputVariants };
