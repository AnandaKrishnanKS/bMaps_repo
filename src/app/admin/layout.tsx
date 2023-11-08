import { Metadata } from "next";
import AppNavbar from "@/components/layout/nav-bar"
import Footer from "@/components/layout/footer";
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
    title: 'BMAPS Admin',
    description: 'Admin Interface for BMAPS',
}

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                <AppNavbar is_AdminDash={true} />
                <div className="flex flex-col pt-16 h-screen">
                    {children}
                </div>
                <Footer/>
            </ThemeProvider>
        </>
    )
}