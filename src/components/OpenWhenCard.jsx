import { SectionCard } from './SectionCard';

export function OpenWhenCard({ items, onOpen }) {
  return (
    <SectionCard title="💌 Open When..." label="04">
      <p className="section-copy">
        Little notes for different kinds of days. Click whichever one fits the mood.
      </p>
      <div className="mini-grid">
        {items.map((item) => (
          <button
            key={item.title}
            type="button"
            className="mini-card"
            onClick={() => onOpen(item)}
          >
            {item.title}
          </button>
        ))}
      </div>
    </SectionCard>
  );
}
