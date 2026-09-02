import { SectionCard } from './SectionCard';

export function SuspiciousCard({ content, revealed, onReveal, onFinish }) {
  return (
    <SectionCard title="🔒 Definitely Don't Click This" label="06" suspicious>
      {!revealed ? (
        <>
          <p className="section-copy">{content.warning}</p>
          <button className="secondary-button suspicious-button" type="button" onClick={onReveal}>
            Click at your own risk
          </button>
        </>
      ) : (
        <div className="reveal-panel">
          <p className="message-panel visible">{content.reveal}</p>
          <p className="section-copy">{content.followUp}</p>
          <p className="letter-line fade-in">{content.letter}</p>
          <button className="primary-button" type="button" onClick={onFinish}>
            {content.buttonLabel}
          </button>
        </div>
      )}
    </SectionCard>
  );
}
