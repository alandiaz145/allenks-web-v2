import { site } from "../site-data";

const links = [
  ["Instagram", "@DUBSTEPWACHO", site.instagram],
  ["SoundCloud", "ALLENKSMUSIC", site.soundcloud],
  ["YouTube", "@ALLENKSMUSIC", site.youtube],
  ["Spotify", "ALLEN KS", site.spotify],
] as const;

export default function Footer() {
  return (
    <footer className="v3-footer">
      <div className="v3-footer-mark">
        <img src="/assets/allen-ks-logo.png" alt="ALLEN KS" />
        <p>DJ / PRODUCER<br />BUENOS AIRES</p>
      </div>
      <div className="v3-footer-links">
        {links.map(([name, handle, href]) => (
          <a href={href} target="_blank" rel="noreferrer" key={name}>
            <small>{name}</small><strong>{handle}</strong><span>↗</span>
          </a>
        ))}
      </div>
      <div className="v3-footer-bottom"><span>© 2026 ALLEN KS</span><span>ARGENTINA</span><a href="#top">BACK TO TOP ↑</a></div>
    </footer>
  );
}
