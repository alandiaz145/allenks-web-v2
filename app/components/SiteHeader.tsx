import Link from "next/link";
import { site } from "../site-data";

const nav = [
  { label: "Music", href: "/musica", key: "musica" },
  { label: "Live", href: "/#live", key: "live" },
  { label: "Store", href: "/tienda", key: "tienda" },
  { label: "Projects", href: "/proyectos", key: "proyectos" },
] as const;

const socials = [
  ["IG", site.instagram],
  ["SC", site.soundcloud],
  ["YT", site.youtube],
  ["SP", site.spotify],
] as const;

export default function SiteHeader({ active }: { active: string }) {
  return (
    <header className="v3-header">
      <nav className="v3-nav v3-nav-left" aria-label="Navegación principal">
        {nav.map(item => <Link key={item.key} href={item.href} className={active === item.key ? "active" : ""}>{item.label}</Link>)}
      </nav>
      <Link href="/" className="v3-logo" aria-label="ALLEN KS — Inicio">
        <img src="/assets/allen-ks-logo.png" alt="" />
        <strong>ALLEN KS</strong>
      </Link>
      <nav className="v3-nav v3-nav-right" aria-label="Redes sociales">
        {socials.map(([label, href]) => <a key={label} href={href} target="_blank" rel="noreferrer">{label}</a>)}
        <a className="v3-booking" href={site.bookingWhatsapp} target="_blank" rel="noreferrer">Booking</a>
      </nav>
      <details className="v3-mobile-nav">
        <summary aria-label="Abrir menú"><i /><i /></summary>
        <nav>
          {nav.map(item => <Link key={item.key} href={item.href}>{item.label}</Link>)}
          <a href={site.bookingWhatsapp} target="_blank" rel="noreferrer">Booking ↗</a>
        </nav>
      </details>
    </header>
  );
}
