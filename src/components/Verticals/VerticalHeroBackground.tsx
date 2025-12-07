'use client'

import { animate } from 'animejs'
import React, { useEffect, useMemo, useRef } from 'react'

type ShapeType = 'circle' | 'square' | 'diamond' | 'hex' | 'triangle'

type ShapeConfig = {
  id: string
  type: ShapeType
  size: number
  top: string
  left: string
  opacity: number
  blurClass: string
  depth: 1 | 2 | 3
  rotation?: number
  style?: 'filled' | 'outline'
}

const clipPathFor = (type: ShapeType) => {
  switch (type) {
    case 'triangle':
      return 'polygon(50% 0%, 0% 100%, 100% 100%)'
    case 'hex':
      return 'polygon(25% 6%, 75% 6%, 100% 50%, 75% 94%, 25% 94%, 0% 50%)'
    case 'diamond':
      return 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
    default:
      return undefined
  }
}

// Keep the base palette for consistency, but we will also render some shapes as outlines
const PALETTE = ['#2A68FF', '#14FFE3', '#8A7CFF', '#25D695'] as const

export default function VerticalHeroBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null)

  // Make it visually distinct from the home background:
  // - fewer but larger shapes
  // - mix of filled and outline styles
  // - stronger right bias remains to keep text readable
  const shapes = useMemo<ShapeConfig[]>(
    () => [
      { id: 'vs1', type: 'circle', size: 260, top: '6%', left: '64%', opacity: 0.32, blurClass: 'blur-3xl', depth: 1, style: 'outline' },
      {
        id: 'vs2',
        type: 'hex',
        size: 160,
        top: '18%',
        left: '78%',
        opacity: 0.3,
        blurClass: 'blur-2xl',
        depth: 1,
        rotation: 6,
      },
      { id: 'vs3', type: 'diamond', size: 190, top: '56%', left: '70%', opacity: 0.22, blurClass: 'blur-2xl', depth: 1, style: 'outline' },
      {
        id: 'vs4',
        type: 'square',
        size: 120,
        top: '10%',
        left: '50%',
        opacity: 0.5,
        blurClass: 'blur-xl',
        depth: 2,
        rotation: 10,
      },
      { id: 'vs5', type: 'triangle', size: 170, top: '34%', left: '86%', opacity: 0.36, blurClass: 'blur-xl', depth: 2, style: 'outline' },
      { id: 'vs6', type: 'hex', size: 140, top: '72%', left: '82%', opacity: 0.34, blurClass: 'blur-lg', depth: 2 },
      { id: 'vs7', type: 'circle', size: 140, top: '26%', left: '58%', opacity: 0.6, blurClass: 'blur-md', depth: 3 },
      {
        id: 'vs8',
        type: 'diamond',
        size: 120,
        top: '48%',
        left: '90%',
        opacity: 0.5,
        blurClass: 'blur-md',
        depth: 3,
        rotation: -8,
      },
      { id: 'vs9', type: 'square', size: 110, top: '78%', left: '65%', opacity: 0.5, blurClass: 'blur-sm', depth: 3, style: 'outline' },
      { id: 'vs10', type: 'triangle', size: 115, top: '62%', left: '55%', opacity: 0.46, blurClass: 'blur-sm', depth: 3 },
    ],
    [],
  )

  useEffect(() => {
    const root = containerRef.current
    if (!root) return

    const els = Array.from(root.querySelectorAll<HTMLElement>('[data-geo]'))

    els.forEach((el, idx) => {
      const depth = Number(el.dataset.depth || '2')

      // Distinct motion profile: independent X/Y oscillations with different periods
      const ampX = depth === 1 ? 22 : depth === 2 ? 16 : 11
      const ampY = depth === 1 ? 14 : depth === 2 ? 11 : 8
      const dX = depth === 1 ? 16000 : depth === 2 ? 12000 : 9000
      const dY = depth === 1 ? 12000 : depth === 2 ? 9000 : 7000
      const dS = depth === 1 ? 8000 : depth === 2 ? 7000 : 6000

      // Stagger to desynchronize phases
      const delay = (idx % 7) * 180

      animate(el, {
        translateX: [-ampX, ampX],
        duration: dX,
        easing: 'linear',
        loop: true,
        direction: 'alternate',
        delay,
      })

      animate(el, {
        translateY: [ampY, -ampY],
        duration: dY,
        easing: 'linear',
        loop: true,
        direction: 'alternate',
        delay: delay / 2,
      })

      animate(el, {
        scale: [1, depth === 1 ? 1.015 : depth === 2 ? 1.02 : 1.03],
        duration: dS,
        easing: 'inOutSine',
        loop: true,
        direction: 'alternate',
      })
    })

    let rafId: number | null = null
    let pendingPoint: { x: number; y: number } | null = null
    let rects: Map<HTMLElement, DOMRect> = new Map()
    const hovered = new Set<HTMLElement>()

    const computeRects = () => {
      rects = new Map()
      els.forEach((el) => {
        rects.set(el, el.getBoundingClientRect())
      })
    }

    const applyEnter = (el: HTMLElement) => {
      if ((el as any)._bgHoverApplied) return
      ;(el as any)._bgHoverApplied = true
      el.style.zIndex = '5'
      if (!el.dataset.opacity) {
        el.dataset.opacity = getComputedStyle(el).opacity || '1'
      }
      const bg = getComputedStyle(el).backgroundColor
      el.style.boxShadow = `0 10px 30px ${bg}`
      const base = parseFloat(el.dataset.opacity || '1')
      el.style.opacity = String(Math.min(base + 0.12, 0.95))
      animate(el, { scale: 1.12, duration: 220, ease: 'outQuad' })
    }

    const applyLeave = (el: HTMLElement) => {
      if (!(el as any)._bgHoverApplied) return
      ;(el as any)._bgHoverApplied = false
      el.style.zIndex = ''
      el.style.boxShadow = ''
      if (el.dataset.opacity) {
        el.style.opacity = el.dataset.opacity
      }
      animate(el, { scale: 1, duration: 260, ease: 'outQuad' })
    }

    const tick = () => {
      rafId = null
      if (!pendingPoint) return
      const { x, y } = pendingPoint
      pendingPoint = null
      els.forEach((el) => {
        const r = rects.get(el)
        if (!r) return
        const inside = x >= r.left && x <= r.right && y >= r.top && y <= r.bottom
        if (inside) {
          if (!hovered.has(el)) {
            hovered.add(el)
            applyEnter(el)
          }
        } else if (hovered.has(el)) {
          hovered.delete(el)
          applyLeave(el)
        }
      })
    }

    const schedule = () => {
      if (rafId == null) rafId = requestAnimationFrame(tick)
    }

    const onMove = (ev: MouseEvent) => {
      pendingPoint = { x: ev.clientX, y: ev.clientY }
      schedule()
    }

    const onScrollOrResize = () => {
      computeRects()
    }

    computeRects()
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('scroll', onScrollOrResize, { passive: true })
    window.addEventListener('resize', onScrollOrResize)

    return () => {
      if (rafId != null) cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMove as any)
      window.removeEventListener('scroll', onScrollOrResize as any)
      window.removeEventListener('resize', onScrollOrResize as any)
      hovered.forEach(applyLeave)
    }
  }, [])

  const onEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget
    el.style.zIndex = '5'
    if (!el.dataset.opacity) {
      el.dataset.opacity = getComputedStyle(el).opacity || '1'
    }
    const bg = getComputedStyle(el).backgroundColor
    el.style.boxShadow = `0 10px 30px ${bg}`
    const base = parseFloat(el.dataset.opacity || '1')
    el.style.opacity = String(Math.min(base + 0.12, 0.95))
    animate(el, {
      scale: 1.12,
      duration: 220,
      ease: 'outQuad',
    })
  }

  const onLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget
    el.style.zIndex = ''
    el.style.boxShadow = ''
    if (el.dataset.opacity) {
      el.style.opacity = el.dataset.opacity
    }
    animate(el, {
      scale: 1,
      duration: 260,
      ease: 'outQuad',
    })
  }

  return (
    <div ref={containerRef} aria-hidden='true' className='absolute inset-0 overflow-hidden'>
      <div
        className='
          absolute inset-0
          bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.08),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.06),transparent_50%)]
          dark:bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.06),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.05),transparent_50%)]
          pointer-events-none
        '
      />
      {shapes.map((s, idx) => {
        const color = PALETTE[idx % PALETTE.length]
        const clip = clipPathFor(s.type)
        const shapeClasses = [
          'absolute',
          'will-change-transform',
          'transition-[filter,opacity]',
          'pointer-events-auto',
          s.blurClass,
          s.type === 'circle' ? 'rounded-full' : 'rounded-2xl',
        ].join(' ')
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
              backgroundColor: s.style === 'outline' ? 'transparent' : color,
              border: s.style === 'outline' ? `2px solid ${color}` : undefined,
              color,
              transform: `rotate(${s.rotation ?? 0}deg)`,
              clipPath: clip,
            }}
          />
        )
      })}
      <div
        className='
          absolute inset-0 opacity-[0.035] dark:opacity-[0.05]
          [background-image:radial-gradient(rgba(255,255,255,0.35)_0.75px,transparent_0.75px)]
          [background-size:20px_20px]
          pointer-events-none
        '
      />
    </div>
  )
}
