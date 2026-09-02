import { SectionCard } from './SectionCard';

export function LoveReasonsCard({ reason, onPick }) {
  return (
    <SectionCard title="❤️ Things I Love About You" label="01">
      <p className="section-copy">
        Press the button for one honestly unfair advantage you have over my heart.
      </p>
      <button className="secondary-button" type="button" onClick={onPick}>
        Give me a reason
      </button>
      <p className={`message-panel${reason ? ' visible' : ''}`}>
        {reason || 'Your next reason is queued and ready.'}
      </p>
    </SectionCard>
  );
}
