import { useEffect, useRef, useState } from 'react';
import { AdventurePlanner } from './components/AdventurePlanner';
import { EmergencySmileCard } from './components/EmergencySmileCard';
import { FinalScreen } from './components/FinalScreen';
import { FloatingHearts } from './components/FloatingHearts';
import { HeartCatchGame } from './components/HeartCatchGame';
import { LandingScreen } from './components/LandingScreen';
import { LoveReasonsCard } from './components/LoveReasonsCard';
import { LoveMeterCard } from './components/LoveMeterCard';
import { MessageModal } from './components/MessageModal';
import { OpenWhenCard } from './components/OpenWhenCard';
import { RightNowCard } from './components/RightNowCard';
import { SuspiciousCard } from './components/SuspiciousCard';
import { ThisOrThatCard } from './components/ThisOrThatCard';
import { siteContent } from './data/siteContent';

function shuffle(items) {
  const copy = [...items];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }

  return copy;
}

function buildAdventureDescription(selections) {
  if (Object.values(selections).some((value) => !value)) {
    return '';
  }

  return `Ron and Ket go by ${selections.transport.toLowerCase()}. We do ${selections.vibe.toLowerCase()}, eat ${selections.food.toLowerCase()}, then ${selections.after.toLowerCase()}.`;
}

function drawReason(deck, messages) {
  const availableDeck = deck.length ? deck : shuffle(messages);
  const [nextReason, ...remaining] = availableDeck;
  return { nextReason, remaining };
}

export default function App() {
  const toastTimeoutRef = useRef(0);
  const [screen, setScreen] = useState('landing');
  const [currentReason, setCurrentReason] = useState('');
  const [reasonDeck, setReasonDeck] = useState([]);
  const [smileMessage, setSmileMessage] = useState('');
  const [smileBurst, setSmileBurst] = useState(false);
  const [activeOpenWhen, setActiveOpenWhen] = useState(null);
  const [selections, setSelections] = useState({
    transport: '',
    vibe: '',
    food: '',
    after: '',
  });
  const [adventureDescription, setAdventureDescription] = useState('');
  const [adventureConfirmed, setAdventureConfirmed] = useState(false);
  const [suspiciousOpen, setSuspiciousOpen] = useState(false);
  const [rightNowChoice, setRightNowChoice] = useState('');
  const [toast, setToast] = useState('');

  useEffect(() => {
    if (!activeOpenWhen) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setActiveOpenWhen(null);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [activeOpenWhen]);

  useEffect(() => {
    setAdventureDescription(buildAdventureDescription(selections));
  }, [selections]);

  function showToast(message) {
    setToast(message);
    window.clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = window.setTimeout(() => setToast(''), 2400);
  }

  function handleReasonPick() {
    const { nextReason, remaining } = drawReason(reasonDeck, siteContent.loveReasons);
    setCurrentReason(nextReason);
    setReasonDeck(remaining);
  }

  function handleSmileFix() {
    const nextMessage =
      siteContent.emergencyMessages[
        Math.floor(Math.random() * siteContent.emergencyMessages.length)
      ];
    setSmileMessage(nextMessage);
    setSmileBurst(true);
    window.setTimeout(() => setSmileBurst(false), 420);
  }

  function handleChoose(category, option) {
    setSelections((current) => ({ ...current, [category]: option }));
    setAdventureConfirmed(false);
  }

  function handleAdventureConfirm() {
    setAdventureConfirmed(true);
    showToast('Date saved. Ron and Ket have plans.');
  }

  function resetExperience() {
    setScreen('landing');
    setCurrentReason('');
    setReasonDeck([]);
    setSmileMessage('');
    setSmileBurst(false);
    setActiveOpenWhen(null);
    setSelections({ transport: '', vibe: '', food: '', after: '' });
    setAdventureDescription('');
    setAdventureConfirmed(false);
    setSuspiciousOpen(false);
    setRightNowChoice('');
    setToast('');
  }

  return (
    <div className={`app-shell stage-${screen}`}>
      <FloatingHearts />
      <div className="background-blur background-blur-left" aria-hidden="true" />
      <div className="background-blur background-blur-right" aria-hidden="true" />

      <main className="page-frame">
        <header className="page-header">
          <p className="eyebrow">{siteContent.projectTitle}</p>
        </header>

        {screen === 'landing' ? (
          <LandingScreen content={siteContent.landing} onEnter={() => setScreen('main')} />
        ) : null}

        {screen === 'main' ? (
          <section className="main-screen">
            <div className="hero-card card">
              <p className="eyebrow">For Ket, from Ron</p>
              <h1>{siteContent.headings.main}</h1>
              <p className="hero-copy">
                A small place for laughs, love, and us.
              </p>
              <p className="tiny-note">{siteContent.jokes[0]}</p>
            </div>

            <div className="section-grid">
              <LoveReasonsCard reason={currentReason} onPick={handleReasonPick} />
              <EmergencySmileCard
                message={smileMessage}
                onFix={handleSmileFix}
                animate={smileBurst}
                whatsAppNumber={siteContent.whatsAppNumber}
              />
              <RightNowCard
                options={siteContent.rightNowOptions}
                activeOption={rightNowChoice}
                onChoose={setRightNowChoice}
              />
              <HeartCatchGame />
              <ThisOrThatCard questions={siteContent.thisOrThat} />
              <LoveMeterCard content={siteContent.loveMeter} />
              <OpenWhenCard
                items={siteContent.openWhenMessages}
                onOpen={(item) => setActiveOpenWhen(item)}
              />
              <AdventurePlanner
                options={siteContent.adventureOptions}
                prompts={siteContent.adventureIntros}
                selections={selections}
                description={adventureDescription}
                confirmed={adventureConfirmed}
                onChoose={handleChoose}
                onConfirm={handleAdventureConfirm}
              />
              <SuspiciousCard
                content={siteContent.suspicious}
                revealed={suspiciousOpen}
                onReveal={() => setSuspiciousOpen(true)}
                onFinish={() => setScreen('final')}
              />
            </div>
          </section>
        ) : null}

        {screen === 'final' ? (
          <FinalScreen
            heading={siteContent.headings.final}
            lines={siteContent.finalMessage}
            signature={siteContent.signature}
            onRestart={resetExperience}
          />
        ) : null}
      </main>

      <MessageModal item={activeOpenWhen} onClose={() => setActiveOpenWhen(null)} />

      {toast ? <div className="toast">{toast}</div> : null}
    </div>
  );
}
