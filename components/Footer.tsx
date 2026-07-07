"use client";

import { useLang } from "./LangContext";

export function Footer() {
  const { t } = useLang();
  return (
    <footer>
      <div className="wrap inner">
        <div className="brand">
          Productive<span className="dot">·</span>Switch
        </div>
        <div>
          {t({
            nl: "© 2026 Productive Switch. Omscholing en werving voor HR-leiders.",
            en: "© 2026 Productive Switch. Re-training and recruitment for HR leaders.",
          })}
        </div>
      </div>
    </footer>
  );
}
