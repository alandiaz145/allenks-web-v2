import { site } from "../site-data";

const links = [
  ["Instagram", "@DUBSTEPWACHO", site.instagram, "instagram"],
  ["SoundCloud", "ALLENKSMUSIC", site.soundcloud, "soundcloud"],
  ["YouTube", "@ALLENKSMUSIC", site.youtube, "youtube"],
  ["Spotify", "ALLEN KS", site.spotify, "spotify"],
] as const;

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-socials">
        {links.map(([name, handle, href, icon]) => (
          <a href={href} target="_blank" rel="noreferrer" key={name}>
            <img
              className="footer-platform-icon"
              src={`https://cdn.simpleicons.org/${icon}/090606`}
              alt=""
              width="22"
              height="22"
            />
            <span>{name}</span>
            <strong>{handle}</strong>
            <b>↗</b>
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
