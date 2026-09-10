import { useState } from 'react';
import consultationImage from './assets/clinic-consultation.jpg';
import examinationImage from './assets/clinic-examination.jpg';
import listeningImage from './assets/clinic-listening.jpg';
import receptionImage from './assets/umodzi-reception.jpg';
import receptionDeskImage from './assets/umodzi-reception-desk.jpeg';
import treatmentRoomImage from './assets/umodzi-treatment-room.jpeg';
import consultationRoomImage from './assets/umodzi-consultation-room.jpeg';
import exteriorImage from './assets/umodzi-exterior.jpg';
import logo from './assets/umodzi-logo.jpeg';
import { clinicContent as clinic } from './data/clinicContent';

function whatsappUrl(message) {
  return `https://wa.me/${clinic.whatsAppNumber}?text=${encodeURIComponent(message)}`;
}

function PhoneIcon() {
  return <span aria-hidden="true">+</span>;
}

export default function App() {
  const [form, setForm] = useState({ name: '', location: '', message: '' });

  function submitEnquiry(event) {
    event.preventDefault();
    const details = [
      'Hello Umodzi Medical Center, I would like to make an enquiry.',
      form.name ? `Name: ${form.name}` : '',
      form.location ? `Location: ${form.location}` : '',
      form.message ? `Message: ${form.message}` : '',
    ].filter(Boolean).join('\n');
    window.open(whatsappUrl(details), '_blank', 'noopener,noreferrer');
  }

  return (
    <div className="clinic-site">
      <div className="topbar">
        <div className="shell topbar-inner">
          <p>Open 24 hours, 7 days a week</p>
          <div className="topbar-links">
            <a href={`tel:${clinic.phonePrimary.replaceAll(' ', '')}`}>{clinic.phonePrimary}</a>
            <a href={`tel:${clinic.phoneSecondary.replaceAll(' ', '')}`}>{clinic.phoneSecondary}</a>
          </div>
        </div>
      </div>

      <header className="site-header shell">
        <a className="brand" href="#home" aria-label={clinic.name}>
          <img src={logo} alt="Umodzi Medical Center logo" />
          <span><strong>UMODZI</strong><small>Medical Center</small></span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#services">Services</a>
          <a href="#about">About us</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="header-cta" href={whatsappUrl('Hello Umodzi Medical Center, I would like to make an enquiry.')}>Book an enquiry</a>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-pattern" aria-hidden="true" />
          <div className="shell hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">Your health. Our priority.</p>
              <h1>Care that feels <em>human.</em></h1>
              <p className="hero-text">Safe, reliable and affordable healthcare for you and your family, right here in Lusaka.</p>
              <div className="hero-actions">
                <a className="button button-primary" href={whatsappUrl('Hello Umodzi Medical Center, I would like to make an enquiry.')}>Chat on WhatsApp</a>
                <a className="button button-light" href={`tel:${clinic.phonePrimary.replaceAll(' ', '')}`}>Call the clinic</a>
              </div>
              <div className="hero-points">
                <span>24/7 care</span><span>Walk-ins welcome</span><span>Family focused</span>
              </div>
            </div>
            <aside className="hero-visual">
              <img src={consultationImage} alt="Doctor listening carefully during a patient consultation" fetchPriority="high" />
              <div className="hero-image-note"><span>24/7</span><p>Here when you need us</p></div>
            </aside>
          </div>
        </section>

        <section className="quick-strip">
          <div className="shell quick-grid">
            <div><span>24/7</span><p>Care that fits your life</p></div>
            <div><span>4</span><p>Core care services</p></div>
            <div><span>01</span><p>Trusted clinic in Garden House</p></div>
          </div>
        </section>

        <section className="section shell" id="services">
          <div className="section-intro">
            <p className="eyebrow">What we offer</p>
            <h2>Everyday care, close to home.</h2>
            <p>Our team provides straightforward, thoughtful care for individuals and families.</p>
          </div>
          <div className="services-grid">
            {clinic.services.map((service) => <article className="service-card" key={service.title}><span>{service.icon}</span><h3>{service.title}</h3><p>{service.text}</p><a href="#contact">Ask about this service <b>→</b></a></article>)}
          </div>
        </section>

        <section className="clinic-gallery-section">
          <div className="shell">
            <div className="gallery-heading"><div><p className="eyebrow">Our clinic</p><h2>A clean, welcoming space for your care.</h2></div><p>From reception to consultation, Umodzi is designed to help you feel comfortable from the moment you arrive.</p></div>
            <div className="clinic-gallery">
              <figure className="gallery-feature"><img src={receptionImage} alt="Umodzi Medical Center reception and waiting area" loading="lazy" decoding="async" /><figcaption><span>01</span> Reception and waiting area</figcaption></figure>
              <figure><img src={receptionDeskImage} alt="Umodzi Medical Center reception desk" loading="lazy" decoding="async" /><figcaption><span>02</span> Reception desk</figcaption></figure>
              <figure><img src={treatmentRoomImage} alt="Umodzi Medical Center treatment room" loading="lazy" decoding="async" /><figcaption><span>03</span> Treatment room</figcaption></figure>
              <figure><img src={consultationRoomImage} alt="Umodzi Medical Center consultation room" loading="lazy" decoding="async" /><figcaption><span>04</span> Consultation room</figcaption></figure>
            </div>
          </div>
        </section>

        <section className="care-banner" id="about">
          <div className="shell care-grid">
            <div className="care-statement"><p className="eyebrow">Why Umodzi</p><h2>Good care starts with listening.</h2><p>We are committed to care that is kind, professional and accessible to the community we serve.</p><a className="button button-primary" href={whatsappUrl('Hello Umodzi Medical Center, I would like to know more about your services.')}>Talk to our team</a><div className="reasons-list">{clinic.reasons.map((reason, index) => <div key={reason}><span>0{index + 1}</span><p>{reason}</p></div>)}</div></div>
            <div className="care-visuals"><img className="care-image-main" src={examinationImage} alt="Healthcare professional examining a patient" loading="lazy" decoding="async" /><img className="care-image-small" src={listeningImage} alt="Doctor listening to a patient during a consultation" loading="lazy" decoding="async" /><div className="care-image-note"><span>Care</span><p>Professional care for every family.</p></div></div>
          </div>
        </section>

        <section className="section shell purpose-grid">
          <article><p className="eyebrow">Our mission</p><h2>Healthcare that brings people together.</h2><p>{clinic.mission}</p></article>
          <article><p className="eyebrow">Our vision</p><h2>Healthier lives. Stronger communities.</h2><p>{clinic.vision}</p></article>
        </section>

        <section className="visit-section">
          <div className="shell visit-grid">
            <div className="visit-image"><img src={exteriorImage} alt="Umodzi Medical Center exterior and clinic sign" loading="lazy" decoding="async" /></div>
            <div className="visit-copy"><p className="eyebrow">Visit Umodzi</p><h2>Easy to find. Ready to care.</h2><p>Visit us at our Garden House location in Lusaka for professional, patient-focused healthcare.</p><div className="visit-address"><span>Location</span><strong>{clinic.address}</strong></div><a className="button button-primary" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(clinic.address)}`} target="_blank" rel="noreferrer">Get directions</a></div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="shell contact-grid">
            <div className="contact-copy"><p className="eyebrow">Visit or contact us</p><h2>We are here for you and your family.</h2><p>For quick questions and appointment enquiries, send us a WhatsApp message or call us directly.</p><div className="contact-details"><a href={`tel:${clinic.phonePrimary.replaceAll(' ', '')}`}><PhoneIcon /> {clinic.phonePrimary}</a><a href={`tel:${clinic.phoneSecondary.replaceAll(' ', '')}`}><PhoneIcon /> {clinic.phoneSecondary}</a><p><b>Location</b>{clinic.address}</p>{clinic.email ? <a href={`mailto:${clinic.email}`}><b>Email</b>{clinic.email}</a> : null}</div></div>
            <form className="enquiry-form" onSubmit={submitEnquiry}><p className="form-title">Send a WhatsApp enquiry</p><label>Your name<input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Your name" /></label><label>Your location<input value={form.location} onChange={(event) => setForm({ ...form, location: event.target.value })} placeholder="Town or area" /></label><label>How can we help?<textarea value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} placeholder="Type a short message" rows="4" /></label><button className="button button-primary" type="submit">Open WhatsApp</button><small>Please do not send medical emergencies through this form. Call the clinic instead.</small></form>
          </div>
        </section>
      </main>

      <footer><div className="shell footer-inner"><div><strong>UMODZI</strong><p>{clinic.tagline}</p></div><p>{clinic.address}</p><p>© {new Date().getFullYear()} Umodzi Medical Center</p></div></footer>
      <a className="whatsapp-float" href={whatsappUrl('Hello Umodzi Medical Center, I would like to make an enquiry.')} aria-label="Chat with Umodzi Medical Center on WhatsApp"><span>◔</span><b>WhatsApp us</b></a>
    </div>
  );
}
