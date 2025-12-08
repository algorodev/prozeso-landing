"use client";

import { animate } from "animejs";
import React, { useEffect, useMemo, useRef } from "react";

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

export default function AutomationsBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const shapes = useMemo<ShapeConfig[]>(
    () => [
      {
        id: "a1",
        type: "pill",
        size: 220,
        top: "6%",
        left: "12%",
        opacity: 0.25,
        blurClass: "blur-2xl",
        depth: 1,
        rotation: -8,
      },
      {
        id: "a2",
        type: "hex",
        size: 180,
        top: "14%",
        left: "70%",
        opacity: 0.22,
        blurClass: "blur-2xl",
        depth: 1,
        rotation: 10,
      },
      {
        id: "a3",
        type: "diamond",
        size: 160,
        top: "60%",
        left: "10%",
        opacity: 0.22,
        blurClass: "blur-xl",
        depth: 1,
      },
      {
        id: "a4",
        type: "square",
        size: 140,
        top: "24%",
        left: "42%",
        opacity: 0.35,
        blurClass: "blur-xl",
        depth: 2,
        rotation: 8,
      },
      {
        id: "a5",
        type: "triangle",
        size: 130,
        top: "72%",
        left: "78%",
        opacity: 0.3,
        blurClass: "blur-lg",
        depth: 2,
      },
      {
        id: "a6",
        type: "circle",
        size: 120,
        top: "36%",
        left: "18%",
        opacity: 0.45,
        blurClass: "blur-md",
        depth: 3,
      },
      {
        id: "a7",
        type: "pill",
        size: 160,
        top: "54%",
        left: "58%",
        opacity: 0.28,
        blurClass: "blur-lg",
        depth: 2,
        rotation: 12,
      },
      {
        id: "a8",
        type: "hex",
        size: 95,
        top: "80%",
        left: "50%",
        opacity: 0.35,
        blurClass: "blur-sm",
        depth: 3,
      },
      {
        id: "a9",
        type: "square",
        size: 90,
        top: "40%",
        left: "84%",
        opacity: 0.3,
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

      const drift = depth === 1 ? 14 : depth === 2 ? 10 : 7;
      const rotate = depth === 1 ? 5 : depth === 2 ? 8 : 10;
      const duration = depth === 1 ? 11000 : depth === 2 ? 8200 : 6200;

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

    let rafId: number | null = null;
    let pendingPoint: { x: number; y: number } | null = null;
    let rects: Map<HTMLElement, DOMRect> = new Map();
    const hovered = new Set<HTMLElement>();

    const computeRects = () => {
      rects = new Map();
      els.forEach((el) => {
        rects.set(el, el.getBoundingClientRect());
      });
    };

    const applyEnter = (el: HTMLElement) => {
      if ((el as any)._autoBgHoverApplied) return;
      (el as any)._autoBgHoverApplied = true;
      el.style.zIndex = "5";
      if (!el.dataset.opacity) {
        el.dataset.opacity = getComputedStyle(el).opacity || "1";
      }
      const tint = getComputedStyle(el).color || "rgba(34,211,238,0.35)";
      el.style.boxShadow = `0 10px 30px ${tint}`;
      const base = parseFloat(el.dataset.opacity || "1");
      el.style.opacity = String(Math.min(base + 0.12, 0.95));
      animate(el, { scale: 1.12, duration: 220, ease: "outQuad" });
    };

    const applyLeave = (el: HTMLElement) => {
      if (!(el as any)._autoBgHoverApplied) return;
      (el as any)._autoBgHoverApplied = false;
      el.style.zIndex = "";
      el.style.boxShadow = "";
      if (el.dataset.opacity) {
        el.style.opacity = el.dataset.opacity;
      }
      animate(el, { scale: 1, duration: 260, ease: "outQuad" });
    };

    const tick = () => {
      rafId = null;
      if (!pendingPoint) return;
      const { x, y } = pendingPoint;
      pendingPoint = null;
      els.forEach((el) => {
        const r = rects.get(el);
        if (!r) return;
        const inside =
          x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
        if (inside) {
          if (!hovered.has(el)) {
            hovered.add(el);
            applyEnter(el);
          }
        } else if (hovered.has(el)) {
          hovered.delete(el);
          applyLeave(el);
        }
      });
    };

    const schedule = () => {
      if (rafId == null) rafId = requestAnimationFrame(tick);
    };

    const onMove = (ev: MouseEvent) => {
      pendingPoint = { x: ev.clientX, y: ev.clientY };
      schedule();
    };

    const onScrollOrResize = () => {
      computeRects();
    };

    computeRects();
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    const lines = Array.from(
      root.querySelectorAll<HTMLElement>("[data-connector]"),
    );
    lines.forEach((line, idx) => {
      const delay = 800 * (idx % 3);
      animate(line, {
        opacity: [0.15, 0.35],
        duration: 2400,
        delay,
        loop: true,
        easing: "linear",
        alternate: true,
      });
    });

    return () => {
      if (rafId != null) cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove as any);
      window.removeEventListener("scroll", onScrollOrResize as any);
      window.removeEventListener("resize", onScrollOrResize as any);
      hovered.forEach(applyLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 -z-10 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(currentColor 1px, transparent 1px), radial-gradient(currentColor 1px, transparent 1px)",
          backgroundPosition: "0 0, 12px 12px",
          backgroundSize: "24px 24px",
          color: "#5EEAD4",
          maskImage: "radial-gradient(60% 60% at 50% 40%, black, transparent)",
          WebkitMaskImage:
            "radial-gradient(60% 60% at 50% 40%, black, transparent)",
        }}
      />
      <div
        className="absolute -top-20 -left-20 w-[42rem] h-[42rem] rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(closest-side, #22D3EE, transparent)",
        }}
      />
      <div
        className="absolute top-1/3 -right-32 w-[36rem] h-[36rem] rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{
          background: "radial-gradient(closest-side, #A78BFA, transparent)",
        }}
      />
      {shapes.map(
        ({
          id,
          type,
          size,
          top,
          left,
          opacity,
          blurClass,
          depth,
          rotation,
        }) => (
          <div
            key={id}
            data-geo
            data-depth={depth}
            data-opacity={opacity}
            onPointerEnter={(e) => {
              const el = e.currentTarget as HTMLDivElement;
              if (!(el as any)._autoBgHoverApplied) {
                (el as any)._autoBgHoverApplied = true;
                el.style.zIndex = "5";
                if (!el.dataset.opacity) el.dataset.opacity = String(opacity);
                const tint =
                  getComputedStyle(el).color || "rgba(34,211,238,0.35)";
                el.style.boxShadow = `0 10px 30px ${tint}`;
                el.style.opacity = String(Math.min(opacity + 0.12, 0.95));
                animate(el, { scale: 1.12, duration: 220, ease: "outQuad" });
              }
            }}
            onPointerLeave={(e) => {
              const el = e.currentTarget as HTMLDivElement;
              (el as any)._autoBgHoverApplied = false;
              el.style.zIndex = "";
              el.style.boxShadow = "";
              el.style.opacity = String(el.dataset.opacity || opacity);
              animate(el, { scale: 1, duration: 260, ease: "outQuad" });
            }}
            className="absolute will-change-transform transition-[filter,opacity] pointer-events-auto"
            style={{
              top,
              left,
              width: size,
              height:
                type === "pill" ? Math.max(60, Math.floor(size * 0.4)) : size,
              opacity,
              transform: rotation ? `rotate(${rotation}deg)` : undefined,
              borderRadius:
                type === "circle"
                  ? "9999px"
                  : type === "pill"
                    ? "9999px"
                    : undefined,
              clipPath:
                type !== "circle" && type !== "pill"
                  ? clipPathFor(type)
                  : undefined,
              background: `linear-gradient(135deg, ${PALETTE[(parseInt(id.slice(1)) + 0) % PALETTE.length]}33, ${PALETTE[(parseInt(id.slice(1)) + 1) % PALETTE.length]}55)`,
              boxShadow: "0 0 40px rgba(34, 211, 238, 0.15)",
              backdropFilter: "blur(1px)",
              color: PALETTE[(parseInt(id.slice(1)) + 0) % PALETTE.length],
            }}
          >
            <div className={`${blurClass} absolute inset-0`} />
          </div>
        ),
      )}
      <span
        data-connector
        className="absolute block opacity-20 pointer-events-none"
        style={{
          top: "18%",
          left: "28%",
          width: 220,
          height: 0,
          borderTop: "2px dashed rgba(45,212,191,0.5)",
          transform: "rotate(8deg)",
        }}
      />
      <span
        data-connector
        className="absolute block opacity-20 pointer-events-none"
        style={{
          top: "48%",
          left: "26%",
          width: 320,
          height: 0,
          borderTop: "2px dashed rgba(168,85,247,0.45)",
          transform: "rotate(-6deg)",
        }}
      />
      <span
        data-connector
        className="absolute block opacity-20 pointer-events-none"
        style={{
          top: "66%",
          left: "18%",
          width: 540,
          height: 0,
          borderTop: "2px dashed rgba(14,165,233,0.45)",
          transform: "rotate(4deg)",
        }}
      />
    </div>
  );
}
