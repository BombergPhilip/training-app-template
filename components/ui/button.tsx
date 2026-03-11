import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-base transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer",
    {
        variants: {
            variant: {
                default: "bg-gray-100 text-gray-700",
                destructive:
                    "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
                outline:
                    "border border-gray-200 bg-white shadow-xs hover:bg-gray-100 hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
                secondary: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white",
                ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-gray-100 text-gray-700",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "px-4 py-2 has-[>svg]:px-3",
                sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
                lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
                icon: "size-9",
                "icon-xs": "size-6",
                "icon-sm": "size-8",
                "icon-lg": "size-10",
            },
            weight: {
                normal: "font-normal",
                bold: "font-bold",
                semibold: "font-semibold",
                medium: "font-medium",
                light: "font-light",
                thin: "font-thin",
                black: "font-black",
                extraBold: "font-extrabold",
                extraLight: "font-extralight",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
            weight: "normal",
        },
    },
);

function Button({
    className,
    variant,
    size,
    weight,
    asChild = false,
    ...props
}: React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean;
    }) {
    const Comp = asChild ? Slot : "button";

    return (
        <Comp
            data-slot="button"
            className={cn(buttonVariants({ variant, size, weight, className }))}
            {...props}
        />
    );
}

export { Button, buttonVariants };
