'use client'

import { useEffect, useRef } from 'react'

interface Dot {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  baseVx: number
  baseVy: number
}

const InteractiveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePosRef = useRef({ x: 0, y: 0 })
  const dotsRef = useRef<Dot[]>([])
  const animationFrameRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const dotCount = Math.floor((canvas.width * canvas.height) / 12000)
    dotsRef.current = Array.from({ length: dotCount }, () => {
      const angle = Math.random() * Math.PI * 2
      const speed = 0.02 + Math.random() * 0.03
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        baseVx: Math.cos(angle) * speed,
        baseVy: Math.sin(angle) * speed,
      }
    })

    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const mouseX = mousePosRef.current.x
      const mouseY = mousePosRef.current.y
      const mouseRadius = 180

      dotsRef.current.forEach((dot, i) => {
        const dx = mouseX - dot.x
        const dy = mouseY - dot.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < mouseRadius) {
          const force = (mouseRadius - distance) / mouseRadius
          const angle = Math.atan2(dy, dx)
          dot.vx -= Math.cos(angle) * force * 0.5
          dot.vy -= Math.sin(angle) * force * 0.5
        }

        dot.vx += dot.baseVx * 0.1
        dot.vy += dot.baseVy * 0.1

        dot.vx *= 0.98
        dot.vy *= 0.98

        dot.x += dot.vx
        dot.y += dot.vy

        if (dot.x < 0 || dot.x > canvas.width) dot.vx *= -1
        if (dot.y < 0 || dot.y > canvas.height) dot.vy *= -1

        dot.x = Math.max(0, Math.min(canvas.width, dot.x))
        dot.y = Math.max(0, Math.min(canvas.height, dot.y))

        const opacity = distance < mouseRadius ? 0.5 + (1 - distance / mouseRadius) * 0.5 : 0.2
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
        ctx.fill()

        dotsRef.current.slice(i + 1).forEach((otherDot) => {
          const dx = otherDot.x - dot.x
          const dy = otherDot.y - dot.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 140) {
            const opacity = (1 - distance / 140) * 0.3
            ctx.beginPath()
            ctx.moveTo(dot.x, dot.y)
            ctx.lineTo(otherDot.x, otherDot.y)
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        })
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  )
}

export default InteractiveBackground

