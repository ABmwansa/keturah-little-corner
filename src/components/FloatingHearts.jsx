export function FloatingHearts() {
  const hearts = Array.from({ length: 12 }, (_, index) => ({
    id: index,
    left: `${6 + index * 8}%`,
    delay: `${(index % 6) * 1.8}s`,
    duration: `${14 + (index % 5) * 2}s`,
    size: `${12 + (index % 4) * 6}px`,
  }));

  return (
    <div className="floating-hearts" aria-hidden="true">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="floating-heart"
          style={{
            left: heart.left,
            animationDelay: heart.delay,
            animationDuration: heart.duration,
            fontSize: heart.size,
          }}
        >
          ♥
        </span>
      ))}
    </div>
  );
}
