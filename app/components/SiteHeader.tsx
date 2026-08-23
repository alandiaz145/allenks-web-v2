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
  return <header className="artist-header">
    <nav className="artist-nav artist-nav-left" aria-label="Navegación principal">
      {nav.map(item => <Link key={item.key} href={item.href} className={active === item.key ? "active" : ""}>{item.label}</Link>)}
    </nav>
    <Link href="/" className="artist-logo" aria-label="ALLEN KS — Inicio"><img src="/assets/allen-ks-logo.png" alt="ALLEN KS"/></Link>
    <nav className="artist-nav artist-nav-right" aria-label="Redes sociales">
      {socials.map(([label, href]) => <a key={label} href={href} target="_blank" rel="noreferrer">{label}</a>)}
      <a className="booking-link" href={site.bookingWhatsapp} target="_blank" rel="noreferrer">Booking</a>
    </nav>
    <details className="artist-mobile-nav">
      <summary aria-label="Abrir menú"><i/><i/></summary>
      <nav>{nav.map(item => <Link key={item.key} href={item.href}>{item.label}</Link>)}<a href={site.bookingWhatsapp} target="_blank" rel="noreferrer">Booking ↗</a></nav>
    </details>
  </header>;
}
