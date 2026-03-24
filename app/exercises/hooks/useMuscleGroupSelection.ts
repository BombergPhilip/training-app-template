import { useState, useCallback } from "react";

// Custom hook til at håndtere valg af muskelgrupper.

const useMuscleGroupSelection = () => {
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

    const toggle = useCallback((id: string) => {
        setSelectedIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    }, []);

    return { selectedIds, toggle };
};

export default useMuscleGroupSelection;
