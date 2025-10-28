import React, { useRef, useEffect, useState, useImperativeHandle, forwardRef } from 'react';
const ENEMY_CHARS = ['@', '#', '%', '&', 'o', 'X', '¥'];
const MAX_ENEMIES = 60;
const SPAWN_INTERVAL_MS = 900;
const BASE_FIRE_INTERVAL_MS = 400;
// slow down rate of fire by 30%
const FIRE_INTERVAL_MS = Math.round(BASE_FIRE_INTERVAL_MS * 1.3);
const BULLET_SPEED = 900; // px/s
const ENEMY_BASE_SPEED = 40; // px/s
const SPEED_ACCEL_PER_SEC = 3; // px/s per second
const BULLET_RADIUS = 6;
const ENEMY_RADIUS = 10;

interface Enemy {
  id: string;
  x: number;
  y: number;
  char: string;
  hp: number;
}

interface Bullet {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface GameScore {
  score: number;
  hiscore: number;
}

export interface GameProps {
  onClose: (score: GameScore) => void;
}

export interface GameRef {
  close: () => void;
}

function now() {
  return performance.now();
}

function clamp(v: number, a: number, b: number): number {
  return Math.max(a, Math.min(b, v));
}

const Game = forwardRef<GameRef, GameProps>(function Game({ onClose }, ref) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const mouseRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const enemiesRef = useRef<Enemy[]>([]);
  const bulletsRef = useRef<Bullet[]>([]);
  const blockerRectsRef = useRef<DOMRect[]>([]);
  const [score, setScore] = useState(0);
  const scoreRef = useRef(0);
  const [hiscore, setHiscore] = useState(() => {
    try {
      return Number(localStorage.getItem('ascii-hiscore') || 0);
    } catch (e) {
      return 0;
    }
  });
  const hiscoreRef = useRef(hiscore);
  const startedAtRef = useRef(now());
  const lastSpawnRef = useRef(0);
  const lastFireRef = useRef(0);

  useEffect(() => {
    function updateBlockers() {
      const nodes = Array.from(document.querySelectorAll('[data-game-block], .game-block'));
      blockerRectsRef.current = nodes.map((n) => n.getBoundingClientRect());
    }
    updateBlockers();
    const iv = setInterval(updateBlockers, 1000);
    window.addEventListener('resize', updateBlockers);
    return () => {
      clearInterval(iv);
      window.removeEventListener('resize', updateBlockers);
    };
  }, []);

  useEffect(() => {
    function onMove(e: MouseEvent) {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    }
    function onTouch(ev: TouchEvent) {
      if (ev.touches && ev.touches[0]) {
        mouseRef.current = { x: ev.touches[0].clientX, y: ev.touches[0].clientY };
      }
    }
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onTouch, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onTouch);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    function resize() {
      if (!canvas || !ctx) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = '16px monospace';
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
    }
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  useEffect(() => {
    lastTimeRef.current = now();
    startedAtRef.current = now();
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('ascii-hiscore', String(hiscore));
    } catch (e) {}
  }, [hiscore]);

  // keep refs in sync with state for use in the animation loop (avoids stale closures)
  useEffect(() => {
    scoreRef.current = score;
  }, [score]);
  useEffect(() => {
    hiscoreRef.current = hiscore;
  }, [hiscore]);

  function spawnEnemy() {
    if (enemiesRef.current.length >= MAX_ENEMIES) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    let x, y;
    const edge = ['top', 'bottom', 'left', 'right'][Math.floor(Math.random() * 4)];
    if (edge === 'top') {
      x = Math.random() * w;
      y = -20;
    } else if (edge === 'bottom') {
      x = Math.random() * w;
      y = h + 20;
    } else if (edge === 'left') {
      x = -20;
      y = Math.random() * h;
    } else {
      x = w + 20;
      y = Math.random() * h;
    }
    enemiesRef.current.push({
      id: Math.random().toString(36).slice(2, 9),
      x, y,
      char: ENEMY_CHARS[Math.floor(Math.random() * ENEMY_CHARS.length)],
      hp: 1,
    });
  }

  function spawnBullet() {
    const mouse = mouseRef.current;
    const enemies = enemiesRef.current;
    if (!enemies.length) return;
    let best = null;
    let bestDist = Infinity;
    for (const e of enemies) {
      const dx = e.x - mouse.x;
      const dy = e.y - mouse.y;
      const d = dx*dx + dy*dy;
      if (d < bestDist) {
        bestDist = d;
        best = e;
      }
    }
    if (!best) return;
    const dx = best.x - mouse.x;
    const dy = best.y - mouse.y;
    const mag = Math.hypot(dx, dy) || 1;
    const vx = (dx / mag) * BULLET_SPEED;
    const vy = (dy / mag) * BULLET_SPEED;
    bulletsRef.current.push({
      id: Math.random().toString(36).slice(2, 9),
      x: mouse.x,
      y: mouse.y,
      vx, vy,
    });
  }

  function intersectsRectCircle(rect: DOMRect, cx: number, cy: number, r: number): boolean {
    const nx = clamp(cx, rect.left, rect.right);
    const ny = clamp(cy, rect.top, rect.bottom);
    const dx = nx - cx;
    const dy = ny - cy;
    return dx*dx + dy*dy <= r*r;
  }

  function moveEnemy(e: Enemy, dt: number, elapsedSec: number) {
    const mouse = mouseRef.current;
    let dx = mouse.x - e.x;
    let dy = mouse.y - e.y;
    const dist = Math.hypot(dx, dy) || 1;
    const speed = ENEMY_BASE_SPEED + SPEED_ACCEL_PER_SEC * elapsedSec;
    const step = speed * dt;
    const nx = e.x + (dx / dist) * step;
    const ny = e.y + (dy / dist) * step;

    const rects = blockerRectsRef.current;
    const collides = rects.some(r => intersectsRectCircle(r, nx, ny, ENEMY_RADIUS));
    if (!collides) {
      e.x = nx; e.y = ny;
      return;
    }
    const collX = rects.some(r => intersectsRectCircle(r, nx, e.y, ENEMY_RADIUS));
    if (!collX) {
      e.x = nx;
      return;
    }
    const collY = rects.some(r => intersectsRectCircle(r, e.x, ny, ENEMY_RADIUS));
    if (!collY) {
      e.y = ny;
      return;
    }
    // otherwise blocked
  }

  function loop() {
    const t = now();
    const dtMs = t - lastTimeRef.current;
    const dt = dtMs / 1000;
    lastTimeRef.current = t;
    const elapsedSec = (t - startedAtRef.current) / 1000;

    if (t - lastSpawnRef.current > SPAWN_INTERVAL_MS) {
      spawnEnemy();
      lastSpawnRef.current = t;
      if (Math.random() < 0.25) spawnEnemy();
    }

    if (t - lastFireRef.current > FIRE_INTERVAL_MS) {
      spawnBullet();
      lastFireRef.current = t;
    }

    const enemies = enemiesRef.current;
    for (let i = enemies.length - 1; i >= 0; i--) {
      const e = enemies[i];
      moveEnemy(e, dt, elapsedSec);
      if (Math.hypot(e.x - mouseRef.current.x, e.y - mouseRef.current.y) < 12) {
        enemies.splice(i, 1);
        // penalize player when enemy reaches cursor
        setScore((s) => {
          const ns = Math.max(0, s - 5);
          scoreRef.current = ns;
          return ns;
        });
      }
    }

    const bullets = bulletsRef.current;
    for (let bi = bullets.length - 1; bi >= 0; bi--) {
      const b = bullets[bi];
      b.x += b.vx * dt;
      b.y += b.vy * dt;
      if (b.x < -50 || b.y < -50 || b.x > window.innerWidth + 50 || b.y > window.innerHeight + 50) {
        bullets.splice(bi, 1);
        continue;
      }
      let hit = false;
      for (let ei = enemies.length - 1; ei >= 0; ei--) {
        const e = enemies[ei];
        const d = Math.hypot(e.x - b.x, e.y - b.y);
        if (d < ENEMY_RADIUS + BULLET_RADIUS) {
          enemies.splice(ei, 1);
          bullets.splice(bi, 1);
          hit = true;
          // increment score safely using functional update
          setScore((s) => {
            const ns = s + 1;
            scoreRef.current = ns;
            if (ns > hiscoreRef.current) {
              setHiscore(ns);
              hiscoreRef.current = ns;
            }
            return ns;
          });
          break;
        }
      }
      if (hit) continue;
    }

    draw();

    rafRef.current = requestAnimationFrame(loop);
  }

  function draw() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();

    for (const e of enemiesRef.current) {
      ctx.fillStyle = '#ff6b6b';
      ctx.fillText(e.char, e.x, e.y);
    }

    for (const b of bulletsRef.current) {
      ctx.beginPath();
      ctx.fillStyle = '#9ae6b4';
      ctx.arc(b.x, b.y, BULLET_RADIUS, 0, Math.PI*2);
      ctx.fill();
    }

    ctx.fillStyle = '#ffffff';
    ctx.font = '18px monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`Score: ${score}`, 12, 24);
    ctx.textAlign = 'right';
    ctx.fillText(`Hiscore: ${hiscore}`, window.innerWidth - 12, 24);

    ctx.restore();
  }

  function stopGame() {
    cancelAnimationFrame(rafRef.current);
    try { localStorage.setItem('ascii-hiscore', String(hiscore)); } catch (e) {}
    if (onClose) onClose({ score: scoreRef.current, hiscore: hiscoreRef.current });
  }

  // expose imperative close() so parent can programmatically close the game and get score
  useImperativeHandle(ref, () => ({
    close: () => stopGame(),
  }), [/* no deps, stopGame uses refs */]);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          zIndex: 9999,
          pointerEvents: 'none',
        }}
      />
      <div style={{ position: 'fixed', left: 12, top: 40, zIndex: 10000, pointerEvents: 'auto' }}>
        <button onClick={stopGame} aria-label="Close game">Close</button>
      </div>
    </>
  );
});

export default Game;