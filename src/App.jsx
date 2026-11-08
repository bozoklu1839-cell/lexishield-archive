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
    style.innerHTML = `* { user-select: none; } img { pointer-events: none; } @media print { body * { display: none !important; } }`;
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
    { id: 1, title: "Registre des Activités", ref: "MOD-01", cat: "RGPD", img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800", c1: "Clients", c2: "Facturation", c3: "Art. 6-1-c", c4: "10 ans", a: [{t: "Art 1", c: "Registre exhaustif."}, {t: "Art 2", c: "Identité et IP."}, {t: "Art 3", c: "AES-256."}] },
    { id: 2, title: "Politique de Confidentialité", ref: "MOD-02", cat: "RGPD", img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800", c1: "Visiteurs", c2: "Information", c3: "Transparence", c4: "Session+3 ans", a: [{t: "Art 1", c: "Info claire."}, {t: "Art 2", c: "Droits DPO."}, {t: "Art 3", c: "Hors UE interdit."}] },
    { id: 3, title: "Bandeau Cookies", ref: "MOD-03", cat: "CNIL", img: "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=800", c1: "Traceurs", c2: "Consentement", c3: "Libre", c4: "6 mois", a: [{t: "Art 1", c: "Tout refuser."}, {t: "Art 2", c: "Preuves."}, {t: "Art 3", c: "Essentiels."}] },
    { id: 4, title: "Contrat Sous-Traitance", ref: "MOD-04", cat: "RGPD Art 28", img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800", c1: "Cloud", c2: "Sécurité", c3: "Contrat", c4: "Durée contrat", a: [{t: "Art 1", c: "Instructions."}, {t: "Art 2", c: "Secret."}, {t: "Art 3", c: "Destruction."}] },
    { id: 5, title: "AIPD / DPIA", ref: "MOD-05", cat: "RGPD Art 35", img: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=800", c1: "Sensibles", c2: "Risques", c3: "Évaluation", c4: "2 ans", a: [{t: "Art 1", c: "EBIOS."}, {t: "Art 2", c: "Pseudonymisation."}, {t: "Art 3", c: "Avis DPO."}] },
    { id: 6, title: "Notification Violation", ref: "MOD-06", cat: "RGPD Art 33", img: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800", c1: "Fuite", c2: "Alerte", c3: "Urgence", c4: "72h", a: [{t: "Art 1", c: "Cellule crise."}, {t: "Art 2", c: "Formulaire."}, {t: "Art 3", c: "Victimes."}] },
    { id: 7, title: "PSSI Sécurité", ref: "MOD-07", cat: "NIS 2", img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800", c1: "Serveurs", c2: "Défense", c3: "Opérationnel", c4: "Audit annuel", a: [{t: "Art 1", c: "MFA."}, {t: "Art 2", c: "Sauvegardes."}, {t: "Art 3", c: "Patch 48h."}] },
    { id: 8, title: "Formulaires Droits", ref: "MOD-08", cat: "RGPD Chap III", img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800", c1: "Accès", c2: "Requêtes", c3: "Réponse", c4: "30 jours", a: [{t: "Art 1", c: "Vérification."}, {t: "Art 2", c: "JSON/CSV."}, {t: "Art 3", c: "Refus motivés."}] },
    { id: 9, title: "Politique Conservation", ref: "MOD-09", cat: "RGPD Art 5", img: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800", c1: "Cycle vie", c2: "Purge", c3: "Minimisation", c4: "Mensuel", a: [{t: "Art 1", c: "Paliers."}, {t: "Art 2", c: "3 ans/10 ans."}, {t: "Art 3", c: "Scripts."}] },
    { id: 10, title: "Consentement Salariés", ref: "MOD-10", cat: "Code Travail", img: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800", c1: "RH", c2: "Paie", c3: "Subordination", c4: "5 ans", a: [{t: "Art 1", c: "Notification."}, {t: "Art 2", c: "URSSAF."}, {t: "Art 3", c: "Avis CSE."}] },
    { id: 11, title: "Charte Informatique", ref: "MOD-11", cat: "Règlement", img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800", c1: "Postes", c2: "Usage", c3: "Direction", c4: "Annexe", a: [{t: "Art 1", c: "Loyauté."}, {t: "Art 2", c: "Privé limité."}, {t: "Art 3", c: "Sanctions."}] },
    { id: 12, title: "Transferts CCT/SCC", ref: "MOD-12", cat: "RGPD Chap V", img: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800", c1: "Flux", c2: "Garanties", c3: "Clauses", c4: "Annuel", a: [{t: "Art 1", c: "Cartographie."}, {t: "Art 2", c: "Signature."}, {t: "Art 3", c: "TIA."}] },
    { id: 13, title: "Cybersécurité Télétravail", ref: "MOD-13", cat: "ANSSI", img: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800", c1: "VPN", c2: "Périphériques", c3: "Opérationnel", c4: "Permanent", a: [{t: "Art 1", c: "VPN obligatoire."}, {t: "Art 2", c: "Verrouillage."}, {t: "Art 3", c: "Incidents 2h."}] },
    { id: 14, title: "Clauses NDA", ref: "MOD-14", cat: "Secret Affaires", img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800", c1: "Savoir-faire", c2: "Non-divulgation", c3: "Contrats", c4: "5 ans", a: [{t: "Art 1", c: "Algorithmes."}, {t: "Art 2", c: "Interdiction."}, {t: "Art 3", c: "Pénalités."}] },
    { id: 15, title: "Contrôle d'Accès IAM", ref: "MOD-15", cat: "ISO 27001", img: "https://images.unsplash.com/photo-1614064642639-e398cf05badb?w=800", c1: "RBAC", c2: "Privilèges", c3: "Logique", c4: "Trimestriel", a: [{t: "Art 1", c: "Rôles."}, {t: "Art 2", c: "Révocation."}, {t: "Art 3", c: "Audit."}] },
    { id: 16, title: "Audit Conformité", ref: "MOD-16", cat: "Gouvernance", img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800", c1: "Processus", c2: "Vérification", c3: "Vigilance", c4: "5 ans", a: [{t: "Art 1", c: "Annuel."}, {t: "Art 2", c: "Écarts."}, {t: "Art 3", c: "Comité."}] },
    { id: 17, title: "CGV B2C", ref: "MOD-17", cat: "Consommation", img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800", c1: "Particuliers", c2: "B2C", c3: "Droit", c4: "En ligne", a: [{t: "Art 1", c: "14 jours."}, {t: "Art 2", c: "Garanties."}, {t: "Art 3", c: "Médiation."}] },
    { id: 18, title: "CGV B2B", ref: "MOD-18", cat: "Commercial", img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800", c1: "Pros", c2: "SaaS", c3: "Contrats", c4: "Annuel", a: [{t: "Art 1", c: "Paiement 30j."}, {t: "Art 2", c: "Plafonds."}, {t: "Art 3", c: "Tribunal Commerce."}] },
    { id: 19, title: "CGU Plateforme", ref: "MOD-19", cat: "LCEN", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800", c1: "Membres", c2: "Accès", c3: "Régulation", c4: "Obligatoire", a: [{t: "Art 1", c: "99.5%."}, {t: "Art 2", c: "Propriété."}, {t: "Art 3", c: "Suspension."}] },
    { id: 20, title: "Bordereau Rétractation", ref: "MOD-20", cat: "Conso L.221", img: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800", c1: "Annulation", c2: "Retrait", c3: "Impératif", c4: "2 ans", a: [{t: "Art 1", c: "Lettre."}, {t: "Art 2", c: "14 jours."}, {t: "Art 3", c: "Remboursement."}] },
    { id: 21, title: "Cartographie IA", ref: "MOD-21", cat: "EU AI Act", img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800", c1: "LLM", c2: "Risque", c3: "Obligation", c4: "Trimestriel", a: [{t: "Art 1", c: "Inventaire."}, {t: "Art 2", c: "Catégorisation."}, {t: "Art 3", c: "Responsable."}] },
    { id: 22, title: "Gouvernance IA", ref: "MOD-22", cat: "EU AI Act 60", img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800", c1: "API", c2: "Traçabilité", c3: "Supervision", c4: "Durée vie", a: [{t: "Art 1", c: "Prompts."}, {t: "Art 2", c: "Fournisseurs."}, {t: "Art 3", c: "Logs."}] },
    { id: 23, title: "Transparence IA", ref: "MOD-23", cat: "EU AI Act 50", img: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800", c1: "Chatbots", c2: "Info", c3: "Transparence", c4: "Permanent", a: [{t: "Art 1", c: "Signalétique."}, {t: "Art 2", c: "Watermark."}, {t: "Art 3", c: "Humain."}] },
    { id: 24, title: "Conformité IA Risque", ref: "MOD-24", cat: "EU AI Act 43", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800", c1: "Scoring", c2: "Contrôle", c3: "Pré-market", c4: "10 ans", a: [{t: "Art 1", c: "Biais."}, {t: "Art 2", c: "Robustesse."}, {t: "Art 3", c: "Marquage CE."}] },
    { id: 25, title: "Supervision Humaine IA", ref: "MOD-25", cat: "EU AI Act 14", img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800", c1: "Opérateurs", c2: "Urgence", c3: "Contrôle", c4: "Mensuel", a: [{t: "Art 1", c: "Formation."}, {t: "Art 2", c: "Bouton arrêt."}, {t: "Art 3", c: "Dérogations."}] },
    { id: 26, title: "Cybersécurité IA", ref: "MOD-26", cat: "ISO 42001", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800", c1: "MLOps", c2: "Intrusions", c3: "Sécurité", c4: "Semestriel", a: [{t: "Art 1", c: "Datasets."}, {t: "Art 2", c: "Anti-jailbreak."}, {t: "Art 3", c: "Plan B."}] },
    { id: 27, title: "Déclaration Conformité IA", ref: "MOD-27", cat: "EU AI Act Annex V", img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800", c1: "Dossier", c2: "Autorités", c3: "Juridique", c4: "10 ans", a: [{t: "Art 1", c: "Attestation."}, {t: "Art 2", c: "Transmission."}, {t: "Art 3", c: "eIDAS."}] }
  ];

  if (selectedDoc) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#020617", color: "#f8fafc", fontFamily: "system-ui", padding: "16px" }}>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <button onClick={() => setSelectedDoc(null)} style={{ background: "#1e293b", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}>
            ← Retour
          </button>
          <a href={stripeUrl} target="_blank" rel="noreferrer" style={{ backgroundColor: "#2563eb", color: "#fff", padding: "8px 16px", borderRadius: "8px", textDecoration: "none", fontWeight: "bold", fontSize: "12px" }}>
            Acheter (€790)
          </a>
        </header>
        <main style={{ maxWidth: "800px", margin: "0 auto", backgroundColor: "#fff", color: "#000", borderRadius: "12px", overflow: "hidden" }}>
          <img src={selectedDoc.img} alt={selectedDoc.title} draggable={false} style={{ width: "100%", height: "200px", objectFit: "cover", pointerEvents: "none" }} />
          <div style={{ padding: "20px" }}>
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
                  <div style={{ fontWeight: "bold", fontSize: "12px" }}>{art.t}</div>
                  <div style={{ fontSize: "12px", color: "#333" }}>{art.c}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "30px", borderTop: "2px dashed #ccc", paddingTop: "10px", display: "flex", justifyContent: "space-between", fontSize: "10px", color: "#666" }}>
              <span>CERTIFIÉ CONFORME<br/><b>LEXISHIELD</b></span>
              <span>Direction Juridique<br/><b>Legal SAS</b></span>
            </div>
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
        <a href={stripeUrl} target="_blank" rel="noreferrer" style={{ backgroundColor: "#2563eb", color: "#fff", padding: "8px 16px", borderRadius: "8px", fontWeight: "bold", textDecoration: "none", fontSize: "12px" }}>
          Acheter le Pack (€790)
        </a>
      </header>
      <main style={{ maxWidth: "800px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
        {docs.map(doc => (
          <div key={doc.id} onClick={() => setSelectedDoc(doc)} style={{ backgroundColor: "#0f172a", borderRadius: "10px", overflow: "hidden", cursor: "pointer", border: "1px solid #1e293b" }}>
            <img src={doc.img} alt={doc.title} draggable={false} style={{ width: "100%", height: "80px", objectFit: "cover", pointerEvents: "none" }} />
            <div style={{ padding: "10px" }}>
              <div style={{ color: "#3b82f6", fontSize: "9px", fontWeight: "bold", fontFamily: "monospace" }}>{doc.ref} • {doc.id}/27</div>
              <div style={{ fontSize: "11px", fontWeight: "bold", marginTop: "4px", lineHeight: "1.2" }}>{doc.title}</div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
