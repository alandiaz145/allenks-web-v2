"use client";

import { useState } from "react";
import LazyEmbed from "./LazyEmbed";

type MediaItem = {
  src: string;
  title: string;
  eyebrow: string;
  heading: string;
  meta?: string;
  note?: string;
};

export default function MediaCarousel({
  items,
  variant,
}: {
  items: MediaItem[];
  variant: "release" | "live";
}) {
  const [index, setIndex] = useState(0);
  const active = items[index];
  const move = (direction: number) => {
    setIndex((current) => (current + direction + items.length) % items.length);
  };

  return (
    <div className={`v10-carousel v10-carousel--${variant}`}>
      <button
        className="v10-carousel-arrow v10-carousel-arrow--prev"
        type="button"
        onClick={() => move(-1)}
        aria-label="Ver anterior"
      >
        ←
      </button>

      <div className="v10-carousel-stage" aria-live="polite">
        {variant === "release" ? (
          <article className="v10-release-slide">
            <div className="v10-release-copy">
              <span>{active.eyebrow}</span>
              <h3>{active.heading}</h3>
              {active.meta ? <strong>{active.meta}</strong> : null}
              {active.note ? <p>{active.note}</p> : null}
              <div className="v10-carousel-counter">
                {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </div>
            </div>
            <LazyEmbed
              key={`${variant}-${index}`}
              className="square-embed v10-release-media"
              src={active.src}
              title={active.title}
            />
          </article>
        ) : (
          <article className="v10-live-slide">
            <LazyEmbed
              key={`${variant}-${index}`}
              className="video-embed v10-live-media"
              src={active.src}
              title={active.title}
            />
            <div className="v10-live-caption">
              <div>
                <span>{active.eyebrow}</span>
                <strong>{active.heading}</strong>
              </div>
              <b>{String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</b>
            </div>
          </article>
        )}
      </div>

      <button
        className="v10-carousel-arrow v10-carousel-arrow--next"
        type="button"
        onClick={() => move(1)}
        aria-label="Ver siguiente"
      >
        →
      </button>
    </div>
  );
}
