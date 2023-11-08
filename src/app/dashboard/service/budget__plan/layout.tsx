import { Metadata } from "next";

export const metadata: Metadata = {
  title: "BUDGET PLAN | BMAPS",
  description: "BUDGET PLAN  for BMAPS",
};

export default async function BudgetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
