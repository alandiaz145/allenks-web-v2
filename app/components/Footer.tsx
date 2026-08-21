import { site } from "../site-data";

export default function Footer() {
  const links = [
    ["Instagram", "@DUBSTEPWACHO", site.instagram],
    ["SoundCloud", "ALLENKSMUSIC", site.soundcloud],
    ["YouTube", "@ALLENKSMUSIC", site.youtube],
    ["Spotify", "ALLEN KS", site.spotify],
  ];
  return (
    <footer className="footer">
      <div className="footer-socials">
        {links.map(([name, handle, href]) => (
          <a href={href} target="_blank" rel="noreferrer" key={name}>
            <span>{name}</span><strong>{handle}</strong><b>↗</b>
          </a>
        ))}
      </div>
      <div className="footer-bottom">
        <span>© 2026 ALLEN KS · BUENOS AIRES, ARGENTINA</span>
        <a href="#top">VOLVER ARRIBA ↑</a>
      </div>
    </footer>
  );
}
