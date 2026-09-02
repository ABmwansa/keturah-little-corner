import { SectionCard } from './SectionCard';

export function LoveReasonsCard({ reason, onPick }) {
  return (
    <SectionCard title="Why Ron Loves Ket" label="01">
      <p className="section-copy">Tap for one reason.</p>
      <button className="secondary-button" type="button" onClick={onPick}>
        Tell me
      </button>
      <p className={`message-panel${reason ? ' visible' : ''}`}>
        {reason || 'Ron has many reasons.'}
      </p>
    </SectionCard>
  );
}
