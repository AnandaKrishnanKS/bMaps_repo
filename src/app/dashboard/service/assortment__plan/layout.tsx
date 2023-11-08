import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Assortment Planning | BMAPS',
    description: 'Assortment Planning for BMAPS',
}

export default async function AssortmentPlanLayout({
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