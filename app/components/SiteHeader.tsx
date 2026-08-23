import Link from "next/link";
import { signalTicker } from "../site-data";

const nav = [
  { label: "Inicio", href: "/", key: "inicio" },
  { label: "Música", href: "/musica", key: "musica" },
  { label: "Live", href: "/#live", key: "live" },
  { label: "Store", href: "/tienda", key: "tienda" },
  { label: "Proyectos", href: "/proyectos", key: "proyectos" },
] as const;

export default function SiteHeader({ active }: { active: string }) {
  return <>
    <div className="signal-ticker"><div className="signal-ticker-track">{[0,1].map(copy => <div className="signal-ticker-group" aria-hidden={copy === 1} key={copy}>{signalTicker.map(item => <span key={`${copy}-${item}`}>{item}</span>)}</div>)}</div></div>
    <header className="signal-header">
      <Link href="/" className="signal-brand" aria-label="ALLEN KS — Inicio"><img src="/assets/allen-ks-logo.png" alt=""/><span><strong>ALLEN KS</strong><small>AKS // 2026</small></span></Link>
      <nav className="signal-nav">{nav.map(item => <Link key={item.key} href={item.href} className={active === item.key ? "active" : ""}>{item.label}</Link>)}<a href="https://wa.me/5491136133976?text=Hola+Allen+KS%2C+quiero+consultar+por+una+contrataci%C3%B3n." target="_blank" rel="noreferrer" className="nav-booking">Booking ↗</a></nav>
      <details className="signal-mobile"><summary aria-label="Abrir menú"><i/><i/></summary><nav>{nav.map(item => <Link key={item.key} href={item.href} className={active === item.key ? "active" : ""}>{item.label}</Link>)}<a href="https://wa.me/5491136133976?text=Hola+Allen+KS%2C+quiero+consultar+por+una+contrataci%C3%B3n." target="_blank" rel="noreferrer">Booking ↗</a></nav></details>
    </header>
  </>;
}
