"use client";

import { useEffect } from "react";

// Scroll-reveal per pagina: elke route observeert zijn eigen .reveal-elementen.
export function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" }
    );
    const els = document.querySelectorAll(".reveal");
    els.forEach((el) => io.observe(el));
    // Vangnet: wat na anderhalve seconde nog niet zichtbaar is, tonen we alsnog
    // (voorkomt lege secties bij client-side navigatie of te hoge blokken).
    const fallback = window.setTimeout(() => els.forEach((el) => el.classList.add("in")), 1500);
    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);
}
