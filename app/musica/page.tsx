import Footer from "../components/Footer";
import LazyEmbed from "../components/LazyEmbed";
import SiteHeader from "../components/SiteHeader";
import { collaborations, remixes, site, topTracks } from "../site-data";

export default function MusicaPage() {
  return (
    <main id="top">
      <SiteHeader active="musica" />
      <section className="page-hero section-dark">
        <div className="section-index"><span>01 CATÁLOGO ALLEN KS</span></div>
        <h1 className="page-title light">MÚSICA</h1>
        <p className="page-lead light">Lanzamientos, originales, remixes, colaboraciones y selecciones de ALLEN KS.</p>
      </section>
      <section className="music-feature section-dark">
        <div className="section-head section-head-light">
          <div><div className="section-index"><span>02 ACTUALIDAD</span></div><h2>AHORA</h2></div>
        </div>
        <div className="release-grid">
          <article className="release-card release-card-on-dark">
            <div className="release-card-head"><span>ÚLTIMO LANZAMIENTO</span><b>174 BPM</b></div>
            <h3>GETTING STARTED</h3>
            <LazyEmbed className="square-embed" src={site.latestSoundCloudEmbed} title="GETTING STARTED de ALLEN KS" />
          </article>
          <article className="release-card release-card-red">
            <div className="release-card-head"><span>PRÓXIMO LANZAMIENTO</span><b>22 AGO 2026</b></div>
            <h3>BASS SO HEAVY</h3>
            <LazyEmbed className="square-embed" src={site.upcomingSoundCloudEmbed} title="BASS SO HEAVY de ALLEN KS" />
          </article>
        </div>
      </section>
      <section className="catalog-section section-paper">
        <div className="section-head"><div><div className="section-index"><span>03 TOP 10</span></div><h2>ORIGINALES</h2></div></div>
        <div className="track-grid">
          {topTracks.map((track, index) => <article className="track-card" key={track}><span>{String(index + 1).padStart(2, "0")}</span><strong>{track}</strong><small>ALLEN KS</small></article>)}
        </div>
      </section>
      <section className="split-catalog section-dark">
        <div className="catalog-column"><div className="section-index"><span>04</span></div><h2>REMIXES</h2>{remixes.map((track, index) => <article key={track}><b>{String(index + 1).padStart(2, "0")}</b><span>{track}</span></article>)}</div>
        <div className="catalog-column"><div className="section-index"><span>05</span></div><h2>COLABORACIONES</h2>{collaborations.map((track, index) => <article key={track}><b>{String(index + 1).padStart(2, "0")}</b><span>{track}</span></article>)}</div>
      </section>
      <section className="platform-section section-paper">
        <div className="section-head"><div><div className="section-index"><span>06 ESCUCHÁ MÁS</span></div><h2>PLATAFORMAS</h2></div></div>
        <div className="platform-grid">
          <a href={site.soundcloud} target="_blank" rel="noreferrer"><span>SOUNDCLOUD</span><strong>ALLENKSMUSIC</strong><b>ABRIR ↗</b></a>
          <a href={site.spotify} target="_blank" rel="noreferrer"><span>SPOTIFY</span><strong>ALLEN KS</strong><b>ABRIR ↗</b></a>
          <a href={site.youtube} target="_blank" rel="noreferrer"><span>YOUTUBE</span><strong>@ALLENKSMUSIC</strong><b>ABRIR ↗</b></a>
        </div>
      </section>
      <Footer />
    </main>
  );
}
