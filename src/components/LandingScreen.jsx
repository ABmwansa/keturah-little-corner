export function LandingScreen({ content, onEnter }) {
  return (
    <section className="landing-screen card card-large">
      <p className="eyebrow">{content.eyebrow}</p>
      <h1>{content.intro}</h1>
      <p className="landing-subcopy">{content.subcopy}</p>
      <button className="primary-button pulse-button" type="button" onClick={onEnter}>
        {content.buttonLabel}
      </button>
    </section>
  );
}
