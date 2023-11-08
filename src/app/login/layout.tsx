import { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
    title: 'BMAPS Login',
    description: 'Login to continue to BMAPS Application',
}

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {children}
        </>
    )
}