'use client'
import React from "react";
import CustomLayout from "@/components/customlayout/CustomLayout";

import './globals.css'
import vt323 from "@/lib/font";

export default function RootLayout({children}: {
  children: React.ReactNode
}) {
    return (
        <html lang="en">
        <head>
            <title>RealTimeChat</title>
        </head>
        <body className={vt323.className}>
            <CustomLayout>
                {children}
            </CustomLayout>
        </body>
        </html>
    )
}
