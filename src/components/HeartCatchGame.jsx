import { useEffect, useState } from 'react';
import { SectionCard } from './SectionCard';

const TARGET = 12;

export function HeartCatchGame() {
  const [score, setScore] = useState(0);
  const [heart, setHeart] = useState({ left: 50, top: 20 });
  const won = score >= TARGET;

  useEffect(() => {
    if (won) return undefined;
    const moveHeart = window.setInterval(() => {
      setHeart({ left: 12 + Math.random() * 76, top: 12 + Math.random() * 70 });
    }, 900);
    return () => window.clearInterval(moveHeart);
  }, [won]);

  function catchHeart() {
    if (won) return;
    setScore((current) => current + 1);
    setHeart({ left: 12 + Math.random() * 76, top: 12 + Math.random() * 70 });
  }

  function restart() {
    setScore(0);
    setHeart({ left: 50, top: 20 });
  }

  return (
    <SectionCard title="Catch Ron's Heart" label="03">
      <p className="section-copy">Tap the moving heart. Catch {TARGET}.</p>
      <div className="tap-game-area">
        {won ? <p className="tap-game-win">Ket wins. Ron's heart is yours.</p> : null}
        {!won ? (
          <button className="tap-game-heart" type="button" onClick={catchHeart} style={{ left: `${heart.left}%`, top: `${heart.top}%` }} aria-label="Catch a heart">
            &hearts;
          </button>
        ) : null}
      </div>
      <div className="game-meta">
        <p>Hearts: {score} / {TARGET}</p>
        <p>{won ? 'You got them all.' : 'Quick, Ket.'}</p>
      </div>
      <button className="secondary-button" type="button" onClick={restart}>Start again</button>
    </SectionCard>
  );
}
