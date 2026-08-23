import Footer from "./components/Footer";
import LazyEmbed from "./components/LazyEmbed";
import MediaCarousel from "./components/MediaCarousel";
import SiteHeader from "./components/SiteHeader";
import { site } from "./site-data";

const releaseItems = [
  {
    src: site.upcomingSoundCloudEmbed,
    title: "BASS SO HEAVY — ALLEN KS",
    eyebrow: "NUEVO LANZAMIENTO",
    heading: "BASS SO HEAVY",
    meta: "22 AGO 2026",
    note: "ID ORIGINAL · YA DISPONIBLE",
  },
  {
    src: site.latestSoundCloudEmbed,
    title: "GETTING STARTED — ALLEN KS",
    eyebrow: "LANZAMIENTO ANTERIOR",
    heading: "GETTING STARTED",
    meta: "174 BPM",
    note: "ALLEN KS · ORIGINAL",
  },
];

const liveItems = site.liveYouTubeEmbeds.map((src, index) => ({
  src,
  title: `ALLEN KS en vivo — set ${index + 1}`,
  eyebrow: index === 0 ? "IKI B2B ALLEN KS" : "ALLEN KS EN VIVO",
  heading: index === 0 ? "OTRA NOCHE" : `SET ${String(index + 1).padStart(2, "0")}`,
}));

export default function HomePage() {
  return (
    <main id="top">
      <SiteHeader active="inicio" />

      <section className="home-hero home-hero-cover section-dark">
        <div className="hero-cover-overlay" aria-hidden="true" />
        <div className="hero-cover-grid" aria-hidden="true" />
        <div className="hero-copy hero-copy-clean">
          <h1 className="hero-wordmark">ALLEN KS</h1>
          <p className="hero-aka">AKA DUBSTEP WACHO</p>
          <p className="hero-lead">
            Artista argentino, creador de Otra Noche y fundador de Spartans Label.
            Descubrí su música, próximas fechas y proyectos.
          </p>
          <div className="hero-actions">
            <a className="button button-red" href="#lanzamientos">ESCUCHAR AHORA ↘</a>
            <a className="button button-ghost" href="#en-vivo">VER EN VIVO ↘</a>
          </div>
        </div>
      </section>

      <section id="lanzamientos" className="v10-releases section-paper">
        <header className="v10-centered-heading">
          <span>MÚSICA NUEVA · ALLEN KS</span>
          <h2>LANZAMIENTOS</h2>
        </header>
        <MediaCarousel items={releaseItems} variant="release" />
        <div className="v10-section-link-wrap">
          <a className="text-link" href="/musica">VER TODO EL CATÁLOGO →</a>
        </div>
      </section>

      <section id="en-vivo" className="v10-live section-dark">
        <header className="v10-centered-heading v10-centered-heading--light">
          <span>SETS · SHOWS · MOMENTOS</span>
          <h2>EN VIVO</h2>
        </header>

        <MediaCarousel items={liveItems} variant="live" />

        <div className="v10-next-show">
          <div className="v10-next-show-label">PRÓXIMAS FECHAS</div>
          <div className="v10-next-show-date">
            <strong>05 SEPTIEMBRE</strong>
            <span>FREE PARTY · MULTIGÉNERO</span>
          </div>
        </div>
      </section>

      <section id="proyectos" className="v10-projects section-paper">
        <header className="v10-centered-heading">
          <span>PRODUCCIÓN · RECURSOS · CONTENIDO</span>
          <h2>PROYECTOS</h2>
        </header>

        <div className="v10-project-layout">
          <div className="v10-project-video">
            <LazyEmbed
              className="video-embed"
              src={site.productionYouTubeEmbed}
              title="ALLEN KS — contenido de producción"
            />
            <div className="v10-project-video-label">
              <span>PRODUCTION CONTENT</span>
              <strong>ALLEN KS / FL STUDIO</strong>
            </div>
          </div>

          <div className="v10-project-copy">
            <span className="v10-kicker">ABRIR EL PROYECTO</span>
            <h3>MENOS SECRETO.<br />MÁS PROCESO.</h3>
            <p>
              Explicaciones de producción, proyectos de FL Studio, breakdowns y contenido
              pensado para mostrar cómo construyo mis tracks desde adentro.
            </p>
            <div className="v10-project-tags">
              <span>FLPs</span>
              <span>PRODUCCIÓN</span>
              <span>CONTENIDO EDUCATIVO</span>
              <span>DESCARGAS GRATIS</span>
            </div>
            <p className="v10-project-note">
              Próximamente también voy a ir liberando recursos y descargas gratuitas para productores.
            </p>
            <a className="button button-red" href="/proyectos">VER PROYECTOS →</a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
