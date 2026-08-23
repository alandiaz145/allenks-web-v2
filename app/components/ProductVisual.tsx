export default function ProductVisual({ type, label }: { type: "tee" | "hoodie" | "pack"; label: string }) {
  if (type === "pack") {
    return (
      <div className="pack-visual" aria-hidden="true">
        <div className="pack-topline"><span>ALLEN KS</span><b>PRODUCER TOOLS</b></div>
        <div className="pack-wave">{Array.from({ length: 22 }).map((_, i) => <i key={i} style={{ height: `${25 + ((i * 31) % 68)}%` }} />)}</div>
        <strong>{label}</strong>
        <small>WAV / 24 BIT / COMING SOON</small>
      </div>
    );
  }
  return (
    <div className={`garment-visual garment-${type}`} aria-hidden="true">
      <span className="garment-neck" />
      <span className="garment-body" />
      <span className="garment-left" />
      <span className="garment-right" />
      {type === "hoodie" && <span className="garment-hood" />}
      <b>ALLEN<br />KS</b>
    </div>
  );
}
