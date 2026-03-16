import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

/*
DropdownSelect er en UI-komponent, der bruges til at vælge en værdi fra en liste af mulige værdier.
Den bruger Select-komponenten fra ShadCN UI til at vælge en værdi (komponenenten er i components/ui folderen).

Komponent modtager en række props som er defineret i interface DropdownSelectProps.
- placeholder: Tekst som vises i dropdown-menuen før en værdi er valgt.
- options: En række objekter med label og value properties, der definerer de mulige valg.
- value: Den valgte værdi, som vises i dropdown-menuen.
- onValueChange: En funktion der kaldes når en værdi vælges.
- onBlur: En funktion der kaldes når dropdown-menuen tabes.
- error: En boolean property der angiver om der er en fejl i dropdown-menuen.
*/

interface DropdownSelectProps {
    placeholder: string;
    options: { label: string; value: string }[];
    value?: string;
    onValueChange?: (value: string) => void;
    onBlur?: () => void;
    error?: boolean;
}

const DropdownSelect = ({ placeholder, options, value, onValueChange, onBlur, error }: DropdownSelectProps) => {
    return (
        <Select
            value={value ?? ""}
            onValueChange={onValueChange}
            onOpenChange={(open) => {
                if (!open && onBlur) onBlur();
            }}
        >
            <SelectTrigger
                className={cn(
                    "w-full",
                    error && "border-2 border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20"
                )}
            >
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default DropdownSelect