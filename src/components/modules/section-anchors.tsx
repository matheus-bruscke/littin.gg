"use client";
import { useView } from "@/hooks/use-view";
import { cn } from "@/utils/cn";
import { useMemo, useState } from "react";

interface SectionAnchorsProps extends React.HTMLAttributes<HTMLDivElement> {
  anchors: { id: string; title: string }[];
}

const Anchor = ({
  id,
  title,
  inView,
}: {
  id: string;
  title: string;
  inView?: boolean;
}) => {
  return (
    <a href={`#${id}`} className="group flex max-w-60 items-center gap-x-4">
      <span
        data-in-view={inView ? "true" : "false"}
        className={cn(
          "flex-1 truncate text-right font-medium transition-all",
          "data-[in-view='false']:animate-slide-out data-[in-view='true']:animate-slide-in data-[in-view='false']:opacity-0 data-[in-view='false']:group-hover:opacity-100",
          inView ? "text-neutral-50" : "text-neutral-500"
        )}
      >
        {title}
      </span>
      <span
        className={cn(
          "ml-auto h-0.5",
          inView ? "w-6 bg-neutral-50" : "w-4 bg-neutral-500"
        )}
      />
    </a>
  );
};

const SectionAnchors = ({
  anchors,
  className,
  ...props
}: SectionAnchorsProps) => {
  const { idsInView, isInView } = useView(anchors.map((anchor) => anchor.id));

  const firstInView = useMemo(() => {
    const anchorIds = anchors.map((anchor) => anchor.id);
    const lastItem = anchorIds[anchorIds.length - 1];

    if (idsInView.length === 0) return null;

    if (idsInView.length > 0 && !idsInView.includes(lastItem)) {
      return anchorIds.filter((id) => idsInView.includes(id))[0];
    }

    return lastItem;
  }, [idsInView, anchors]);

  return (
    <div className={cn("flex flex-col gap-y-2 text-sm", className)} {...props}>
      {anchors.map((anchor) => (
        <Anchor
          inView={anchor.id === firstInView}
          key={anchor.id}
          id={anchor.id}
          title={anchor.title}
        />
      ))}
    </div>
  );
};

export default SectionAnchors;
