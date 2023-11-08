import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SP | BMAPS",
  description: "SP for BMAPS",
};

export default async function SPLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
