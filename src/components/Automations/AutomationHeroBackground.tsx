"use client";

import { animate } from "animejs";
import { useEffect, useMemo, useRef } from "react";

type ShapeType = "circle" | "square" | "diamond" | "hex" | "triangle";

type ShapeConfig = {
  id: string;
  type: ShapeType;
  size: number;
  top: string;
  left: string;
  opacity: number;
  blurClass: string;
  depth: 1 | 2 | 3;
  rotation?: number;
};

const clipPathFor = (type: ShapeType) => {
  switch (type) {
    case "triangle":
      return "polygon(50% 0%, 0% 100%, 100% 100%)";
    case "hex":
      return "polygon(25% 6%, 75% 6%, 100% 50%, 75% 94%, 25% 94%, 0% 50%)";
    case "diamond":
      return "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)";
    default:
      return undefined;
  }
};

const PALETTE = ["#2A68FF", "#14FFE3", "#8A7CFF", "#25D695"] as const;

export default function AutomationHeroBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const waveWrapRef = useRef<HTMLDivElement | null>(null);

  const shapes = useMemo<ShapeConfig[]>(
    () => [
      {
        id: "a1",
        type: "circle",
        size: 220,
        top: "8%",
        left: "64%",
        opacity: 0.32,
        blurClass: "blur-3xl",
        depth: 1,
      },
      {
        id: "a2",
        type: "hex",
        size: 160,
        top: "20%",
        left: "78%",
        opacity: 0.28,
        blurClass: "blur-2xl",
        depth: 1,
        rotation: 8,
      },
      {
        id: "a3",
        type: "diamond",
        size: 180,
        top: "56%",
        left: "72%",
        opacity: 0.24,
        blurClass: "blur-2xl",
        depth: 1,
      },
      {
        id: "a4",
        type: "square",
        size: 120,
        top: "12%",
        left: "52%",
        opacity: 0.48,
        blurClass: "blur-xl",
        depth: 2,
        rotation: 12,
      },
      {
        id: "a5",
        type: "triangle",
        size: 140,
        top: "34%",
        left: "86%",
        opacity: 0.38,
        blurClass: "blur-xl",
        depth: 2,
      },
      {
        id: "a6",
        type: "hex",
        size: 130,
        top: "72%",
        left: "84%",
        opacity: 0.34,
        blurClass: "blur-lg",
        depth: 2,
      },
      {
        id: "a7",
        type: "circle",
        size: 120,
        top: "26%",
        left: "60%",
        opacity: 0.62,
        blurClass: "blur-md",
        depth: 3,
      },
      {
        id: "a8",
        type: "diamond",
        size: 110,
        top: "48%",
        left: "92%",
        opacity: 0.52,
        blurClass: "blur-md",
        depth: 3,
        rotation: -10,
      },
      {
        id: "a9",
        type: "square",
        size: 100,
        top: "80%",
        left: "66%",
        opacity: 0.5,
        blurClass: "blur-sm",
        depth: 3,
      },
      {
        id: "a10",
        type: "triangle",
        size: 105,
        top: "62%",
        left: "56%",
        opacity: 0.46,
        blurClass: "blur-sm",
        depth: 3,
      },
    ],
    [],
  );

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const els = Array.from(root.querySelectorAll<HTMLElement>("[data-geo]"));

    els.forEach((el, idx) => {
      const depth = Number(el.dataset.depth || "2") as 1 | 2 | 3;

      const ampX = depth === 1 ? 20 : depth === 2 ? 14 : 10;
      const ampY = depth === 1 ? 12 : depth === 2 ? 10 : 7;
      const dX = depth === 1 ? 14000 : depth === 2 ? 11000 : 8000;
      const dY = depth === 1 ? 11000 : depth === 2 ? 9000 : 7000;
      const dR = depth === 1 ? 12000 : depth === 2 ? 9000 : 7000;

      const delay = (idx % 5) * 220;

      animate(el, {
        translateX: [-ampX, ampX],
        duration: dX,
        easing: "linear",
        loop: true,
        direction: "alternate",
        delay,
      });
      animate(el, {
        translateY: [ampY, -ampY],
        duration: dY,
        easing: "linear",
        loop: true,
        direction: "alternate",
        delay: delay + 180,
      });
      animate(el, {
        rotate: [-8, 8],
        duration: dR,
        easing: "easeInOutSine",
        loop: true,
        direction: "alternate",
        delay: delay + 320,
      });
      animate(el, {
        scale: [1, depth === 1 ? 1.03 : depth === 2 ? 1.035 : 1.04],
        duration: dR + 1200,
        easing: "easeInOutSine",
        loop: true,
        direction: "alternate",
      });
    });

    const waves = Array.from(root.querySelectorAll<SVGElement>("[data-wave]"));
    waves.forEach((wave, i) => {
      const distance = i % 2 === 0 ? 40 : 60;
      const duration = i % 2 === 0 ? 9000 : 12000;
      animate(wave, {
        translateX: [-distance, distance],
        translateY: [i % 2 === 0 ? 4 : -6, i % 2 === 0 ? -6 : 4],
        duration,
        easing: "easeInOutSine",
        loop: true,
        direction: "alternate",
        delay: i * 240,
      });
    });

    const geoWraps = Array.from(
      root.querySelectorAll<HTMLElement>("[data-geo-wrap]"),
    );
    const waveWrap = waveWrapRef.current;

    let mx = 0,
      my = 0;
    let raf = 0;

    const applyParallax = () => {
      raf = 0;
      geoWraps.forEach((el) => {
        const depth = Number(el.dataset.depth || "2") as 1 | 2 | 3;
        const base = 6;
        const factor = depth === 1 ? 1 : depth === 2 ? 1.6 : 2.2;
        const tx = mx * base * factor;
        const ty = my * base * factor;
        animate(el, {
          translateX: tx,
          translateY: ty,
          duration: 240,
          easing: "easeOutQuad",
        });
      });
      if (waveWrap) {
        const tx = mx * 8;
        const ty = my * 5;
        animate(waveWrap, {
          translateX: tx,
          translateY: ty,
          duration: 280,
          easing: "easeOutQuad",
        });
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      const x = (e.clientX - (rect.left + rect.width / 2)) / rect.width;
      const y = (e.clientY - (rect.top + rect.height / 2)) / rect.height;
      mx = Math.max(-1, Math.min(1, x));
      my = Math.max(-1, Math.min(1, -y));
      if (!raf) raf = requestAnimationFrame(applyParallax);
    };

    const onPointerLeave = () => {
      mx = 0;
      my = 0;
      applyParallax();
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerleave", onPointerLeave);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.07] [background:radial-gradient(1100px_600px_at_70%_35%,theme(colors.primary/0.35),transparent_70%)]" />
      <div
        ref={waveWrapRef}
        data-wave-wrap
        className="absolute right-[-20%] top-[-10%] h-[130%] w-[80%] opacity-60 will-change-transform"
      >
        <svg
          aria-hidden
          className="h-full w-full rotate-[8deg]"
          viewBox="0 0 800 1200"
          fill="none"
        >
          <defs>
            <linearGradient id="ahg1" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor={PALETTE[0]} stopOpacity="0.45" />
              <stop offset="100%" stopColor={PALETTE[2]} stopOpacity="0.25" />
            </linearGradient>
            <linearGradient id="ahg2" x1="1" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={PALETTE[1]} stopOpacity="0.35" />
              <stop offset="100%" stopColor={PALETTE[3]} stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <g data-wave>
            <path
              d="M-50 200 C 100 120, 220 260, 380 200 S 650 140, 820 220"
              stroke="url(#ahg1)"
              strokeWidth="18"
              opacity="0.6"
            />
          </g>
          <g data-wave>
            <path
              d="M-80 360 C 80 300, 240 420, 380 360 S 650 300, 840 360"
              stroke="url(#ahg2)"
              strokeWidth="14"
              opacity="0.55"
            />
          </g>
          <g data-wave>
            <path
              d="M-60 520 C 120 460, 260 600, 420 540 S 680 480, 860 560"
              stroke="url(#ahg1)"
              strokeWidth="10"
              opacity="0.5"
            />
          </g>
        </svg>
      </div>
      {shapes.map((s, i) => {
        const color = PALETTE[i % PALETTE.length];
        return (
          <div
            key={s.id}
            data-geo-wrap
            data-depth={s.depth}
            className="absolute will-change-transform"
            style={{
              top: s.top,
              left: s.left,
              width: s.size,
              height: s.size,
              opacity: s.opacity,
            }}
          >
            <div
              data-geo
              className="h-full w-full will-change-transform"
              style={{
                clipPath: clipPathFor(s.type),
                transform: `rotate(${s.rotation ?? 0}deg)`,
                borderRadius: s.type === "circle" ? "9999px" : undefined,
                background:
                  s.type === "circle"
                    ? `radial-gradient(closest-side, ${color}80, ${color}33, transparent)`
                    : `linear-gradient(135deg, ${color}66, ${color}22)`,
              }}
            >
              <div className={`${s.blurClass} h-full w-full`} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
