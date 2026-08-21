import Countdown from "./components/Countdown";
import Footer from "./components/Footer";
import LazyEmbed from "./components/LazyEmbed";
import SiteHeader from "./components/SiteHeader";
import { site } from "./site-data";

export default function HomePage() {
  return (
    <main id="inicio">
      <SiteHeader active="inicio" />
      <section className="home-hero section-dark">
        <div className="hero-copy">
          <div className="section-index"><span>01</span><span>DJ · PRODUCTOR · PROMOTOR</span></div>
          <h1>ALLEN <em>KS</em></h1>
          <p className="hero-aka">AKA DUBSTEP WACHO</p>
          <p className="hero-lead">Artista argentino, creador de Otra Noche y fundador de Spartans Label. Descubrí su música, próximas fechas y proyectos.</p>
          <div className="hero-actions"><a className="button button-red" href="#lanzamientos">ESCUCHAR AHORA ↘</a><a className="button button-ghost" href="#en-vivo">VER EN VIVO ↘</a></div>
        </div>
        <figure className="hero-photo-card"><img src="/assets/allen-ks-portada.jpg" alt="ALLEN KS tocando en vivo frente al público" /><figcaption>DJ SET EN VIVO · OTRA NOCHE FT. DANCING BUDHAS<br />2026</figcaption></figure>
      </section>
      <div className="word-marquee"><div><span>NUEVA MÚSICA</span><b>✦</b><span>SETS</span><b>✦</b><span>REMIXES</span><b>✦</b><span>COLABORACIONES</span><b>✦</b><span>NUEVA MÚSICA</span><b>✦</b><span>SETS</span></div></div>
      <section id="lanzamientos" className="releases-section section-paper">
        <div className="section-head"><div><div className="section-index"><span>02</span><span>LANZAMIENTOS</span></div><h2>LANZAMIENTOS</h2></div><a className="text-link" href="/musica">VER TODO EL CATÁLOGO →</a></div>
        <div className="release-grid">
          <article className="release-card"><div className="release-card-head"><span>ÚLTIMO LANZAMIENTO</span><b>174 BPM</b></div><h3>GETTING STARTED</h3><LazyEmbed className="square-embed" src={site.latestSoundCloudEmbed} title="GETTING STARTED de ALLEN KS" /></article>
          <article className="release-card release-card-dark"><div className="release-card-head"><span>PRÓXIMO LANZAMIENTO</span><b>22 AGO 2026</b></div><h3>BASS SO HEAVY</h3><div className="countdown-row"><Countdown /></div><LazyEmbed className="square-embed" src={site.upcomingSoundCloudEmbed} title="BASS SO HEAVY — ID preview de ALLEN KS" /><p className="microcopy">ID ORIGINAL · ESCUCHA PREVIA</p></article>
        </div>
      </section>
      <section id="en-vivo" className="live-section section-dark">
        <div className="section-head section-head-light"><div><div className="section-index"><span>03</span><span>ESCENARIOS & FECHAS</span></div><h2>EN VIVO</h2><p className="section-intro">Próximas fechas, DJ sets y momentos de ALLEN KS.</p></div></div>
        <div className="live-grid">
          <article className="live-video-card"><LazyEmbed className="video-embed" src={site.liveYouTubeEmbed} title="ALLEN KS en vivo" /><div className="live-caption"><span>EXPERIENCIA EN DIRECTO</span><strong>ALLEN KS EN VIVO</strong></div></article>
          <aside className="agenda"><div className="agenda-title"><span>AGENDA</span><strong>PRÓXIMAS FECHAS</strong></div><article className="date-row confirmed"><time><b>16</b><span>AGO</span></time><div><strong>BUENOS AIRES</strong><p>FREE PARTY · MULTIGÉNERO</p></div><span className="status">CONFIRMADA</span></article>{[1,2].map(item=><article className="date-row" key={item}><time><b>00</b><span>MES</span></time><div><strong>CIUDAD / PROVINCIA</strong><p>LUGAR O FESTIVAL</p></div><span className="status">A CONFIRMAR</span></article>)}<a className="button button-red full" href={site.bookingWhatsapp} target="_blank" rel="noreferrer">CONTRATAR A ALLEN KS ↗</a></aside>
        </div>
      </section>
      <section className="projects-home section-paper">
        <div className="section-head"><div><div className="section-index"><span>04</span><span>UNIVERSO ALLEN KS</span></div><h2>PROYECTOS</h2></div><a className="text-link" href="/proyectos">CONOCER LOS PROYECTOS →</a></div>
        <div className="projects-intro"><h3>No es sólo música. Es la escena que construyo alrededor.</h3><p>Spartans Label lleva la música hacia afuera. Otra Noche trae a los artistas a un encuentro en la pista, junto a la comunidad.</p></div>
        <div className="project-grid"><a className="project-card project-card-dark" href="/proyectos#spartans"><span>01 · SELLO INDEPENDIENTE</span><h3>SPARTANS<br />LABEL</h3><p>Dubstep y Bass Music latinoamericano: artistas, lanzamientos y demos.</p><b>CONOCER SPARTANS → ↗</b></a><a className="project-card project-card-red" href="/proyectos#otra-noche"><span>02 · FIESTAS & COMUNIDAD</span><h3>OTRA<br />NOCHE</h3><p>Fiestas, DJs, sets y cruces alrededor de la cultura bass.</p><b>CONOCER OTRA NOCHE → ↗</b></a></div>
      </section>
      <section className="contact-cta section-dark"><img src="/assets/allen-ks-logo.png" alt="ALLEN KS" /><div><p>BOOKINGS · COLABS · PRODUCCIÓN</p><h2>¿TENÉS UNA<br />IDEA?</h2><span>Fechas, colaboraciones, producción y propuestas.</span></div><a className="button button-red" href={site.whatsapp} target="_blank" rel="noreferrer">HABLEMOS ↗</a></section>
      <Footer />
    </main>
  );
}
