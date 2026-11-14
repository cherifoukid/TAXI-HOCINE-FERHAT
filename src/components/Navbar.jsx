import React, { useState, useEffect } from "react";
import { Phone, MessageCircle, ShieldCheck, MapPin, Menu, X, Plane, HeartPulse } from "lucide-react";
import { DRIVER_INFO } from "../data/taxiData";

export default function Navbar({ onSelectMode }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (sectionId, mode) => {
    setMobileMenuOpen(false);
    if (mode && onSelectMode) {
      onSelectMode(mode);
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="container navbar-inner">
        <a href="#top" className="brand-logo" onClick={() => setMobileMenuOpen(false)}>
          <div className="brand-badge">
            <span className="taxi-roof-lamp">TAXI PARISIEN</span>
            <span className="status-dot" title="Disponible 24/7 sur réservation" />
          </div>
          <div className="brand-text">
            <span className="brand-name">{DRIVER_INFO.name}</span>
            <span className="brand-sub">
              <MapPin size={12} /> Orly (94310) & Val-de-Marne • CPAM & Aéroports
            </span>
          </div>
        </a>

        <nav className="nav-links">
          <button type="button" className="nav-link" onClick={() => handleNavClick("booking", "standard")}>
            <Plane size={15} /> Aéroports & Gares
          </button>
          <button type="button" className="nav-link nav-link-cpam" onClick={() => handleNavClick("cpam", "cpam")}>
            <HeartPulse size={15} /> Conventionné CPAM
          </button>
          <button type="button" className="nav-link" onClick={() => handleNavClick("vehicule")}>
            Toyota RAV4 Hybride
          </button>
          <button type="button" className="nav-link" onClick={() => handleNavClick("tarifs")}>
            Forfaits & Trajets
          </button>
          <button type="button" className="nav-link" onClick={() => handleNavClick("faq")}>
            FAQ
          </button>
        </nav>

        <div className="nav-actions">
          <div className="cpam-pill-desktop">
            <ShieldCheck size={15} />
            <span>Agréé CPAM • +10 ans d'exp.</span>
          </div>
          <a
            href={`https://wa.me/${DRIVER_INFO.whatsappNumber}?text=${encodeURIComponent(
              "Bonjour Hocine, je souhaiterais réserver votre Taxi Parisien (secteur Orly / 94)."
            )}`}
            target="_blank"
            rel="noreferrer"
            className="btn btn-whatsapp-sm"
            title="Réserver par WhatsApp"
          >
            <MessageCircle size={17} />
            <span>WhatsApp</span>
          </a>
          <a href={DRIVER_INFO.phoneHref} className="btn btn-primary-sm">
            <Phone size={16} />
            <span>{DRIVER_INFO.phoneDisplay}</span>
          </a>
        </div>

        <button
          type="button"
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <div className="mobile-drawer-links">
            <button type="button" onClick={() => handleNavClick("booking", "standard")}>
              <Plane size={18} /> Réserver Aéroport / Gare / Longue Distance
            </button>
            <button type="button" onClick={() => handleNavClick("cpam", "cpam")} className="drawer-cpam">
              <HeartPulse size={18} /> Taxi Conventionné CPAM (Tiers Payant)
            </button>
            <button type="button" onClick={() => handleNavClick("vehicule")}>
              Véhicule Toyota RAV4 Hybride (Grand Coffre)
            </button>
            <button type="button" onClick={() => handleNavClick("tarifs")}>
              Forfaits Orly, Paris & CDG
            </button>
            <button type="button" onClick={() => handleNavClick("secteur")}>
              Zone Val-de-Marne (94) & Orly (94310)
            </button>
            <button type="button" onClick={() => handleNavClick("faq")}>
              Questions Fréquentes
            </button>
          </div>
          <div className="mobile-drawer-cta">
            <a href={DRIVER_INFO.phoneHref} className="btn btn-primary btn-full">
              <Phone size={18} /> Appeler {DRIVER_INFO.name} ({DRIVER_INFO.phoneDisplay})
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
