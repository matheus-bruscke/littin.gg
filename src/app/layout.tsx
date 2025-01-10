import type { Metadata, Viewport } from "next";
import "highlight.js/styles/dark.min.css";
import "./globals.css";
import Navbar from "@/components/layouts/navbar";
import { site_info } from "@/content/app-info";
import { fragmentMono, helveticaNeue } from "@/content/fonts";

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
				className={`${helveticaNeue.variable} ${fragmentMono.variable} container relative mx-auto my-0 flex flex-col gap-8 lg:gap-12`}
			>
				<Navbar />
				{children}
			</body>
		</html>
	);
}
