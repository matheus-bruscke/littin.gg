"use client";
import useMedia from "@/hooks/use-media";
import { MEDIA_QUERIES } from "@/hooks/use-media";
import { SITE_ROUTES } from "@/metadata/site";
import { cn } from "@/utils/cn";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NavLinks = () => {
	const pathname = usePathname();

	function isActive(href: string) {
		// other pages
		if (pathname !== "/" && href !== "/" && pathname.includes(href)) {
			return true;
		}
		// home page
		if (pathname === "/" && href === "/" && pathname.includes(href)) {
			return true;
		}
		// posts with slug
		if (pathname.includes("posts") && href === "/" && pathname.includes(href)) {
			return true;
		}

		return false;
	}

	return (
		<nav className="flex flex-col gap-2 md:flex-row">
			{SITE_ROUTES.map((route) => (
				<Link
					className={cn(
						"flex h-9 items-center justify-center rounded-full px-4 font-medium text-base text-neutral-500 transition-colors duration-300",
						!isActive(route.href) &&
							"hover:bg-neutral-700/50 hover:text-neutral-100",
						isActive(route.href) && "bg-red-500/10 text-red-500",
					)}
					key={route.href}
					href={route.href}
				>
					{route.name}
				</Link>
			))}
		</nav>
	);
};

function Navbar() {
	const [isOpen, setIsOpen] = useState(false);
	const isMobile = useMedia(MEDIA_QUERIES.MOBILE);
	return (
		<header
			className={cn(
				"sticky top-6 z-50 mx-auto mt-6 flex min-h-16 w-full max-w-screen-lg flex-col items-center justify-between rounded-lg border border-neutral-800 bg-neutral-900/70 px-6 py-4 backdrop-blur-md lg:flex-row",
			)}
		>
			<div className="flex w-full items-center justify-between">
				{isMobile && (
					<button type="button" onClick={() => setIsOpen(!isOpen)}>
						{isOpen ? <X /> : <Menu />}
					</button>
				)}
				{!isMobile && <NavLinks />}
				<span>
					<Image
						src="/images/anime_pic.png"
						alt="LittiNg"
						width={40}
						height={40}
						className="rounded-full border border-neutral-800"
					/>
				</span>
			</div>
			{isMobile && isOpen && <NavLinks />}
		</header>
	);
}

export default Navbar;
