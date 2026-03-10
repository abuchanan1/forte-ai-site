'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
}

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    const particles: Particle[] = []
    const PARTICLE_COUNT = 60
    const CONNECTION_DISTANCE = 120
    const brassColor = { r: 160, g: 120, b: 64 }

    function getWidth() {
      return canvas?.offsetWidth ?? 0
    }
    function getHeight() {
      return canvas?.offsetHeight ?? 0
    }

    function resize() {
      if (!canvas || !ctx) return
      canvas.width = getWidth() * window.devicePixelRatio
      canvas.height = getHeight() * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    function initParticles() {
      particles.length = 0
      const w = getWidth()
      const h = getHeight()
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.1,
        })
      }
    }

    function draw() {
      if (!ctx) return
      const w = getWidth()
      const h = getHeight()
      ctx.clearRect(0, 0, w, h)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${brassColor.r}, ${brassColor.g}, ${brassColor.b}, ${p.opacity})`
        ctx.fill()
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const pi = particles[i]!
          const pj = particles[j]!
          const dx = pi.x - pj.x
          const dy = pi.y - pj.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECTION_DISTANCE) {
            const opacity = (1 - dist / CONNECTION_DISTANCE) * 0.15
            ctx.beginPath()
            ctx.moveTo(pi.x, pi.y)
            ctx.lineTo(pj.x, pj.y)
            ctx.strokeStyle = `rgba(${brassColor.r}, ${brassColor.g}, ${brassColor.b}, ${opacity})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animationId = requestAnimationFrame(draw)
    }

    resize()
    initParticles()
    draw()

    const handleResize = () => {
      resize()
      initParticles()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
    />
  )
}
