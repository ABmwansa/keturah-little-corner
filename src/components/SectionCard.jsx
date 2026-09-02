export function SectionCard({ title, label, children, suspicious = false }) {
  return (
    <section className={`card section-card${suspicious ? ' suspicious' : ''}`}>
      <div className="section-heading">
        <p className="section-label">{label}</p>
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  );
}
