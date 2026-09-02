import { useEffect, useRef, useState } from 'react';
import stickers from '../assets/love-stickers.png';
import { SectionCard } from './SectionCard';

export function EmergencySmileCard({ message, onFix, animate, whatsAppNumber }) {
  const inputRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState('');

  useEffect(() => {
    if (!photo) {
      setPreview('');
      return undefined;
    }

    const nextPreview = URL.createObjectURL(photo);
    setPreview(nextPreview);
    return () => URL.revokeObjectURL(nextPreview);
  }, [photo]);

  function pickPhoto(event) {
    setPhoto(event.target.files?.[0] || null);
  }

  async function shareSmile() {
    if (!photo) {
      inputRef.current?.click();
      return;
    }

    const shareData = {
      files: [photo],
      title: 'A smile for Ron',
      text: 'A smile from Ket for Ron.',
    };

    if (navigator.canShare?.(shareData)) {
      try {
        await navigator.share(shareData);
        return;
      } catch (error) {
        if (error.name === 'AbortError') return;
      }
    }

    window.open(`https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(shareData.text)}`, '_blank', 'noopener,noreferrer');
  }

  return (
    <SectionCard title="Make Ket Smile" label="02">
      <div className="status-panel smile-status">
        <div>
          <h3>Smile check</h3>
          <p>Is Ket smiling?</p>
        </div>
        <img className="sticker-sheet" src={stickers} alt="Cute hearts, popcorn, and love letter stickers" />
      </div>
      <button className={`danger-button${animate ? ' activated' : ''}`} type="button" onClick={onFix}>
        Fix it
      </button>
      <p className={`message-panel${message ? ' visible bounce-in' : ''}`}>
        {message || 'Ron is ready to help.'}
      </p>
      <div className="smile-photo-box">
        <div>
          <p className="photo-title">Send Ron your smile</p>
          <p className="tiny-note">Take a photo or choose one from your phone.</p>
        </div>
        <input ref={inputRef} className="sr-only" type="file" accept="image/*" capture="user" onChange={pickPhoto} />
        {preview ? <img className="smile-preview" src={preview} alt="Ket's smile preview" /> : null}
        <div className="button-row">
          <button className="secondary-button" type="button" onClick={() => inputRef.current?.click()}>
            {photo ? 'Choose another photo' : 'Take a photo'}
          </button>
          <button className="primary-button" type="button" onClick={shareSmile}>
            {photo ? 'Share with Ron' : 'Choose photo first'}
          </button>
        </div>
        <p className="tiny-note">Sharing opens your phone share menu. Pick WhatsApp, then send it to Ron.</p>
      </div>
    </SectionCard>
  );
}
