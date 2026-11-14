import React from "react";
import { X, Scale, ShieldCheck, Lock, FileText, AlertCircle } from "lucide-react";
import { DRIVER_INFO, OFFICIAL_TAXI_RATES } from "../data/taxiData";

export default function LegalModals({ activeModal, onClose }) {
  if (!activeModal) return null;

  return (
    <div
      className="legal-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
    >
      <div className="legal-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="legal-modal-header">
          <div className="legal-modal-title-group">
            {activeModal === "mentions" && <Scale size={22} className="icon-gold" />}
            {activeModal === "rgpd" && <Lock size={22} className="icon-cpam" />}
            {activeModal === "tarifs" && <FileText size={22} className="icon-gold" />}
            <h3 id="legal-modal-title">
              {activeModal === "mentions" && "Mentions Légales & Informations Réglementaires"}
              {activeModal === "rgpd" && "Politique de Confidentialité & Protection des Données (RGPD)"}
              {activeModal === "tarifs" && "Conditions Générales, Barème Préfectoral & Réclamations"}
            </h3>
          </div>
          <button type="button" className="legal-close-btn" onClick={onClose} aria-label="Fermer la fenêtre">
            <X size={20} />
          </button>
        </div>

        <div className="legal-modal-body">
          {activeModal === "mentions" && (
            <div className="legal-content-flow">
              <div className="legal-block">
                <h4>1. Éditeur du Site (Conformément à la loi n° 2004-575 du 21 juin 2004 - LCEN)</h4>
                <ul>
                  <li>
                    <strong>Nom & Prénom / Raison sociale :</strong> {DRIVER_INFO.name} — Artisan Taxi Parisien
                    Indépendant
                  </li>
                  <li>
                    <strong>Activité réglementée :</strong> Transport de voyageurs par taxis (Code APE / NAF : 4932Z) —
                    Autorisation de Stationnement (ADS) délivrée par la Préfecture de Police de Paris • Conventionné
                    Assurance Maladie (CPAM) pour le Transport Assis Professionnel (TAP).
                  </li>
                  <li>
                    <strong>Zone de rattachement & intervention :</strong> {DRIVER_INFO.baseCity} (Île-de-France)
                  </li>
                  <li>
                    <strong>Téléphone :</strong> <a href={DRIVER_INFO.phoneHref}>{DRIVER_INFO.phoneDisplay}</a>
                  </li>
                  <li>
                    <strong>Adresse électronique :</strong> <a href={`mailto:${DRIVER_INFO.email}`}>{DRIVER_INFO.email}</a>
                  </li>
                  <li>
                    <strong>Directeur de la publication :</strong> {DRIVER_INFO.name}
                  </li>
                </ul>
              </div>

              <div className="legal-block">
                <h4>2. Assurance Professionnelle Obligatoire</h4>
                <p>
                  Conformément à la réglementation du Code des transports, le véhicule{" "}
                  <strong>{DRIVER_INFO.vehicleName}</strong> exploité par {DRIVER_INFO.name} bénéficie d'une assurance
                  Responsabilité Civile Professionnelle spécifique au transport public particulier de personnes à titre
                  onéreux, couvrant de manière illimitée les dommages corporels des passagers transportés.
                </p>
              </div>

              <div className="legal-block">
                <h4>3. Hébergement & Sécurité</h4>
                <p>
                  Ce site internet fonctionne selon une architecture statique sécurisée (HTTPS / TLS) sans base de
                  données tierce exposée. L'hébergeur technique assure la disponibilité et l'intégrité du service
                  conformément aux normes européennes en vigueur.
                </p>
              </div>

              <div className="legal-block">
                <h4>4. Propriété Intellectuelle</h4>
                <p>
                  L'ensemble des textes, éléments graphiques, logos et structures composant le site{" "}
                  <strong>{DRIVER_INFO.brand}</strong> sont protégés par le Code de la propriété intellectuelle. Toute
                  reproduction non autorisée est strictement interdite.
                </p>
              </div>
            </div>
          )}

          {activeModal === "rgpd" && (
            <div className="legal-content-flow">
              <div className="legal-alert-cpam">
                <ShieldCheck size={20} />
                <span>
                  <strong>Architecture Zéro Stockage Serveur :</strong> Ce site ne stocke aucune donnée personnelle ni
                  médicale dans une base de données en ligne et n'utilise aucun cookie publicitaire ou traceur tiers.
                </span>
              </div>

              <div className="legal-block">
                <h4>1. Responsable du Traitement des Données</h4>
                <p>
                  Le responsable du traitement des informations que vous transmettez lors d'une demande de réservation
                  est <strong>{DRIVER_INFO.name}</strong> ({DRIVER_INFO.email} — {DRIVER_INFO.phoneDisplay}).
                </p>
              </div>

              <div className="legal-block">
                <h4>2. Données Collectées & Finalités (RGPD - Règlement UE 2016/679)</h4>
                <p>
                  Lorsque vous utilisez le simulateur de course sur ce site, les informations saisies (lieu de départ,
                  destination, date, heure, nom, téléphone, options CPAM) sont traitées <strong>localement sur votre
                  propre appareil (navigateur)</strong> afin de générer votre message de réservation (WhatsApp, SMS ou
                  E-mail).
                </p>
                <p>
                  Ces informations sont utilisées exclusivement pour :
                </p>
                <ul>
                  <li>Organiser votre prise en charge ponctuelle et le suivi de votre vol ou train.</li>
                  <li>
                    Établir la facturation réglementaire ou le dossier de Tiers Payant auprès de la Caisse Primaire
                    d'Assurance Maladie (CPAM) dans le cadre d'un transport médical conventionné.
                  </li>
                </ul>
              </div>

              <div className="legal-block">
                <h4>3. Secret Professionnel & Données de Santé (Transport CPAM)</h4>
                <p>
                  En qualité d'Artisan Taxi Conventionné CPAM, <strong>{DRIVER_INFO.name}</strong> est tenu à une
                  stricte obligation de discrétion et de confidentialité concernant l'identité des patients, les
                  établissements hospitaliers fréquentés et les prescriptions médicales de transport (Cerfa).
                </p>
              </div>

              <div className="legal-block">
                <h4>4. Vos Droits (Accès, Rectification, Suppression)</h4>
                <p>
                  Conformément à la loi « Informatique et Libertés » et au RGPD, vous disposez d'un droit d'accès, de
                  rectification et de suppression des données vous concernant en contactant directement{" "}
                  <a href={`mailto:${DRIVER_INFO.email}`}>{DRIVER_INFO.email}</a>. Vous pouvez également introduire une
                  réclamation auprès de la CNIL (www.cnil.fr).
                </p>
              </div>
            </div>
          )}

          {activeModal === "tarifs" && (
            <div className="legal-content-flow">
              <div className="legal-block">
                <h4>1. Barème Officiel des Taxis Parisiens (Arrêté Préfectoral en vigueur)</h4>
                <p>
                  Les tarifs pratiqués à bord du véhicule <strong>{DRIVER_INFO.vehicleName}</strong> sont strictement
                  réglementés par la Préfecture de Police de Paris et la DGCCRF :
                </p>
                <ul>
                  <li>
                    <strong>Prise en charge initiale :</strong> {OFFICIAL_TAXI_RATES.priseEnCharge.toFixed(2)} € (Minimum
                    de perception réglementaire : {OFFICIAL_TAXI_RATES.minimumPerception.toFixed(2)} €).
                  </li>
                  <li>
                    <strong>Tarif A ({OFFICIAL_TAXI_RATES.tarifsKm.A.perKm.toFixed(2)} €/km) :</strong>{" "}
                    {OFFICIAL_TAXI_RATES.tarifsKm.A.label}.
                  </li>
                  <li>
                    <strong>Tarif B ({OFFICIAL_TAXI_RATES.tarifsKm.B.perKm.toFixed(2)} €/km) :</strong>{" "}
                    {OFFICIAL_TAXI_RATES.tarifsKm.B.label}.
                  </li>
                  <li>
                    <strong>Tarif C ({OFFICIAL_TAXI_RATES.tarifsKm.C.perKm.toFixed(2)} €/km) :</strong>{" "}
                    {OFFICIAL_TAXI_RATES.tarifsKm.C.label}.
                  </li>
                  <li>
                    <strong>Forfaits Aéroports obligatoires (dans les deux sens) :</strong> Aéroport Paris-Orly ↔ Paris
                    Rive Gauche : <strong>36,00 €</strong> • Paris-Orly ↔ Paris Rive Droite : <strong>45,00 €</strong> •
                    Aéroport Roissy CDG ↔ Paris Rive Droite : <strong>56,00 €</strong> • Roissy CDG ↔ Paris Rive Gauche :{" "}
                    <strong>65,00 €</strong>.
                  </li>
                  <li>
                    <strong>Suppléments de réservation (approche) :</strong> Réservation immédiate :{" "}
                    <strong>4,00 €</strong> • Réservation à l'avance : <strong>7,00 €</strong>.
                  </li>
                  <li>
                    <strong>Bagages & Fauteuil roulant pliable :</strong> Gratuits (0,00 €). Aucun supplément passager
                    jusqu'à 4 personnes.
                  </li>
                </ul>
              </div>

              <div className="legal-block">
                <h4>2. Moyens de Paiement & Note de Course</h4>
                <p>
                  Conformément à l'article L.3121-11-2 du Code des transports, le paiement par{" "}
                  <strong>Carte Bancaire</strong> est accepté quel que soit le montant de la course, ainsi que le
                  paiement en <strong>Espèces</strong> et le <strong>Tiers Payant CPAM</strong> (les chèques ne sont pas
                  acceptés). Une note détaillée imprimée par le taximètre est délivrée automatiquement pour toute course
                  supérieure ou égale à 25 € TTC (ou sur simple demande dès le 1er euro).
                </p>
              </div>

              <div className="legal-block">
                <h4>3. Médiation de la Consommation & Réclamations Préfecture</h4>
                <p>
                  Conformément aux articles L.616-1 et R.616-1 du Code de la consommation, en cas de litige non résolu à
                  l'amiable avec le chauffeur, le client consommateur peut saisir gratuitement le médiateur de la
                  consommation compétent dont relève l'artisan taxi.
                </p>
                <div className="prefecture-notice">
                  <AlertCircle size={18} />
                  <span>
                    Pour toute observation relative à une course de Taxi Parisien (en indiquant le numéro d'autorisation
                    de stationnement figurant sur la note) :{" "}
                    <strong>
                      Préfecture de Police de Paris — Bureau des Taxis et Transports Publics (BTTP), 36 rue des
                      Morillons, 75732 Paris Cedex 15
                    </strong>
                    .
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="legal-modal-footer">
          <button type="button" className="btn btn-primary" onClick={onClose}>
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
