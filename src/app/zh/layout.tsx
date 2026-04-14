import type { Metadata } from "next";
import { zhMetadata } from "@/lib/i18n/zh";

export const metadata: Metadata = {
  ...zhMetadata,
  alternates: zhMetadata.alternates,
  openGraph: {
    ...zhMetadata.openGraph,
  },
  twitter: {
    ...zhMetadata.twitter,
  },
};

export default function ZHLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
