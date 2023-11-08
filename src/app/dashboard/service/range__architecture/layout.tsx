import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Range Architecture | BMAPS",
  description: "Range Architecture for BMAPS",
};

export default async function RaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
