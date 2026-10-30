import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { SiteProviders } from "@/components/site/providers";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Monochrome — Component Foundation", template: "%s · Monochrome" },
  description: "An independent shadcn/ui reference: locally owned components, neutral surfaces, and interactive examples.",
  robots: { index: false, follow: false },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return <html lang="en" suppressHydrationWarning><body className={`${GeistSans.variable} ${GeistMono.variable} font-sans`}>
    <SiteProviders><a href="#main-content" className="sr-only fixed top-2 left-2 z-[100] rounded-md bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only">Skip to content</a>
      <Header/><main id="main-content" tabIndex={-1}>{children}</main><Footer/>
    </SiteProviders>
  </body></html>;
}
