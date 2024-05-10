import React, {ReactNode} from "react";
import {AuthProvider} from "@/components/context/AuthContext";
import {ContextMenuContextProvider} from "@/components/context/ContextMenuContext";

export default function CustomLayout({ children }: { children: ReactNode }) {
    return (
        <ContextMenuContextProvider>
            <AuthProvider>
                {children}
            </AuthProvider>
        </ContextMenuContextProvider>
    );
}
