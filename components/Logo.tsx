// Beeldmerk en woordmerk Productive Switch, naar "Ronde 4, E Overlap"
// (productive-switch-logoset.pptx, oktober 2026): twee knopen, jungle green
// en marineblauw, met de gedeelde kern in mint. Op donker krijgen de knopen
// een witte hairline. Search = zelfde merk, kleuren gespiegeld.

export function LogoMark({
  size = 28,
  onDark = false,
  search = false,
  className,
}: {
  size?: number;
  onDark?: boolean;
  search?: boolean;
  className?: string;
}) {
  const left = search ? "#24456F" : "#2F7A6A";
  const right = search ? "#2F7A6A" : "#24456F";
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" className={className}>
      <circle cx="24" cy="32" r="14" fill={left} stroke={onDark ? "#fff" : "none"} strokeWidth={onDark ? 1.5 : 0} />
      <circle cx="40" cy="32" r="14" fill={right} stroke={onDark ? "#fff" : "none"} strokeWidth={onDark ? 1.5 : 0} />
      <path d="M32 20.5 A14 14 0 0 1 32 43.5 A14 14 0 0 1 32 20.5 Z" fill="#A9D9B3" />
    </svg>
  );
}

export function Logo({
  onDark = false,
  search = false,
  size = 26,
  className,
}: {
  onDark?: boolean;
  search?: boolean;
  size?: number;
  className?: string;
}) {
  return (
    <span className={`logo${onDark ? " logo--ondark" : ""}${className ? ` ${className}` : ""}`}>
      <LogoMark size={size} onDark={onDark} search={search} />
      <span className="logo-word">Productive {search ? "Search" : "Switch"}</span>
    </span>
  );
}
