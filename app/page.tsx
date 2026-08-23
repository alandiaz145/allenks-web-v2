import Footer from "./components/Footer";
import LazyEmbed from "./components/LazyEmbed";
import ProductVisual from "./components/ProductVisual";
import SiteHeader from "./components/SiteHeader";
import { site } from "./site-data";

const products = [
  { name: "ALLEN KS TEE", meta: "PHYSICAL / DROP 01", type: "tee" as const, label: "TEE" },
  { name: "ALLEN KS HOODIE", meta: "PHYSICAL / DROP 01", type: "hoodie" as const, label: "HOODIE" },
  { name: "SAMPLE PACK 001", meta: "PRODUCER TOOLS / WAV", type: "pack" as const, label: "PACK 001" },
  { name: "SAMPLE PACK 002", meta: "PRODUCER TOOLS / WAV", type: "pack" as const, label: "PACK 002" },
];

export default function HomePage(){return <main id="top"><SiteHeader active="inicio"/>
  <section className="campaign-hero">
    <img className="campaign-bg" src="/assets/allen-ks-portada.jpg" alt="ALLEN KS en vivo"/>
    <div className="campaign-shade"/>
    <div className="release-object" aria-hidden="true"><small>ALLEN KS / 2026</small><strong>BASS<br/>SO<br/>HEAVY</strong><span>OUT NOW</span></div>
    <div className="campaign-copy"><span>NEW RELEASE</span><h1>BASS SO<br/>HEAVY</h1><p>OUT NOW</p><a href={site.soundcloud} target="_blank" rel="noreferrer">LISTEN NOW <b>→</b></a></div>
    <div className="campaign-caption">DJ SET EN VIVO / OTRA NOCHE FT. DANCING BUDHAS / 2026</div>
  </section>

  <section className="world-scene">
    <div className="world-intro"><span>WELCOME TO</span><h2>THE ALLEN KS<br/>WORLD.</h2><p>Música, shows, proyectos y objetos reunidos en un mismo lugar. Menos interfaz; más identidad.</p></div>
    <div className="world-board">
      <div className="board-grid"/>
      <div className="tape tape-a"/><div className="tape tape-b"/><div className="tape tape-c"/>
      <figure className="board-photo"><img src="/assets/allen-ks-portada.jpg" alt="ALLEN KS en vivo"/><figcaption>LIVE / BUENOS AIRES</figcaption></figure>
      <div className="board-laptop"><div className="laptop-screen"><LazyEmbed className="video-embed" src={site.liveYouTubeEmbed} title="ALLEN KS live set"/></div><div className="laptop-base"/></div>
      <a href="/proyectos#spartans" className="board-note note-spartans"><small>LABEL</small><strong>SPARTANS</strong><span>RELEASES / ARTISTS / DEMOS</span></a>
      <a href="/proyectos#otra-noche" className="board-note note-otra"><small>EVENTS</small><strong>OTRA NOCHE</strong><span>LIVE / COMMUNITY</span></a>
      <a href="/tienda" className="board-sticker">MERCH<br/><b>+ TOOLS</b></a>
      <div className="board-tag">AKA<br/><strong>DUBSTEP<br/>WACHO</strong></div>
      <div className="board-scribble">BASS<br/>MUSIC</div>
    </div>
  </section>

  <section className="music-splash" id="music">
    <div className="music-word" aria-hidden="true">MUSIC</div>
    <div className="music-player"><LazyEmbed className="square-embed" src={site.bassSoHeavyEmbed} title="BASS SO HEAVY — ALLEN KS"/></div>
    <div className="music-copy"><span>NOW PLAYING</span><h2>BASS SO HEAVY</h2><p>El release más reciente de ALLEN KS.</p><ol><li><b>01</b><strong>GETTING STARTED</strong><span>2026</span></li><li><b>02</b><strong>BUST IT</strong><span>TOP TRACK</span></li><li><b>03</b><strong>RIDDIM RIOT</strong><span>ARCHIVE</span></li></ol><a href="/musica">EXPLORE MUSIC →</a></div>
  </section>

  <section className="live-campaign" id="live">
    <img src="/assets/allen-ks-portada.jpg" alt="ALLEN KS live"/>
    <div className="live-campaign-shade"/>
    <div className="live-date"><strong>05</strong><span>SEP</span></div>
    <div className="live-campaign-copy"><small>NEXT SHOW / CONFIRMED</small><h2>OTRA NOCHE</h2><h3>FT. DANCING BUDHAS</h3><p>BUENOS AIRES / ARGENTINA</p><a href={site.bookingWhatsapp} target="_blank" rel="noreferrer">BOOK ALLEN KS →</a></div>
  </section>

  <section className="store-shelf" id="store">
    <div className="shelf-head"><div><span>FIRST DROP</span><h2>MERCH +<br/>PRODUCER TOOLS</h2></div><a href="/tienda">ENTER STORE →</a></div>
    <div className="shelf-products">{products.map(product=><article key={product.name}><div className="product-stage"><ProductVisual type={product.type} label={product.label}/></div><small>{product.meta}</small><h3>{product.name}</h3><span>COMING SOON</span></article>)}</div>
  </section>

  <section className="project-portals">
    <a href="/proyectos#spartans" className="project-portal portal-spartans"><small>INDEPENDENT LABEL</small><h2>SPARTANS<br/>LABEL</h2><p>DUBSTEP / BASS MUSIC / LATAM</p><span>ENTER →</span></a>
    <a href="/proyectos#otra-noche" className="project-portal portal-otra"><small>EVENTS + COMMUNITY</small><h2>OTRA<br/>NOCHE</h2><p>SETS / B2B / BASS CULTURE</p><span>ENTER →</span></a>
  </section>

  <section className="contact-band"><div><small>BOOKINGS / COLLABS / PRODUCTION</small><h2>LET'S MAKE<br/>SOMETHING LOUD.</h2></div><a href={site.whatsapp} target="_blank" rel="noreferrer">CONTACT →</a></section>
  <Footer/>
</main>}
