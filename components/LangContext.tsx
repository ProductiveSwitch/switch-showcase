"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Bi, Lang } from "@/lib/data";

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (b: Bi) => string;
}

const Ctx = createContext<LangCtx>({ lang: "nl", setLang: () => {}, t: (b) => b.nl });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("nl");

  // Read the stored preference after mount (avoids a hydration mismatch)
  // ?lang=en|nl in de URL wint van de opgeslagen voorkeur (handig voor deelbare links)
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("lang");
    if (q === "en" || q === "nl") {
      setLangState(q);
      window.localStorage.setItem("ps-lang", q);
      return;
    }
    const stored = window.localStorage.getItem("ps-lang");
    if (stored === "en") setLangState("en");
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    window.localStorage.setItem("ps-lang", l);
  };

  const t = (b: Bi) => (lang === "nl" ? b.nl : b.en);

  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export function useLang() {
  return useContext(Ctx);
}
