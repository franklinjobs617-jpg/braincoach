import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "BrainAI - Your AI Productivity Coach",
    template: "%s | BrainAI",
  },
  description: "AI-powered daily planner and productivity coach. Align every task to your goals.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:5000"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en",
      "zh-CN": "/zh",
    },
  },
  openGraph: {
    siteName: "BrainAI",
    type: "website",
  },
};

const schemaData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "BrainAI",
  applicationCategory: "ProductivityApplication",
  operatingSystem: "Web",
  description: "AI-powered daily planner and productivity coach. Align every task to your goals.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "1250",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaData),
          }}
        />
      </body>
    </html>
  );
}
