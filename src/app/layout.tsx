// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import CustomSessionProvider from "@/files/SessionProvider";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "@/context/userContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tour Webapp",
  description: "Tour webapp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased w-full min-h-screen bg-[#F8FAFC] dark:bg-[#0F172B]">
        {" "}
        <CustomSessionProvider>
          <UserProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <SidebarProvider>
                <AppSidebar />
                <main className="w-full min-h-screen">
                  <SidebarTrigger />
                  <ModeToggle />
                  {children}
                </main>
              </SidebarProvider>
            </ThemeProvider>
            <ToastContainer />
          </UserProvider>
        </CustomSessionProvider>
      </body>
    </html>
  );
}
