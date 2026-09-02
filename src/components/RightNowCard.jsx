import { SectionCard } from './SectionCard';

export function RightNowCard({ options, activeOption, onChoose }) {
  const activeMessage = options.find((option) => option.id === activeOption);

  return (
    <SectionCard title="Right now, Keturah" label="07">
      <p className="section-copy">
        Pick what you need. This is a very official Amos-powered support desk.
      </p>
      <div className="mood-options" role="group" aria-label="Choose a little something">
        {options.map((option) => (
          <button
            className={`mood-button${activeOption === option.id ? ' selected' : ''}`}
            key={option.id}
            type="button"
            onClick={() => onChoose(option.id)}
          >
            <span aria-hidden="true">{option.icon}</span>
            {option.label}
          </button>
        ))}
      </div>
      <p className={`message-panel${activeMessage ? ' visible bounce-in' : ''}`}>
        {activeMessage?.message || 'Choose a button. Your tiny dose of affection is ready.'}
      </p>
    </SectionCard>
  );
}
