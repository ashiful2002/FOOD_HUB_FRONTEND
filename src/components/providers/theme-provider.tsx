"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode } from "react";

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"   // 👈 use device preference
      enableSystem            // 👈 detect OS theme
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}