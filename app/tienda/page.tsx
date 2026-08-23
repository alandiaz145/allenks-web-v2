import Footer from "../components/Footer";
import ProductVisual from "../components/ProductVisual";
import SiteHeader from "../components/SiteHeader";

const products = [
  { name: "ALLEN KS TEE", kicker: "PHYSICAL / DROP 01", type: "tee" as const, label: "TEE" },
  { name: "ALLEN KS HOODIE", kicker: "PHYSICAL / DROP 01", type: "hoodie" as const, label: "HOODIE" },
  { name: "SAMPLE PACK 001", kicker: "PRODUCER TOOLS / WAV", type: "pack" as const, label: "PACK 001" },
  { name: "SAMPLE PACK 002", kicker: "PRODUCER TOOLS / WAV", type: "pack" as const, label: "PACK 002" },
];

export default function StorePage(){return <main id="top"><SiteHeader active="tienda"/>
  <section className="store-page-hero"><span>ALLEN KS / FIRST DROP</span><h1>STORE</h1><p>MERCH + PRODUCER TOOLS</p></section>
  <section className="store-gallery">{products.map((product,index)=><article key={product.name} className={`store-product product-${index+1}`}><div className="store-product-art"><ProductVisual type={product.type} label={product.label}/></div><div className="store-product-copy"><small>{product.kicker}</small><h2>{product.name}</h2><p>COMING SOON</p></div></article>)}</section>
  <section className="store-endnote"><span>NO FILLER.</span><h2>FOUR PRODUCTS.<br/>DONE RIGHT.</h2><p>Las fotos, precios y checkout entran cuando el drop esté listo. Hasta entonces la tienda muestra únicamente lo que realmente existe.</p></section>
  <Footer/>
</main>}
