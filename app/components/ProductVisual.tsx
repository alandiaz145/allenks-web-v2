export default function ProductVisual({ type, label }: { type: "tee" | "hoodie" | "pack"; label: string }) {
  if (type === "pack") {
    return <div className="pack-visual" aria-hidden="true"><div className="pack-label">ALLEN KS</div><div className="waveform">{Array.from({length:18}).map((_,i)=><i key={i} style={{height:`${28 + ((i*17)%62)}%`}} />)}</div><strong>{label}</strong><small>PRODUCER TOOLS</small></div>;
  }
  return <div className={`garment-visual ${type}`} aria-hidden="true"><span className="garment-neck"/><span className="garment-body"/><span className="garment-left"/><span className="garment-right"/>{type === "hoodie" && <span className="garment-hood"/>}<b>AKS</b></div>;
}
