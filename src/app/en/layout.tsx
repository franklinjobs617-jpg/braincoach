import type { Metadata } from "next";
import { enMetadata } from "@/lib/i18n/en";

export const metadata: Metadata = {
  ...enMetadata,
  alternates: enMetadata.alternates,
  openGraph: {
    ...enMetadata.openGraph,
  },
  twitter: {
    ...enMetadata.twitter,
  },
};

export default function ENLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
