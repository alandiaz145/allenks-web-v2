import Footer from "../components/Footer";
import LazyEmbed from "../components/LazyEmbed";
import SiteHeader from "../components/SiteHeader";

const outswag = "https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Fspartanslabel%2Foutswag&color=%23e61927&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true&show_artwork=true";
const otra = "https://www.youtube.com/embed/gj2hWnohCco?start=3522&rel=0&modestbranding=1";

export default function ProjectsPage() {
  return (
    <main id="top">
      <SiteHeader active="proyectos" />
      <section className="project-page-intro"><span>ALLEN KS / PROJECTS</span><h1>TWO WORLDS.<br />ONE CORE.</h1><p>Spartans Label lleva la música hacia afuera. Otra Noche la convierte en encuentro, fechas y comunidad.</p></section>

      <section id="spartans" className="project-page-band project-page-spartans">
        <div className="copy"><span>INDEPENDENT LABEL / ARGENTINA + MÉXICO</span><h2>SPARTANS<br />LABEL</h2><p>Dubstep, Bass Music, artistas y releases con identidad propia.</p><a href="mailto:spartanslabel@gmail.com?subject=Demo%20para%20Spartans%20Label">SEND DEMO →</a></div>
        <div className="media"><LazyEmbed className="square-embed" src={outswag} title="OUTSWAG — Spartans Label" /></div>
      </section>

      <section id="otra-noche" className="project-page-band project-page-otra">
        <img src="/assets/allen-ks-portada.jpg" alt="Otra Noche" />
        <div className="copy"><span>EVENTS / COMMUNITY / BASS CULTURE</span><h2>OTRA<br />NOCHE</h2><p>Fiestas, B2B y encuentros alrededor del Drum & Bass y la Bass Music.</p><a href="/#live">VIEW NEXT SHOW →</a></div>
        <div className="media"><LazyEmbed className="video-embed" src={otra} title="IKI B2B ALLEN KS — Otra Noche" /></div>
      </section>

      <section className="projects-outro"><h2>MUSIC AT THE CENTER.<br />EVERYTHING ELSE EXPANDS FROM IT.</h2></section>
      <Footer />
    </main>
  );
}
