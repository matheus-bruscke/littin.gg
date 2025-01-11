"use client";
import useMedia from "@/hooks/use-media";
import { MEDIA_QUERIES } from "@/hooks/use-media";
import { SITE_ROUTES } from "@/metadata/site";
import { cn } from "@/utils/cn";
import { ChevronRight, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NavLinks = () => {
	const pathname = usePathname();
	const isMobile = useMedia(MEDIA_QUERIES.MOBILE);

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
		<nav className="mt-4 flex w-full flex-col gap-2 md:mt-0 md:w-auto md:flex-row">
			{SITE_ROUTES.map((route, index) => (
				<Link
					className={cn(
						"group relative flex h-10 w-full items-center justify-between rounded-md border border-neutral-800 px-4 font-medium text-base text-neutral-200 transition-colors duration-300 md:min-h-16 md:w-auto md:flex-col md:items-center md:items-center md:justify-center md:rounded-none md:rounded-none md:border-none",
						index === 0 && "md:rounded-tl-lg md:rounded-bl-lg",
						!isActive(route.href) && " hover:text-red-500",
						isActive(route.href) &&
							"rounded-br-none text-red-500 md:rounded-b-none",
						// isActive(route.href) && " border-b-red-500",
					)}
					key={route.href}
					href={route.href}
				>
					{route.name}
					{isActive(route.href) && (
						<span className="absolute bottom-0 left-0 h-px w-full bg-red-500" />
					)}
					{isMobile && !isActive(route.href) && (
						<ChevronRight
							className="text-neutral-400 group-active:animate-slide-in"
							size={16}
						/>
					)}
				</Link>
			))}
		</nav>
	);
};

function Navbar() {
	const [isOpen, setIsOpen] = useState(false);
	const isMobile = useMedia(MEDIA_QUERIES.MOBILE);
	const pathname = usePathname();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (isMobile) setIsOpen(false);
	}, [pathname, isMobile]);

	return (
		<header
			className={cn(
				"container sticky top-6 z-50 mx-auto mt-6 min-h-16 w-full max-w-screen-lg",
			)}
		>
			<div className="flex w-full flex-col items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900/70 px-6 py-3 backdrop-blur-md md:py-0 md:pl-2 lg:flex-row">
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
			</div>
		</header>
	);
}

export default Navbar;
