export default function ReleaseArtwork({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`release-artwork${compact ? " release-artwork--compact" : ""}`} aria-label="BASS SO HEAVY — ALLEN KS">
      <div className="release-screen">
        <img src="/assets/allen-ks-portada.jpg" alt="" />
        <div className="release-noise" />
        <div className="release-scanlines" />
        <div className="release-title"><span>BASS SO</span><strong>HEAVY</strong></div>
        <small>ALLEN KS · 2026</small>
      </div>
      <div className="release-bezel">
        <i /><i /><i />
        <b>AKS / 22.08.26</b>
      </div>
    </div>
  );
}
