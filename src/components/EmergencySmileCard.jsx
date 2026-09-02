import { SectionCard } from './SectionCard';

export function EmergencySmileCard({ message, onFix, animate }) {
  return (
    <SectionCard title="😂 Emergency Smile" label="02">
      <div className="status-panel">
        <h3>Emergency Smile System 🚨</h3>
        <p>Current situation: Keturah is not smiling enough.</p>
      </div>
      <button
        className={`danger-button${animate ? ' activated' : ''}`}
        type="button"
        onClick={onFix}
      >
        FIX IT
      </button>
      <p className={`message-panel${message ? ' visible bounce-in' : ''}`}>
        {message || 'Standing by for immediate cuteness-related intervention.'}
      </p>
    </SectionCard>
  );
}
