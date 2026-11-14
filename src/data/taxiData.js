export const DRIVER_INFO = {
  name: "Hocine Ferhat",
  brand: "Taxi Hocine Ferhat",
  tagline: "Artisan Taxi Parisien • Conventionné CPAM • Aéroports & Gares",
  experienceBadge: "+ de 10 ans d'expérience",
  licenseType: "Taxi Parisien Officiel (Préfecture de Police)",
  baseCity: "Val-de-Marne (94) • Orly (94310) & Environs",
  longDistanceInfo: "Toutes distances & Province sur demande et réservation",
  phoneDisplay: "06 78 90 10 40",
  phoneHref: "tel:+33678901040",
  whatsappNumber: "33678901040",
  email: "fermekla2000@gmail.com",
  vehicleName: "Toyota RAV4 Hybride",
  vehicleCategory: "SUV / Break Hybride Spacieux & Grand Coffre",
  vehicleSpecs: {
    passengers: 4,
    largeSuitcases: 5,
    cabinBags: 4,
    wheelchairFoldable: true,
    easyAccessHeight: true,
    motorisation: "Hybride Silencieux & Écologique (Crit'Air 1)",
    airConditioning: "Climatisation automatique bi-zone",
    paymentMethods: [
      "Cartes Bancaires (Visa, Mastercard, Sans Contact, Apple Pay)",
      "Tiers Payant CPAM (0 € d'avance de frais)",
      "Espèces (Chèques non acceptés)"
    ]
  },
  nearbyCities: [
    "Orly Ville & Aéroport (1-2-3-4)",
    "Val-de-Marne (94)",
    "Thiais & Belle Épine",
    "Choisy-le-Roi & Vitry-sur-Seine",
    "Villeneuve-le-Roi & Ablon",
    "Rungis (MIN & Zone Icade)",
    "Chevilly-Larue & L'Haÿ-les-Roses",
    "Villejuif (Gustave Roussy) & Kremlin-Bicêtre",
    "Créteil (Henri Mondor) & Maisons-Alfort",
    "Fresnes, Antony & Massy TGV",
    "Athis-Mons, Paray-Vieille-Poste & Juvisy",
    "Longues distances & Province (sur réservation)"
  ]
};

/**
 * Grille officielle des Tarifs Taxis Parisiens & Zone Suburbaine (Préfecture de Police - 2026)
 */
export const OFFICIAL_TAXI_RATES = {
  priseEnCharge: 3.0,
  minimumPerception: 8.0,
  approcheImmediate: 4.0,
  approcheAvance: 7.0,
  forfaitsAeroports: {
    orlyParisRG: 36.0,
    orlyParisRD: 45.0,
    cdgParisRG: 65.0,
    cdgParisRD: 56.0
  },
  tarifsKm: {
    A: {
      code: "Tarif A",
      label: "Paris intra-muros • Lun–Sam (10h–17h)",
      perKm: 1.3,
      perHour: 39.55
    },
    B: {
      code: "Tarif B",
      label: "Val-de-Marne (94) / Orly Jour (7h–19h) ou Paris Soir",
      perKm: 1.66,
      perHour: 52.56
    },
    C: {
      code: "Tarif C",
      label: "Banlieue / Orly Nuit (19h–7h), Dimanche, Fériés & Grandes distances",
      perKm: 1.76,
      perHour: 43.15
    }
  }
};

/**
 * Lieux avec coordonnées GPS réelles (lat/lng) pour calcul précis de distance routière et de tarif
 */
export const QUICK_LOCATIONS = [
  {
    id: "orly-123",
    label: "Aéroport Paris-Orly (Terminaux 1-2-3)",
    category: "Aéroport",
    zone: "orly-airport",
    lat: 48.7262,
    lng: 2.3652
  },
  {
    id: "orly-4",
    label: "Aéroport Paris-Orly (Terminal 4)",
    category: "Aéroport",
    zone: "orly-airport",
    lat: 48.7294,
    lng: 2.3795
  },
  {
    id: "orly-ville",
    label: "Orly Ville / Mairie / RER C (94310)",
    category: "Val-de-Marne (94)",
    zone: "suburb",
    lat: 48.7448,
    lng: 2.3976
  },
  {
    id: "thiais-choisy",
    label: "Thiais / Choisy-le-Roi / Rungis MIN (94)",
    category: "Val-de-Marne (94)",
    zone: "suburb",
    lat: 48.7634,
    lng: 2.3894
  },
  {
    id: "creteil-vitry",
    label: "Créteil / Vitry-sur-Seine / Villejuif (94)",
    category: "Val-de-Marne (94)",
    zone: "suburb",
    lat: 48.7899,
    lng: 2.4145
  },
  {
    id: "villeneuve-athis",
    label: "Villeneuve-le-Roi / Athis-Mons / Juvisy",
    category: "Secteur Orly",
    zone: "suburb",
    lat: 48.7161,
    lng: 2.4052
  },
  {
    id: "gare-montparnasse",
    label: "Gare Montparnasse (Paris 15e - Rive Gauche)",
    category: "Gare SNCF",
    zone: "paris-rg",
    lat: 48.8414,
    lng: 2.3219
  },
  {
    id: "gare-austerlitz",
    label: "Gare d'Austerlitz (Paris 13e - Rive Gauche)",
    category: "Gare SNCF",
    zone: "paris-rg",
    lat: 48.8422,
    lng: 2.3659
  },
  {
    id: "paris-rg-centre",
    label: "Paris Rive Gauche (5e, 6e, 7e, 13e, 14e, 15e)",
    category: "Paris",
    zone: "paris-rg",
    lat: 48.8462,
    lng: 2.3372
  },
  {
    id: "gare-lyon",
    label: "Gare de Lyon (Paris 12e - Rive Droite)",
    category: "Gare SNCF",
    zone: "paris-rd",
    lat: 48.8443,
    lng: 2.3744
  },
  {
    id: "gare-nord-est",
    label: "Gare du Nord / Gare de l'Est (Paris 10e - Rive Droite)",
    category: "Gare SNCF",
    zone: "paris-rd",
    lat: 48.8809,
    lng: 2.3553
  },
  {
    id: "paris-rd-etoile",
    label: "Paris Rive Droite (Opéra, Châtelet, Étoile, 8e, 16e, 17e)",
    category: "Paris",
    zone: "paris-rd",
    lat: 48.8738,
    lng: 2.295
  },
  {
    id: "massy-tgv",
    label: "Gare de Massy TGV / Palaiseau (91300)",
    category: "Gare SNCF",
    zone: "suburb",
    lat: 48.7255,
    lng: 2.2611
  },
  {
    id: "cdg",
    label: "Aéroport Roissy Charles-de-Gaulle (CDG 1, 2, 3)",
    category: "Aéroport",
    zone: "cdg-airport",
    lat: 49.0097,
    lng: 2.5479
  },
  {
    id: "igr",
    label: "Institut Gustave Roussy (Villejuif - 94)",
    category: "Hôpital / CPAM",
    zone: "hopital-suburb",
    lat: 48.7945,
    lng: 2.3502
  },
  {
    id: "mondor",
    label: "CHU Hôpital Henri Mondor (Créteil - 94)",
    category: "Hôpital / CPAM",
    zone: "hopital-suburb",
    lat: 48.7983,
    lng: 2.4526
  },
  {
    id: "bicetre",
    label: "Hôpital Bicêtre AP-HP (Le Kremlin-Bicêtre - 94)",
    category: "Hôpital / CPAM",
    zone: "hopital-suburb",
    lat: 48.8098,
    lng: 2.3547
  },
  {
    id: "pitie",
    label: "Hôpital Pitié-Salpêtrière (Paris 13e)",
    category: "Hôpital / CPAM",
    zone: "paris-rg",
    lat: 48.8384,
    lng: 2.3626
  },
  {
    id: "curie-kouri",
    label: "Institut Curie / Hôpital Cochin / Necker (Paris Rive Gauche)",
    category: "Hôpital / CPAM",
    zone: "paris-rg",
    lat: 48.8434,
    lng: 2.3442
  }
];

/**
 * Calcule la distance routière estimée en km entre deux points GPS (formule de Haversine * facteur routier IDF 1.34)
 */
export function computeRoadDistanceKm(locA, locB) {
  if (!locA || !locB) return 12;
  if (locA.id === locB.id) return 5;
  const toRad = (deg) => (deg * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(locB.lat - locA.lat);
  const dLng = toRad(locB.lng - locA.lng);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(locA.lat)) *
      Math.cos(toRad(locB.lat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const straightKm = R * c;
  const roadKm = Math.max(4, Math.round(straightKm * 1.34));
  return roadKm;
}

export const POPULAR_ROUTES = [
  {
    id: "orly-paris-rg",
    category: "aeroport",
    from: "Aéroport Paris-Orly (1-2-3-4)",
    to: "Paris Rive Gauche (Montparnasse, Austerlitz, 5e, 6e, 7e, 13e, 14e, 15e)",
    duration: "20 - 30 min",
    priceLabel: "36 €",
    priceSub: "Forfait Officiel Taxi Parisien",
    badge: "Forfait Fixe Réglementé",
    pickupId: "orly-123",
    dropoffId: "gare-montparnasse",
    description:
      "Tarif forfaitaire officiel fixe dans les deux sens entre l'Aéroport d'Orly et Paris Rive Gauche à bord du Toyota RAV4 Hybride."
  },
  {
    id: "orly-paris-rd",
    category: "aeroport",
    from: "Aéroport Paris-Orly (1-2-3-4)",
    to: "Paris Rive Droite (Gare de Lyon, Gare du Nord, Opéra, Étoile, Bastille)",
    duration: "30 - 45 min",
    priceLabel: "45 €",
    priceSub: "Forfait Officiel Taxi Parisien",
    badge: "Forfait Fixe Réglementé",
    pickupId: "orly-123",
    dropoffId: "gare-lyon",
    description:
      "Tarif forfaitaire officiel fixe entre Paris-Orly et Paris Rive Droite. Accès aux couloirs réservés Taxi Parisien sur l'A6."
  },
  {
    id: "orly-cdg",
    category: "aeroport",
    from: "Orly & Val-de-Marne (94)",
    to: "Aéroport Roissy Charles-de-Gaulle (CDG 1, 2, 3)",
    duration: "40 - 55 min",
    priceLabel: "~75 – 85 €",
    priceSub: "Tarif compteur officiel (ou Forfait 56€/65€ depuis Paris)",
    badge: "Inter-Aéroports",
    pickupId: "orly-123",
    dropoffId: "cdg",
    description:
      "Liaison directe vers Roissy CDG avec suivi de votre vol en temps réel et grand coffre Toyota RAV4 pour toutes vos valises."
  },
  {
    id: "orly-massy",
    category: "gare",
    from: "Secteur Orly (94310) & Val-de-Marne",
    to: "Gare de Massy TGV / Gares Parisiennes & Longues Distances",
    duration: "15 - 25 min",
    priceLabel: "~26 – 35 €",
    priceSub: "Compteur officiel • Toutes distances sur résa",
    badge: "Gares & Longues Distances",
    pickupId: "orly-123",
    dropoffId: "massy-tgv",
    description:
      "Liaisons rapides vers toutes les gares TGV et trajets longue distance (Province) sur simple demande et réservation."
  },
  {
    id: "cpam-igr",
    category: "cpam",
    from: "Orly (94310), Thiais, Choisy, Val-de-Marne...",
    to: "Institut Gustave Roussy (Villejuif) / Hôpital Bicêtre",
    duration: "15 - 20 min",
    priceLabel: "0 € d'avance",
    priceSub: "Prise en charge CPAM (65% à 100%)",
    badge: "Conventionné CPAM",
    pickupId: "orly-ville",
    dropoffId: "igr",
    isCpam: true,
    description:
      "Montée et descente faciles grâce à l'assise idéale du Toyota RAV4 Hybride, coffre spacieux pour fauteuil roulant pliable."
  },
  {
    id: "cpam-mondor-paris",
    category: "cpam",
    from: "Domicile (Orly & Val-de-Marne 94)",
    to: "CHU Henri Mondor (Créteil), Pitié-Salpêtrière, Cochin, Curie...",
    duration: "20 - 35 min",
    priceLabel: "0 € d'avance",
    priceSub: "Tiers Payant Sécurité Sociale",
    badge: "Conventionné CPAM",
    pickupId: "orly-ville",
    dropoffId: "mondor",
    isCpam: true,
    description:
      "Plus de 10 ans d'expérience dans l'accompagnement médical : ponctualité, conduite hybride souple et silencieuse."
  }
];

export const HOSPITALS_SERVED = [
  { name: "Institut Gustave Roussy", city: "Villejuif (94)", specialty: "Oncologie, Consultations & Hôpital de jour" },
  { name: "CHU Hôpital Henri Mondor", city: "Créteil (94)", specialty: "Toutes spécialités AP-HP & Consultations" },
  { name: "Hôpital Bicêtre (AP-HP)", city: "Le Kremlin-Bicêtre (94)", specialty: "Consultations spécialisées, Pédiatrie & Chirurgie" },
  { name: "Hôpital Pitié-Salpêtrière & Saint-Antoine", city: "Paris 13e / 12e", specialty: "Neurologie, Cardiologie, Orthopédie" },
  { name: "Institut Curie, Hôpital Cochin & Necker", city: "Paris 5e / 14e / 15e", specialty: "Soins réguliers, Radiothérapie, Pédiatrie" },
  { name: "Hôpital Privé de Thiais & Cliniques du 94", city: "Thiais, Vitry, Choisy, Antony", specialty: "Dialyse, Kinésithérapie, Ambulatoire & Rééducation" }
];

export const FAQ_ITEMS = [
  {
    question: "Comment sont calculés vos tarifs de Taxi Parisien (Forfaits Orly & Compteur) ?",
    answer:
      "En tant qu'Artisan Taxi Parisien officiel (+ de 10 ans d'expérience), nos prix suivent strictement la grille de la Préfecture de Police : Forfait fixe de 36 € entre l'Aéroport d'Orly et Paris Rive Gauche, et 45 € entre Orly et Paris Rive Droite (56 € / 65 € pour Roissy CDG). Hors forfait, le tarif s'établit au compteur : Prise en charge de 3,00 € + Tarif A (1,30 €/km), Tarif B (1,66 €/km) ou Tarif C (1,76 €/km). Les bagages et fauteuils pliables dans le coffre du Toyota RAV4 Hybride sont gratuits."
  },
  {
    question: "Pourquoi le Toyota RAV4 Hybride est-il idéal pour les trajets aéroports et médicaux CPAM ?",
    answer:
      "Le Toyota RAV4 Hybride combine une motorisation ultra-silencieuse et sans à-coups avec un grand coffre plat à large ouverture (idéal pour 4 à 5 valises ou un fauteuil roulant pliable). De plus, sa hauteur d'assise intermédiaire permet aux patients et personnes âgées de s'asseoir et de sortir du véhicule sans effort, sans avoir à se baisser dans une voiture basse ni grimper dans un van."
  },
  {
    question: "Comment fonctionne la prise en charge en Taxi Conventionné CPAM avec Hocine Ferhat ?",
    answer:
      "Munissez-vous de votre prescription médicale de transport (Bon de transport Cerfa) établie par votre médecin AVANT le déplacement, ainsi que de votre Carte Vitale à jour. Grâce au Tiers Payant CPAM, vous n'avez aucune avance de frais à effectuer (prise en charge à 100% en ALD, maternité, accident du travail, ou 65% + mutuelle)."
  },
  {
    question: "Effectuez-vous des trajets longue distance hors Île-de-France ?",
    answer:
      "Oui, tout à fait ! En plus du secteur d'Orly (94310), du Val-de-Marne (94) et des gares et aéroports d'Île-de-France, Hocine Ferhat assure vos trajets toutes distances (vers la Province ou les régions voisines) sur simple demande et réservation préalable au 06 78 90 10 40."
  },
  {
    question: "Quels sont les moyens de paiement acceptés à bord ?",
    answer:
      "Le véhicule est équipé d'un terminal bancaire acceptant toutes les Cartes Bancaires (Visa, Mastercard, Sans Contact, Apple Pay) ainsi que les espèces. Attention : les chèques ne sont pas acceptés. Une note/facture officielle vous est remise sur simple demande."
  }
];
