'use client'
import React from "react";
import './globals.css'
import CustomLayout from "@/components/customlayout/CustomLayout";

export default function RootLayout({children}: {
  children: React.ReactNode
}) {
    return (
        <html lang="en">
        <head>
            <title>RealTimeChat</title>
        </head>
        <body>
            <CustomLayout>
                {children}
            </CustomLayout>
        </body>
        </html>
    )
}
