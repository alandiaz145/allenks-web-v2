import { site } from "../site-data";

const links = [
  ["Instagram", "@DUBSTEPWACHO", site.instagram],
  ["SoundCloud", "ALLENKSMUSIC", site.soundcloud],
  ["YouTube", "@ALLENKSMUSIC", site.youtube],
  ["Spotify", "ALLEN KS", site.spotify],
] as const;

export default function Footer() {
  return (
    <footer className="v10-footer">
      <div className="v10-footer-main">
        <div className="v10-footer-brand">
          <img src="/assets/allen-ks-logo.png" alt="ALLEN KS" width="926" height="609" />
          <div>
            <strong>ALLEN KS</strong>
            <span>DJ · PRODUCER · DUBSTEP WACHO</span>
          </div>
        </div>

        <div className="v10-footer-cta">
          <small>BOOKINGS · COLABS · PRODUCCIÓN</small>
          <h2>¿HACEMOS<br />ALGO RUIDOSO?</h2>
          <a className="button button-red" href={site.whatsapp} target="_blank" rel="noreferrer">
            HABLEMOS →
          </a>
        </div>
      </div>

      <nav className="v10-footer-socials" aria-label="Redes sociales">
        {links.map(([name, handle, href]) => (
          <a href={href} target="_blank" rel="noreferrer" key={name}>
            <span>{name}</span>
            <strong>{handle}</strong>
            <b>↗</b>
          </a>
        ))}
      </nav>

      <div className="v10-footer-bottom">
        <span>© 2026 ALLEN KS · BUENOS AIRES, ARGENTINA</span>
        <a href="#top">VOLVER ARRIBA ↑</a>
      </div>
    </footer>
  );
}
