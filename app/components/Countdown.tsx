"use client";

import { useEffect, useState } from "react";
import { site } from "../site-data";

function formatRemaining() {
  const diff = new Date(site.releaseDate).getTime() - Date.now();
  if (diff <= 0) return "YA DISPONIBLE";
  const d = Math.floor(diff / 86_400_000);
  const h = Math.floor((diff % 86_400_000) / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  const s = Math.floor((diff % 60_000) / 1_000);
  return `${d}D ${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function Countdown() {
  const [value, setValue] = useState("CALCULANDO");
  useEffect(() => {
    const tick = () => setValue(formatRemaining());
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, []);
  return <span className="countdown" aria-live="polite">{value}</span>;
}
