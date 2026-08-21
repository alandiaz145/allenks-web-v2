import Link from "next/link";
import { tickerItems } from "../site-data";

const nav = [
  { label: "Inicio", href: "/", key: "inicio" },
  { label: "Música", href: "/musica", key: "musica" },
  { label: "Tienda", href: "/tienda", key: "tienda" },
  { label: "Sorteos", key: "sorteos", disabled: true },
  { label: "Proyectos", href: "/proyectos", key: "proyectos" },
  { label: "Asesoramiento", key: "asesoramiento", disabled: true },
] as const;

const musicTicker = [
  "ALLEN KS · ARTISTA INDEPENDIENTE",
  "NUEVO RELEASE · 22.08.2026",
  "BUENOS AIRES · ARGENTINA",
  "DUBSTEP · DRUM & BASS · RIDDIM",
  "SETS · REMIXES · PRODUCCIÓN",
  "AKA DUBSTEP WACHO",
];

export default function SiteHeader({ active }: { active: string }) {
  const showTicker = active === "inicio" || active === "musica";
  const ticker = active === "musica" ? musicTicker : tickerItems;
  return (
    <>
      {showTicker && (
        <div className="ticker" aria-label="Novedades de ALLEN KS">
          <div className="ticker-track">
            {[0, 1].map((copy) => (
              <div className="ticker-group" aria-hidden={copy === 1} key={copy}>
                {ticker.map((item) => <span key={`${copy}-${item}`}>{item}</span>)}
              </div>
            ))}
          </div>
        </div>
      )}
      <header className={`site-header${showTicker ? "" : " site-header--top"}`}>
        <Link className="brand" href="/" aria-label="ALLEN KS — Inicio">
          <img src="/assets/allen-ks-logo.png" alt="" width="926" height="609" />
          <strong>ALLEN KS</strong>
        </Link>
        <nav className="desktop-nav" aria-label="Navegación principal">
          {nav.map((item) => item.disabled ? (
            <span className="nav-disabled" key={item.key} aria-disabled="true">{item.label}</span>
          ) : (
            <Link className={active === item.key ? "active" : ""} href={item.href!} key={item.key}>{item.label}</Link>
          ))}
        </nav>
        <details className="mobile-nav">
          <summary aria-label="Abrir menú"><span /><span /></summary>
          <nav aria-label="Navegación móvil">
            {nav.map((item) => item.disabled ? (
              <span className="mobile-disabled" key={item.key}>{item.label}</span>
            ) : (
              <Link className={active === item.key ? "active" : ""} href={item.href!} key={item.key}>{item.label}</Link>
            ))}
          </nav>
        </details>
      </header>
    </>
  );
}
