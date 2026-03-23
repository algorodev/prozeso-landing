"use client";

import { animate } from "animejs";
import type React from "react";
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

export default function HeroBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const shapes = useMemo<ShapeConfig[]>(
    () => [
      {
        id: "s1",
        type: "circle",
        size: 220,
        top: "8%",
        left: "62%",
        opacity: 0.35,
        blurClass: "blur-3xl",
        depth: 1,
      },
      {
        id: "s2",
        type: "hex",
        size: 180,
        top: "18%",
        left: "78%",
        opacity: 0.28,
        blurClass: "blur-2xl",
        depth: 1,
        rotation: 8,
      },
      {
        id: "s3",
        type: "diamond",
        size: 160,
        top: "58%",
        left: "70%",
        opacity: 0.25,
        blurClass: "blur-2xl",
        depth: 1,
      },
      {
        id: "s4",
        type: "square",
        size: 140,
        top: "10%",
        left: "50%",
        opacity: 0.45,
        blurClass: "blur-xl",
        depth: 2,
        rotation: 12,
      },
      {
        id: "s5",
        type: "triangle",
        size: 150,
        top: "35%",
        left: "85%",
        opacity: 0.4,
        blurClass: "blur-xl",
        depth: 2,
      },
      {
        id: "s6",
        type: "hex",
        size: 120,
        top: "70%",
        left: "82%",
        opacity: 0.38,
        blurClass: "blur-lg",
        depth: 2,
      },
      {
        id: "s7",
        type: "circle",
        size: 110,
        top: "28%",
        left: "60%",
        opacity: 0.65,
        blurClass: "blur-md",
        depth: 3,
      },
      {
        id: "s8",
        type: "diamond",
        size: 100,
        top: "48%",
        left: "90%",
        opacity: 0.6,
        blurClass: "blur-md",
        depth: 3,
        rotation: -10,
      },
      {
        id: "s9",
        type: "square",
        size: 90,
        top: "78%",
        left: "65%",
        opacity: 0.55,
        blurClass: "blur-sm",
        depth: 3,
      },
      {
        id: "s10",
        type: "triangle",
        size: 95,
        top: "62%",
        left: "55%",
        opacity: 0.5,
        blurClass: "blur-sm",
        depth: 3,
      },
      {
        id: "s11",
        type: "hex",
        size: 105,
        top: "22%",
        left: "92%",
        opacity: 0.5,
        blurClass: "blur-sm",
        depth: 3,
      },
      {
        id: "s12",
        type: "circle",
        size: 80,
        top: "52%",
        left: "58%",
        opacity: 0.55,
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

      const drift = depth === 1 ? 18 : depth === 2 ? 12 : 8;
      const rotate = depth === 1 ? 6 : depth === 2 ? 10 : 14;
      const duration = depth === 1 ? 9000 : depth === 2 ? 7000 : 5200;

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
      if ((el as HTMLElement & { _bgHoverApplied?: boolean })._bgHoverApplied)
        return;
      (el as HTMLElement & { _bgHoverApplied?: boolean })._bgHoverApplied =
        true;
      el.style.zIndex = "5";
      if (!el.dataset.opacity) {
        el.dataset.opacity = getComputedStyle(el).opacity || "1";
      }
      const bg = getComputedStyle(el).backgroundColor;
      el.style.boxShadow = `0 10px 30px ${bg}`;
      const base = parseFloat(el.dataset.opacity || "1");
      el.style.opacity = String(Math.min(base + 0.12, 0.95));
      animate(el, { scale: 1.12, duration: 220, ease: "outQuad" });
    };

    const applyLeave = (el: HTMLElement) => {
      if (!(el as HTMLElement & { _bgHoverApplied?: boolean })._bgHoverApplied)
        return;
      (el as HTMLElement & { _bgHoverApplied?: boolean })._bgHoverApplied =
        false;
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

    return () => {
      if (rafId != null) cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      hovered.forEach(applyLeave);
    };
  }, []);

  const onEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.style.zIndex = "5";
    if (!el.dataset.opacity) {
      el.dataset.opacity = getComputedStyle(el).opacity || "1";
    }
    const bg = getComputedStyle(el).backgroundColor;
    el.style.boxShadow = `0 10px 30px ${bg}`;
    const base = parseFloat(el.dataset.opacity || "1");
    el.style.opacity = String(Math.min(base + 0.12, 0.95));
    animate(el, {
      scale: 1.12,
      duration: 220,
      ease: "outQuad",
    });
  };

  const onLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.style.zIndex = "";
    el.style.boxShadow = "";
    if (el.dataset.opacity) {
      el.style.opacity = el.dataset.opacity;
    }
    animate(el, {
      scale: 1,
      duration: 260,
      ease: "outQuad",
    });
  };

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden opacity-40 sm:opacity-100"
    >
      <div
        className="
          absolute inset-0
          bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.08),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(255,255,255,0.06),transparent_50%)]
          dark:bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.06),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(255,255,255,0.05),transparent_50%)]
          pointer-events-none
        "
      />
      {shapes.map((s, idx) => {
        const color = PALETTE[idx % PALETTE.length];
        const clip = clipPathFor(s.type);
        const shapeClasses = [
          "absolute",
          "will-change-transform",
          "transition-[filter,opacity]",
          "pointer-events-auto",
          s.blurClass,
          s.type === "circle" ? "rounded-full" : "rounded-2xl",
        ].join(" ");
        return (
          <div
            key={s.id}
            data-geo
            data-depth={s.depth}
            data-opacity={String(s.opacity)}
            onPointerEnter={onEnter}
            onPointerLeave={onLeave}
            className={shapeClasses}
            style={{
              width: s.size,
              height: s.size,
              top: s.top,
              left: s.left,
              opacity: s.opacity,
              backgroundColor: color,
              color,
              transform: `rotate(${s.rotation ?? 0}deg)`,
              clipPath: clip,
            }}
          />
        );
      })}
      <div
        className="
          absolute inset-0 opacity-[0.12] dark:opacity-[0.14]
          [background-image:radial-gradient(rgba(255,255,255,0.5)_1px,transparent_1px)]
          [background-size:18px_18px]
          pointer-events-none
        "
      />
    </div>
  );
}
