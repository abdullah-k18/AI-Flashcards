"use client"

import { Inter } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider
} from '@clerk/nextjs';
import AuthRedirect from './AuthRedirect';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <title>FlashBook</title>
          <link rel="shortcut icon" href="https://cdn-icons-png.freepik.com/512/9100/9100957.png" type="image/x-icon" />
        </head>
        <body className={inter.className}>
          <main>
            <AuthRedirect />
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
