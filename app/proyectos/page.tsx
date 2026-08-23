import Footer from "../components/Footer";
import LazyEmbed from "../components/LazyEmbed";
import SiteHeader from "../components/SiteHeader";

const outswag="https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Fspartanslabel%2Foutswag&color=%23ff182c&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true&show_artwork=true";
const otra="https://www.youtube.com/embed/gj2hWnohCco?start=3522&rel=0&modestbranding=1";

export default function ProjectsPage(){return <main id="top"><SiteHeader active="proyectos"/>
  <section className="projects-page-intro"><span>ALLEN KS / PROJECTS</span><h1>TWO WORLDS.<br/>ONE CORE.</h1><p>Spartans Label lleva la música hacia afuera. Otra Noche la convierte en encuentro.</p></section>
  <section id="spartans" className="project-campaign-page spartans-page">
    <div className="project-campaign-copy"><small>INDEPENDENT LABEL / ARGENTINA + MÉXICO</small><h2>SPARTANS<br/>LABEL</h2><p>Dubstep, Bass Music, artistas y releases con identidad propia.</p><div className="project-tags"><span>RELEASES</span><span>ARTISTS</span><span>DEMOS</span></div><a href="mailto:spartanslabel@gmail.com?subject=Demo%20para%20Spartans%20Label">SEND DEMO →</a></div>
    <div className="project-campaign-media"><div className="project-media-label"><span>LATEST RELEASE</span><strong>OUTSWAG / EL HEREJE</strong></div><LazyEmbed className="square-embed" src={outswag} title="OUTSWAG — Spartans Label"/></div>
  </section>
  <section id="otra-noche" className="project-campaign-page otra-page">
    <img className="otra-page-bg" src="/assets/allen-ks-portada.jpg" alt="Otra Noche / ALLEN KS"/>
    <div className="otra-page-shade"/>
    <div className="project-campaign-copy"><small>EVENTS / COMMUNITY / BASS CULTURE</small><h2>OTRA<br/>NOCHE</h2><p>Fiestas, B2B y encuentros alrededor del Drum & Bass y la Bass Music.</p><div className="project-tags"><span>EVENTS</span><span>SETS</span><span>COMMUNITY</span></div><a href="/#live">VIEW NEXT SHOW →</a></div>
    <div className="project-campaign-media video"><div className="project-media-label"><span>LIVE ARCHIVE</span><strong>IKI B2B ALLEN KS</strong></div><LazyEmbed className="video-embed" src={otra} title="IKI B2B ALLEN KS — Otra Noche"/></div>
  </section>
  <section className="projects-outro"><span>ALLEN KS</span><h2>MUSIC AT THE CENTER.<br/>EVERYTHING ELSE EXPANDS FROM IT.</h2></section>
  <Footer/>
</main>}
