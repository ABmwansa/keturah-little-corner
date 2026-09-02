import { SectionCard } from './SectionCard';

export function RightNowCard({ options, activeOption, onChoose }) {
  const activeMessage = options.find((option) => option.id === activeOption);
  return (
    <SectionCard title="Right now, Ket" label="09">
      <p className="section-copy">Pick one. Ron is here.</p>
      <div className="mood-options" role="group" aria-label="Choose a little something">
        {options.map((option) => (
          <button className={`mood-button${activeOption === option.id ? ' selected' : ''}`} key={option.id} type="button" onClick={() => onChoose(option.id)}>
            <span aria-hidden="true">{option.icon}</span>
            {option.label}
          </button>
        ))}
      </div>
      <p className={`message-panel${activeMessage ? ' visible bounce-in' : ''}`}>
        {activeMessage?.message || 'Pick one, Hermione.'}
      </p>
    </SectionCard>
  );
}
