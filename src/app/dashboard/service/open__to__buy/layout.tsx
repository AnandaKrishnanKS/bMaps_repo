import { Metadata } from "next";

export const metadata: Metadata = {
  title: "OTB | BMAPS",
  description: "OTB for BMAPS",
};

export default async function OtbLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
