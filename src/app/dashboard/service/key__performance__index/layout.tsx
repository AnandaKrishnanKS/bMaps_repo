import { Metadata } from "next";

export const metadata: Metadata = {
  title: "KPI | BMAPS",
  description: "KPI for BMAPS",
};

export default async function KpiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
