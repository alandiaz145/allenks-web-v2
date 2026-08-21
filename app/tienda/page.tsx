import SiteHeader from "../components/SiteHeader";

export default function TiendaPage() {
  return (
    <main id="top" className="section-dark">
      <SiteHeader active="tienda" />
      <section className="store-page">
        <div className="store-copy">
          <div className="section-index"><span>TIENDA</span></div>
          <h1 className="page-title light">TIENDA</h1>
          <p className="page-lead light">Espacio preparado para merch, material digital, entradas, packs y productos de Allen KS.</p>
          <div className="store-note"><span>TIENDA OFICIAL</span><h2>PRÓXIMAMENTE</h2><p>Base lista para activar cuando definamos productos.</p></div>
          <a className="button button-red" href="mailto:contacto@allenks.com.ar?subject=Tienda%20Allen%20KS">CONSULTAR ↗</a>
        </div>
        <div className="store-visual" aria-hidden="true"><span>ALLEN KS</span><strong>SOON</strong><b>MERCH · DIGITAL · ENTRADAS</b></div>
      </section>
    </main>
  );
}
