import React, { useState } from 'react';
import Game from './components/Game';

export default function Page() {
  const [gameOpen, setGameOpen] = useState(false);

  return (
    <div>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 16 }}>
        <h1>My Portfolio</h1>
        <button onClick={() => setGameOpen(true)}>Play</button>
      </header>

      <main style={{ padding: 16 }}>
        <p data-game-block style={{ maxWidth: 660 }}>
          This paragraph has the <code>data-game-block</code> attribute so enemies can't walk through it. Add
          <code>data-game-block</code> to any element you want to act as an obstacle.
        </p>

        <div style={{ height: 200 }} />

        <img src="/placeholder.jpg" alt="example" data-game-block style={{ width: 240, height: 140 }} />
      </main>

      {gameOpen && <Game onClose={() => setGameOpen(false)} />}
    </div>
  );
}
