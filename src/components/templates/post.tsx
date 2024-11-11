import { cn } from "@/utils/cn";
import Link, { type LinkProps } from "next/link";
import React from "react";

interface PostRootProps extends React.HTMLAttributes<HTMLElement> {}

const PostRoot = React.forwardRef<HTMLElement, PostRootProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <article className={cn("flex flex-col gap-3", className)} {...props}>
        {children}
      </article>
    );
  }
);

PostRoot.displayName = "Post";

interface PostHeaderProps extends React.HTMLAttributes<HTMLElement> {}

const PostHeader = React.forwardRef<HTMLElement, PostHeaderProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <header
        className={cn("flex items-center justify-between", className)}
        {...props}
      >
        {children}
      </header>
    );
  }
);

PostHeader.displayName = "PostHeader";

interface PostTitleProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
}

const PostTitle = React.forwardRef<HTMLAnchorElement, PostTitleProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <Link
        className={cn("font-bold text-3xl tracking-tight", className)}
        {...props}
      >
        {children}
      </Link>
    );
  }
);

const PostDate = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ children, className, ...props }, ref) => {
  return (
    <time className={cn("text-gray-500 text-sm", className)} {...props}>
      {typeof children === "string"
        ? new Date(children).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })
        : children}
    </time>
  );
});

const PostCategory = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ children, className, ...props }, ref) => {
  return (
    <span
      className={cn("text-red-500 text-sm capitalize", className)}
      {...props}
    >
      {children}
    </span>
  );
});

const PostHeadline = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ children, className, ...props }, ref) => {
  return (
    <h2 className={cn("font-medium text-neutral-500", className)} {...props}>
      {children}
    </h2>
  );
});

type PostComponet = typeof PostRoot & {
  Header: typeof PostHeader;
  Title: typeof PostTitle;
  Date: typeof PostDate;
  Category: typeof PostCategory;
  Headline: typeof PostHeadline;
};

const Post: PostComponet = Object.assign(PostRoot, {
  Header: PostHeader,
  Title: PostTitle,
  Date: PostDate,
  Category: PostCategory,
  Headline: PostHeadline,
});

export {
  PostRoot,
  PostHeader,
  PostTitle,
  PostDate,
  PostCategory,
  PostHeadline,
};

export default Post;
