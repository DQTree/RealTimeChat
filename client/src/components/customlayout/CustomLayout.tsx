import React, {ReactNode} from "react";
import {AuthProvider} from "@/components/context/AuthContext";
import {ThemeProvider} from "@mui/material/styles";

export default function CustomLayout({ children }: { children: ReactNode }) {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    );
}
