import Footer from "../components/Footer";
import SiteHeader from "../components/SiteHeader";

export default function ProyectosPage() {
  return (
    <main id="top">
      <SiteHeader active="proyectos" />
      <section className="page-hero section-paper">
        <div className="section-index"><span>UNIVERSO ALLEN KS</span></div>
        <h1 className="page-title">PROYECTOS</h1>
        <p className="page-lead">No es sólo música. Es la escena que construyo alrededor: un sello independiente y una plataforma de fiestas/comunidad.</p>
      </section>
      <section id="spartans" className="project-detail section-dark">
        <div className="project-number">01</div>
        <div className="project-detail-copy"><span>SELLO INDEPENDIENTE</span><h2>SPARTANS<br />LABEL</h2><p>Dubstep y Bass Music latinoamericano: artistas, lanzamientos y demos.</p><p>Un proyecto editorial y de sello enfocado en darle marco, identidad y salida a música de productores de la escena.</p><a className="button button-red" href="https://spartanslabel.com.ar" target="_blank" rel="noreferrer">CONOCER SPARTANS ↗</a></div>
        <div className="project-poster poster-spartans"><span>SPARTANS</span><strong>LABEL</strong><small>DUBSTEP · BASS MUSIC · LATINOAMÉRICA</small></div>
      </section>
      <section id="otra-noche" className="project-detail project-detail-paper section-paper">
        <div className="project-number">02</div>
        <div className="project-detail-copy"><span>FIESTAS & COMUNIDAD</span><h2>OTRA<br />NOCHE</h2><p>Fiestas, DJs, sets y cruces alrededor de la cultura bass.</p><p>Un espacio para llevar la música a la pista y conectar artistas, público y comunidad en encuentros presenciales.</p></div>
        <div className="project-poster poster-otra"><span>OTRA</span><strong>NOCHE</strong><small>FIESTAS · DJS · COMUNIDAD</small></div>
      </section>
      <Footer />
    </main>
  );
}
