import { useState } from 'react';
import { SectionCard } from './SectionCard';

export function LoveMeterCard({ content }) {
  const [score, setScore] = useState(0);
  const complete = score >= content.target;
  const filledHearts = Math.min(score, content.target);

  function tapHeart() {
    setScore((current) => (current >= content.target ? 0 : current + 1));
  }

  return (
    <SectionCard title="Ron's Love Meter" label="05">
      <p className="section-copy">Tap the heart until Ron cannot act normal anymore.</p>
      <button className={`meter-heart${complete ? ' complete' : ''}`} type="button" onClick={tapHeart} aria-label="Add love to the meter">
        &hearts;
      </button>
      <div className="meter-track" aria-label={`${filledHearts} of ${content.target} hearts`}>
        {Array.from({ length: content.target }, (_, index) => (
          <span className={index < filledHearts ? 'filled' : ''} key={index} aria-hidden="true">&hearts;</span>
        ))}
      </div>
      <p className={`message-panel${score ? ' visible' : ''}`}>
        {complete ? content.completeMessage : content.messages[Math.max(score - 1, 0)]}
      </p>
      <p className="tiny-note">{complete ? 'Tap once more to play again.' : `${content.target - score} taps left.`}</p>
    </SectionCard>
  );
}
