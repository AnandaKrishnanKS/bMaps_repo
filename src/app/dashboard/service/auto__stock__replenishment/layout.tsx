import { Metadata } from "next"

export const metadata: Metadata = {
  title: "ASR | BMAPS",
  description: "Automatic Stock Replanishment",
}

export default async function ASRLayout({
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