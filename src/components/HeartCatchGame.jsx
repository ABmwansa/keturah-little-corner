import { useEffect, useRef, useState } from 'react';
import { SectionCard } from './SectionCard';

const GAME_WIDTH = 320;
const GAME_HEIGHT = 340;
const BASKET_WIDTH = 88;
const WIN_SCORE = 20;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export function HeartCatchGame() {
  const frameRef = useRef(0);
  const lastTimeRef = useRef(0);
  const spawnRef = useRef(0);
  const areaRef = useRef(null);
  const basketRef = useRef(50);
  const heartsRef = useRef([]);
  const scoreRef = useRef(0);
  const [hearts, setHearts] = useState([]);
  const [basketX, setBasketX] = useState(50);
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState('Catch the falling hearts. This is now your official job.');
  const [running, setRunning] = useState(true);

  useEffect(() => {
    basketRef.current = basketX;
  }, [basketX]);

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  useEffect(() => {
    if (!running) {
      cancelAnimationFrame(frameRef.current);
      return undefined;
    }

    const loop = (time) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = time;
      }

      const delta = time - lastTimeRef.current;
      lastTimeRef.current = time;
      spawnRef.current += delta;

      if (spawnRef.current > 550) {
        spawnRef.current = 0;
        heartsRef.current = [
          ...heartsRef.current,
          {
            id: crypto.randomUUID(),
            x: 8 + Math.random() * 84,
            y: -12,
            speed: 60 + Math.random() * 55,
          },
        ];
      }

      const basketLeft = basketRef.current - (BASKET_WIDTH / GAME_WIDTH) * 50;
      const basketRight = basketRef.current + (BASKET_WIDTH / GAME_WIDTH) * 50;
      let nextScore = scoreRef.current;
      let crossedTen = false;

      heartsRef.current = heartsRef.current.filter((heart) => {
        const nextY = heart.y + (heart.speed * delta) / 1000;
        const caught =
          nextY >= 272 &&
          nextY <= 316 &&
          heart.x >= basketLeft &&
          heart.x <= basketRight;

        if (caught) {
          nextScore += 1;
          if (nextScore === 10) {
            crossedTen = true;
          }
          return false;
        }

        heart.y = nextY;
        return nextY < GAME_HEIGHT + 20;
      });

      if (nextScore !== scoreRef.current) {
        scoreRef.current = nextScore;
        setScore(nextScore);
      }

      if (nextScore >= WIN_SCORE) {
        setStatus('You win. ❤️ Although technically you already won this game a long time ago.');
        setRunning(false);
        setHearts([]);
        heartsRef.current = [];
        cancelAnimationFrame(frameRef.current);
        return;
      }

      if (crossedTen) {
        setStatus("Okay... you're pretty good at stealing my heart.");
      }

      setHearts([...heartsRef.current]);
      frameRef.current = requestAnimationFrame(loop);
    };

    frameRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frameRef.current);
    };
  }, [running]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!running) {
        return;
      }

      if (event.key === 'ArrowLeft') {
        setBasketX((current) => clamp(current - 8, 10, 90));
      }

      if (event.key === 'ArrowRight') {
        setBasketX((current) => clamp(current + 8, 10, 90));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [running]);

  function syncBasketPosition(clientX) {
    const bounds = areaRef.current?.getBoundingClientRect();

    if (!bounds) {
      return;
    }

    const relativeX = ((clientX - bounds.left) / bounds.width) * 100;
    const clamped = clamp(relativeX, 12, 88);
    setBasketX(clamped);
  }

  function restartGame() {
    heartsRef.current = [];
    lastTimeRef.current = 0;
    spawnRef.current = 0;
    scoreRef.current = 0;
    setHearts([]);
    setScore(0);
    setBasketX(50);
    setStatus('Catch the falling hearts. This is now your official job.');
    setRunning(true);
  }

  return (
    <SectionCard title="🎮 Catch My Heart" label="03">
      <p className="section-copy">
        Move the basket with your mouse, finger, or keyboard arrows. Romantic athletics.
      </p>
      <div
        ref={areaRef}
        className="game-area"
        style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
        onPointerDown={(event) => syncBasketPosition(event.clientX)}
        onPointerMove={(event) => {
          if (event.pointerType === 'mouse' || event.buttons > 0) {
            syncBasketPosition(event.clientX);
          }
        }}
        onTouchMove={(event) => syncBasketPosition(event.touches[0].clientX)}
      >
        {hearts.map((heart) => (
          <span
            key={heart.id}
            className="falling-heart"
            style={{ left: `${heart.x}%`, top: `${heart.y}px` }}
          >
            ❤️
          </span>
        ))}
        <div className="basket" style={{ left: `${basketX}%` }}>
          🧺
        </div>
      </div>
      <div className="game-meta">
        <p>Score: {score}</p>
        <p>{status}</p>
      </div>
      <button className="secondary-button" type="button" onClick={restartGame}>
        Restart
      </button>
    </SectionCard>
  );
}
