import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Plane,
  HeartPulse,
  MapPin,
  Calendar,
  Clock,
  Users,
  Briefcase,
  CheckCircle2,
  ArrowRightLeft,
  Sparkles,
  FileCheck2,
  Accessibility,
  MessageCircle,
  Phone,
  Train,
  Receipt,
  Copy,
  Check,
  Mail
} from "lucide-react";
import {
  DRIVER_INFO,
  QUICK_LOCATIONS,
  OFFICIAL_TAXI_RATES,
  computeRoadDistanceKm
} from "../data/taxiData";

export default function BookingWidget({ activeMode, setActiveMode, prefilledRoute }) {
  const todayStr = new Date().toISOString().split("T")[0];
  const confirmationRef = useRef(null);

  const [pickup, setPickup] = useState("orly-123");
  const [dropoff, setDropoff] = useState("gare-montparnasse");
  const [customPickup, setCustomPickup] = useState("");
  const [customDropoff, setCustomDropoff] = useState("");
  const [customDistanceKm, setCustomDistanceKm] = useState(null); // Permet d'ajuster la distance si adresse personnalisée
  const [date, setDate] = useState(todayStr);
  const [time, setTime] = useState("10:30");
  const [isHoliday, setIsHoliday] = useState(false);
  const [bookingType, setBookingType] = useState("avance"); // 'avance' (+7€) | 'immediat' (+4€) | 'station' (0€)
  const [passengers, setPassengers] = useState(2);
  const [suitcases, setSuitcases] = useState(2);
  const [flightOrTrainNumber, setFlightOrTrainNumber] = useState("");
  const [childSeat, setChildSeat] = useState(false);

  // Specific CPAM options
  const [hasBonTransport, setHasBonTransport] = useState(true);
  const [ald100, setAld100] = useState(true);
  const [hasFoldableWheelchair, setHasFoldableWheelchair] = useState(false);
  const [roundTripMedical, setRoundTripMedical] = useState(true);

  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);

  useEffect(() => {
    if (prefilledRoute) {
      if (prefilledRoute.isCpam) {
        setActiveMode("cpam");
      } else {
        setActiveMode("standard");
      }
      if (prefilledRoute.pickupId) setPickup(prefilledRoute.pickupId);
      if (prefilledRoute.dropoffId) setDropoff(prefilledRoute.dropoffId);
      setCustomDistanceKm(null);
      setBookingConfirmed(false);
    }
  }, [prefilledRoute, setActiveMode]);

  const handleModeSwitch = (mode) => {
    setActiveMode(mode);
    setBookingConfirmed(false);
    setCustomDistanceKm(null);
    if (mode === "cpam" && !["igr", "mondor", "bicetre", "pitie", "curie-kouri"].includes(dropoff)) {
      setPickup("orly-ville");
      setDropoff("igr");
    } else if (mode === "standard" && ["igr", "mondor", "bicetre"].includes(dropoff)) {
      setPickup("orly-123");
      setDropoff("gare-montparnasse");
    }
  };

  const handleSwapLocations = () => {
    const temp = pickup;
    setPickup(dropoff);
    setDropoff(temp);
    const tempCustom = customPickup;
    setCustomPickup(customDropoff);
    setCustomDropoff(tempCustom);
  };

  const pickupObj = QUICK_LOCATIONS.find((l) => l.id === pickup) || QUICK_LOCATIONS[0];
  const dropoffObj = QUICK_LOCATIONS.find((l) => l.id === dropoff) || QUICK_LOCATIONS[5];

  // Distance routière calculée automatiquement ou ajustée par l'utilisateur
  const autoDistanceKm = useMemo(
    () => computeRoadDistanceKm(pickupObj, dropoffObj),
    [pickupObj, dropoffObj]
  );
  const effectiveDistanceKm = customDistanceKm !== null ? customDistanceKm : autoDistanceKm;

  /**
   * Moteur de calcul conforme à la réglementation officielle des Taxis Parisiens (2026)
   */
  const estimation = useMemo(() => {
    // 1. Détermination du jour et de l'heure
    const parsedHour = parseInt((time || "10:30").split(":")[0], 10);
    const selectedDateObj = date ? new Date(`${date}T12:00:00`) : new Date();
    const isSunday = selectedDateObj.getDay() === 0;

    // Supplément d'approche officiel (Réservation à l'avance 7€ / Immédiate 4€)
    const approachFee =
      bookingType === "avance"
        ? OFFICIAL_TAXI_RATES.approcheAvance
        : bookingType === "immediat"
        ? OFFICIAL_TAXI_RATES.approcheImmediate
        : 0;

    // CAS 1 : TAXI CONVENTIONNÉ CPAM
    if (activeMode === "cpam") {
      return {
        isCpam: true,
        isForfait: false,
        tariffCode: "Tarif Conventionné CPAM",
        distanceKm: effectiveDistanceKm,
        priceText: "0 € d'avance de frais",
        totalFormatted: "0,00 € à régler (Tiers Payant)",
        subText: hasBonTransport
          ? "Facturation directe à votre CPAM sur présentation du Bon de transport (Cerfa) et Carte Vitale"
          : "Pensez à demander votre prescription médicale (Cerfa) à votre médecin avant le trajet",
        duration: `${Math.max(12, Math.round(effectiveDistanceKm * 1.6))} à ${Math.max(
          18,
          Math.round(effectiveDistanceKm * 2.1)
        )} min`,
        badge: "Tiers Payant Sécurité Sociale",
        breakdown: [
          { label: "Prise en charge CPAM (ALD 100% / Mutuelle)", value: "100% Tiers Payant" },
          { label: "Bagages & Fauteuil roulant pliable (Coffre Break)", value: "Gratuit (0,00 €)" },
          { label: "Avance de frais demandée au patient", value: "0,00 €" }
        ]
      };
    }

    const zones = [pickupObj.zone, dropoffObj.zone];
    const hasOrlyAirport = zones.includes("orly-airport");
    const hasCdgAirport = zones.includes("cdg-airport");
    const hasParisRG = zones.includes("paris-rg");
    const hasParisRD = zones.includes("paris-rd");

    // CAS 2 : FORFAITS OFFICIELS AÉROPORTS <-> PARIS (Réglementation Préfecture)
    if (hasOrlyAirport && hasParisRG && !customPickup.trim() && !customDropoff.trim()) {
      const forfaitBase = OFFICIAL_TAXI_RATES.forfaitsAeroports.orlyParisRG; // 36 €
      const totalWithApproach = forfaitBase + approachFee;
      return {
        isCpam: false,
        isForfait: true,
        tariffCode: "Forfait Officiel Orly ↔ Paris Rive Gauche",
        distanceKm: effectiveDistanceKm,
        priceText: `${forfaitBase} €`,
        totalFormatted:
          approachFee > 0
            ? `${forfaitBase} € (Forfait) + ${approachFee} € (Approche résa) = ${totalWithApproach} €`
            : `${forfaitBase} € fixe`,
        subText: "Tarif forfaitaire obligatoire fixe dans les deux sens • Bagages 100% gratuits",
        duration: "20 à 30 min (via voies réservées Taxi A6)",
        badge: "Forfait Réglementé Préfecture",
        breakdown: [
          { label: "Forfait officiel Orly ↔ Paris Rive Gauche", value: `${forfaitBase.toFixed(2)} €` },
          {
            label:
              bookingType === "avance"
                ? "Forfait d'approche (Réservation à l'avance)"
                : bookingType === "immediat"
                ? "Forfait d'approche (Réservation immédiate)"
                : "Prise en station sans approche",
            value: `+ ${approachFee.toFixed(2)} €`
          },
          { label: `Bagages coffre Break (${suitcases} valise(s))`, value: "Gratuit (0,00 €)" },
          { label: "Total réglementé tout compris", value: `${totalWithApproach.toFixed(2)} €` }
        ]
      };
    }

    if (hasOrlyAirport && hasParisRD && !customPickup.trim() && !customDropoff.trim()) {
      const forfaitBase = OFFICIAL_TAXI_RATES.forfaitsAeroports.orlyParisRD; // 45 €
      const totalWithApproach = forfaitBase + approachFee;
      return {
        isCpam: false,
        isForfait: true,
        tariffCode: "Forfait Officiel Orly ↔ Paris Rive Droite",
        distanceKm: effectiveDistanceKm,
        priceText: `${forfaitBase} €`,
        totalFormatted:
          approachFee > 0
            ? `${forfaitBase} € (Forfait) + ${approachFee} € (Approche résa) = ${totalWithApproach} €`
            : `${forfaitBase} € fixe`,
        subText: "Tarif forfaitaire obligatoire fixe dans les deux sens • Bagages 100% gratuits",
        duration: "30 à 45 min (via voies réservées Taxi A6)",
        badge: "Forfait Réglementé Préfecture",
        breakdown: [
          { label: "Forfait officiel Orly ↔ Paris Rive Droite", value: `${forfaitBase.toFixed(2)} €` },
          {
            label:
              bookingType === "avance"
                ? "Forfait d'approche (Réservation à l'avance)"
                : bookingType === "immediat"
                ? "Forfait d'approche (Réservation immédiate)"
                : "Prise en station sans approche",
            value: `+ ${approachFee.toFixed(2)} €`
          },
          { label: `Bagages coffre Break (${suitcases} valise(s))`, value: "Gratuit (0,00 €)" },
          { label: "Total réglementé tout compris", value: `${totalWithApproach.toFixed(2)} €` }
        ]
      };
    }

    if (hasCdgAirport && (hasParisRG || hasParisRD) && !customPickup.trim() && !customDropoff.trim()) {
      const forfaitBase = hasParisRG
        ? OFFICIAL_TAXI_RATES.forfaitsAeroports.cdgParisRG // 65 €
        : OFFICIAL_TAXI_RATES.forfaitsAeroports.cdgParisRD; // 56 €
      const riveLabel = hasParisRG ? "Paris Rive Gauche" : "Paris Rive Droite";
      const totalWithApproach = forfaitBase + approachFee;
      return {
        isCpam: false,
        isForfait: true,
        tariffCode: `Forfait Officiel Roissy CDG ↔ ${riveLabel}`,
        distanceKm: effectiveDistanceKm,
        priceText: `${forfaitBase} €`,
        totalFormatted:
          approachFee > 0
            ? `${forfaitBase} € (Forfait) + ${approachFee} € (Approche résa) = ${totalWithApproach} €`
            : `${forfaitBase} € fixe`,
        subText: "Tarif forfaitaire obligatoire fixe • Bagages 100% gratuits",
        duration: "40 à 55 min",
        badge: "Forfait Réglementé Préfecture",
        breakdown: [
          { label: `Forfait officiel CDG ↔ ${riveLabel}`, value: `${forfaitBase.toFixed(2)} €` },
          {
            label:
              bookingType === "avance"
                ? "Forfait d'approche (Réservation à l'avance)"
                : bookingType === "immediat"
                ? "Forfait d'approche (Réservation immédiate)"
                : "Prise en station",
            value: `+ ${approachFee.toFixed(2)} €`
          },
          { label: `Bagages coffre Break (${suitcases} valise(s))`, value: "Gratuit (0,00 €)" },
          { label: "Total réglementé tout compris", value: `${totalWithApproach.toFixed(2)} €` }
        ]
      };
    }

    // CAS 3 : TARIF AU COMPTEUR HOROKILOMÉTRIQUE (Tarif A, B ou C selon zone, jour et heure)
    const bothInParis =
      ["paris-rg", "paris-rd"].includes(pickupObj.zone) &&
      ["paris-rg", "paris-rd"].includes(dropoffObj.zone);

    let activeTariff = OFFICIAL_TAXI_RATES.tarifsKm.B; // Par défaut en banlieue/Orly de jour (7h-19h)

    if (bothInParis) {
      if (!isSunday && !isHoliday && parsedHour >= 10 && parsedHour < 17) {
        activeTariff = OFFICIAL_TAXI_RATES.tarifsKm.A; // 1.30 €/km
      } else {
        activeTariff = OFFICIAL_TAXI_RATES.tarifsKm.B; // 1.66 €/km
      }
    } else {
      // Zone Suburbaine (Orly, Val-de-Marne 94, Essonne 91, Banlieue, CDG)
      const isNightSuburb = parsedHour < 7 || parsedHour >= 19;
      if (isNightSuburb || isSunday || isHoliday) {
        activeTariff = OFFICIAL_TAXI_RATES.tarifsKm.C; // 1.76 €/km (Nuit / Dimanche / Férié en banlieue)
      } else {
        activeTariff = OFFICIAL_TAXI_RATES.tarifsKm.B; // 1.66 €/km (Jour 7h-19h en banlieue)
      }
    }

    const basePickup = OFFICIAL_TAXI_RATES.priseEnCharge; // 3.00 €
    const kmCost = effectiveDistanceKm * activeTariff.perKm;
    // Prise en compte d'une légère part horaire (feux / ralentissements ~ 12% à 18%)
    const rawMeter = Math.max(OFFICIAL_TAXI_RATES.minimumPerception, basePickup + kmCost);
    const totalLow = Math.round(rawMeter + approachFee);
    const totalHigh = Math.round(rawMeter * 1.12 + approachFee + 2);

    return {
      isCpam: false,
      isForfait: false,
      tariffCode: `${activeTariff.code} (${activeTariff.perKm.toFixed(2)} €/km)`,
      tariffDesc: activeTariff.label,
      distanceKm: effectiveDistanceKm,
      priceText: `${totalLow} € – ${totalHigh} €`,
      totalFormatted: `Environ ${totalLow} € à ${totalHigh} € (selon fluidité du trafic)`,
      subText: `Calculé selon ${activeTariff.code} officiel (${activeTariff.perKm.toFixed(
        2
      )} €/km) • ${effectiveDistanceKm} km estimés`,
      duration: `${Math.max(10, Math.round(effectiveDistanceKm * 1.5))} à ${Math.max(
        15,
        Math.round(effectiveDistanceKm * 2.0)
      )} min`,
      badge: `Tarif Compteur Officiel • ${activeTariff.code}`,
      breakdown: [
        { label: "Prise en charge initiale au compteur", value: `${basePickup.toFixed(2)} €` },
        {
          label: `Distance (${effectiveDistanceKm} km × ${activeTariff.perKm.toFixed(2)} € - ${activeTariff.code})`,
          value: `${kmCost.toFixed(2)} €`
        },
        {
          label:
            bookingType === "avance"
              ? "Supplément réservation à l'avance réglementé"
              : bookingType === "immediat"
              ? "Supplément réservation immédiate réglementé"
              : "Sans supplément de réservation",
          value: `+ ${approachFee.toFixed(2)} €`
        },
        { label: `Bagages coffre Break (${suitcases} valise(s), max 4 passagers)`, value: "Gratuit (0,00 €)" }
      ]
    };
  }, [
    activeMode,
    pickupObj,
    dropoffObj,
    customPickup,
    customDropoff,
    effectiveDistanceKm,
    time,
    date,
    isHoliday,
    bookingType,
    suitcases,
    hasBonTransport
  ]);

  const pickupLabel = customPickup.trim() ? customPickup : pickupObj.label;
  const dropoffLabel = customDropoff.trim() ? customDropoff : dropoffObj.label;

  const generateWhatsappMessage = () => {
    const lines = [
      `Bonjour Hocine, je souhaite réserver votre Taxi Parisien (Toyota RAV4 Hybride) :`,
      `• Service : ${activeMode === "cpam" ? "TAXI CONVENTIONNÉ CPAM" : "Course Aéroport / Gare / Toutes distances"}`,
      `• Départ : ${pickupLabel}`,
      `• Arrivée : ${dropoffLabel}`,
      `• Date & Heure : ${date} à ${time}${isHoliday ? " (Jour férié)" : ""}`,
      `• Passagers : ${passengers} pers. (Toyota RAV4 Hybride)`
    ];

    if (activeMode === "cpam") {
      lines.push(`• Bon de transport (Cerfa) : ${hasBonTransport ? "Oui, en ma possession" : "En attente médecin"}`);
      lines.push(`• Prise en charge : ${ald100 ? "100% ALD / Maternité / AT" : "65% CPAM + Mutuelle"}`);
      lines.push(`• Fauteuil roulant pliable (coffre Break) : ${hasFoldableWheelchair ? "Oui" : "Non"}`);
      lines.push(`• Aller-Retour médical : ${roundTripMedical ? "Oui (Aller + Retour)" : "Aller simple"}`);
    } else {
      lines.push(`• Bagages (Coffre Break) : ${suitcases} grande(s) valise(s) (Gratuit)`);
      lines.push(`• Tarif applicable : ${estimation.tariffCode} (${estimation.priceText})`);
      if (flightOrTrainNumber.trim()) {
        lines.push(`• N° de Vol ou Train : ${flightOrTrainNumber.trim()}`);
      }
      if (childSeat) {
        lines.push(`• Option : Rehausseur / Siège enfant souhaité`);
      }
    }

    if (clientName.trim()) lines.push(`• Nom : ${clientName.trim()}`);
    if (clientPhone.trim()) lines.push(`• Téléphone : ${clientPhone.trim()}`);

    return lines.join("\n");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBookingConfirmed(true);
    setTimeout(() => {
      if (confirmationRef.current) {
        confirmationRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }, 100);
  };

  const handleCopySummary = async () => {
    try {
      await navigator.clipboard.writeText(generateWhatsappMessage());
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 3000);
    } catch {
      setCopiedSummary(false);
    }
  };

  return (
    <div className="booking-card" id="booking">
      {/* Mode Switcher Tabs */}
      <div className="booking-tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={activeMode === "standard"}
          className={`booking-tab ${activeMode === "standard" ? "active-standard" : ""}`}
          onClick={() => handleModeSwitch("standard")}
        >
          <Plane size={19} />
          <div>
            <span className="tab-title">Aéroports, Gares & Toutes Distances</span>
            <span className="tab-sub">Forfaits Officiels Orly (36€ / 45€) & Compteur A/B/C</span>
          </div>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeMode === "cpam"}
          className={`booking-tab ${activeMode === "cpam" ? "active-cpam" : ""}`}
          onClick={() => handleModeSwitch("cpam")}
        >
          <HeartPulse size={19} />
          <div>
            <span className="tab-title">Taxi Conventionné CPAM</span>
            <span className="tab-sub">Hôpitaux & Cliniques • 0 € d'avance (Tiers Payant)</span>
          </div>
        </button>
      </div>

      {/* Quick Preset Pills */}
      <div className="quick-presets">
        <span className="preset-label">Accès rapide :</span>
        {activeMode === "standard" ? (
          <>
            <button
              type="button"
              className="preset-chip"
              onClick={() => {
                setPickup("orly-123");
                setDropoff("gare-montparnasse");
                setCustomPickup("");
                setCustomDropoff("");
                setCustomDistanceKm(null);
              }}
            >
              <Plane size={13} /> Forfait Orly ↔ Paris Rive Gauche (36 €)
            </button>
            <button
              type="button"
              className="preset-chip"
              onClick={() => {
                setPickup("orly-123");
                setDropoff("gare-lyon");
                setCustomPickup("");
                setCustomDropoff("");
                setCustomDistanceKm(null);
              }}
            >
              <Train size={13} /> Forfait Orly ↔ Gare de Lyon / Rive Droite (45 €)
            </button>
            <button
              type="button"
              className="preset-chip"
              onClick={() => {
                setPickup("orly-123");
                setDropoff("cdg");
                setCustomPickup("");
                setCustomDropoff("");
                setCustomDistanceKm(null);
              }}
            >
              <Plane size={13} /> Orly ↔ Roissy CDG
            </button>
            <button
              type="button"
              className="preset-chip"
              onClick={() => {
                setPickup("orly-123");
                setDropoff("massy-tgv");
                setCustomPickup("");
                setCustomDropoff("");
                setCustomDistanceKm(null);
              }}
            >
              <Train size={13} /> Orly ↔ Gare de Massy TGV
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              className="preset-chip preset-chip-cpam"
              onClick={() => {
                setPickup("orly-ville");
                setDropoff("igr");
                setCustomDistanceKm(null);
              }}
            >
              <HeartPulse size={13} /> Orly/94 ↔ Gustave Roussy (Villejuif)
            </button>
            <button
              type="button"
              className="preset-chip preset-chip-cpam"
              onClick={() => {
                setPickup("orly-ville");
                setDropoff("mondor");
                setCustomDistanceKm(null);
              }}
            >
              <HeartPulse size={13} /> Orly/94 ↔ Hôpital Henri Mondor
            </button>
            <button
              type="button"
              className="preset-chip preset-chip-cpam"
              onClick={() => {
                setPickup("orly-ville");
                setDropoff("pitie");
                setCustomDistanceKm(null);
              }}
            >
              <HeartPulse size={13} /> Orly/94 ↔ Hôpitaux Paris AP-HP
            </button>
          </>
        )}
      </div>

      <form onSubmit={handleSubmit} className="booking-form">
        {/* Locations Row */}
        <div className="locations-grid">
          <div className="field-group">
            <label htmlFor="pickup-select">
              <MapPin size={15} className="icon-gold" /> Secteur de départ
            </label>
            <select
              id="pickup-select"
              value={pickup}
              onChange={(e) => {
                setPickup(e.target.value);
                setCustomDistanceKm(null);
              }}
              className="form-select"
            >
              {QUICK_LOCATIONS.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  [{loc.category}] {loc.label}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Précisez l'adresse exacte (ex: 12 av. de l'Aérodrome, Orly)..."
              value={customPickup}
              onChange={(e) => setCustomPickup(e.target.value)}
              className="form-input-sub"
            />
          </div>

          <button
            type="button"
            className="swap-btn"
            onClick={handleSwapLocations}
            title="Inverser Départ et Arrivée"
            aria-label="Inverser Départ et Arrivée"
          >
            <ArrowRightLeft size={18} />
          </button>

          <div className="field-group">
            <label htmlFor="dropoff-select">
              <MapPin size={15} className={activeMode === "cpam" ? "icon-cpam" : "icon-gold"} /> Secteur de destination
            </label>
            <select
              id="dropoff-select"
              value={dropoff}
              onChange={(e) => {
                setDropoff(e.target.value);
                setCustomDistanceKm(null);
              }}
              className="form-select"
            >
              {QUICK_LOCATIONS.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  [{loc.category}] {loc.label}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder={
                activeMode === "cpam"
                  ? "Précisez le service médical, pavillon ou adresse..."
                  : "Précisez l'adresse d'arrivée, terminal, hôtel..."
              }
              value={customDropoff}
              onChange={(e) => setCustomDropoff(e.target.value)}
              className="form-input-sub"
            />
          </div>
        </div>

        {/* Date, Time & Passengers */}
        <div className="datetime-grid">
          <div className="field-group">
            <label htmlFor="booking-date">
              <Calendar size={15} /> Date du trajet
            </label>
            <input
              id="booking-date"
              type="date"
              value={date}
              min={todayStr}
              onChange={(e) => setDate(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="field-group">
            <label htmlFor="booking-time">
              <Clock size={15} /> Heure de prise en charge (calcul Tarif Jour/Nuit auto)
            </label>
            <input
              id="booking-time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="field-group">
            <label htmlFor="passengers-select">
              <Users size={15} /> Passagers à bord du Break (1 à 4 pers.)
            </label>
            <select
              id="passengers-select"
              value={passengers}
              onChange={(e) => setPassengers(Number(e.target.value))}
              className="form-select"
            >
              <option value={1}>1 Passager (0 € suppl.)</option>
              <option value={2}>2 Passagers (0 € suppl.)</option>
              <option value={3}>3 Passagers (0 € suppl.)</option>
              <option value={4}>4 Passagers — Capacité max Break (0 € suppl.)</option>
            </select>
          </div>
        </div>

        {/* Mode-Specific Options */}
        {activeMode === "standard" ? (
          <div className="mode-options-box">
            <div className="options-row">
              <div className="field-group">
                <label htmlFor="suitcases-range">
                  <Briefcase size={15} /> Bagages coffre Break : <strong>{suitcases} grande(s) valise(s) (Gratuit)</strong>
                </label>
                <input
                  id="suitcases-range"
                  type="range"
                  min={0}
                  max={5}
                  value={suitcases}
                  onChange={(e) => setSuitcases(Number(e.target.value))}
                  className="range-slider"
                />
                <span className="trunk-capacity-hint">
                  ✓ Conformément à la réglementation Taxi, aucun supplément bagage n'est facturé (coffre Break XXL jusqu'à 5 valises).
                </span>
              </div>

              <div className="field-group">
                <label htmlFor="flight-number">
                  <Plane size={15} /> N° de Vol (Orly/CDG) ou Train (Optionnel)
                </label>
                <input
                  id="flight-number"
                  type="text"
                  placeholder="Ex: AF7432, TO3104, TGV 6214..."
                  value={flightOrTrainNumber}
                  onChange={(e) => setFlightOrTrainNumber(e.target.value)}
                  className="form-input"
                />
                <span className="trunk-capacity-hint">Suivi en temps réel : attente ajustée si votre vol est retardé.</span>
              </div>
            </div>

            <div className="toggles-row">
              <div className="booking-type-selector">
                <span className="small-label">Mode de prise en charge :</span>
                <div className="period-toggle">
                  <button
                    type="button"
                    className={bookingType === "avance" ? "active" : ""}
                    onClick={() => setBookingType("avance")}
                  >
                    📅 Réservation à l'avance (+7 €)
                  </button>
                  <button
                    type="button"
                    className={bookingType === "immediat" ? "active" : ""}
                    onClick={() => setBookingType("immediat")}
                  >
                    ⚡ Immédiate (+4 €)
                  </button>
                </div>
              </div>

              {!estimation.isForfait && (
                <div className="distance-adjuster">
                  <label htmlFor="custom-km">
                    Distance estimée : <strong>{effectiveDistanceKm} km</strong>
                  </label>
                  <input
                    id="custom-km"
                    type="range"
                    min={3}
                    max={80}
                    value={effectiveDistanceKm}
                    onChange={(e) => setCustomDistanceKm(Number(e.target.value))}
                    className="range-slider-sm"
                  />
                </div>
              )}

              <div className="extra-checks">
                <label className="checkbox-pill">
                  <input
                    type="checkbox"
                    checked={isHoliday}
                    onChange={(e) => setIsHoliday(e.target.checked)}
                  />
                  <span>Jour férié (Tarif C)</span>
                </label>

                <label className="checkbox-pill">
                  <input
                    type="checkbox"
                    checked={childSeat}
                    onChange={(e) => setChildSeat(e.target.checked)}
                  />
                  <span>Siège enfant gratuit</span>
                </label>
              </div>
            </div>
          </div>
        ) : (
          <div className="mode-options-box cpam-options-box">
            <div className="cpam-options-header">
              <FileCheck2 size={18} />
              <span>Options de prise en charge Sécurité Sociale (CPAM) & Confort Patient</span>
            </div>
            <div className="cpam-checkboxes">
              <label className="checkbox-pill cpam-pill">
                <input
                  type="checkbox"
                  checked={hasBonTransport}
                  onChange={(e) => setHasBonTransport(e.target.checked)}
                />
                <span>J'ai un Bon de Transport (Prescription médicale Cerfa)</span>
              </label>

              <label className="checkbox-pill cpam-pill">
                <input
                  type="checkbox"
                  checked={ald100}
                  onChange={(e) => setAld100(e.target.checked)}
                />
                <span>Prise en charge 100% (ALD, Maternité, AT) ou Mutuelle</span>
              </label>

              <label className="checkbox-pill cpam-pill">
                <input
                  type="checkbox"
                  checked={hasFoldableWheelchair}
                  onChange={(e) => setHasFoldableWheelchair(e.target.checked)}
                />
                <span>
                  <Accessibility size={15} /> Fauteuil roulant pliable / Déambulateur (Coffre Break)
                </span>
              </label>

              <label className="checkbox-pill cpam-pill">
                <input
                  type="checkbox"
                  checked={roundTripMedical}
                  onChange={(e) => setRoundTripMedical(e.target.checked)}
                />
                <span>Aller-Retour (Retour après la consultation / séance)</span>
              </label>
            </div>
          </div>
        )}

        {/* Official Regulatory Fare Estimation & Breakdown */}
        <div className={`estimation-banner ${activeMode === "cpam" ? "estimation-cpam" : ""}`}>
          <div className="estimation-main-row">
            <div className="estimation-left">
              <span className="estimation-badge">
                <Sparkles size={13} /> {estimation.badge}
              </span>
              <div className="estimation-price">{estimation.priceText}</div>
              <p className="estimation-sub">{estimation.subText}</p>
            </div>

            <div className="estimation-right">
              <div className="estimation-meta">
                <span>Durée estimée :</span>
                <strong>{estimation.duration}</strong>
              </div>
              <div className="estimation-meta">
                <span>Distance routière :</span>
                <strong>~{estimation.distanceKm} km</strong>
              </div>
              <div className="estimation-meta">
                <span>Véhicule garanti :</span>
                <strong>Toyota RAV4 Hybride (Grand Coffre)</strong>
              </div>
            </div>
          </div>

          {/* Detailed Official Breakdown Table */}
          <div className="fare-breakdown-box">
            <div className="breakdown-title">
              <Receipt size={14} /> Détail du calcul selon la tarification officielle en vigueur (Préfecture) :
            </div>
            <div className="breakdown-grid">
              {estimation.breakdown.map((row, idx) => (
                <div key={idx} className="breakdown-item">
                  <span>{row.label}</span>
                  <strong>{row.value}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Info & Action Buttons */}
        <div className="contact-submit-row">
          <input
            type="text"
            placeholder="Votre Nom & Prénom *"
            value={clientName}
            maxLength={80}
            autoComplete="name"
            onChange={(e) => setClientName(e.target.value)}
            className="form-input"
            required
          />
          <input
            type="tel"
            placeholder="Votre Téléphone (ex: 06 78 90 10 40) *"
            value={clientPhone}
            maxLength={20}
            pattern="[\d\s\+\-\.]{8,20}"
            title="Veuillez entrer un numéro de téléphone valide (ex: 06 78 90 10 40)"
            autoComplete="tel"
            onChange={(e) => setClientPhone(e.target.value)}
            className="form-input"
            required
          />
          <button type="submit" className={`btn btn-submit ${activeMode === "cpam" ? "btn-submit-cpam" : ""}`}>
            <CheckCircle2 size={18} />
            <span>Préparer ma réservation</span>
          </button>
        </div>

        <div className="rgpd-micro-notice">
          <label className="rgpd-check-label">
            <input type="checkbox" defaultChecked required />
            <span>
              🔒 <strong>Confidentialité & RGPD :</strong> J'accepte que ces informations soient transmises uniquement à{" "}
              <strong>Hocine Ferhat (Taxi Parisien)</strong> pour le traitement de ma course. Aucune donnée n'est stockée
              en base de données ni partagée à des tiers.
            </span>
          </label>
        </div>

        {/* Direct Instant Channels */}
        <div className="instant-channels">
          <span>Ou envoyez directement votre demande en 1 clic sans attendre :</span>
          <div className="instant-btns">
            <a
              href={`https://wa.me/${DRIVER_INFO.whatsappNumber}?text=${encodeURIComponent(generateWhatsappMessage())}`}
              target="_blank"
              rel="noreferrer"
              className="btn-channel btn-whatsapp"
            >
              <MessageCircle size={16} /> Réserver via WhatsApp
            </a>
            <a
              href={`mailto:${DRIVER_INFO.email}?subject=${encodeURIComponent(
                `Réservation Taxi Hocine Ferhat - ${date} à ${time}`
              )}&body=${encodeURIComponent(generateWhatsappMessage())}`}
              className="btn-channel btn-email"
            >
              <Mail size={16} /> Par Email
            </a>
            <a href={DRIVER_INFO.phoneHref} className="btn-channel btn-call">
              <Phone size={16} /> Appel direct : {DRIVER_INFO.phoneDisplay}
            </a>
          </div>
        </div>
      </form>

      {/* Confirmation Box */}
      {bookingConfirmed && (
        <div className="booking-confirmation-alert" ref={confirmationRef}>
          <div className="confirmation-header">
            <CheckCircle2 size={26} className="icon-success" />
            <div>
              <h4>Votre demande de réservation est prête !</h4>
              <p>
                Cliquez sur <strong>WhatsApp</strong>, <strong>SMS</strong> ou <strong>Email</strong> ci-dessous pour
                transmettre instantanément ce récapitulatif à <strong>Hocine Ferhat (Taxi Orly)</strong> :
              </p>
            </div>
          </div>
          <pre className="confirmation-summary">{generateWhatsappMessage()}</pre>
          <div className="confirmation-actions">
            <a
              href={`https://wa.me/${DRIVER_INFO.whatsappNumber}?text=${encodeURIComponent(generateWhatsappMessage())}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-whatsapp-lg"
            >
              <MessageCircle size={18} /> Envoyer sur WhatsApp (Recommandé)
            </a>
            <a
              href={`sms:+${DRIVER_INFO.whatsappNumber}?body=${encodeURIComponent(generateWhatsappMessage())}`}
              className="btn btn-primary"
            >
              Envoyer par SMS
            </a>
            <a
              href={`mailto:${DRIVER_INFO.email}?subject=${encodeURIComponent(
                `Réservation Taxi Hocine Ferhat - ${date} à ${time}`
              )}&body=${encodeURIComponent(generateWhatsappMessage())}`}
              className="btn btn-outline"
            >
              <Mail size={17} /> Envoyer par Email
            </a>
            <button type="button" onClick={handleCopySummary} className="btn btn-outline">
              {copiedSummary ? <Check size={17} /> : <Copy size={17} />}
              <span>{copiedSummary ? "Copié dans le presse-papier !" : "Copier le récapitulatif"}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
