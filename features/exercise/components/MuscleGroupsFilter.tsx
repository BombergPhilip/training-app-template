"use client";

/*
MuscleGroupsFilter er en UI-komponent, der bruges til at vise en liste af muskelgrupper og til at vælge en muskelgruppe.
Den bruger Button-komponenten fra ShadCN UI til at vælge en muskelgruppe (komponenenten er i components/ui folderen).

Komponent modtager en række props som er defineret i interface MuscleGroupsFilterProps.
- selectedIds: En liste af id'er for de muskelgrupper, der er valgt.
- onToggle: En funktion der kaldes når en muskelgruppe vælges.

Komponenten viser en liste af muskelgrupper og tilhørende ikoner.
*/

const MUSCLE_GROUP_CATEGORIES = [
    { id: "bryst", label: "Bryst", icon: "svg" as const, src: "/chest-exercise.svg", color: "text-amber-600" },
    { id: "ryg", label: "Ryg", icon: "svg" as const, src: "/back-exercise.svg", color: "text-blue-600" },
    { id: "ben", label: "Ben", icon: "svg" as const, src: "/legs-exercise.svg", color: "text-green-600" },
    { id: "skulder", label: "skulder", icon: "svg" as const, src: "/shoulder-exercise.svg", color: "text-violet-600" },
    { id: "arme", label: "Arme", icon: "svg" as const, src: "/arm-exercise.svg", color: "text-orange-600" },
    { id: "core", label: "Core", icon: "svg" as const, src: "/core-exercise.svg", color: "text-teal-600" },
] as const;

type MuscleGroupsFilterProps = {
    selectedIds: string[];
    onToggle: (id: string) => void;
};

const MuscleGroupsFilter = ({ selectedIds, onToggle }: MuscleGroupsFilterProps) => {
    return (
        <section className="bg-white p-8 rounded-lg border border-gray-200">
            <h2 className="mb-3 text-sm font-medium text-gray-500">Muskelgrupper</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {MUSCLE_GROUP_CATEGORIES.map((category) => {
                    const isSelected = selectedIds.includes(category.id);
                    const colorClass = isSelected ? "text-blue-600" : category.color;
                    return (
                        <button
                            key={category.id}
                            type="button"
                            onClick={() => onToggle(category.id)}
                            className={`flex cursor-pointer items-center gap-3 rounded-xl border bg-white px-4 py-3 text-left transition-colors hover:bg-gray-50 ${isSelected
                                ? "border-blue-500 bg-blue-50/50 ring-1 ring-blue-500/20"
                                : "border-gray-200"
                                }`}
                        >
                            <span className={`shrink-0 ${colorClass}`}>
                                <span
                                    className="block h-5 w-5 bg-current"
                                    style={{
                                        maskImage: `url(${category.src})`,
                                        WebkitMaskImage: `url(${category.src})`,
                                        maskSize: "contain",
                                        maskRepeat: "no-repeat",
                                        maskPosition: "center",
                                    }}
                                    aria-hidden
                                />
                            </span>
                            <span className={`text-sm font-medium ${isSelected ? "text-blue-800" : "text-gray-700"}`}>
                                {category.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </section>
    );
};

export default MuscleGroupsFilter;
