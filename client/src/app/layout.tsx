'use client'

import React from "react";
import './globals.css'
import {AuthProvider} from "@/components/context/AuthContext";

export default function RootLayout({children}: {
  children: React.ReactNode
}) {
  return (
      <html lang="en">
      <head>
          <link rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"/>
          <title>RealTimeChat</title>
      </head>
      <body>
          <AuthProvider>
              {children}
          </AuthProvider>
      </body>
      </html>
  )
}
