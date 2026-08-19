import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteUrl = "https://keypr.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Keypr | Privacy-First Password Manager",
  description:
    "Keypr is a zero-knowledge password manager with AES-256 encryption, disposable email aliases, and fake-identity personas. Your master password never leaves your device.",
  keywords: [
    "password manager",
    "zero-knowledge encryption",
    "email aliasing",
    "privacy",
    "AES-256",
    "open source security",
  ],
  openGraph: {
    title: "Keypr | Privacy-First Password Manager",
    description:
      "Zero-knowledge encryption, disposable identities, and a vault that never sees your secrets in the clear.",
    url: siteUrl,
    siteName: "Keypr",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Keypr | Privacy-First Password Manager",
    description:
      "Zero-knowledge encryption, disposable identities, and a vault that never sees your secrets in the clear.",
  },
  icons: {
    icon: "/icons/pdg_logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0f0f0b",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <div className="bg-noise-grid" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
