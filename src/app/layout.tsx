import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/providers/auth-provider";
import { ModalProvider } from "@/components/providers/modal-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js Starter",
  description:
    "A modern Next.js starter with TypeScript, Tailwind CSS, shadcn/ui, and Supabase",
  openGraph: {
    title: "Next.js Starter",
    description:
      "A modern Next.js starter with TypeScript, Tailwind CSS, shadcn/ui, and Supabase",
    url: "https://github.com/3lokai/nextjs-starter-gt",
    siteName: "Next.js Starter",
    images: [
      {
        url: "/api/og?title=Next.js%20Starter&description=A%20modern%20Next.js%20starter%20with%20TypeScript%2C%20Tailwind%20CSS%2C%20shadcn%2Fui%2C%20and%20Supabase",
        width: 1200,
        height: 630,
        alt: "Next.js Starter",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Next.js Starter",
    description:
      "A modern Next.js starter with TypeScript, Tailwind CSS, shadcn/ui, and Supabase",
    images: [
      "/api/og?title=Next.js%20Starter&description=A%20modern%20Next.js%20starter%20with%20TypeScript%2C%20Tailwind%20CSS%2C%20shadcn%2Fui%2C%20and%20Supabase",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
        >
          <QueryProvider>
            <AuthProvider>
              <ModalProvider>
                {children}
                <Toaster />
              </ModalProvider>
            </AuthProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
