import type { Metadata, Viewport } from "next";
import "highlight.js/styles/dark.min.css";
import "./globals.css";
import Navigation from "@/components/layouts/navigation";
import { site_info } from "@/content/app-info";
import { fragmentMono, helveticaNeue } from "@/content/fonts";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export const metadata: Metadata = {
  title: {
    default: site_info.name,
    template: `%s - ${site_info.name}`,
  },
  description: site_info.description,
  icons: {
    icon: "/icons/favicon.ico",
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${helveticaNeue.variable} ${fragmentMono.variable} container mx-auto my-0 flex flex-col gap-8 lg:flex-row lg:gap-12`}
      >
        <Navigation />
        {children}
      </body>
    </html>
  );
}
