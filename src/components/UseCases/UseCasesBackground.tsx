"use client";

import { animate } from "animejs";
import { useEffect, useMemo, useRef } from "react";

type ShapeType = "circle" | "square" | "diamond" | "hex" | "triangle" | "pill";

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

export default function UseCasesBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const shapes = useMemo<ShapeConfig[]>(
    () => [
      {
        id: "uc1",
        type: "circle",
        size: 140,
        top: "-5%",
        left: "2%",
        opacity: 1,
        blurClass: "blur-2xl",
        depth: 1,
      },
      {
        id: "uc2",
        type: "hex",
        size: 120,
        top: "-4%",
        left: "78%",
        opacity: 1,
        blurClass: "blur-xl",
        depth: 1,
        rotation: 15,
      },
      {
        id: "uc3",
        type: "diamond",
        size: 100,
        top: "95%",
        left: "5%",
        opacity: 1,
        blurClass: "blur-xl",
        depth: 2,
        rotation: -12,
      },
      {
        id: "uc4",
        type: "triangle",
        size: 110,
        top: "98%",
        left: "82%",
        opacity: 1,
        blurClass: "blur-lg",
        depth: 2,
      },
      {
        id: "uc5",
        type: "pill",
        size: 130,
        top: "10%",
        left: "-2%",
        opacity: 1,
        blurClass: "blur-xl",
        depth: 1,
        rotation: -10,
      },
      {
        id: "uc6",
        type: "square",
        size: 90,
        top: "8%",
        left: "88%",
        opacity: 1,
        blurClass: "blur-lg",
        depth: 2,
        rotation: 8,
      },
      {
        id: "uc7",
        type: "circle",
        size: 80,
        top: "85%",
        left: "85%",
        opacity: 1,
        blurClass: "blur-md",
        depth: 3,
      },
      {
        id: "uc8",
        type: "hex",
        size: 70,
        top: "88%",
        left: "-3%",
        opacity: 1,
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

    els.forEach((el) => {
      const depth = Number(el.dataset.depth || "2");

      const drift = depth === 1 ? 12 : depth === 2 ? 8 : 6;
      const rotate = depth === 1 ? 4 : depth === 2 ? 6 : 8;
      const duration = depth === 1 ? 10000 : depth === 2 ? 7500 : 6000;

      animate(el, {
        translateX: [-drift, drift],
        translateY: [drift, -drift],
        rotate: [-rotate, rotate],
        scale: [1, depth === 1 ? 1.02 : depth === 2 ? 1.03 : 1.04],
        duration,
        ease: "inOutSine",
        loop: true,
        alternate: true,
      });
    });

    return () => {
      els.forEach((el) => {
        animate(el, {
          translateX: 0,
          translateY: 0,
          rotate: 0,
          scale: 1,
          duration: 0,
        });
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      {shapes.map((s) => {
        const color = PALETTE[parseInt(s.id.slice(2)) % PALETTE.length];
        return (
          <div
            key={s.id}
            data-geo
            data-depth={s.depth}
            className={`absolute will-change-transform ${s.blurClass}`}
            style={{
              top: s.top,
              left: s.left,
              width: s.size,
              height:
                s.type === "pill"
                  ? Math.max(60, Math.floor(s.size * 0.4))
                  : s.size,
              opacity: s.opacity,
              transform: s.rotation ? `rotate(${s.rotation}deg)` : undefined,
              borderRadius:
                s.type === "circle"
                  ? "9999px"
                  : s.type === "pill"
                    ? "9999px"
                    : undefined,
              clipPath:
                s.type !== "circle" && s.type !== "pill"
                  ? clipPathFor(s.type)
                  : undefined,
              background: `linear-gradient(135deg, ${color}33, ${color}55)`,
              boxShadow: `0 0 40px rgba(34, 211, 238, 0.15)`,
            }}
          >
            <div className={`${s.blurClass} absolute inset-0`} />
          </div>
        );
      })}
    </div>
  );
}
