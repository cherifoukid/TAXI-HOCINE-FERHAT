import React, { useState } from "react";
import { Briefcase, Accessibility, Shield, Leaf, CreditCard, Check, Sparkles, Car } from "lucide-react";
import { DRIVER_INFO } from "../data/taxiData";

export default function BreakShowcase() {
  const [selectedConfig, setSelectedConfig] = useState("airport"); // 'airport' | 'cpam' | 'family'

  const configurations = {
    airport: {
      title: "Configuration Aéroports Orly & Roissy CDG",
      badge: "Grand Coffre Plat • Jusqu'à 5 Valises",
      items: [
        "Coffre grand volume du Toyota RAV4 Hybride accueillant 4 à 5 grandes valises + bagages cabine",
        "Ouverture large et plancher plat : chargement rapide et sans effort aux terminaux d'Orly 1-2-3-4",
        "4 passagers installés très confortablement avec un espace généreux aux jambes",
        "Accès prioritaire aux dépose-minute et voies réservées Taxi Parisien"
      ]
    },
    cpam: {
      title: "Configuration Transport Médical Conventionné CPAM",
      badge: "Hauteur d'Assise Idéale & Fauteuil Pliable",
      items: [
        "Hauteur d'assise naturelle du RAV4 : vous vous asseyez et sortez sans effort (ni trop bas, ni trop haut)",
        "Logement aisé d'un fauteuil roulant pliable ou d'un déambulateur dans le grand coffre",
        "Motorisation Hybride ultra-douce et silencieuse, sans à-coups, idéale après une hospitalisation ou séance de soins",
        "Plus de 10 ans d'expérience dans l'accompagnement bienveillant des patients CPAM"
      ]
    },
    family: {
      title: "Configuration Gares SNCF & Longues Distances",
      badge: "Silence Hybride + Sécurité Totale",
      items: [
        "Confort royal pour les trajets vers les gares parisiennes ou les longues distances sur demande",
        "Climatisation automatique bi-zone, habitacle non-fumeur spacieux et rigoureusement entretenu",
        "Paiement par Cartes Bancaires (Visa, Mastercard, Sans Contact) et Espèces à bord (chèques non acceptés)",
        "Édition immédiate de votre note officielle de Taxi Parisien pour vos notes de frais"
      ]
    }
  };

  const activeConfig = configurations[selectedConfig];

  return (
    <section className="section break-section" id="vehicule">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">
            <Car size={15} /> Votre Véhicule : {DRIVER_INFO.vehicleName}
          </span>
          <h2 className="section-title">
            Le confort et l'espace du <span className="text-gradient">Toyota RAV4 Hybride</span>
          </h2>
          <p className="section-desc">
            <strong>{DRIVER_INFO.name}</strong> (+ de 10 ans d'expérience) vous accueille à bord de son{" "}
            <strong>Toyota RAV4 Hybride</strong> : un véhicule spacieux au{" "}
            <strong>coffre grand volume</strong>, offrant une hauteur d'assise idéale pour les patients CPAM et une
            capacité parfaite pour vos bagages vers Orly, CDG et les gares d'Île-de-France.
          </p>
        </div>

        <div className="break-grid">
          {/* Visual Card */}
          <div className="break-visual-card">
            <div className="break-image-wrapper">
              <img
                src="./assets/taxi-break-orly.jpg"
                alt="Taxi Parisien Toyota RAV4 Hybride Hocine Ferhat devant l'Aéroport Paris-Orly"
                className="break-image"
              />
              <div className="break-image-overlay">
                <span className="overlay-chip">
                  <Sparkles size={14} /> Taxi Parisien Officiel • Orly (94310) & 94
                </span>
                <h3>{DRIVER_INFO.vehicleName} — Grand Confort</h3>
                <p>1 à 4 passagers • Grand coffre bagages & fauteuil pliable • Silencieux & Hybride</p>
              </div>
            </div>

            <div className="break-specs-strip">
              <div className="spec-item">
                <strong>+10 ans</strong>
                <span>D'expérience</span>
              </div>
              <div className="spec-item">
                <strong>4 à 5</strong>
                <span>Grandes valises</span>
              </div>
              <div className="spec-item">
                <strong>100%</strong>
                <span>Fauteuil pliable OK</span>
              </div>
              <div className="spec-item">
                <strong>CB & Espèces</strong>
                <span>Pas de chèques</span>
              </div>
            </div>
          </div>

          {/* Interactive Trunk & Comfort Configurator */}
          <div className="break-details-card">
            <div className="config-Label">Découvrez les atouts du Toyota RAV4 Hybride selon votre trajet :</div>
            <div className="config-tabs">
              <button
                type="button"
                className={`config-tab ${selectedConfig === "airport" ? "active" : ""}`}
                onClick={() => setSelectedConfig("airport")}
              >
                <Briefcase size={16} /> Aéroports & Bagages
              </button>
              <button
                type="button"
                className={`config-tab ${selectedConfig === "cpam" ? "active" : ""}`}
                onClick={() => setSelectedConfig("cpam")}
              >
                <Accessibility size={16} /> Médical & Fauteuil
              </button>
              <button
                type="button"
                className={`config-tab ${selectedConfig === "family" ? "active" : ""}`}
                onClick={() => setSelectedConfig("family")}
              >
                <Shield size={16} /> Gares & Longue Dist.
              </button>
            </div>

            <div className="config-panel">
              <span className="config-badge">{activeConfig.badge}</span>
              <h3>{activeConfig.title}</h3>
              <ul className="config-list">
                {activeConfig.items.map((item, idx) => (
                  <li key={idx}>
                    <span className="check-icon">
                      <Check size={15} />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="onboard-perks">
              <div className="perk-box">
                <CreditCard size={18} className="icon-gold" />
                <div>
                  <strong>Cartes Bancaires & Espèces acceptées</strong>
                  <span>Sans Contact, Apple Pay, Tiers Payant CPAM (chèques non acceptés)</span>
                </div>
              </div>
              <div className="perk-box">
                <Leaf size={18} className="icon-cpam" />
                <div>
                  <strong>Motorisation Hybride Douce & Silencieuse</strong>
                  <span>Conduite souple sans secousses + Climatisation bi-zone</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
