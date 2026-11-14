import React from "react";
import { HeartPulse, FileText, CreditCard, Building2, CheckCircle, Phone, ArrowUpRight } from "lucide-react";
import { DRIVER_INFO, HOSPITALS_SERVED } from "../data/taxiData";

export default function CpamSection({ onBookCpam }) {
  const handleSelectHospital = (hospitalName) => {
    onBookCpam({
      isCpam: true,
      pickupId: "orly-ville",
      dropoffId: hospitalName.toLowerCase().includes("gustave")
        ? "igr"
        : hospitalName.toLowerCase().includes("mondor")
        ? "mondor"
        : hospitalName.toLowerCase().includes("bicêtre")
        ? "bicetre"
        : "pitie"
    });
    const el = document.getElementById("booking");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="section cpam-section" id="cpam">
      <div className="container">
        <div className="cpam-hero-banner">
          <div className="cpam-banner-content">
            <div className="cpam-official-badge">
              <HeartPulse size={18} />
              <span>TAXI CONVENTIONNÉ AGRÉÉ CPAM — TIERS PAYANT SÉCURITÉ SOCIALE</span>
            </div>
            <h2>
              Vos déplacements médicaux en toute sérénité,{" "}
              <span className="text-cpam-highlight">sans avance de frais</span>
            </h2>
            <p>
              Artisan Taxi conventionné par la Caisse Primaire d'Assurance Maladie, <strong>{DRIVER_INFO.name}</strong>{" "}
              assure votre Transport Assis Professionnel (TAP) depuis <strong>Orly et le Val-de-Marne (94)</strong> vers
              l'ensemble des hôpitaux AP-HP, centres de cancérologie (Gustave Roussy, Curie) et cliniques d'Île-de-France.
            </p>
            <div className="cpam-cta-group">
              <button
                type="button"
                className="btn btn-cpam-primary"
                onClick={() => handleSelectHospital("Gustave Roussy")}
              >
                <HeartPulse size={18} /> Réserver un trajet Conventionné CPAM
              </button>
              <a href={DRIVER_INFO.phoneHref} className="btn btn-outline-light">
                <Phone size={17} /> Poser une question : {DRIVER_INFO.phoneDisplay}
              </a>
            </div>
          </div>

          {/* 3-Step Guide */}
          <div className="cpam-steps-grid">
            <div className="cpam-step-card">
              <span className="step-num">01</span>
              <FileText size={24} className="icon-cpam" />
              <h3>Prescription Médicale</h3>
              <p>
                Demandez à votre médecin ou à l'hôpital un <strong>Bon de Transport (Cerfa)</strong> cochant la case
                "Transport Assis Professionnel (Taxi / VSL)" daté avant votre déplacement.
              </p>
            </div>

            <div className="cpam-step-card">
              <span className="step-num">02</span>
              <CreditCard size={24} className="icon-cpam" />
              <h3>Carte Vitale & Attestation</h3>
              <p>
                Munissez-vous de votre <strong>Carte Vitale à jour</strong> (et attestation de droits ou mutuelle). Avec
                une ALD (100%), maternité ou AT, vous n'avez <strong>aucun reste à charge (0 €)</strong>.
              </p>
            </div>

            <div className="cpam-step-card">
              <span className="step-num">03</span>
              <CheckCircle size={24} className="icon-cpam" />
              <h3>Accompagnement Complet</h3>
              <p>
                Hocine Ferhat vous prend en charge à domicile, range votre fauteuil pliable dans le coffre du Break et
                vous accompagne jusqu'à votre service à l'aller comme au retour.
              </p>
            </div>
          </div>
        </div>

        {/* Hospitals Grid */}
        <div className="hospitals-block">
          <div className="hospitals-header">
            <div>
              <h3>
                <Building2 size={20} className="icon-cpam" /> Principaux Hôpitaux & Centres de Soins desservis depuis Orly
              </h3>
              <p>Cliquez sur un établissement pour pré-remplir votre réservation CPAM :</p>
            </div>
          </div>

          <div className="hospitals-grid">
            {HOSPITALS_SERVED.map((hosp, idx) => (
              <div
                key={idx}
                className="hospital-card"
                onClick={() => handleSelectHospital(hosp.name)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && handleSelectHospital(hosp.name)}
              >
                <div className="hospital-top">
                  <span className="hospital-city">{hosp.city}</span>
                  <ArrowUpRight size={16} className="hospital-arrow" />
                </div>
                <h4>{hosp.name}</h4>
                <p>{hosp.specialty}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
