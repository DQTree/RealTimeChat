'use client'

import {AuthProvider} from "@/components/context/AuthContext";
import {ReactNode} from "react";

export default function CustomLayout({children}: {children: ReactNode}){
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    )
}