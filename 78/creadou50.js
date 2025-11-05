// DEBUG
document.addEventListener('DOMContentLoaded', ()=>{
  const b=document.createElement('div');
  b.textContent='JS 50 OK';
  Object.assign(b.style,{position:'fixed',left:'12px',bottom:'12px',
    padding:'6px 10px',background:'#60a5fa',color:'#021126',
    fontWeight:'900',borderRadius:'8px',zIndex:99999});
  document.body.appendChild(b);
});
/* ==========================================================================
   creadou37ok.js — LP Adoucisseur (Solution-Eau.pro)
   - Simulateur (calculs simples et robustes)
   - Affichage résultats (#recap, #rc-cards, etc.)
   - Overlay de déverrouillage (lead gate)
   - FAQ accordéon
   - Mentions légales (popup)
   - Ancrages doux + Impression
   ========================================================================== */

/* ============================== CONFIG ================================== */
const CFG = {
  // Clé localStorage pour l’overlay (gate)
  GATE_KEY: "se_gate_unlocked",
  // Paramètre d’URL pour forcer l’ouverture (debug/test)
  GATE_FORCE_PARAM: "lock",

  // Valeurs par défaut si le HTML ne fournit pas d’entrées
  defaultInputs: {
    // Ces deux champs couvrent 80% des cas (version “simple”)
    kwhAnnuel: 28000,       // si présent dans la LP eau, on ignore — sinon garde la compat.
    factureAnnuelle: 1200,  // €

    // Version “eau” : on fait des hypothèses réalistes et prudentes
    coutProduitsAnnuels: 220,   // lessive, produits ménagers, dermato (avant adoucisseur)
    coutEnergieECS: 300,        // part énergie liée à l’ECS/machines (€/an)
    entretienMateriels: 60,     // détartrants, pannes liées au calcaire (€/an)
    coutSelAdoucisseur: 80,     // coût consommables (€/an)
    coutEntretienAdoucisseur: 120 // contrat d’entretien (€/an)
  },

  // Hypothèses d’économies (prudentes)
  ratios: {
    produits: 0.40,   // -40% produits ménagers/dermato
    energie:  0.15,   // -15% énergie eau chaude/machines
    entretien: 1.00    // suppression quasi complète des coûts liés au tartre
  },

  // Affichage prix pack et financement (à adapter si nécessaire)
  pricing: {
    prixKit: 1590,         // € TTC installé (exemple)
    apport: 0,             // €
    dureeMois: 60,         // 60 mois
    taeg: 5.9              // %
  }
};

/* ============================== HELPERS ================================= */
const $  = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

const toEuro = (n) => {
  const val = isFinite(Number(n)) ? Number(n) : 0;
  return val.toLocaleString("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
};
const toEuro2 = (n) => {
  const val = isFinite(Number(n)) ? Number(n) : 0;
  return val.toLocaleString("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 2 });
};
const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

/* Lis un champ si présent (value numérique), sinon fallback */
function readNum(id, fallback) {
  const el = document.getElementById(id);
  if (!el) return Number(fallback);
  const v = String(el.value || el.textContent || "").replace(/[^\d.,-]/g, "").replace(",", ".");
  const num = parseFloat(v);
  return isFinite(num) ? num : Number(fallback);
}

/* Écrit dans un noeud, si présent */
function writeText(sel, txt) {
  const node = typeof sel === "string" ? $(sel) : sel;
  if (!node) return;
  node.textContent = txt;
}

/* Remplit tous les éléments [data-bind="clé"] avec la valeur fournie */
function bindData(map) {
  Object.entries(map).forEach(([key, val]) => {
    $$(`[data-bind="${key}"]`).forEach((el) => { el.textContent = val; });
  });
}

/* ============================= SIMULATEUR =============================== */
/**
 * Modèle = économies brutes – coûts adoucisseur
 * - Produits : -40% (prudence, évite sur-promesse)
 * - Énergie : -15% (valeur discutée avec l’utilisateur)
 * - Entretien matériel : coûts évités (tartre) ~ 60 €/an
 * - Coûts adoucisseur : sel + contrat entretien
 */
function calculerSimulation() {
  // Lecture tolérante : on essaie version “eau” d’abord, sinon fallback “générique”
  const coutProduitsAnnuels   = readNum("inputCoutProduits", CFG.defaultInputs.coutProduitsAnnuels);
  const coutEnergieECS        = readNum("inputCoutEnergieECS", CFG.defaultInputs.coutEnergieECS);
  const entretienMateriels    = readNum("inputEntretienMateriels", CFG.defaultInputs.entretienMateriels);

  const coutSelAdoucisseur    = readNum("inputCoutSel", CFG.defaultInputs.coutSelAdoucisseur);
  const coutEntretienAdou     = readNum("inputEntretienAdou", CFG.defaultInputs.coutEntretienAdoucisseur);

  // Fallback “kWh/facture” si présents (LP hybride). On convertit 40% de facture en “produits” et 15% en “énergie”
  const kwhAnnuel             = readNum("kwh", CFG.defaultInputs.kwhAnnuel);
  const factureAnnuelle       = readNum("fact", CFG.defaultInputs.factureAnnuelle);

  // Économies (prudentes)
  // Si la LP “eau” fournit des champs dédiés, ils priment. Sinon on projette depuis factureAnnuelle.
  const ecoProduits = (coutProduitsAnnuels > 0)
    ? coutProduitsAnnuels * CFG.ratios.produits
    : factureAnnuelle * 0.18; // 18% de la facture approx assimilé “produits” (plancher)

  const ecoEnergie  = (coutEnergieECS > 0)
    ? coutEnergieECS * CFG.ratios.energie
    : factureAnnuelle * 0.15; // fallback prudent depuis facture

  const ecoEntretien = (entretienMateriels > 0)
    ? entretienMateriels * CFG.ratios.entretien
    : 40; // plancher si non fourni

  const economiesBrutes = ecoProduits + ecoEnergie + ecoEntretien;

  // Coûts récurrents adoucisseur
  const coutsAdou = coutSelAdoucisseur + coutEntretienAdou;

  // Gain net annuel
  const gainAnnuel = economiesBrutes - coutsAdou;
  const gainMensuel = gainAnnuel / 12;

  // Financement simple (mensualité indicative)
  const prixKit = readNum("inputPrixKit", CFG.pricing.prixKit);
  const apport  = readNum("inputApport", CFG.pricing.apport);
  const duree   = readNum("inputDuree", CFG.pricing.dureeMois);
  const taeg    = readNum("inputTAEG", CFG.pricing.taeg) / 100;

  const capital = Math.max(0, prixKit - apport);
  const i = taeg / 12;
  const mensualite = i > 0
    ? capital * (i / (1 - Math.pow(1 + i, -duree)))
    : capital / Math.max(1, duree);

  // Ratio autofinancement (mensualité couverte par gain mensuel)
  const couverture = (gainMensuel > 0) ? clamp((gainMensuel / mensualite) * 100, 0, 300) : 0;

  // Enregistrement global (utile pour impression/export)
  window.simulationData = {
    kwh: kwhAnnuel,
    facture: factureAnnuelle,

    ecoProduits: Math.max(0, ecoProduits),
    ecoEnergie: Math.max(0, ecoEnergie),
    ecoEntretien: Math.max(0, ecoEntretien),
    economiesBrutes: Math.max(0, economiesBrutes),

    coutSel: Math.max(0, coutSelAdoucisseur),
    coutEntretienAdou: Math.max(0, coutEntretienAdou),
    coutsAdou: Math.max(0, coutsAdou),

    gainAnnuel: Math.round(gainAnnuel),
    gainMensuel: Math.round(gainMensuel),

    prixKit: prixKit,
    taeg: taeg * 100,
    duree: duree,
    apport: apport,
    mensualite: Math.round(mensualite),

    couverture: Math.round(couverture)
  };

  majAffichage(window.simulationData);
  return window.simulationData;
}

/* Met à jour les zones d’affichage si elles existent */
function majAffichage(d) {
  if (!d) return;

  // Bloc “résumé” / valeurs principales
  bindData({
    "gain-annuel": toEuro(Math.max(0, d.gainAnnuel)),
    "gain-mensuel": toEuro(Math.max(0, d.gainMensuel)),
    "prix-kit": toEuro(Math.max(0, d.prixKit)),
    "mensualite": toEuro(Math.max(0, d.mensualite)),
    "taeg": `${(d.taeg || 0).toLocaleString("fr-FR", { maximumFractionDigits: 1 })} %`,
    "duree": `${d.duree} mois`,
    "couverture": `${d.couverture} %`
  });

  // Cartes détaillées (si les éléments existent avec data-bind spécifiques)
  bindData({
    "eco-produits": toEuro(Math.max(0, d.ecoProduits)),
    "eco-energie": toEuro(Math.max(0, d.ecoEnergie)),
    "eco-entretien": toEuro(Math.max(0, d.ecoEntretien)),
    "cout-sel": toEuro(Math.max(0, d.coutSel)),
    "cout-entretien-adou": toEuro(Math.max(0, d.coutEntretienAdou)),
    "couts-adou": toEuro(Math.max(0, d.coutsAdou))
  });

  // Affiche le bloc #recap si masqué par défaut
  const recap = document.getElementById("recap");
  if (recap) recap.style.display = "";

  // Petite animation flèche si présente
  const arrow = $(".rc__arrow svg");
  if (arrow) {
    arrow.style.transition = "transform .25s ease";
    arrow.style.transform = "translateY(-4px)";
    setTimeout(() => { arrow.style.transform = ""; }, 250);
  }
}

/* ========================== IMPRESSION / EXPORT ========================= */
function prepareAndPrint() {
  // En-tête imprimable léger (si besoin)
  const H = document.createElement("div");
  H.id = "printHeader";
  H.style.cssText = "padding:8px 0 14px 0;border-bottom:1px solid #ccc;margin-bottom:12px;font:600 16px/1.3 system-ui";
  H.textContent = "Étude adoucisseur – Résumé";
  document.body.prepend(H);

  window.print();

  // Nettoyage
  H.remove();
}

/* ============================== OVERLAY (GATE) ========================== */
/**
 * Logique :
 * - S’ouvre si localStorage[GATE_KEY] !== "1" ou si ?lock est présent
 * - On expose window.__initOverlayResults() pour reposition/re-ouvrir si besoin
 */
function openGate() {
  const gate = document.getElementById("gate-overlay");
  if (!gate) return;
  gate.classList.add("open");

  // Focus premier champ si présent
  const inp = gate.querySelector("input, button, [tabindex]");
  if (inp) setTimeout(() => inp.focus(), 10);
}
function closeGate() {
  const gate = document.getElementById("gate-overlay");
  if (!gate) return;
  gate.classList.remove("open");
}
function initGate() {
  const url = new URL(location.href);
  const force = url.searchParams.has(CFG.GATE_FORCE_PARAM);
  const isUnlocked = localStorage.getItem(CFG.GATE_KEY) === "1";

  if (force) {
    // Efface l’état et force ouverture
    localStorage.removeItem(CFG.GATE_KEY);
    openGate();
    return;
  }
  if (!isUnlocked) openGate();

  // Boutons de validation
  const btn = $("#gate-cta, .gate-cta");
  if (btn) {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      // Contrôles minimum : email/tel si présents
      const root = document.getElementById("gate-overlay") || document;
      const email = $("#gate-email", root);
      const tel = $("#gate-tel", root);

      // Validation simple (une des deux infos suffit pour déverrouiller)
      const ok =
        (email && /\S+@\S+\.\S+/.test(String(email.value).trim())) ||
        (tel && String(tel.value).replace(/[^\d]/g, "").length >= 9) ||
        (!email && !tel); // si pas de champs, on laisse passer

      if (!ok) {
        (email || tel)?.focus();
        return;
      }
      localStorage.setItem(CFG.GATE_KEY, "1");
      closeGate();

      // Déclenche un calcul si bouton d’overlay = “Voir mes résultats”
      try { calculerSimulation(); } catch(_) {}
    });
  }
}
// Expose seulement la fonction d'initialisation (aucun appel auto ici)
window.__initOverlayResults = initGate;

/* =============================== FAQ ==================================== */
function initFAQ() {
  const items = $$(".faq__item");
  if (!items.length) return;

  const btns = $$(".faq__btn");
  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      // Ferme tout
      btns.forEach(b => {
        b.setAttribute("aria-expanded", "false");
        const it = b.closest(".faq__item");
        if (it) {
          it.classList.remove("is-open");
          const p = it.querySelector(".faq__panel");
          if (p) p.style.maxHeight = "0px";
        }
      });
      // Ouvre l’élément demandé
      if (!expanded) {
        btn.setAttribute("aria-expanded", "true");
        const it = btn.closest(".faq__item");
        if (it) {
          it.classList.add("is-open");
          const p = it.querySelector(".faq__panel");
          if (p) {
            p.style.maxHeight = "none";
            const h = p.scrollHeight;
            p.style.maxHeight = h + "px";
          }
        }
      }
    });
  });
}

/* ========================== MENTIONS LÉGALES ============================ */
function initMentions() {
  const openLink = $("#mentions-legales-link");
  const pop = $("#mentions-popup");
  if (!openLink || !pop) return;

  const closeBtn = $("#close-mentions", pop);

  const open = (e) => {
    e?.preventDefault();
    pop.classList.add("open");
    pop.setAttribute("aria-modal", "true");
  };
  const close = (e) => {
    e?.preventDefault();
    pop.classList.remove("open");
    pop.removeAttribute("aria-modal");
  };

  openLink.addEventListener("click", open);
  closeBtn?.addEventListener("click", close);
  pop.addEventListener("click", (e) => {
    if (e.target === pop) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
}

/* ============================ ANCRAGES DOUX ============================= */
function initSmoothAnchors() {
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute("href");
    const tgt = id && id.length > 1 ? $(id) : null;
    if (!tgt) return;

    e.preventDefault();
    const y = tgt.getBoundingClientRect().top + window.scrollY - 12;
    window.scrollTo({ top: y, behavior: "smooth" });
  });
}

/* ============================== BOUTONS UI =============================== */
function wireButtons() {
  const btnSimuler = $("#simuler, #btnSimuler");
  if (btnSimuler) btnSimuler.addEventListener("click", (e) => {
    e.preventDefault();
    calculerSimulation();
  });

  const btnPrint = $("#btnPrint");
  if (btnPrint) btnPrint.addEventListener("click", (e) => {
    e.preventDefault();
    prepareAndPrint();
  });

  // Si un formulaire déclenche la simulation au submit
  const form = $("#formSimu");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      calculerSimulation();
    });
  }
}

/* =============================== BOOT =================================== */
function boot() {
  // Init modules
  try { initFAQ(); } catch(_) {}
  try { initMentions(); } catch(_) {}
  try { initSmoothAnchors(); } catch(_) {}
  try { wireButtons(); } catch(_) {}

  // Option : auto-calcul si des valeurs par défaut sont souhaitées à l’ouverture
  // (désactivé par défaut pour LP “gate”)
  // try { calculerSimulation(); } catch(_) {}

  // Overlay : on ne l’ouvre pas automatiquement ici.
  // L’intégrateur déclenche : window.__initOverlayResults()
}
document.addEventListener("DOMContentLoaded", boot);

/* ========================== UTILITAIRES DÉV ============================= */
/**
 * Réinitialiser le gate pour tester :
 * - Ajouter ?lock à l’URL            => force l’ouverture
 * - Ou exécuter depuis la console :   localStorage.removeItem("se_gate_unlocked"); window.__initOverlayResults();
 */
