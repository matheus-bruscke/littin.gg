"use client";

import React, { useEffect, useMemo } from "react";

export const useView = (ids: string[]) => {
  const [idsInView, setIdsInView] = React.useState<string[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const newIds = new Set([...idsInView]); 
      let hasChanges = false;

      for (const entry of entries) {
        if (entry.isIntersecting) {
          if (!newIds.has(entry.target.id)) {
            newIds.add(entry.target.id);
            hasChanges = true;
          }
        } else {
          if (newIds.has(entry.target.id)) {
            newIds.delete(entry.target.id);
            hasChanges = true;
          }
        }
      }

      if (hasChanges) {
        setIdsInView(Array.from(newIds));
      }
    });

    for (const id of ids) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }

    return () => {
      observer.disconnect(); 
    };
  }, [ids, idsInView]);

  const isInView = useMemo(() => {
    if (ids.length === 1) return idsInView.includes(ids[0]);

    return idsInView.some((id) => ids.includes(id));
  }, [ids, idsInView]);

  return { idsInView, isInView };
};
