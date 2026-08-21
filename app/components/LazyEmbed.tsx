"use client";

import { useEffect, useRef, useState } from "react";

export default function LazyEmbed({ src, title, className = "" }: { src: string; title: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!ref.current || !("IntersectionObserver" in window)) {
      setReady(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setReady(true);
        observer.disconnect();
      }
    }, { rootMargin: "280px 0px" });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={`embed-shell ${className}`}>
      {ready ? (
        <iframe src={src} title={title} loading="lazy" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
      ) : (
        <div className="embed-placeholder"><span>CARGANDO MEDIA</span></div>
      )}
    </div>
  );
}
