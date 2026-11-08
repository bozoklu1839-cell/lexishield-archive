import { useState, useEffect } from "react";

export default function App() {
  const stripeUrl = "https://buy.stripe.com/28EdRb53W7qK1LGfeeeEo07";
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("access") === "PAKET2026") {
      setHasAccess(true);
      localStorage.setItem("lexishield_access", "1");
      window.history.replaceState({}, "", window.location.pathname);
    } else if (localStorage.getItem("lexishield_access") === "1") {
      setHasAccess(true);
    }
  }, []);

  useEffect(() => {
    if (hasAccess) return;
    const blockContext = (e) => e.preventDefault();
    const blockCopy = (e) => e.preventDefault();
    const blockKeys = (e) => {
      const k = e.key.toLowerCase();
      if ((e.ctrlKey || e.metaKey) && ["c", "x", "s", "p", "a", "u"].includes(k)) e.preventDefault();
      if (k === "f12") e.preventDefault();
    };
    document.addEventListener("contextmenu", blockContext);
    document.addEventListener("copy", blockCopy);
    document.addEventListener("cut", blockCopy);
    document.addEventListener("keydown", blockKeys);
    const style = document.createElement("style");
    style.id = "lexishield-protect";
    style.innerHTML = `* { user-select: none; } @media print { body * { display: none !important; } }`;
    document.head.appendChild(style);
    return () => {
      document.removeEventListener("contextmenu", blockContext);
      document.removeEventListener("copy", blockCopy);
      document.removeEventListener("cut", blockCopy);
      document.removeEventListener("keydown", blockKeys);
      document.getElementById("lexishield-protect")?.remove();
    };
  }, [hasAccess]);

  const docs = [
    { id: 1, title: "Registre des Activités de Traitement", ref: "MOD-01-2026", cat: "RGPD / Article 30", c1: "TR-01 (Gestion Clients)", c2: "Facturation & Commandes", c3: "Obligation légale (Art. 6-1-c)", c4: "10 ans (Code de Commerce)", a: [{t: "Article 1 — Objet du Registre", c: "Le présent registre répertorie de manière exhaustive l'ensemble des opérations de traitement de données à caractère personnel conformément à l'article 30 du RGPD."}, {t: "Article 2 — Catégories de Personnes & Données", c: "Sont collectées l'identité, les coordonnées professionnelles, les adresses IP et les informations de paiement nécessaires à l'exécution du service."}, {t: "Article 3 — Mesures de Sécurité & Destinataires", c: "Chiffrement AES-256 au repos, protocoles TLS 1.3 en transit, accès restreints selon le principe du moindre privilège."}] },
    { id: 2, title: "Politique de Confidentialité Web & Mobile", ref: "MOD-02-2026", cat: "RGPD / Articles 12, 13 & 14", c1: "Visiteurs & Acheteurs", c2: "Information transparente", c3: "Obligation de transparence", c4: "Durée de la session + 3 ans", a: [{t: "Article 1 — Principes Directeurs", c: "Information claire et intelligible remise aux usagers concernant la collecte, le traitement et la sauvegarde de leurs données sensibles."}, {t: "Article 2 — Droits Informatique et Libertés", c: "Droit d'accès, de rectification, d'effacement (droit à l'oubli), d'opposition et de portabilité exerçable à tout moment auprès du DPO."}, {t: "Article 3 — Transferts Hors Union Européenne", c: "Absence de transfert hors EEE sans Clauses Contractuelles Types de la Commission Européenne ou décision d'adéquation préalable."}] },
    { id: 3, title: "Bandeau Cookies & CMP Consent Management", ref: "MOD-03-2026", cat: "Loi Informatique et Libertés", c1: "Traceurs Analytiques & Pub", c2: "Recueil du Consentement", c3: "Consentement libre (Art. 4-11)", c4: "Validité 6 mois maximum", a: [{t: "Article 1 — Mécanisme de Consentement Valide", c: "Refus aussi simple que l'acceptation ('Tout refuser' au même niveau visuel que 'Tout accepter') sans traceur déposé avant accord explicite."}, {t: "Article 2 — Conservation des Preuves", c: "Enregistrement cryptographique horodaté de l'état de consentement de l'internaute stocké aux fins de contrôle de la CNIL."}, {t: "Article 3 — Traceurs Essentiels Exemptés", c: "Dérogation stricte limitée aux cookies d'authentification et de panier d'achat indispensables à la fourniture directe de la prestation."}] },
    { id: 4, title: "Contrat de Sous-Traitance (DPA B2B)", ref: "MOD-04-2026", cat: "RGPD / Article 28", c1: "Prestataires Cloud & IT", c2: "Sécurisation Traitement", c3: "Relation Contractuelle", c4: "Durée du contrat cadre", a: [{t: "Article 1 — Instructions Documentées", c: "Le sous-traitant s'engage à ne traiter les données que sur instruction écrite formelle du responsable de traitement."}, {t: "Article 2 — Confidentialité et Assistance", c: "Obligation de secret professionnel pour le personnel et assistance directe lors des analyses d'impact et audits de conformité."}, {t: "Article 3 — Sort des Données à Terme", c: "Restitution complète des données ou destruction certifiée avec procès-verbal d'incinération numérique selon le choix du client."}] },
    { id: 5, title: "AIPD / DPIA - Analyse d'Impact", ref: "MOD-05-2026", cat: "RGPD / Article 35", c1: "Données Sensibles & IA", c2: "Mitigation des Risques", c3: "Évaluation de Conformité", c4: "Mise à jour bisannuelle", a: [{t: "Article 1 — Identification des Risques Systémiques", c: "Évaluation des menaces pesant sur les droits et libertés des personnes physiques par méthode EBIOS RM homologuée CNIL."}, {t: "Article 2 — Mesures de Protection Déployées", c: "Pseudonymisation immédiate, segmentation des bases réseau et journalisation immuable des accès utilisateurs."}, {t: "Article 3 — Avis Formel du DPO", c: "Validation préalable du délégué à la protection des données certifiant un niveau de risque résiduel acceptable."}] },
    { id: 6, title: "Notification de Violation de Données", ref: "MOD-06-2026", cat: "RGPD / Articles 33 & 34", c1: "Fuite de Données & Piratage", c2: "Alerte CNIL sous 72h", c3: "Urgence Réglementaire", c4: "Délai légal : 72 heures", a: [{t: "Article 1 — Détection et Escalade Immédiate", c: "Mobilisation de la cellule de crise dès la constatation d'un incident de sécurité affectant l'intégrité ou la confidentialité."}, {t: "Article 2 — Notification Officielle Téléservice CNIL", c: "Transmission du formulaire réglementaire sous 72 heures décrivant la nature de la brèche et le volume de personnes affectées."}, {t: "Article 3 — Information Individuelle des Victimes", c: "Communication directe et sans délai aux titulaires des données en présence d'un risque élevé d'usurpation d'identité."}] },
    { id: 7, title: "Politique de Sécurité des SI (PSSI)", ref: "MOD-07-2026", cat: "RGPD / Article 32 & NIS 2", c1: "Infrastructures Serveurs", c2: "Défense en Profondeur", c3: "Sécurité Opérationnelle", c4: "Audit annuel certifié", a: [{t: "Article 1 — Gestion des Identités et Accès", c: "Authentification multifacteur (MFA/FIDO2) obligatoire pour l'ensemble des administrateurs et collaborateurs habilités."}, {t: "Article 2 — Chiffrement et Sauvegardes", c: "Sauvegardes chiffrées immuables externalisées (3-2-1) imperméables aux attaques par ransomware."}, {t: "Article 3 — Veille Vulnérabilités & Patch", c: "Application systématique des correctifs de sécurité critiques dans un délai maximal de 48 heures après publication CVE."}] },
    { id: 8, title: "Formulaires d'Exercice des Droits", ref: "MOD-08-2026", cat: "RGPD / Chapitre III", c1: "Demandes d'Accès", c2: "Traitement des Requêtes", c3: "Obligation de Réponse", c4: "Délai légal : 30 jours", a: [{t: "Article 1 — Réception et Vérification", c: "Vérification stricte de l'identité du demandeur par moyen proportionné sans collecte excessive de pièces d'identité."}, {t: "Article 2 — Traitement et Export", c: "Fourniture des données personnelles dans un format lisible par machine (JSON / CSV standard) à titre gratuit."}, {t: "Article 3 — Registre des Refus", c: "Traçabilité des motifs légitimes en cas de refus d'effacement (contentieux en cours, obligations fiscales et légales)."}] },
    { id: 9, title: "Conservation et Purge des Données", ref: "MOD-09-2026", cat: "RGPD / Article 5-1-e", c1: "Cycles de Vie des Données", c2: "Purge & Destruction", c3: "Principe de Minimisation", c4: "Scripts de purge mensuels", a: [{t: "Article 1 — Définition des Paliers", c: "Base active (usage quotidien), archivage intermédiaire (obligations légales), destruction finale irréversible."}, {t: "Article 2 — Barèmes Sectoriels", c: "Clients inactifs purgés à 3 ans, documents comptables conservés 10 ans selon le Code de Commerce."}, {t: "Article 3 — Automatisation des Purges", c: "Exécution de scripts programmés de suppression définitive des métadonnées et fichiers expirés."}] },
    { id: 10, title: "Information & Consentement Salariés", ref: "MOD-10-2026", cat: "Code du Travail & RGPD RH", c1: "Dossiers Personnels & Paie", c2: "Gestion RH", c3: "Lien de Subordination", c4: "5 ans post-départ", a: [{t: "Article 1 — Information Préalable", c: "Notification individuelle des traitements RH, de la vidéosurveillance des locaux et des logiciels de télétravail."}, {t: "Article 2 — Données et Finalités", c: "Suivi des carrières, versement des rémunérations et déclarations sociales obligatoires auprès de l'URSSAF."}, {t: "Article 3 — Consultation du CSE", c: "Avis formel du Comité Social et Économique avant l'introduction de tout moyen de surveillance ou de contrôle biométrique."}] },
    { id: 11, title: "Charte Informatique Interne", ref: "MOD-11-2026", cat: "Règlement Intérieur", c1: "Postes de Travail", c2: "Usage Pro & Privé", c3: "Pouvoir de Direction", c4: "Annexe au contrat", a: [{t: "Article 1 — Règles d'Usage", c: "Utilisation loyale des ressources IT, interdiction de téléchargement de logiciels tiers non approuvés par la DSI."}, {t: "Article 2 — Usage Personnel", c: "Limitation raisonnable des communications privées dans des dossiers expressément balisés 'Personnel'."}, {t: "Article 3 — Sanctions", c: "Sanctions applicables en cas de violation avérée de la sécurité ou d'extraction non autorisée de fichiers confidentiels."}] },
    { id: 12, title: "Transferts Internationaux (CCT/SCC)", ref: "MOD-12-2026", cat: "RGPD / Chapitre V", c1: "Flux Transfrontaliers", c2: "Garanties d'Équivalence", c3: "Clauses Types Européennes", c4: "Revue annuelle des flux", a: [{t: "Article 1 — Cartographie des Flux", c: "Identification de tout accès direct ou distant par des prestataires opérant en dehors de l'Espace Économique Européen."}, {t: "Article 2 — Mise en Place des CCT", c: "Signature formelle des modules pertinents des clauses types de la Commission Européenne avec chaque cocontractant."}, {t: "Article 3 — Transfer Impact Assessment", c: "Évaluation du droit local du pays tiers quant aux risques d'accès par les agences de renseignement étrangères."}] },
    { id: 13, title: "Cybersécurité Télétravail & Nomadisme", ref: "MOD-13-2026", cat: "ANSSI & Directives", c1: "Connexions Distantes & VPN", c2: "Protection Périphérique", c3: "Sécurité Opérationnelle", c4: "Applicabilité permanente", a: [{t: "Article 1 — Sécurisation des Accès", c: "Obligation formelle d'utilisation d'un VPN chiffré entreprise et interdiction formelle des réseaux Wi-Fi publics ouverts."}, {t: "Article 2 — Protection Matérielle", c: "Verrouillage automatique des sessions après 3 minutes d'inactivité et interdiction de prêter l'ordinateur à des tiers."}, {t: "Article 3 — Signalement d'Incidents", c: "Procédure de déclaration d'urgence sous 2 heures en cas de perte, vol de terminal ou de comportement suspect."}] },
    { id: 14, title: "Clauses de Confidentialité (NDA)", ref: "MOD-14-2026", cat: "Code de Commerce", c1: "Savoir-faire & Finances", c2: "Non-Divulgation Stricte", c3: "Droit des Contrats", c4: "5 ans post-expiration", a: [{t: "Article 1 — Informations Protégées", c: "Protection absolue des algorithmes, secrets commerciaux, listes clients, données financières et stratégies produit."}, {t: "Article 2 — Non-Divulgation", c: "Interdiction de communication directe ou indirecte des données confidentielles à des tiers sans mandat exprès préalable."}, {t: "Article 3 — Pénalités", c: "Pénalité contractuelle forfaitaire immédiate et recours en référé pour cessation de trouble en cas d'infraction."}] },
    { id: 15, title: "Contrôle d'Accès (IAM)", ref: "MOD-15-2026", cat: "ISO/IEC 27001 & RGPD 32", c1: "Droits RBAC", c2: "Moindre Privilège", c3: "Contrôle Logique", c4: "Revue trimestrielle", a: [{t: "Article 1 — Attribution des Rôles", c: "Octroi d'accès strictement basé sur les besoins démontrés du poste (Role-Based Access Control - RBAC)."}, {t: "Article 2 — Révocation des Accès", c: "Suppression des comptes et droits réseau le jour même de la notification de départ ou de rupture de contrat."}, {t: "Article 3 — Audit des Privilèges", c: "Traçabilité intégrale et inaltérable des opérations effectuées par les administrateurs système et bases de données."}] },
    { id: 16, title: "Audit Interne de Conformité", ref: "MOD-16-2026", cat: "Gouvernance", c1: "Processus Internes", c2: "Vérification", c3: "Devoir de Vigilance", c4: "Rapport archivé 5 ans", a: [{t: "Article 1 — Périodicité", c: "Audit interne systématique annuel couvrant les flux RH, marketing, IT et la sécurité des données hébergées."}, {t: "Article 2 — Grille d'Évaluation", c: "Identification des non-conformités majeures et mineures avec attribution de plans d'action correctifs sous délai."}, {t: "Article 3 — Restitution", c: "Présentation des conclusions et arbitrage des investissements nécessaires à la résorption des vulnérabilités."}] },
    { id: 17, title: "CGV B2C (E-Commerce)", ref: "MOD-17-2026", cat: "Code de la Consommation", c1: "Transactions Particuliers", c2: "Cadre Contractuel B2C", c3: "Droit de la Consommation", c4: "Applicabilité en ligne", a: [{t: "Article 1 — Rétractation 14 Jours", c: "Délai de rétractation sans motif avec mise à disposition du formulaire standardisé et remboursement sous 14 jours."}, {t: "Article 2 — Garanties Légales", c: "Application de la garantie légale de conformité (2 ans sans preuve de défaut) et des vices cachés (Art. 1641 C. Civ.)."}, {t: "Article 3 — Médiation", c: "Désignation obligatoire et gratuite d'un médiateur de la consommation agréé en cas de litige non résolu à l'amiable."}] },
    { id: 18, title: "CGV B2B (Prestations & SaaS)", ref: "MOD-18-2026", cat: "Code de Commerce", c1: "Clients Pros & SaaS", c2: "Prestations", c3: "Liberté Contractuelle", c4: "Mise à jour annuelle", a: [{t: "Article 1 — Délais de Paiement", c: "Paiement à 30 jours, intérêts de retard au taux directeur BCE + 10 points et indemnité forfaitaire légale de 40 €."}, {t: "Article 2 — Responsabilité", c: "Plafond global de responsabilité expressément limité au montant des sommes versées au cours des 12 derniers mois."}, {t: "Article 3 — Juridiction", c: "Attribution exclusive de compétence matérielle et territoriale aux Tribunaux de Commerce français compétents."}] },
    { id: 19, title: "CGU (Plateforme)", ref: "MOD-19-2026", cat: "LCEN", c1: "Membres & Web", c2: "Accès Service", c3: "Régulation", c4: "Acceptation obligatoire", a: [{t: "Article 1 — Disponibilité", c: "Fourniture du service selon une obligation de moyens avec engagement de disponibilité cible de 99.5% hors maintenance."}, {t: "Article 2 — Propriété Intellectuelle", c: "L'ensemble des codes, marques, interfaces et structures demeure la propriété pleine et exclusive de l'éditeur."}, {t: "Article 3 — Résiliation", c: "Droit de suspension immédiate de l'accès en cas d'utilisation abusive, fraude ou violation avérée des stipulations des CGU."}] },
    { id: 20, title: "Bordereau de Rétractation", ref: "MOD-20-2026", cat: "Code de la Consommation", c1: "Annulation B2C", c2: "Droit de Retrait", c3: "Droit Impératif", c4: "Conservation 2 ans", a: [{t: "Article 1 — Modalités", c: "Notification claire par lettre recommandée ou formulaire électronique dédié sans justification requise."}, {t: "Article 2 — Restitution", c: "Renvoi des produits dans leur état d'origine sous un délai maximal de 14 jours suivant l'envoi de la décision."}, {t: "Article 3 — Remboursement", c: "Remboursement incluant les frais de livraison initiaux par le même moyen de paiement que celui utilisé lors de l'achat."}] },
    { id: 21, title: "Classification & Cartographie IA", ref: "MOD-21-2026", cat: "EU AI Act", c1: "LLM & Automatisation", c2: "Niveau de Risque", c3: "Obligation IA", c4: "Mise à jour trimestrielle", a: [{t: "Article 1 — Registre IA", c: "Inventaire exhaustif des modèles, API et automatisations algorithmiques intégrés dans les produits et flux internes."}, {t: "Article 2 — Typologie", c: "Catégorisation explicite : Risque Inacceptable (interdit), Haut Risque (obligations strictes), Risque Limité (transparence)."}, {t: "Article 3 — Conformité", c: "Désignation de la fonction interne garante du suivi des obligations et des audits de conformité de l'IA."}] },
    { id: 22, title: "Gouvernance des Outils IA", ref: "MOD-22-2026", cat: "EU AI Act 2026", c1: "Modèles & API", c2: "Traçabilité", c3: "Supervision Technique", c4: "Durée de vie du système", a: [{t: "Article 1 — Documentation", c: "Conservation des spécifications, architectures d'entraînement, prompts système et hyperparamètres critiques."}, {t: "Article 2 — Sous-Traitance", c: "Suivi des fournisseurs de modèles sous-jacents et vérification de leurs engagements en matière de conformité européenne."}, {t: "Article 3 — Auditabilité", c: "Enregistrement chronologique automatique des inférences et prédictions générées aux fins de vérification a posteriori."}] },
    { id: 23, title: "Transparence Utilisateur & IA", ref: "MOD-23-2026", cat: "EU AI Act", c1: "Chatbots & UI", c2: "Information Usagers", c3: "Transparence", c4: "Affichage permanent", a: [{t: "Article 1 — Notification", c: "Signalétique claire indiquant aux utilisateurs qu'ils interagissent avec un système automatisé ou un contenu synthétique."}, {t: "Article 2 — Marquage", c: "Watermarking et métadonnées normalisées intégrés aux textes, images et données synthétisées par les modèles."}, {t: "Article 3 — Explication Humaine", c: "Faculté offerte à l'utilisateur de demander une intervention humaine et l'explication des critères ayant conduit à la décision."}] },
    { id: 24, title: "Évaluation Conformité IA à Risque", ref: "MOD-24-2026", cat: "EU AI Act", c1: "Scoring & Crédit", c2: "Contrôle Strict", c3: "Pré-commercialisation", c4: "Conservation 10 ans", a: [{t: "Article 1 — Qualité des Données", c: "Contrôle rigoureux de représentativité, d'absence de biais discriminatoires et d'exhaustivité des corpus de données."}, {t: "Article 2 — Robustesse", c: "Résistance démontrée aux attaques contradictoires (adversarial attacks), aux injections de prompts et à la dérive de données."}, {t: "Article 3 — Marquage CE", c: "Établissement du dossier technique et apposition formelle du marquage CE avant mise sur le marché ou déploiement."}] },
    { id: 25, title: "Supervision Humaine des Systèmes IA", ref: "MOD-25-2026", cat: "EU AI Act", c1: "Opérateurs IA", c2: "Interruption d'Urgence", c3: "Contrôle Humain", c4: "Revue mensuelle", a: [{t: "Article 1 — Habilitation", c: "Formation certifiée des superviseurs à la compréhension des limites opérationnelles et des biais d'automatisation."}, {t: "Article 2 — Bouton d'Arrêt", c: "Possibilité d'interrompre l'exécution à tout instant ou de supplanter la décision algorithmique par un choix humain."}, {t: "Article 3 — Dérogations", c: "Rapport circonstancié dès qu'un superviseur annule ou modifie une décision recommandée par le moteur d'IA."}] },
    { id: 26, title: "Cybersécurité & Résilience IA", ref: "MOD-26-2026", cat: "ISO 42001", c1: "MLOps & API", c2: "Résistance", c3: "Sécurité IA", c4: "Tests semestriels", a: [{t: "Article 1 — Empoisonnement", c: "Vérification cryptographique de l'intégrité des datasets d'entraînement et filtrage des flux d'ingestion."}, {t: "Article 2 — Anti-Jailbreak", c: "Filtres sémantiques multicouches rejetant les instructions malveillantes visant à contourner les garde-fous éthiques."}, {t: "Article 3 — Plan de Continuité", c: "Bascule automatique instantanée sur des algorithmes déterministes de secours sans dégradation du service client."}] },
    { id: 27, title: "Déclaration Conformité IA", ref: "MOD-27-2026", cat: "EU AI Act Annex V", c1: "Homologation", c2: "Autorités", c3: "Juridique", c4: "Archivage 10 ans", a: [{t: "Article 1 — Attestation", c: "Engagement solennel de la direction juridique et technique attestant du respect absolu des dispositions du règlement IA."}, {t: "Article 2 — Transmission", c: "Transmission sans délai du dossier technique complet à la demande de la Commission Européenne ou de la CNIL."}, {t: "Article 3 — Sceau Numérique", c: "Horodatage cryptographique qualifié eIDAS garantissant l'intégrité inaltérable de la documentation de conformité."}] }
  ];

  if (selectedDoc) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#020617", color: "#f8fafc", fontFamily: "system-ui", padding: "16px" }}>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <button onClick={() => setSelectedDoc(null)} style={{ background: "#1e293b", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}>← Retour</button>
          <a href={stripeUrl} target="_blank" rel="noreferrer" style={{ backgroundColor: "#2563eb", color: "#fff", padding: "8px 16px", borderRadius: "8px", textDecoration: "none", fontWeight: "bold", fontSize: "12px" }}>Acheter (€790)</a>
        </header>
        <main style={{ maxWidth: "800px", margin: "0 auto", backgroundColor: "#fff", color: "#000", borderRadius: "12px", overflow: "hidden", padding: "20px" }}>
          <div style={{ color: "#2563eb", fontWeight: "bold", fontSize: "12px" }}>{selectedDoc.cat}</div>
          <h1 style={{ fontSize: "20px", fontWeight: "900", margin: "8px 0" }}>{selectedDoc.title}</h1>
          <div style={{ backgroundColor: "#0f172a", color: "#fff", display: "inline-block", padding: "4px 8px", borderRadius: "4px", fontSize: "12px", fontFamily: "monospace" }}>{selectedDoc.ref}</div>
          
          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px", fontSize: "12px" }}>
            <tbody>
              <tr style={{ backgroundColor: "#f1f5f9" }}><td style={{ padding: "8px", border: "1px solid #ccc", fontWeight: "bold" }}>Traitement</td><td style={{ padding: "8px", border: "1px solid #ccc" }}>{selectedDoc.c1}</td></tr>
              <tr><td style={{ padding: "8px", border: "1px solid #ccc", fontWeight: "bold" }}>Finalité</td><td style={{ padding: "8px", border: "1px solid #ccc" }}>{selectedDoc.c2}</td></tr>
              <tr style={{ backgroundColor: "#f1f5f9" }}><td style={{ padding: "8px", border: "1px solid #ccc", fontWeight: "bold" }}>Base Légale</td><td style={{ padding: "8px", border: "1px solid #ccc" }}>{selectedDoc.c3}</td></tr>
              <tr><td style={{ padding: "8px", border: "1px solid #ccc", fontWeight: "bold" }}>Conservation</td><td style={{ padding: "8px", border: "1px solid #ccc" }}>{selectedDoc.c4}</td></tr>
            </tbody>
          </table>

          <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
            {selectedDoc.a.map((art, i) => (
              <div key={i}>
                <div style={{ fontWeight: "bold", fontSize: "14px", color: "#1e293b" }}>{art.t}</div>
                <div style={{ fontSize: "13px", color: "#333", lineHeight: 1.5 }}>{art.c}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "30px", borderTop: "2px dashed #ccc", paddingTop: "10px", display: "flex", justifyContent: "space-between", fontSize: "10px", color: "#666" }}>
            <span>CERTIFIÉ CONFORME<br/><b>LEXISHIELD</b></span>
            <span>Direction Juridique<br/><b>Legal SAS</b></span>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#020617", color: "#f8fafc", padding: "16px", fontFamily: "system-ui" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <div>
          <div style={{ color: "#60a5fa", fontSize: "10px", fontWeight: "bold", letterSpacing: "1px" }}>CATALOGUE 2026</div>
          <div style={{ fontSize: "16px", fontWeight: "900" }}>LEXISHIELD (27)</div>
        </div>
        <a href={stripeUrl} target="_blank" rel="noreferrer" style={{ backgroundColor: "#2563eb", color: "#fff", padding: "8px 16px", borderRadius: "8px", fontWeight: "bold", textDecoration: "none", fontSize: "12px" }}>Acheter le Pack (€790)</a>
      </header>
      <main style={{ maxWidth: "800px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "10px" }}>
        {docs.map(doc => (
          <div key={doc.id} onClick={() => setSelectedDoc(doc)} style={{ backgroundColor: "#0f172a", padding: "15px", borderRadius: "8px", cursor: "pointer", border: "1px solid #1e293b", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ color: "#3b82f6", fontSize: "10px", fontWeight: "bold", fontFamily: "monospace" }}>{doc.ref} • {doc.id}/27</div>
              <div style={{ fontSize: "14px", fontWeight: "bold", marginTop: "4px" }}>{doc.title}</div>
            </div>
            <div style={{ fontSize: "20px", color: "#60a5fa" }}>→</div>
          </div>
        ))}
      </main>
    </div>
  );
}
