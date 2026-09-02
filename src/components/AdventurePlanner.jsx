import { SectionCard } from './SectionCard';

function ChoiceRow({ label, options, value, onChoose }) {
  return (
    <div className="choice-group">
      <p>{label}</p>
      <div className="choice-row">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            className={`choice-chip${value === option ? ' selected' : ''}`}
            onClick={() => onChoose(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export function AdventurePlanner({
  options,
  prompts,
  selections,
  description,
  confirmed,
  onChoose,
  onConfirm,
}) {
  return (
    <SectionCard title="✨ Our Future Adventure" label="05">
      <p className="section-copy">
        Choose the ingredients and I&apos;ll generate a suspiciously good plan for us.
      </p>
      <ChoiceRow
        label={prompts.transport}
        options={options.transport}
        value={selections.transport}
        onChoose={(option) => onChoose('transport', option)}
      />
      <ChoiceRow
        label={prompts.vibe}
        options={options.vibe}
        value={selections.vibe}
        onChoose={(option) => onChoose('vibe', option)}
      />
      <ChoiceRow
        label={prompts.food}
        options={options.food}
        value={selections.food}
        onChoose={(option) => onChoose('food', option)}
      />
      <ChoiceRow
        label={prompts.after}
        options={options.after}
        value={selections.after}
        onChoose={(option) => onChoose('after', option)}
      />
      <div className={`message-panel tall${description ? ' visible' : ''}`}>
        {description || 'Pick one option in each category to unlock the date generator.'}
      </div>
      <div className="confirm-row">
        <span>Should we actually do this one day? 👀</span>
        <div className="button-row">
          <button className="secondary-button" type="button" onClick={onConfirm}>
            Obviously
          </button>
          <button className="primary-button" type="button" onClick={onConfirm}>
            YES
          </button>
        </div>
      </div>
      {confirmed ? <p className="tiny-note">Excellent. I&apos;ll act surprised when this becomes a real plan.</p> : null}
    </SectionCard>
  );
}
