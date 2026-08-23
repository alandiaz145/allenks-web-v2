import Footer from "../components/Footer";
import SiteHeader from "../components/SiteHeader";

const products=[
 {n:"01",cat:"PHYSICAL",name:"ALLEN KS TEE",meta:"TEE // BLACK",tone:"red"},
 {n:"02",cat:"PHYSICAL",name:"ALLEN KS HOODIE",meta:"HOODIE // BLACK",tone:"cyan"},
 {n:"03",cat:"PRODUCER TOOLS",name:"SAMPLE PACK 001",meta:"DIGITAL // WAV",tone:"violet"},
 {n:"04",cat:"PRODUCER TOOLS",name:"SAMPLE PACK 002",meta:"DIGITAL // WAV",tone:"cream"},
];

export default function StorePage(){return <main id="top"><SiteHeader active="tienda"/><section className="sub-hero store-hero"><div><span className="eyebrow">OBJECTS // PRODUCER TOOLS</span><h1>STORE</h1><p>Merch físico y herramientas digitales del universo ALLEN KS.</p></div><div className="store-hero-code"><span>AKS.STORE</span><b>04 OBJECTS<br/>IN QUEUE</b></div></section><section className="signal-section store-main"><div className="section-heading compact"><div><span className="eyebrow">01 // FIRST DROP</span><h2>OBJECTS</h2></div><p className="heading-note">La V1 muestra únicamente los cuatro productos reales previstos. Sin placeholders infinitos ni catálogo inventado.</p></div><div className="store-full-grid">{products.map(p=><article className={`product-card product-${p.tone}`} key={p.n}><div className="product-art"><span>AKS-{p.n}</span><div className="product-orbit"><i/><i/><i/><b>{p.n}</b></div><small>OBJECT // {p.n}</small></div><div className="product-copy"><span>{p.cat}</span><h2>{p.name}</h2><p>{p.meta}</p><b>COMING SOON</b></div></article>)}</div></section><section className="store-manifest"><span>STORE PROTOCOL</span><h2>PHYSICAL<br/>+ DIGITAL.</h2><p>La tienda queda lista para sumar fotos, precios y checkout cuando estén definidos, manteniendo la misma dirección visual.</p></section><Footer/></main>}
