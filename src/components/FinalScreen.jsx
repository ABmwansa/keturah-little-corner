export function FinalScreen({ heading, lines, signature, onRestart }) {
  return (
    <section className="final-screen card card-large">
      <p className="eyebrow">{heading}</p>
      <h2>For us.</h2>
      <div className="final-copy">{lines.map((line) => <p key={line}>{line}</p>)}</div>
      <p className="signature">From {signature}</p>
      <button className="secondary-button" type="button" onClick={onRestart}>Start again</button>
    </section>
  );
}
