import Footer from "../components/Footer";
import ProductVisual from "../components/ProductVisual";
import SiteHeader from "../components/SiteHeader";

const products = [
  { type: "tee" as const, name: "ALLEN KS TEE", meta: "PHYSICAL / BLACK" },
  { type: "hoodie" as const, name: "ALLEN KS HOODIE", meta: "PHYSICAL / BLACK" },
  { type: "pack" as const, name: "SAMPLE PACK 001", meta: "DIGITAL / WAV" },
  { type: "pack" as const, name: "SAMPLE PACK 002", meta: "DIGITAL / WAV" },
];

export default function StorePage() {
  return (
    <main id="top">
      <SiteHeader active="tienda" />
      <section className="store-page-head"><span>MERCH / PRODUCER TOOLS</span><h1>STORE</h1><p>Cuatro objetos reales previstos para la primera etapa: dos prendas y dos sample packs.</p></section>
      <section className="store-page-grid">
        {products.map(product => (
          <article className="store-page-product" key={product.name}>
            <div className="visual-wrap"><ProductVisual type={product.type} label={product.name.replace("SAMPLE PACK ", "PACK ")} /></div>
            <small>{product.meta}</small><h2>{product.name}</h2><p>COMING SOON</p>
          </article>
        ))}
      </section>
      <Footer />
    </main>
  );
}
