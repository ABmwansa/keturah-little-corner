export function MessageModal({ item, onClose }) {
  if (!item) {
    return null;
  }

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="open-when-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="icon-button" type="button" aria-label="Close message" onClick={onClose}>
          ×
        </button>
        <p className="section-label">Open When...</p>
        <h3 id="open-when-title">{item.title}</h3>
        <p>{item.message}</p>
      </div>
    </div>
  );
}
