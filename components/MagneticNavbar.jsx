import React, { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'

function MenuItem({ label, href = '#', className = '' }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 300, damping: 30 })
  const sy = useSpring(y, { stiffness: 300, damping: 30 })
  const [hovered, setHovered] = useState(false)

  function handleMove(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    const relX = e.clientX - rect.left - rect.width / 2
    const relY = e.clientY - rect.top - rect.height / 2
    // scale down the movement so it's subtle
    x.set(relX * 0.5)
    y.set(relY * 0.5)
  }

  function handleLeave() {
    x.set(0)
    y.set(0)
    setHovered(false)
  }

  return (
    <a
      href={href}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      className={"group relative block rounded-md px-3 py-2 transition-colors duration-200 " + className}
    >
      <motion.span
        style={{ x: sx, y: sy }}
        className={
          'inline-block text-sm font-medium transition-colors duration-200 ' +
          (hovered ? 'text-lime-400 drop-shadow-[0_6px_14px_rgba(132,204,22,0.12)]' : 'text-gray-200')
        }
      >
        {label}
      </motion.span>

      {/* soft glowing underline / highlight */}
      <span
        aria-hidden
        className={
          'absolute left-1 right-1 bottom-0 h-0.5 rounded opacity-0 transition-all duration-300 ' +
          (hovered ? 'bg-gradient-to-r from-lime-400/60 to-emerald-300/40 opacity-100' : '')
        }
      />
    </a>
  )
}

export default function MagneticNavbar() {
  const [bgOpacity, setBgOpacity] = useState(0.75)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    function onScroll() {
      // slightly increase opacity as the user scrolls down
      const t = Math.min(1, 0.5 + window.scrollY / 800)
      setBgOpacity(t)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navStyle = {
    backgroundColor: `rgba(17,24,39,${bgOpacity})`, // tailwind gray-900-ish
    backdropFilter: 'blur(6px)'
  }

  const items = [
    { label: 'Home', href: '#' },
    { label: 'Games', href: '#' },
    { label: 'Tech Demos', href: '#' }
  ]

  return (
    <>
      {/* Desktop / md+ sidebar */}
      <aside
        className="hidden md:flex md:flex-col md:items-start md:gap-2 md:p-3 md:rounded-lg md:shadow-lg md:backdrop-blur z-40"
        style={{ ...navStyle, position: 'fixed', left: '1rem', top: '20vh' }}
      >
        <nav className="flex flex-col items-start gap-2">
          {items.map((it) => (
            <MenuItem key={it.label} label={it.label} href={it.href} />
          ))}
        </nav>
      </aside>

      {/* Mobile hamburger */}
      <div className="md:hidden">
        <button
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMobileOpen((v) => !v)}
          className="fixed top-4 left-4 z-50 rounded-md bg-gray-900/70 p-2 text-gray-100 shadow-md backdrop-blur"
        >
          <span className="text-2xl">☰</span>
        </button>

        <AnimatePresence>
          {mobileOpen && (
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              style={{ backgroundColor: 'rgba(10, 12, 14, 0.98)' }}
              className="fixed left-0 top-0 z-40 h-full w-64 shadow-xl p-6"
            >
              <nav className="flex flex-col gap-4 mt-6 pt-2">
                {items.map((it) => (
                  <a
                    key={it.label}
                    href={it.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-gray-100 text-lg font-medium"
                  >
                    {it.label}
                  </a>
                ))}
              </nav>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
