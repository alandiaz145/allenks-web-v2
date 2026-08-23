import Link from "next/link";
import { site } from "../site-data";

type NavItem = {
  label: string;
  key: string;
  href: string;
};

const nav: NavItem[] = [
  { label: "MUSIC", href: "/musica", key: "musica" },
  { label: "LIVE", href: "/#en-vivo", key: "live" },
  { label: "STORE", href: "/tienda", key: "tienda" },
  { label: "PROJECTS", href: "/proyectos", key: "proyectos" },
];

const socials = [
  { label: "Instagram", href: site.instagram, icon: "instagram" },
  { label: "SoundCloud", href: site.soundcloud, icon: "soundcloud" },
  { label: "YouTube", href: site.youtube, icon: "youtube" },
  { label: "Spotify", href: site.spotify, icon: "spotify" },
];

export default function SiteHeader({ active }: { active: string }) {
  return (
    <header className="site-header site-header--top">
      <Link className="brand brand-text-only" href="/" aria-label="ALLEN KS — Inicio">
        <strong>ALLEN KS</strong>
      </Link>

      <nav className="desktop-nav" aria-label="Navegación principal">
        {nav.map((item) => (
          <Link
            className={active === item.key ? "active" : ""}
            href={item.href}
            key={item.key}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="header-socials" aria-label="Redes de ALLEN KS">
        {socials.map((item) => (
          <a
            href={item.href}
            target="_blank"
            rel="noreferrer"
            aria-label={item.label}
            key={item.label}
          >
            <img
              src={`https://cdn.simpleicons.org/${item.icon}/ffffff`}
              alt=""
              width="18"
              height="18"
            />
          </a>
        ))}
      </div>

      <details className="mobile-nav">
        <summary aria-label="Abrir menú"><span /><span /></summary>
        <nav aria-label="Navegación móvil">
          {nav.map((item) => (
            <Link
              className={active === item.key ? "active" : ""}
              href={item.href}
              key={item.key}
            >
              {item.label}
            </Link>
          ))}
          <div className="mobile-socials">
            {socials.map((item) => (
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                key={item.label}
              >
                <img
                  src={`https://cdn.simpleicons.org/${item.icon}/090606`}
                  alt=""
                  width="19"
                  height="19"
                />
              </a>
            ))}
          </div>
        </nav>
      </details>
    </header>
  );
}
