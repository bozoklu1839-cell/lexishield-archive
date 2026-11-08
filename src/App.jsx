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
    const blockPrint = () => {
      document.body.setAttribute("data-printing", "true");
      setTimeout(() => document.body.removeAttribute("data-printing"), 1000);
    };
    document.addEventListener("contextmenu", blockContext);
    document.addEventListener("copy", blockCopy);
    document.addEventListener("cut", blockCopy);
    document.addEventListener("keydown", blockKeys);
    window.addEventListener("beforeprint", blockPrint);
    const style = document.createElement("style");
    style.id = "lexishield-protect";
    style.innerHTML = `
      * { -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; }
      img { -webkit-user-drag: none; pointer-events: none; }
      @media print { body * { display: none !important; } body::after { content: "Protégé"; display: block !important; font-size: 24px; } }
    `;
    document.head.appendChild(style);
    return () => {
      document.removeEventListener("contextmenu", blockContext);
      document.removeEventListener("copy", blockCopy);
      document.removeEventListener("cut", blockCopy);
      document.removeEventListener("keydown", blockKeys);
      window.removeEventListener("beforeprint", blockPrint);
      const s = document.getElementById("lexishield-protect");
      if (s) s.remove();
    };
  }, [hasAccess]);

  const docs = [
    { id: 1, title: "Registre des Activités de Traitement", ref: "MOD-01-2026", cat: "RGPD / Article 30 - Protection des Données", image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80", col1: "TR-01 (Gestion Clients)", col2: "Facturation & Commandes", col3: "Obligation légale (Art. 6-1-c)", col4: "10 ans (Code de Commerce)", articles: [{ t: "Article 1 — Objet du Registre", c: "Le présent registre répertorie de manière exhaustive l'ensemble des opérations de traitement de données à caractère personnel conformément à l'article 30 du RGPD." }, { t: "Article 2 — Catégories de Personnes & Données", c: "Sont collectées l'identité, les coordonnées professionnelles, les adresses IP et les informations de paiement nécessaires à l'exécution du service." }, { t: "Article 3 — Mesures de Sécurité & Destinataires", c: "Chiffrement AES-256 au repos, protocoles TLS 1.3 en transit, accès restreints selon le principe du moindre privilège." }] },
    { id: 2, title: "Politique de Confidentialité Web & Mobile", ref: "MOD-02-2026", cat: "RGPD / Articles 12, 13 & 14 - Droits des Usagers", image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80", col1: "Visiteurs & Acheteurs", col2: "Information transparente", col3: "Obligation de transparence", col4: "Durée de la session + 3 ans", articles: [{ t: "Article 1 — Principes Directeurs", c: "Information claire et intelligible remise aux usagers concernant la collecte, le traitement et la sauvegarde de leurs données sensibles." }, { t: "Article 2 — Droits Informatique et Libertés", c: "Droit d'accès, de rectification, d'effacement (droit à l'oubli), d'opposition et de portabilité exerçable à tout moment auprès du DPO." }, { t: "Article 3 — Transferts Hors Union Européenne", c: "Absence de transfert hors EEE sans Clauses Contractuelles Types de la Commission Européenne ou décision d'adéquation préalable." }] },
    { id: 3, title: "Bandeau Cookies & CMP Consent Management", ref: "MOD-03-2026", cat: "Loi Informatique et Libertés / Lignes CNIL 2026", image: "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=800&q=80", col1: "Traceurs Analytiques & Pub", col2: "Recueil du Consentement", col3: "Consentement libre (Art. 4-11)", col4: "Validité 6 mois maximum", articles: [{ t: "Article 1 — Mécanisme de Consentement Valide", c: "Refus aussi simple que l'acceptation ('Tout refuser' au même niveau visuel que 'Tout accepter') sans traceur déposé avant accord explicite." }, { t: "Article 2 — Conservation des Preuves", c: "Enregistrement cryptographique horodaté de l'état de consentement de l'internaute stocké aux fins de contrôle de la CNIL." }, { t: "Article 3 — Traceurs Essentiels Exemptés", c: "Dérogation stricte limitée aux cookies d'authentification et de panier d'achat indispensables à la fourniture directe de la prestation." }] },
    { id: 4, title: "Contrat de Sous-Traitance (DPA B2B)", ref: "MOD-04-2026", cat: "RGPD / Article 28 - Relations Fournisseurs", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80", col1: "Prestataires Cloud & IT", col2: "Sécurisation Traitement", col3: "Relation Contractuelle", col4: "Durée du contrat cadre", articles: [{ t: "Article 1 — Instructions Documentées", c: "Le sous-traitant s'engage à ne traiter les données que sur instruction écrite formelle du responsable de traitement." }, { t: "Article 2 — Confidentialité et Assistance", c: "Obligation de secret professionnel pour le personnel et assistance directe lors des analyses d'impact et audits de conformité." }, { t: "Article 3 — Sort des Données à Terme", c: "Restitution complète des données ou destruction certifiée avec procès-verbal d'incinération numérique selon le choix du client." }] },
    { id: 5, title: "AIPD / DPIA - Analyse d'Impact sur la Vie Privée", ref: "MOD-05-2026", cat: "RGPD / Article 35 - Risques Élevés", image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=800&q=80", col1: "Données Sensibles & IA", col2: "Mitigation des Risques", col3: "Évaluation de Conformité", col4: "Mise à jour bisannuelle", articles: [{ t: "Article 1 — Identification des Risques Systémiques", c: "Évaluation des menaces pesant sur les droits et libertés des personnes physiques par méthode EBIOS RM homologuée CNIL." }, { t: "Article 2 — Mesures de Protection Déployées", c: "Pseudonymisation immédiate, segmentation des bases réseau et journalisation immuable des accès utilisateurs." }, { t: "Article 3 — Avis Formel du DPO", c: "Validation préalable du délégué à la protection des données certifiant un niveau de risque résiduel acceptable." }] },
    { id: 6, title: "Procédure de Notification de Violation de Données", ref: "MOD-06-2026", cat: "RGPD / Articles 33 & 34 - Gestion de Crise", image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&q=80", col1: "Fuite de Données & Piratage", col2: "Alerte CNIL sous 72h", col3: "Urgence Réglementaire", col4: "Délai légal : 72 heures", articles: [{ t: "Article 1 — Détection et Escalade Immédiate", c: "Mobilisation de la cellule de crise dès la constatation d'un incident de sécurité affectant l'intégrité ou la confidentialité." }, { t: "Article 2 — Notification Officielle Téléservice CNIL", c: "Transmission du formulaire réglementaire sous 72 heures décrivant la nature de la brèche et le volume de personnes affectées." }, { t: "Article 3 — Information Individuelle des Victimes", c: "Communication directe et sans délai aux titulaires des données en présence d'un risque élevé d'usurpation d'identité." }] },
    { id: 7, title: "Politique de Sécurité des SI (PSSI)", ref: "MOD-07-2026", cat: "RGPD / Article 32 & Directive NIS 2", image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80", col1: "Infrastructures Serveurs & App", col2: "Défense en Profondeur", col3: "Sécurité Opérationnelle", col4: "Audit annuel certifié", articles: [{ t: "Article 1 — Gestion des Identités et Accès", c: "Authentification multifacteur (MFA/FIDO2) obligatoire pour l'ensemble des administrateurs et collaborateurs habilités." }, { t: "Article 2 — Chiffrement et Sauvegardes", c: "Sauvegardes chiffrées immuables externalisées (3-2-1) imperméables aux attaques par ransomware." }, { t: "Article 3 — Veille Vulnérabilités & Patch Management", c: "Application systématique des correctifs de sécurité critiques dans un délai maximal de 48 heures après publication CVE." }] },
    { id: 8, title: "Formulaires d'Exercice des Droits des Usagers", ref: "MOD-08-2026", cat: "RGPD / Chapitre III - Droits de la Personne", image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80", col1: "Demandes d'Accès & Droit à l'Oubli", col2: "Traitement des Requêtes", col3: "Obligation de Réponse", col4: "Délai légal : 30 jours", articles: [{ t: "Article 1 — Réception et Vérification d'Identité", c: "Vérification stricte de l'identité du demandeur par moyen proportionné sans collecte excessive de pièces d'identité." }, { t: "Article 2 — Traitement et Export Structuré", c: "Fourniture des données personnelles dans un format lisible par machine (JSON / CSV standard) à titre gratuit." }, { t: "Article 3 — Registre des Refus Motivés", c: "Traçabilité des motifs légitimes en cas de refus d'effacement (contentieux en cours, obligations fiscales et légales)." }] },
    { id: 9, title: "Politique de Conservation et Purge des Données", ref: "MOD-09-2026", cat: "RGPD / Article 5-1-e & Référentiels CNIL", image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80", col1: "Cycles de Vie des Données", col2: "Purge & Destruction", col3: "Principe de Minimisation", col4: "Scripts de purge mensuels", articles: [{ t: "Article 1 — Définition des Paliers Temporels", c: "Base active (usage quotidien), archivage intermédiaire (obligations légales), destruction finale irréversible." }, { t: "Article 2 — Barèmes Sectoriels Réglementaires", c: "Clients inactifs purgés à 3 ans, documents comptables conservés 10 ans selon le Code de Commerce." }, { t: "Article 3 — Automatisation des Purges", c: "Exécution de scripts programmés de suppression définitive des métadonnées et fichiers expirés." }] },
    { id: 10, title: "Mentions d'Information & Consentement Salariés", ref: "MOD-10-2026", cat: "Code du Travail & RGPD RH", image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80", col1: "Dossiers Personnels & Paie", col2: "Gestion des Ressources Humaines", col3: "Lien de Subordination", col4: "5 ans post-départ", articles: [{ t: "Article 1 — Information Préalable du Personnel", c: "Notification individuelle des traitements RH, de la vidéosurveillance des locaux et des logiciels de télétravail." }, { t: "Article 2 — Données Recueillies et Finalités", c: "Suivi des carrières, versement des rémunérations et déclarations sociales obligatoires auprès de l'URSSAF." }, { t: "Article 3 — Consultation du CSE", c: "Avis formel du Comité Social et Économique avant l'introduction de tout moyen de surveillance ou de contrôle biométrique." }] },
    { id: 11, title: "Charte Informatique Interne & Outils Connectés", ref: "MOD-11-2026", cat: "Règlement Intérieur & Sécurité Juridique", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80", col1: "Postes de Travail & Téléphonie", col2: "Usage Professionnel & Privé", col3: "Pouvoir de Direction", col4: "Annexe au contrat de travail", articles: [{ t: "Article 1 — Règles d'Usage des Équipements", c: "Utilisation loyale des ressources IT, interdiction de téléchargement de logiciels tiers non approuvés par la DSI." }, { t: "Article 2 — Tolérance de l'Usage Personnel Résiduel", c: "Limitation raisonnable des communications privées dans des dossiers expressément balisés 'Personnel'." }, { t: "Article 3 — Sanctions Disciplinaires", c: "Sanctions applicables en cas de violation avérée de la sécurité ou d'extraction non autorisée de fichiers confidentiels." }] },
    { id: 12, title: "Procédures de Transferts Internationaux (CCT/SCC)", ref: "MOD-12-2026", cat: "RGPD / Chapitre V - Décision Schrems II", image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&q=80", col1: "Flux de Données Transfrontaliers", col2: "Garanties d'Équivalence", col3: "Clauses Types Européennes", col4: "Revue annuelle des flux", articles: [{ t: "Article 1 — Cartographie des Flux Hors UE", c: "Identification de tout accès direct ou distant par des prestataires opérant en dehors de l'Espace Économique Européen." }, { t: "Article 2 — Mise en Place des CCT 2021/914/UE", c: "Signature formelle des modules pertinents des clauses types de la Commission Européenne avec chaque cocontractant." }, { t: "Article 3 — Transfer Impact Assessment (TIA)", c: "Évaluation du droit local du pays tiers quant aux risques d'accès par les agences de renseignement étrangères." }] },
    { id: 13, title: "Charte de Cybersécurité Télétravail & Nomadisme", ref: "MOD-13-2026", cat: "ANSSI & Directives Nationales de Sécurité", image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&q=80", col1: "Connexions Distantes & VPN", col2: "Protection Périphérique", col3: "Sécurité Opérationnelle", col4: "Applicabilité permanente", articles: [{ t: "Article 1 — Sécurisation des Accès Wi-Fi et Réseaux", c: "Obligation formelle d'utilisation d'un VPN chiffré entreprise et interdiction formelle des réseaux Wi-Fi publics ouverts." }, { t: "Article 2 — Verrouillage et Protection Matérielle", c: "Verrouillage automatique des sessions après 3 minutes d'inactivité et interdiction de prêter l'ordinateur à des tiers." }, { t: "Article 3 — Signalement d'Incidents Nomades", c: "Procédure de déclaration d'urgence sous 2 heures en cas de perte, vol de terminal ou de comportement suspect." }] },
    { id: 14, title: "Clauses de Confidentialité (NDA) & Secret d'Affaires", ref: "MOD-14-2026", cat: "Code de Commerce / Loi Secret des Affaires", image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80", col1: "Savoir-faire & Données Financières", col2: "Non-Divulgation Stricte", col3: "Droit des Contrats", col4: "5 ans post-expiration", articles: [{ t: "Article 1 — Définition des Informations Protégées", c: "Protection absolue des algorithmes, secrets commerciaux, listes clients, données financières et stratégies produit." }, { t: "Article 2 — Engagements de Non-Divulgation", c: "Interdiction de communication directe ou indirecte des données confidentielles à des tiers sans mandat exprès préalable." }, { t: "Article 3 — Pénalités et Dommages-Intérêts", c: "Pénalité contractuelle forfaitaire immédiate et recours en référé pour cessation de trouble en cas d'infraction." }] },
    { id: 15, title: "Politique d'Accréditation et Contrôle d'Accès (IAM)", ref: "MOD-15-2026", cat: "Norme ISO/IEC 27001 & RGPD 32", image: "https://images.unsplash.com/photo-1614064642639-e398cf05badb?w=800&q=80", col1: "Droits RBAC & Habilitations", col2: "Moindre Privilège", col3: "Contrôle Logique", col4: "Revue trimestrielle", articles: [{ t: "Article 1 — Attribution selon le Rôle Métier", c: "Octroi d'accès strictement basé sur les besoins démontrés du poste (Role-Based Access Control - RBAC)." }, { t: "Article 2 — Révocation Immédiate des Accès", c: "Suppression des comptes et droits réseau le jour même de la notification de départ ou de rupture de contrat." }, { t: "Article 3 — Audit des Comptes à Privilèges", c: "Traçabilité intégrale et inaltérable des opérations effectuées par les administrateurs système et bases de données." }] },
    { id: 16, title: "Guide d'Audit Interne de Conformité Documentaire", ref: "MOD-16-2026", cat: "Gouvernance & Contrôle Périodique", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80", col1: "Processus & Pratiques Internes", col2: "Vérification de Conformité", col3: "Devoir de Vigilance", col4: "Rapport annuel archivé 5 ans", articles: [{ t: "Article 1 — Périodicité et Portée des Contrôles", c: "Audit interne systématique annuel couvrant les flux RH, marketing, IT et la sécurité des données hébergées." }, { t: "Article 2 — Grille d'Évaluation des Écarts", c: "Identification des non-conformités majeures et mineures avec attribution de plans d'action correctifs sous délai." }, { t: "Article 3 — Restitution au Comité de Direction", c: "Présentation des conclusions et arbitrage des investissements nécessaires à la résorption des vulnérabilités." }] },
    { id: 17, title: "Conditions Générales de Vente B2C (E-Commerce)", ref: "MOD-17-2026", cat: "Code de la Consommation / Directive Omnibus", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80", col1: "Transactions Particuliers", col2: "Cadre Contractuel B2C", col3: "Droit de la Consommation", col4: "Applicabilité en ligne", articles: [{ t: "Article 1 — Droit de Rétractation Légal de 14 Jours", c: "Délai de rétractation sans motif avec mise à disposition du formulaire standardisé et remboursement sous 14 jours." }, { t: "Article 2 — Garanties Légales Obligatoires", c: "Application de la garantie légale de conformité (2 ans sans preuve de défaut) et des vices cachés (Art. 1641 C. Civ.)." }, { t: "Article 3 — Médiation de la Consommation", c: "Désignation obligatoire et gratuite d'un médiateur de la consommation agréé en cas de litige non résolu à l'amiable." }] },
    { id: 18, title: "Conditions Générales de Vente B2B (Prestations & SaaS)", ref: "MOD-18-2026", cat: "Code de Commerce / Droit Commercial des Affaires", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80", col1: "Clients Professionnels & SaaS", col2: "Prestations & Logiciels", col3: "Liberté Contractuelle", col4: "Mise à jour annuelle", articles: [{ t: "Article 1 — Délais de Paiement & Pénalités Légales", c: "Paiement à 30 jours, intérêts de retard au taux directeur BCE + 10 points et indemnité forfaitaire légale de 40 €." }, { t: "Article 2 — Limitation de Responsabilité & Plafonds", c: "Plafond global de responsabilité expressément limité au montant des sommes versées au cours des 12 derniers mois." }, { t: "Article 3 — Juridiction Compétente & Droit Applicable", c: "Attribution exclusive de compétence matérielle et territoriale aux Tribunaux de Commerce français compétents." }] },
    { id: 19, title: "Conditions Générales d'Utilisation (CGU Plateforme)", ref: "MOD-19-2026", cat: "Loi pour la Confiance dans l'Économie Numérique (LCEN)", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80", col1: "Membres & Utilisateurs Web", col2: "Modalités d'Accès Service", col3: "Régulation des Accès", col4: "Acceptation obligatoire", articles: [{ t: "Article 1 — Modalités d'Accès et Disponibilité", c: "Fourniture du service selon une obligation de moyens avec engagement de disponibilité cible de 99.5% hors maintenance." }, { t: "Article 2 — Propriété Intellectuelle Exclusive", c: "L'ensemble des codes, marques, interfaces et structures demeure la propriété pleine et exclusive de l'éditeur." }, { t: "Article 3 — Résiliation et Clôture de Compte", c: "Droit de suspension immédiate de l'accès en cas d'utilisation abusive, fraude ou violation avérée des stipulations des CGU." }] },
    { id: 20, title: "Bordereau & Notice de Rétractation Consommateur", ref: "MOD-20-2026", cat: "Code de la Consommation / Article L. 221-5", image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800&q=80", col1: "Annulation de Commande B2C", col2: "Exercice du Droit de Retrait", col3: "Droit Impératif", col4: "Conservation 2 ans", articles: [{ t: "Article 1 — Modalités Pratiques d'Exercice", c: "Notification claire par lettre recommandée ou formulaire électronique dédié sans justification requise." }, { t: "Article 2 — Conditions de Restitution des Biens", c: "Renvoi des produits dans leur état d'origine sous un délai maximal de 14 jours suivant l'envoi de la décision." }, { t: "Article 3 — Remboursement Intégral des Sommes", c: "Remboursement incluant les frais de livraison initiaux par le même moyen de paiement que celui utilisé lors de     { id: 21, title: "Classification & Cartographie des Systèmes d'IA", ref: "MOD-21-2026", cat: "Règlement Européen sur l'IA (EU AI Act)", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80", col1: "Algorithmes, LLM & Automatisation", col2: "Évaluation du Niveau de Risque", col3: "Obligation Réglementaire IA", col4: "Mise à jour trimestrielle", articles: [{ t: "Article 1 — Registre des Outils et Systèmes IA", c: "Inventaire exhaustif des modèles, API et automatisations algorithmiques intégrés dans les produits et flux internes." }, { t: "Article 2 — Typologie selon le Risque EU AI Act", c: "Catégorisation explicite : Risque Inacceptable (interdit), Haut Risque (obligations strictes), Risque Limité (transparence)." }, { t: "Article 3 — Responsable de la Conformité Algorithmique", c: "Désignation de la fonction interne garante du suivi des obligations et des audits de conformité de l'IA." }] },
    { id: 22, title: "Registre Interne de Gouvernance des Outils IA", ref: "MOD-22-2026", cat: "EU AI Act 2026 / Article 60 - Gouvernance", image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80", col1: "Modèles d'IA & API Déployés", col2: "Traçabilité et Métadonnées", col3: "Supervision Technique", col4: "Durée de vie du système IA", articles: [{ t: "Article 1 — Documentation Technique Exhaustive", c: "Conservation des spécifications, architectures d'entraînement, prompts système et hyperparamètres critiques." }, { t: "Article 2 — Chaîne de Sous-Traitance des Modèles", c: "Suivi des fournisseurs de modèles sous-jacents et vérification de leurs engagements en matière de conformité européenne." }, { t: "Article 3 — Auditabilité et Journalisation des Décisions", c: "Enregistrement chronologique automatique des inférences et prédictions générées aux fins de vérification a posteriori." }] },
    { id: 23, title: "Avis de Transparence Utilisateur Contenus & IA", ref: "MOD-23-2026", cat: "EU AI Act / Article 50 - Devoir de Transparence", image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&q=80", col1: "Interfaces Utilisateurs & Chatbots", col2: "Information des Usagers", col3: "Transparence Algorithmique", col4: "Affichage permanent", articles: [{ t: "Article 1 — Notification Visuelle Explicite", c: "Signalétique claire indiquant aux utilisateurs qu'ils interagissent avec un système automatisé ou un contenu synthétique." }, { t: "Article 2 — Marquage des Contenus Génératifs", c: "Watermarking et métadonnées normalisées intégrés aux textes, images et données synthétisées par les modèles." }, { t: "Article 3 — Droit à l'Explication Humaine", c: "Faculté offerte à l'utilisateur de demander une intervention humaine et l'explication des critères ayant conduit à la décision." }] },
    { id: 24, title: "Évaluation de Conformité IA à Haut Risque", ref: "MOD-24-2026", cat: "EU AI Act / Article 43 - Systèmes Critiques", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80", col1: "Scoring, Recrutement & Crédit", col2: "Contrôle Réglementaire Strict", col3: "Conformité Pré-commercialisation", col4: "Conservation 10 ans", articles: [{ t: "Article 1 — Analyse de Qualité des Données d'Entraînement", c: "Contrôle rigoureux de représentativité, d'absence de biais discriminatoires et d'exhaustivité des corpus de données." }, { t: "Article 2 — Robustesse, Précision et Cybersécurité", c: "Résistance démontrée aux attaques contradictoires (adversarial attacks), aux injections de prompts et à la dérive de données." }, { t: "Article 3 — Déclaration UE de Conformité & Marquage CE", c: "Établissement du dossier technique et apposition formelle du marquage CE avant mise sur le marché ou déploiement." }] },
    { id: 25, title: "Protocole de Supervision Humaine des Systèmes IA", ref: "MOD-25-2026", cat: "EU AI Act / Article 14 - Human-in-the-Loop", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80", col1: "Opérateurs et Superviseurs IA", col2: "Capacité d'Interruption d'Urgence", col3: "Contrôle Humain Permanent", col4: "Revue mensuelle des arrêts", articles: [{ t: "Article 1 — Habilitation et Compétence des Opérateurs", c: "Formation certifiée des superviseurs à la compréhension des limites opérationnelles et des biais d'automatisation." }, { t: "Article 2 — Mécanisme de Débrayage et Bouton d'Arrêt", c: "Possibilité d'interrompre l'exécution à tout instant ou de supplanter la décision algorithmique par un choix humain." }, { t: "Article 3 — Enregistrement des Dérogations Décisionnelles", c: "Rapport circonstancié dès qu'un superviseur annule ou modifie une décision recommandée par le moteur d'IA." }] },
    { id: 26, title: "Matrice de Cybersécurité et Résilience IA", ref: "MOD-26-2026", cat: "EU AI Act / Article 15 & Norme ISO 42001", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80", col1: "Pipelines MLOps & API Models", col2: "Résistance aux Intrusions", col3: "Sécurité Opérationnelle IA", col4: "Tests de pénétration semestriels", articles: [{ t: "Article 1 — Défense Contre l'Empoisonnement de Données", c: "Vérification cryptographique de l'intégrité des datasets d'entraînement et filtrage des flux d'ingestion." }, { t: "Article 2 — Barrières Anti-Jailbreak & Prompt Injection", c: "Filtres sémantiques multicouches rejetant les instructions malveillantes visant à contourner les garde-fous éthiques." }, { t: "Article 3 — Plan de Continuité en Cas de Panne Modèle", c: "Bascule automatique instantanée sur des algorithmes déterministes de secours sans dégradation du service client." }] },
    { id: 27, title: "Déclaration de Conformité IA & Documentation UE", ref: "MOD-27-2026", cat: "EU AI Act / Annexe V - Dossier Réglementaire", image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80", col1: "Dossier d'Homologation Officiel", col2: "Opposabilité aux Autorités", col3: "Validité Juridique Européenne", col4: "Archivage légal 10 ans", articles: [{ t: "Article 1 — Attestation Formelle de Respect des Normes", c: "Engagement solennel de la direction juridique et technique attestant du respect absolu des dispositions du règlement IA." }, { t: "Article 2 — Mise à Disposition des Autorités Publiques", c: "Transmission sans délai du dossier technique complet à la demande de la Commission Européenne ou de la CNIL." }, { t: "Article 3 — Signature et Sceau d'Authenticité Numérique", c: "Horodatage cryptographique qualifié eIDAS garantissant l'intégrité inaltérable de la documentation de conformité." }] }
  ];

  if (selectedDoc) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#020617", color: "#f8fafc", fontFamily: "system-ui, sans-serif", padding: "16px" }}>
        <header style={{ position: "sticky", top: 0, zIndex: 50, backgroundColor: "rgba(15,23,42,0.97)", borderBottom: "1px solid #1e293b", padding: "16px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", borderRadius: "8px", marginBottom: "24px" }}>
          <button onClick={() => setSelectedDoc(null)} style={{ background: "transparent", border: "1px solid #334155", color: "#cbd5e1", padding: "8px 16px", borderRadius: "8px", fontWeight: "bold", cursor: "pointer", fontSize: "13px" }}>
            ← Retour au catalogue
          </button>
          <a href={stripeUrl} target="_blank" rel="noreferrer" style={{ backgroundColor: "#2563eb", color: "#fff", padding: "10px 20px", borderRadius: "8px", fontWeight: "bold", textDecoration: "none", fontSize: "14px" }}>
            Acheter le Pack 27 (€790)
          </a>
        </header>

        <main style={{ maxWidth: "820px", margin: "0 auto" }}>
          <article style={{ backgroundColor: "#fff", color: "#0f172a", borderRadius: "12px", border: "1px solid #cbd5e1", overflow: "hidden", boxShadow: "0 10px 25px rgba(0,0,0,0.3)" }}>
            <div style={{ position: "relative", height: "220px", overflow: "hidden", backgroundColor: "#e2e8f0" }}>
              <img src={selectedDoc.image} alt={selectedDoc.title} draggable={false} onDragStart={(e) => e.preventDefault()} style={{ width: "100%", height: "100%", objectFit: "cover", pointerEvents: "none" }} />
              <div style={{ position: "absolute", top: 12, left: 12, backgroundColor: "rgba(15,23,42,0.85)", color: "#fff", padding: "4px 10px", borderRadius: "6px", fontSize: "11px", fontWeight: "bold", fontFamily: "monospace" }}>
                DOCUMENT {selectedDoc.id} / 27
              </div>
            </div>

            <div style={{ padding: "20px", borderBottom: "2px solid #0f172a", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", flexWrap: "wrap" }}>
              <div>
                <div style={{ fontSize: "10px", fontWeight: 900, color: "#64748b", textTransform: "uppercase", letterSpacing: "1px" }}>RÉPUBLIQUE FRANÇAISE & UNION EUROPÉENNE</div>
                <div style={{ fontSize: "12px", fontWeight: "bold", color: "#1d4ed8", marginTop: "4px" }}>{selectedDoc.cat}</div>
                <h1 style={{ fontSize: "20px", fontWeight: 900, textTransform: "uppercase", margin: "8px 0 0", color: "#020617" }}>{selectedDoc.title}</h1>
              </div>
              <div style={{ textAlign: "right" }}>
                <span style={{ backgroundColor: "#0f172a", color: "#fff", padding: "4px 8px", borderRadius: "4px", fontSize: "11px", fontFamily: "monospace", fontWeight: "bold" }}>{selectedDoc.ref}</span>
                <div style={{ fontSize: "10px", fontWeight: 600, color: "#047857", marginTop: "4px" }}>● Statut : Validé 2026</div>
              </div>
            </div>

            <div style={{ padding: "16px 20px" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "11px", border: "1px solid #cbd5e1", textAlign: "left" }}>
                <thead>
                  <tr style={{ backgroundColor: "#f1f5f9", color: "#334155" }}>
                    <th style={{ padding: "8px", border: "1px solid #cbd5e1" }}>Réf. Traitement</th>
                    <th style={{ padding: "8px", border: "1px solid #cbd5e1" }}>Finalité</th>
                    <th style={{ padding: "8px", border: "1px solid #cbd5e1" }}>Base Légale</th>
                    <th style={{ padding: "8px", border: "1px solid #cbd5e1" }}>Conservation</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: "8px", border: "1px solid #cbd5e1", fontFamily: "monospace", fontWeight: "bold" }}>{selectedDoc.col1}</td>
                    <td style={{ padding: "8px", border: "1px solid #cbd5e1" }}>{selectedDoc.col2}</td>
                    <td style={{ padding: "8px", border: "1px solid #cbd5e1" }}>{selectedDoc.col3}</td>
                    <td style={{ padding: "8px", border: "1px solid #cbd5e1" }}>{selectedDoc.col4}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style={{ padding: "10px 20px 15px", display: "flex", flexDirection: "column", gap: "14px" }}>
              {selectedDoc.articles.map((art, i) => (
                <div key={i}>
                  <div style={{ fontSize: "12px", fontWeight: "bold", color: "#0f172a", textTransform: "uppercase" }}>{art.t}</div>
                  <div style={{ fontSize: "12px", color: "#334155", lineHeight: 1.6, marginTop: "2px", textAlign: "justify" }}>{art.c}</div>
                </div>
              ))}
            </div>

            <div style={{ padding: "16px 20px", borderTop: "1px solid #e2e8f0", backgroundColor: "#f8fafc", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
              <div style={{ border: "2px dashed #3b82f6", padding: "8px 12px", borderRadius: "6px", backgroundColor: "#eff6ff", textAlign: "center" }}>
                <div style={{ fontSize: "9px", fontWeight: "bold", color: "#1e3a8a", textTransform: "uppercase" }}>Certifié Conforme</div>
                <div style={{ fontSize: "11px", fontWeight: 900, color: "#1d4ed8" }}>LEXISHIELD AUDIT 2026</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "11px", fontWeight: "bold", color: "#1e293b" }}>Direction Juridique & Conformité</div>
                <div style={{ fontSize: "11px", fontWeight: 900, color: "#020617", textTransform: "uppercase" }}>LexiShield Legal SAS</div>
              </div>
            </div>

            <div style={{ padding: "20px", textAlign: "center", backgroundColor: "#0f172a" }}>
              <div style={{ fontSize: "13px", color: "#94a3b8", marginBottom: "10px" }}>Lecture seule — Version complète incluse dans le pack (27 documents).</div>
              <a href={stripeUrl} target="_blank" rel="noreferrer" style={{ display: "inline-block", backgroundColor: "#2563eb", color: "#fff", padding: "14px 32px", borderRadius: "10px", fontWeight: 900, textDecoration: "none", fontSize: "15px" }}>
                Acheter les 27 documents (€790)
              </a>
            </div>
          </article>
        </main>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#020617", color: "#f8fafc", fontFamily: "system-ui, sans-serif", padding: "16px" }}>
      <header style={{ position: "sticky", top: 0, zIndex: 50, backgroundColor: "rgba(15,23,42,0.97)", borderBottom: "1px solid #1e293b", padding: "16px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", borderRadius: "8px", marginBottom: "24px" }}>
        <div>
          <div style={{ fontSize: "11px", fontWeight: "bold", color: "#60a5fa", letterSpacing: "1px", textTransform: "uppercase" }}>Catalogue Réglementaire UE 2026</div>
          <div style={{ fontSize: "18px", fontWeight: 900, color: "#fff" }}>LEXISHIELD — 27 Documents</div>
        </div>
        <a href={stripeUrl} target="_blank" rel="noreferrer" style={{ backgroundColor: "#2563eb", color: "#fff", padding: "10px 20px", borderRadius: "8px", fontWeight: "bold", textDecoration: "none", fontSize: "14px" }}>
          Commander le Pack (€790)
        </a>
      </header>

      <main style={{ maxWidth: "900px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "20px" }}>
        {docs.map((doc) => (
          <div key={doc.id} onClick={() => setSelectedDoc(doc)} style={{ backgroundColor: "#0f172a", border: "1px solid #1e293b", borderRadius: "12px", overflow: "hidden", cursor: "pointer" }}>
            <div style={{ height: "140px", overflow: "hidden", backgroundColor: "#1e293b" }}>
              <img src={doc.image} alt={doc.title} draggable={false} onDragStart={(e) => e.preventDefault()} style={{ width: "100%", height: "100%", objectFit: "cover", pointerEvents: "none" }} />
            </div>
            <div style={{ padding: "14px" }}>
              <div style={{ fontSize: "10px", fontFamily: "monospace", color: "#60a5fa", fontWeight: "bold" }}>{doc.ref} • {doc.id}/27</div>
              <div style={{ fontSize: "13px", fontWeight: 800, color: "#fff", marginTop: "6px", lineHeight: 1.3 }}>{doc.title}</div>
              <div style={{ fontSize: "10px", color: "#64748b", marginTop: "6px" }}>{doc.cat}</div>
              <div style={{ marginTop: "12px", fontSize: "11px", color: "#3b82f6", fontWeight: "bold" }}>Voir le document →</div>
            </div>
          </div>
        ))}
      </main>

      <div style={{ textAlign: "center", padding: "40px 16px" }}>
        <a href={stripeUrl} target="_blank" rel="noreferrer" style={{ backgroundColor: "#2563eb", color: "#fff", padding: "14px 28px", borderRadius: "10px", fontWeight: 900, textDecoration: "none", fontSize: "16px", display: "inline-block" }}>
          Acheter les 27 documents (€790)
        </a>
      </div>
    </div>
  );
}
