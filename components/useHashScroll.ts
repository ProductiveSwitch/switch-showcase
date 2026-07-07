"use client";

import { useEffect } from "react";

// De App Router scrollt niet betrouwbaar naar #anchors bij navigatie tussen
// routes; dit haakje doet het zelf zodra de pagina gemount is.
export function useHashScroll() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const timer = setTimeout(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
    return () => clearTimeout(timer);
  }, []);
}
