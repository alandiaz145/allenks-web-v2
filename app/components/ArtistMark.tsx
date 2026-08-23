export default function ArtistMark({ inverse = false }: { inverse?: boolean }) {
  return <span className={`artist-mark${inverse ? " inverse" : ""}`} aria-hidden="true"><i>A</i><i>K</i><i>S</i></span>;
}
