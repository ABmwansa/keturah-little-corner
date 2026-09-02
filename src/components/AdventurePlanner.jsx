import { SectionCard } from './SectionCard';

function ChoiceRow({ label, options, value, onChoose }) {
  return <div className="choice-group"><p>{label}</p><div className="choice-row">{options.map((option) => <button key={option} type="button" className={`choice-chip${value === option ? ' selected' : ''}`} onClick={() => onChoose(option)}>{option}</button>)}</div></div>;
}

export function AdventurePlanner({ options, prompts, selections, description, confirmed, onChoose, onConfirm }) {
  return (
    <SectionCard title="Our Next Date" label="07">
      <p className="section-copy">Pick our next date, Ket.</p>
      <ChoiceRow label={prompts.transport} options={options.transport} value={selections.transport} onChoose={(option) => onChoose('transport', option)} />
      <ChoiceRow label={prompts.vibe} options={options.vibe} value={selections.vibe} onChoose={(option) => onChoose('vibe', option)} />
      <ChoiceRow label={prompts.food} options={options.food} value={selections.food} onChoose={(option) => onChoose('food', option)} />
      <ChoiceRow label={prompts.after} options={options.after} value={selections.after} onChoose={(option) => onChoose('after', option)} />
      <div className={`message-panel tall${description ? ' visible' : ''}`}>{description || 'Pick one from each line.'}</div>
      <div className="confirm-row"><span>Are we doing this?</span><div className="button-row"><button className="secondary-button" type="button" onClick={onConfirm}>Yes, Ron</button><button className="primary-button" type="button" onClick={onConfirm}>Yes, Ket</button></div></div>
      {confirmed ? <p className="tiny-note">Good. It is a date then.</p> : null}
    </SectionCard>
  );
}
