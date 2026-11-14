import React, { useState } from "react";
import {
  Phone,
  MessageCircle,
  MapPin,
  ShieldCheck,
  Clock,
  Star,
  Plane,
  HeartPulse,
  Briefcase,
  ChevronDown,
  Award,
  CheckCircle2,
  Navigation,
  Mail,
  CreditCard
} from "lucide-react";
import Navbar from "./components/Navbar";
import BookingWidget from "./components/BookingWidget";
import BreakShowcase from "./components/BreakShowcase";
import CpamSection from "./components/CpamSection";
import PopularRoutes from "./components/PopularRoutes";
import LegalModals from "./components/LegalModals";
import { DRIVER_INFO, FAQ_ITEMS } from "./data/taxiData";

export default function App() {
  const [activeMode, setActiveMode] = useState("standard");
  const [prefilledRoute, setPrefilledRoute] = useState(null);
  const [openFaq, setOpenFaq] = useState(0);
  const [legalModal, setLegalModal] = useState(null); // 'mentions' | 'rgpd' | 'tarifs' | null

  const handleSelectRoute = (route) => {
    setPrefilledRoute({ ...route, _ts: Date.now() });
  };

  return (
    <div className="app-wrapper" id="top">
      <Navbar onSelectMode={(mode) => setActiveMode(mode)} />

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-bg-glow" />
        <div className="container">
          <div className="hero-top-grid">
            <div className="hero-copy">
              <div className="hero-badges">
                <span className="pill-badge pill-live">
                  <span className="live-dot" /> Taxi Parisien • Orly (94310) & Val-de-Marne
                </span>
                <span className="pill-badge pill-cpam">
                  <HeartPulse size={14} /> Conventionné CPAM • +10 ans d'expérience
                </span>
              </div>

              <h1 className="hero-title">
                Votre <span className="text-gradient">Taxi Parisien</span> à Orly & dans le 94 : Aéroports, Gares &{" "}
                <span className="text-cpam-inline">Conventionné CPAM</span>
              </h1>

              <p className="hero-subtitle">
                Fort de <strong>plus de 10 ans d'expérience</strong>, <strong>Hocine Ferhat</strong> vous accompagne
                dans tout le <strong>Val-de-Marne (94), le secteur d'Orly (94310)</strong>, vers les{" "}
                <strong>gares et aéroports d'Île-de-France</strong> ainsi que sur <strong>toutes distances</strong> (sur
                réservation) à bord de son <strong>Toyota RAV4 Hybride</strong> spacieux et grand confort.
              </p>

              <div className="hero-highlights">
                <div className="highlight-item">
                  <Plane size={18} className="icon-gold" />
                  <div>
                    <strong>Aéroports, Gares & Longues Distances</strong>
                    <span>Orly 1-2-3-4, Roissy CDG, Gares SNCF & Province sur résa</span>
                  </div>
                </div>
                <div className="highlight-item">
                  <HeartPulse size={18} className="icon-cpam" />
                  <div>
                    <strong>Taxi Conventionné CPAM</strong>
                    <span>0 € d'avance de frais (Tiers Payant sur Bon de transport)</span>
                  </div>
                </div>
                <div className="highlight-item">
                  <Briefcase size={18} className="icon-gold" />
                  <div>
                    <strong>Toyota RAV4 Hybride Spacieux</strong>
                    <span>Grand coffre (valises & fauteuil pliable) • Accès facile</span>
                  </div>
                </div>
              </div>

              <div className="hero-direct-bar">
                <a href={DRIVER_INFO.phoneHref} className="btn btn-primary btn-lg">
                  <Phone size={19} />
                  <span>Appeler : {DRIVER_INFO.phoneDisplay}</span>
                </a>
                <a
                  href={`https://wa.me/${DRIVER_INFO.whatsappNumber}?text=${encodeURIComponent(
                    "Bonjour Hocine, je souhaiterais réserver votre Taxi Parisien (Toyota RAV4 Hybride)."
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-whatsapp-lg"
                >
                  <MessageCircle size={19} />
                  <span>WhatsApp : {DRIVER_INFO.phoneDisplay}</span>
                </a>
              </div>
            </div>

            {/* Hero Visual / Driver Profile Card */}
            <div className="hero-showcase-card">
              <div className="hero-img-box">
                <img
                  src="/assets/taxi-break-orly.jpg"
                  alt="Taxi Parisien Toyota RAV4 Hybride Hocine Ferhat à l'Aéroport Paris-Orly"
                  className="hero-main-img"
                />
                <div className="hero-floating-tag tag-top">
                  <ShieldCheck size={16} className="icon-gold" />
                  <span>Taxi Parisien Officiel • + de 10 ans d'expérience</span>
                </div>
                <div className="hero-floating-tag tag-bottom">
                  <Star size={16} className="icon-gold" fill="currentColor" />
                  <span>Toyota RAV4 Hybride • CB & Espèces</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Booking Calculator directly inside Hero */}
          <BookingWidget
            activeMode={activeMode}
            setActiveMode={setActiveMode}
            prefilledRoute={prefilledRoute}
          />
        </div>
      </section>

      {/* TRUST METRICS STRIP */}
      <div className="trust-strip">
        <div className="container trust-strip-inner">
          <div className="trust-metric">
            <Award size={22} className="icon-gold" />
            <div>
              <strong>+ de 10 Ans d'Expérience</strong>
              <span>Artisan Taxi Parisien : Hocine Ferhat</span>
            </div>
          </div>
          <div className="trust-metric">
            <Clock size={22} className="icon-gold" />
            <div>
              <strong>Accès Voies de Bus & Taxis</strong>
              <span>Prioritaire vers Orly, CDG, Gares & Hôpitaux</span>
            </div>
          </div>
          <div className="trust-metric">
            <HeartPulse size={22} className="icon-cpam" />
            <div>
              <strong>Conventionné CPAM</strong>
              <span>0 € d'avance de frais (Tiers Payant)</span>
            </div>
          </div>
          <div className="trust-metric">
            <CreditCard size={22} className="icon-gold" />
            <div>
              <strong>Paiement CB & Espèces</strong>
              <span>Sans contact accepté (Chèques non acceptés)</span>
            </div>
          </div>
        </div>
      </div>

      {/* TOYOTA RAV4 HYBRIDE VEHICLE SHOWCASE */}
      <BreakShowcase />

      {/* CPAM DEDICATED SECTION */}
      <CpamSection onBookCpam={handleSelectRoute} />

      {/* POPULAR ROUTES & OFFICIAL FARES */}
      <PopularRoutes onSelectRoute={handleSelectRoute} />

      {/* LOCAL PERIMETER SECTION (ORLY, 94 & LONG DISTANCES) */}
      <section className="section perimeter-section" id="secteur">
        <div className="container">
          <div className="perimeter-box">
            <div className="perimeter-content">
              <span className="section-eyebrow">
                <Navigation size={15} /> Zone d'Intervention & Grandes Distances
              </span>
              <h2 className="section-title">
                Secteur <span className="text-gradient">Orly (94310), Val-de-Marne (94)</span> & Toute l'Île-de-France
              </h2>
              <p>
                Implanté dans le secteur d'<strong>Orly (94310) et le Val-de-Marne (94)</strong>, votre artisan{" "}
                <strong>Taxi Parisien Hocine Ferhat</strong> assure une prise en charge rapide vers l'ensemble des{" "}
                <strong>gares et aéroports d'Île-de-France</strong>, ainsi que vos trajets{" "}
                <strong>toutes distances (Province) sur demande et réservation</strong>.
              </p>

              <div className="cities-tags">
                {DRIVER_INFO.nearbyCities.map((city, idx) => (
                  <span key={idx} className="city-tag">
                    <MapPin size={13} className="icon-gold" /> {city}
                  </span>
                ))}
              </div>
            </div>

            <div className="perimeter-cta-card">
              <h3>Réservation immédiate ou à l'avance</h3>
              <p>
                Départ matinal vers Orly/CDG, correspondance en gare parisienne, rendez-vous médical CPAM ou trajet
                longue distance : contactez directement Hocine Ferhat.
              </p>
              <a href={DRIVER_INFO.phoneHref} className="btn btn-primary btn-full">
                <Phone size={18} /> Appeler le {DRIVER_INFO.phoneDisplay}
              </a>
              <a
                href={`https://wa.me/${DRIVER_INFO.whatsappNumber}?text=${encodeURIComponent(
                  "Bonjour Hocine, je souhaite réserver une course en Taxi."
                )}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-whatsapp-lg btn-full"
              >
                <MessageCircle size={18} /> WhatsApp : {DRIVER_INFO.phoneDisplay}
              </a>
              <a href={`mailto:${DRIVER_INFO.email}`} className="btn btn-outline btn-full">
                <Mail size={17} /> {DRIVER_INFO.email}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="section faq-section" id="faq">
        <div className="container faq-container">
          <div className="section-header">
            <span className="section-eyebrow">Questions Fréquentes</span>
            <h2 className="section-title">
              Tout savoir sur votre <span className="text-gradient">Taxi Parisien à Orly</span>
            </h2>
          </div>

          <div className="faq-list">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className={`faq-item ${isOpen ? "faq-open" : ""}`}>
                  <button
                    type="button"
                    className="faq-question"
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    aria-expanded={isOpen}
                  >
                    <span>{item.question}</span>
                    <ChevronDown size={19} className="faq-chevron" />
                  </button>
                  {isOpen && <div className="faq-answer">{item.answer}</div>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <div className="brand-logo">
              <div className="brand-badge">
                <span className="taxi-roof-lamp">TAXI PARISIEN</span>
              </div>
              <div className="brand-text">
                <span className="brand-name">{DRIVER_INFO.name}</span>
                <span className="brand-sub">Orly (94310), Val-de-Marne (94) & Île-de-France</span>
              </div>
            </div>
            <p className="footer-desc">
              Artisan Taxi Parisien officiel avec plus de 10 ans d'expérience. Véhicule Toyota RAV4 Hybride spacieux
              (grand coffre pour bagages et fauteuils roulants pliables). Agréé CPAM pour le transport médical assis,
              liaisons Aéroports (Orly, Roissy CDG), Gares SNCF et toutes distances sur réservation.
            </p>
          </div>

          <div className="footer-col">
            <h4>Services & Prestations</h4>
            <ul>
              <li>
                <a href="#booking" onClick={() => setActiveMode("standard")}>
                  Transfert Aéroport Paris-Orly (1-2-3-4)
                </a>
              </li>
              <li>
                <a href="#booking" onClick={() => setActiveMode("standard")}>
                  Liaison Aéroport Roissy CDG
                </a>
              </li>
              <li>
                <a href="#booking" onClick={() => setActiveMode("standard")}>
                  Gares d'Île-de-France & Grandes Distances
                </a>
              </li>
              <li>
                <a href="#cpam" onClick={() => setActiveMode("cpam")}>
                  Taxi Conventionné CPAM (Tiers Payant)
                </a>
              </li>
              <li>
                <a href="#vehicule">Véhicule Toyota RAV4 Hybride</a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact Direct — Hocine Ferhat</h4>
            <ul className="footer-contact-list">
              <li>
                <Phone size={15} className="icon-gold" />
                <a href={DRIVER_INFO.phoneHref}>{DRIVER_INFO.phoneDisplay}</a>
              </li>
              <li>
                <MessageCircle size={15} className="icon-gold" />
                <a
                  href={`https://wa.me/${DRIVER_INFO.whatsappNumber}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp : {DRIVER_INFO.phoneDisplay}
                </a>
              </li>
              <li>
                <Mail size={15} className="icon-gold" />
                <a href={`mailto:${DRIVER_INFO.email}`}>{DRIVER_INFO.email}</a>
              </li>
              <li>
                <MapPin size={15} className="icon-gold" />
                <span>{DRIVER_INFO.baseCity}</span>
              </li>
              <li>
                <CreditCard size={15} className="icon-gold" />
                <span>Paiement : CB & Espèces (Pas de chèques)</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="container footer-bottom">
          <p>
            © {new Date().getFullYear()} {DRIVER_INFO.brand} — Taxi Parisien Officiel (+10 ans d'expérience) • Tarifs
            Réglementés Préfecture de Police.
          </p>
          <div className="footer-legal-links">
            <button type="button" onClick={() => setLegalModal("mentions")}>
              Mentions Légales
            </button>
            <span>•</span>
            <button type="button" onClick={() => setLegalModal("rgpd")}>
              Confidentialité & RGPD (0 Cookie traceur)
            </button>
            <span>•</span>
            <button type="button" onClick={() => setLegalModal("tarifs")}>
              Barème Préfectoral & CGV
            </button>
          </div>
        </div>
      </footer>

      <LegalModals activeModal={legalModal} onClose={() => setLegalModal(null)} />

      {/* STICKY MOBILE ACTION BAR */}
      <div className="mobile-sticky-bar">
        <a href={DRIVER_INFO.phoneHref} className="sticky-btn sticky-call">
          <Phone size={18} />
          <span>{DRIVER_INFO.phoneDisplay}</span>
        </a>
        <a
          href={`https://wa.me/${DRIVER_INFO.whatsappNumber}?text=${encodeURIComponent(
            "Bonjour Hocine, je souhaite réserver votre Taxi Parisien."
          )}`}
          target="_blank"
          rel="noreferrer"
          className="sticky-btn sticky-wa"
        >
          <MessageCircle size={18} />
          <span>WhatsApp</span>
        </a>
        <a href="#booking" className="sticky-btn sticky-book">
          <span>Réserver</span>
        </a>
      </div>
    </div>
  );
}
