"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const frames = [
  { src: "/brand/fm-core-core.webp", alt: "Core da FM Tecnologia" },
  { src: "/brand/fm-core-gerente-ia.webp", alt: "Gerente IA da FM Tecnologia" },
  { src: "/brand/fm-core-total-controle.webp", alt: "Core representando total controle da operação" },
] as const;

export function FmCoreVisualCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % frames.length);
    }, 3600);

    return () => window.clearInterval(timer);
  }, []);

  const frame = frames[active];

  return (
    <Image
      key={frame.src}
      src={frame.src}
      alt={frame.alt}
      width={1536}
      height={1536}
      priority={active === 0}
      unoptimized
      sizes="(max-width: 680px) 96vw, (max-width: 1024px) 72vw, 48vw"
      className="fm-core-approved__image fm-core-approved__image--carousel"
    />
  );
}
