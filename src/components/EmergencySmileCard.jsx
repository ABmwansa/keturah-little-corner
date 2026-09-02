import { SectionCard } from './SectionCard';

export function EmergencySmileCard({ message, onFix, animate }) {
  return (
    <SectionCard title="Make Ket Smile" label="02">
      <div className="status-panel">
        <h3>Smile check</h3>
        <p>Is Ket smiling?</p>
      </div>
      <button className={`danger-button${animate ? ' activated' : ''}`} type="button" onClick={onFix}>
        Fix it
      </button>
      <p className={`message-panel${message ? ' visible bounce-in' : ''}`}>
        {message || 'Ron is ready to help.'}
      </p>
    </SectionCard>
  );
}
