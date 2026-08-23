import Footer from "../components/Footer";
import LazyEmbed from "../components/LazyEmbed";
import ReleaseArtwork from "../components/ReleaseArtwork";
import SiteHeader from "../components/SiteHeader";
import { collaborations, remixes, site, topTracks } from "../site-data";

export default function MusicPage() {
  return (
    <main id="top">
      <SiteHeader active="musica" />
      <section className="inner-hero">
        <img src="/assets/allen-ks-portada.jpg" alt="ALLEN KS en vivo" />
        <div className="inner-hero-copy"><span>ALLEN KS / CATALOG</span><h1>MUSIC</h1><p>Originals, remixes, collaborations y el archivo del proyecto.</p></div>
      </section>

      <section className="music-page-feature">
        <div className="feature-copy"><span>OUT NOW</span><h2>BASS SO<br />HEAVY</h2><p>El release actual abre el catálogo. Escuchalo acá o entrá a SoundCloud para el resto del material.</p><a href={site.soundcloud} target="_blank" rel="noreferrer">OPEN SOUNDCLOUD →</a></div>
        <div><ReleaseArtwork compact /><div style={{ marginTop: 22 }}><LazyEmbed className="square-embed" src={site.bassSoHeavyEmbed} title="BASS SO HEAVY — ALLEN KS" /></div></div>
      </section>

      <section className="catalog-section">
        <h2>CATALOG</h2>
        <div className="catalog-list">{topTracks.map((track, i) => <div key={track}><span>{String(i + 1).padStart(2, "0")}</span><strong>{track}</strong><b>ALLEN KS</b></div>)}</div>
      </section>

      <section className="remix-grid">
        <div className="remix-panel"><h2>REMIXES</h2>{remixes.map((track, i) => <article key={track}><span>R{String(i + 1).padStart(2, "0")}</span><strong>{track}</strong></article>)}</div>
        <div className="remix-panel"><h2>COLLABS</h2>{collaborations.map((track, i) => <article key={track}><span>C{String(i + 1).padStart(2, "0")}</span><strong>{track}</strong></article>)}</div>
      </section>

      <Footer />
    </main>
  );
}
