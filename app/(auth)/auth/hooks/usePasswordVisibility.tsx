"use client";

import { useState } from "react";

export const usePasswordVisibility = (initialState: boolean = false) => {
    const [showPassword, setShowPassword] = useState(initialState);

    const togglePassword = () => setShowPassword(!showPassword);

    return {
        showPassword,
        setShowPassword,
        togglePassword,
    };
};
