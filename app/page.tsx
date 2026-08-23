import Footer from "./components/Footer";
import LazyEmbed from "./components/LazyEmbed";
import ProductVisual from "./components/ProductVisual";
import ReleaseArtwork from "./components/ReleaseArtwork";
import SiteHeader from "./components/SiteHeader";
import WorldScene from "./components/WorldScene";
import { site } from "./site-data";

const tracks = ["GETTING STARTED", "CORRUPTION", "CONQUEROR", "DAMAGE REMIX"];
const products = [
  { type: "tee" as const, name: "ALLEN KS TEE", meta: "PHYSICAL / BLACK" },
  { type: "hoodie" as const, name: "ALLEN KS HOODIE", meta: "PHYSICAL / BLACK" },
  { type: "pack" as const, name: "SAMPLE PACK 001", meta: "PRODUCER TOOLS" },
  { type: "pack" as const, name: "SAMPLE PACK 002", meta: "PRODUCER TOOLS" },
];

export default function HomePage() {
  return (
    <main id="top" className="v3-main">
      <SiteHeader active="inicio" />

      <section className="campaign-hero">
        <img className="campaign-hero-bg" src="/assets/allen-ks-portada.jpg" alt="ALLEN KS en vivo" />
        <div className="campaign-hero-wash" />
        <div className="campaign-release-art"><ReleaseArtwork /></div>
        <div className="campaign-hero-copy">
          <span>NEW RELEASE</span>
          <h1>BASS SO<br />HEAVY</h1>
          <p>ALLEN KS / OUT NOW</p>
          <a href={site.soundcloud} target="_blank" rel="noreferrer">LISTEN NOW <b>→</b></a>
        </div>
        <div className="campaign-hero-caption">ALLEN KS / BUENOS AIRES / 2026</div>
      </section>

      <section className="world-section">
        <div className="world-copy">
          <span>THE OFFICIAL ALLEN KS SITE</span>
          <h2>ENTER THE<br />WORLD.</h2>
          <p>Música, fechas, merch y proyectos integrados dentro de una misma escena.</p>
        </div>
        <WorldScene />
      </section>

      <section id="music" className="music-color-block">
        <div className="music-color-copy">
          <span>LISTEN</span>
          <h2>MUSIC</h2>
          <p>Últimos releases, remixes y tracks del catálogo.</p>
          <a href="/musica">FULL CATALOG →</a>
        </div>
        <div className="music-player-stage">
          <div className="music-player-label"><span>NOW PLAYING</span><strong>BASS SO HEAVY</strong></div>
          <LazyEmbed className="square-embed" src={site.bassSoHeavyEmbed} title="BASS SO HEAVY — ALLEN KS" />
        </div>
        <div className="music-track-list">
          {tracks.map((track, index) => <div key={track}><span>{String(index + 1).padStart(2, "0")}</span><strong>{track}</strong><b>ALLEN KS</b></div>)}
        </div>
      </section>

      <section id="live" className="live-campaign">
        <img src="/assets/allen-ks-portada.jpg" alt="ALLEN KS live" className="live-campaign-bg" />
        <div className="live-campaign-shade" />
        <div className="live-date"><strong>05</strong><span>SEP</span></div>
        <div className="live-campaign-copy">
          <small>NEXT SHOW / BUENOS AIRES</small>
          <h2>OTRA<br />NOCHE</h2>
          <p>FT. DANCING BUDHAS</p>
          <a href={site.bookingWhatsapp} target="_blank" rel="noreferrer">BOOKING / INFO →</a>
        </div>
      </section>

      <section className="watch-strip">
        <div className="watch-copy"><span>WATCH</span><h2>ALLEN KS<br />LIVE</h2><p>IKI B2B ALLEN KS / OTRA NOCHE</p></div>
        <div className="watch-player"><LazyEmbed className="video-embed" src={site.liveYouTubeEmbed} title="ALLEN KS live set" /></div>
      </section>

      <section id="store" className="store-showcase">
        <div className="store-showcase-head"><span>MERCH / PRODUCER TOOLS</span><h2>NEW OBJECTS</h2><a href="/tienda">VIEW STORE →</a></div>
        <div className="store-products">
          {products.map((product, index) => (
            <article key={product.name}>
              <ProductVisual type={product.type} label={product.name.replace("SAMPLE PACK ", "PACK ")} />
              <small>{product.meta}</small>
              <h3>{product.name}</h3>
              <p>COMING SOON</p>
              <span>{String(index + 1).padStart(2, "0")}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="project-band project-band-spartans">
        <div className="project-band-copy"><span>INDEPENDENT LABEL</span><h2>SPARTANS<br />LABEL</h2><p>DUBSTEP / BASS MUSIC / ARGENTINA + MÉXICO</p><a href="/proyectos#spartans">ENTER →</a></div>
        <div className="project-band-orbit"><i /><i /><b>S</b></div>
      </section>

      <section className="project-band project-band-otra">
        <img src="/assets/allen-ks-portada.jpg" alt="Otra Noche" />
        <div className="project-band-overlay" />
        <div className="project-band-copy"><span>EVENTS / COMMUNITY</span><h2>OTRA<br />NOCHE</h2><p>BASS MUSIC / SETS / PEOPLE</p><a href="/proyectos#otra-noche">ENTER →</a></div>
      </section>

      <section className="contact-banner">
        <span>BOOKINGS / COLLABS / PRODUCTION</span>
        <h2>LET'S MAKE<br />SOMETHING LOUD.</h2>
        <a href={site.whatsapp} target="_blank" rel="noreferrer">CONTACT ALLEN KS →</a>
      </section>

      <Footer />
    </main>
  );
}
