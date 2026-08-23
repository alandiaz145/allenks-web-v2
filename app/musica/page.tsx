import Footer from "../components/Footer";
import LazyEmbed from "../components/LazyEmbed";
import SiteHeader from "../components/SiteHeader";
import { catalog, collaborations, remixes, site } from "../site-data";

export default function MusicPage(){return <main id="top"><SiteHeader active="musica"/>
  <section className="music-page-hero">
    <div><span>CURRENT RELEASE</span><h1>BASS SO<br/>HEAVY</h1><p>ALLEN KS / 22.08.2026</p><a href={site.soundcloud} target="_blank" rel="noreferrer">LISTEN NOW →</a></div>
    <div className="music-page-player"><LazyEmbed className="square-embed" src={site.bassSoHeavyEmbed} title="BASS SO HEAVY — ALLEN KS"/></div>
  </section>
  <section className="music-index">
    <div className="music-index-title"><span>ALLEN KS</span><h2>MUSIC</h2><p>ORIGINALS / REMIXES / COLLABORATIONS</p></div>
    <ol>{catalog.map((track,i)=><li key={track}><span>{String(i+1).padStart(2,"0")}</span><strong>{track}</strong><small>ALLEN KS</small><b>→</b></li>)}</ol>
  </section>
  <section className="music-split">
    <div className="music-split-panel remix-panel"><span>REMIXES</span><h2>REWORKED<br/>LOUDER.</h2>{remixes.map((track,i)=><article key={track}><b>R{String(i+1).padStart(2,"0")}</b><strong>{track}</strong></article>)}</div>
    <div className="music-split-panel collab-panel"><span>COLLABORATIONS</span><h2>BUILT<br/>TOGETHER.</h2>{collaborations.map((track,i)=><article key={track}><b>C{String(i+1).padStart(2,"0")}</b><strong>{track}</strong></article>)}</div>
  </section>
  <section className="platform-ribbon"><a href={site.spotify} target="_blank" rel="noreferrer">SPOTIFY ↗</a><a href={site.soundcloud} target="_blank" rel="noreferrer">SOUNDCLOUD ↗</a><a href={site.youtube} target="_blank" rel="noreferrer">YOUTUBE ↗</a></section>
  <Footer/>
</main>}
