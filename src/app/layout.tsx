import "./globals.css";
import cx from "classnames";
import { sfPro, inter } from "./fonts";
import { Metadata } from "next";
import { tw_style_merge } from "@/lib/utils";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { Toaster } from "@/components/shared/toaster";
import { Suspense } from "react";
import { NavigationEvents } from "@/lib/hooks/useNavigation";
import GlobalContextWrapper from "./globalContext";

export const metadata: Metadata = {
  title: "BMAPS",
  description:
    "An opiniated collection of tools nacessary for your retail workflows.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={tw_style_merge(
          "min-h-screen bg-background font-sans antialiased",
          cx(sfPro.variable, inter.variable)
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <GlobalContextWrapper>{children}</GlobalContextWrapper>
          <Suspense fallback={null}>
            <NavigationEvents />
          </Suspense>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
