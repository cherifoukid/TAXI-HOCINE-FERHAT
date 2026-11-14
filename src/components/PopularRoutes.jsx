import React, { useState } from "react";
import { Plane, Train, HeartPulse, Clock, ArrowRight, ShieldCheck } from "lucide-react";
import { POPULAR_ROUTES } from "../data/taxiData";

export default function PopularRoutes({ onSelectRoute }) {
  const [filter, setFilter] = useState("all"); // 'all' | 'aeroport' | 'gare' | 'cpam'

  const filteredRoutes =
    filter === "all" ? POPULAR_ROUTES : POPULAR_ROUTES.filter((r) => r.category === filter);

  const handleChooseRoute = (route) => {
    onSelectRoute(route);
    const el = document.getElementById("booking");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="section routes-section" id="tarifs">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">
            <ShieldCheck size={15} /> Tarifs Officiels & Transparence
          </span>
          <h2 className="section-title">
            Forfaits <span className="text-gradient">Aéroport d'Orly</span>, Gares SNCF & Trajets CPAM
          </h2>
          <p className="section-desc">
            En tant qu'Artisan Taxi agréé par la Préfecture, les tarifs appliqués sont strictement réglementés : forfaits
            fixes officiels entre l'Aéroport Paris-Orly et Paris, et prise en charge Tiers Payant pour vos trajets
            conventionnés.
          </p>
        </div>

        <div className="routes-filters">
          <button
            type="button"
            className={`filter-btn ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            Tous les trajets
          </button>
          <button
            type="button"
            className={`filter-btn ${filter === "aeroport" ? "active" : ""}`}
            onClick={() => setFilter("aeroport")}
          >
            <Plane size={15} /> Aéroports Orly & CDG
          </button>
          <button
            type="button"
            className={`filter-btn ${filter === "gare" ? "active" : ""}`}
            onClick={() => setFilter("gare")}
          >
            <Train size={15} /> Gares & Rungis
          </button>
          <button
            type="button"
            className={`filter-btn filter-btn-cpam ${filter === "cpam" ? "active" : ""}`}
            onClick={() => setFilter("cpam")}
          >
            <HeartPulse size={15} /> Conventionné CPAM
          </button>
        </div>

        <div className="routes-grid">
          {filteredRoutes.map((route) => (
            <div
              key={route.id}
              className={`route-card ${route.isCpam ? "route-card-cpam" : ""}`}
            >
              <div className="route-card-top">
                <span className={`route-badge ${route.isCpam ? "badge-cpam" : ""}`}>
                  {route.badge}
                </span>
                <span className="route-duration">
                  <Clock size={14} /> {route.duration}
                </span>
              </div>

              <div className="route-itinerary">
                <div className="route-point">
                  <span className="point-dot dot-start" />
                  <div>
                    <small>Départ</small>
                    <strong>{route.from}</strong>
                  </div>
                </div>
                <div className="route-point">
                  <span className="point-dot dot-end" />
                  <div>
                    <small>Arrivée</small>
                    <strong>{route.to}</strong>
                  </div>
                </div>
              </div>

              <p className="route-desc">{route.description}</p>

              <div className="route-card-footer">
                <div className="route-price-box">
                  <span className="route-price">{route.priceLabel}</span>
                  <span className="route-price-sub">{route.priceSub}</span>
                </div>
                <button
                  type="button"
                  className={`btn-route-select ${route.isCpam ? "btn-route-cpam" : ""}`}
                  onClick={() => handleChooseRoute(route)}
                >
                  <span>Réserver</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
