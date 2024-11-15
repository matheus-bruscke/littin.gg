"use client";
import useMedia, { MEDIA_QUERIES } from "@/hooks/use-media";
import { SITE_ROUTES } from "@/metadata/site";
import { cn } from "@/utils/cn";
import Link from "next/link";

interface WrapperProps extends React.HTMLAttributes<HTMLElement> {}

const Wrapper: React.FC<WrapperProps> = ({ children, className, ...props }) => {
  const isDesktop = useMedia(MEDIA_QUERIES.DESKTOP);

  if (isDesktop)
    return (
      <aside className={cn("flex flex-col gap-48", className)} {...props}>
        {children}
      </aside>
    );

  return (
    <header
      className={cn("flex items-center justify-between", className)}
      {...props}
    >
      {children}
    </header>
  );
};

const Navigation = () => {
  const isDesktop = useMedia(MEDIA_QUERIES.DESKTOP);

  const linkStyles = cn(
    "text-neutral-50 hover:text-red-500 tracking-tight",
    isDesktop ? "text-xl" : "text-lg"
  );

  return (
    <Wrapper>
      <nav className="flex flex-col gap-2">
        {SITE_ROUTES.map((route) => (
          <Link key={route.href} className={linkStyles} href={route.href}>
            {route.name}
          </Link>
        ))}
      </nav>
    </Wrapper>
  );
};

export default Navigation;
