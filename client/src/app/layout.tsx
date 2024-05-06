import React from "react";
import './globals.css'
import {Metadata} from "next";
import CustomLayout from "@/components/customlayout/CustomLayout";

export const metadata: Metadata = {
    title: 'RealTimeChat',
    description: 'Similar to Discord'
}

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
      <CustomLayout>
          {children}
      </CustomLayout>
      </body>
      </html>
  )
}
