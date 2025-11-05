/* =================================================================
   MAIN.JS - Logique de la page Adoucisseur
   =================================================================
   1. Logique FAQ (Accordéon)
   2. Logique Modale (Mentions Légales)
   3. Logique de l'Overlay (Gating)
   4. Logique d'envoi (Google Sheets)
   5. Logique de Simulation (Formulaire principal)
   6. Initialisation
   ================================================================= */

document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  // --- État partagé ---
  // Contient les résultats du calcul pour les partager entre la simulation et l'envoi
  let currentSimulationResult = null;
  const STORAGE_KEY = "overlayResultsUnlocked";
  const G_SHEETS_ENDPOINT =
    "https://script.google.com/macros/s/AKfycbyHYz40LwNcC0lYeymn_93CLK-LBfObF6reZPSjWLH4QDlzUb4dnkfpIkg1lWCTtTwL/exec";
  const G_SHEETS_SOURCE = "LP Adoucisseur";

  // ===================================
  // 1. LOGIQUE FAQ (Accordéon)
  // ===================================
  // (Cette IIFE (Immediately Invoked Function Expression) gère l'accordéon de manière autonome)
  (function initFaq() {
    function setPanelHeight(panel) {
      if (!panel) return;
      panel.style.maxHeight = "0px";
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          const h = panel.scrollHeight;
          panel.style.maxHeight = h + "px";
          const onEnd = (e) => {
            if (e.propertyName !== "max-height") return;
            panel.style.maxHeight = "none";
            panel.removeEventListener("transitionend", onEnd);
          };
          panel.addEventListener("transitionend", onEnd);
        })
      );
    }

    function closePanel(panel) {
      if (!panel) return;
      if (getComputedStyle(panel).maxHeight === "none") {
        panel.style.maxHeight = panel.scrollHeight + "px";
        void panel.offsetHeight;
      }
      panel.style.maxHeight = "0px";
    }

    function openItem(btn) {
      const panel = btn.nextElementSibling;
      document.querySelectorAll('.faq__btn[aria-expanded="true"]').forEach((b) => {
        if (b !== btn) {
          b.setAttribute("aria-expanded", "false");
          closePanel(b.nextElementSibling);
          b.closest(".faq__item")?.classList.remove("is-open");
        }
      });
      btn.setAttribute("aria-expanded", "true");
      btn.closest(".faq__item")?.classList.add("is-open");
      setPanelHeight(panel);
    }

    document.addEventListener("click", (e) => {
      const btn = e.target.closest(".faq__btn");
      if (!btn) return;
      const isOpen = btn.getAttribute("aria-expanded") === "true";
      const panel = btn.nextElementSibling;
      const it = btn.closest(".faq__item");
      if (isOpen) {
        btn.setAttribute("aria-expanded", "false");
        it?.classList.remove("is-open");
        closePanel(panel);
      } else {
        openItem(btn);
      }
    });

    // Ouvre le premier item par défaut (puisque le DOM est prêt)
    const firstBtn = document.querySelector(".faq__btn");
    if (firstBtn) {
      openItem(firstBtn);
    }

    window.addEventListener("resize", () => {
      document
        .querySelectorAll('.faq__btn[aria-expanded="true"]')
        .forEach((btn) => setPanelHeight(btn.nextElementSibling));
    });

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        document
          .querySelectorAll('.faq__btn[aria-expanded="true"]')
          .forEach((btn) => setPanelHeight(btn.nextElementSibling));
      });
    }
  })();

  // ===================================
  // 2. LOGIQUE MODALE (Mentions Légales)
  // ===================================
  (function initMentionsModal() {
    const link = document.getElementById("mentions-legales-link");
    const popup = document.getElementById("mentions-popup");
    const close = document.getElementById("close-mentions");

    if (!popup || !close || !link) return;

    function openPopup(e) {
      if (e) e.preventDefault();
      popup.style.display = "block";
      close.focus();
    }
    function closePopup(e) {
      if (e) e.preventDefault();
      popup.style.display = "none";
    }

    link.addEventListener("click", openPopup);
    close.addEventListener("click", closePopup);

    document.addEventListener("keydown", (ev) => {
      if (ev.key === "Escape" && popup.style.display === "block") {
        closePopup();
      }
    });
  })();

  // ===================================
  // 3. LOGIQUE DE L'OVERLAY (Gating)
  // ===================================

  // --- Fonctions utilitaires de l'overlay ---
  function isUnlocked() {
    try {
      return localStorage.getItem(STORAGE_KEY) === "1";
    } catch (e) {
      return false;
    }
  }

  function setUnlocked() {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch (e) {
      // échec silencieux en mode privé
    }
  }

  function px(n) {
    return Math.max(0, Math.round(n)) + "px";
  }

  function placeOverlay() {
    const recap = document.getElementById("recap");
    const first = document.getElementById("resume-cout");
    const gate = document.getElementById("gate-overlay");
    if (!recap || !first || !gate) return;

    const rect = first.getBoundingClientRect();
    const recRect = recap.getBoundingClientRect();
    const top = rect.bottom - recRect.top;
    gate.style.top = px(top);
  }

  function showOverlay() {
    const gate = document.getElementById("gate-overlay");
    if (!gate) return;
    placeOverlay();
    gate.classList.add("is-visible");
  }

  function hideOverlay() {
    const gate = document.getElementById("gate-overlay");
    if (!gate) return;
    gate.classList.remove("is-visible");
  }

  function phoneValid(tel) {
    if (!tel) return false;
    const v = tel.replace(/[^\d+]/g, "").replace(/^(\+33)/, "0");
    return /^0\d{9}$/.test(v);
  }

  // --- Fonctions de formatage du téléphone ---
  function formatFR(val) {
    if (!val) return "";
    let d = val.replace(/[^\d+]/g, "").replace(/^\+33/, "0").replace(/\D/g, "");
    d = d.slice(0, 10);
    return d.replace(/(\d{2})(?=\d)/g, "$1 ").trim();
  }

  function onPhoneInput(e) {
    const el = e.target;
    const old = el.value;
    const pos = el.selectionStart || 0;
    const before = old.slice(0, pos).replace(/\D/g, "");
    const next = formatFR(old);
    let idx = 0,
      count = 0;
    while (idx < next.length && count < before.length) {
      if (/\d/.test(next[idx])) count++;
      idx++;
    }
    el.value = next;
    try {
      el.setSelectionRange(idx, idx);
    } catch (_) {}
  }

  /**
   * Initialise et affiche l'overlay de déverrouillage des résultats.
   */
  function initGate() {
    const gate = document.getElementById("gate-overlay");
    const recap = document.getElementById("recap");
    const first = document.getElementById("resume-cout");
    const gateForm = document.getElementById("gate-form");
    const phoneInput = document.getElementById("gate-phone");

    if (!gate || !recap || !first || !gateForm || !phoneInput) return;
    if (isUnlocked()) {
      hideOverlay();
      return;
    }

    showOverlay();

    // Appliquer le formatage du téléphone
    phoneInput.setAttribute("inputmode", "tel");
    phoneInput.setAttribute("autocomplete", "tel");
    phoneInput.setAttribute("maxlength", "14");
    phoneInput.placeholder = "06 12 34 56 78";
    phoneInput.addEventListener("input", onPhoneInput);
    phoneInput.addEventListener("blur", () => {
      phoneInput.value = formatFR(phoneInput.value);
    });

    // Gérer la soumission du formulaire de l'overlay
    gateForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailVal = (document.getElementById("gate-email")?.value || "").trim();
      const phoneVal = phoneInput.value;

      if (!phoneValid(phoneVal)) {
        phoneInput.focus();
        phoneInput.setCustomValidity("Numéro invalide (FR, 10 chiffres).");
        phoneInput.reportValidity();
        setTimeout(() => phoneInput.setCustomValidity(""), 2000);
        return;
      }

      // 1. Déverrouiller
      setUnlocked();
      hideOverlay();

      // 2. Envoyer les données (phase "unlock")
      postToSheets("unlock", { email: emailVal, phone: phoneVal });

      // 3. Scroller aux résultats
      const next =
        document.getElementById("rc-cards") ||
        document.getElementById("prod") ||
        recap;
      next?.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    // Ajuster la position en cas de redimensionnement
    window.addEventListener("resize", placeOverlay);
    setTimeout(placeOverlay, 50);
    setTimeout(placeOverlay, 250);
  }

  // ===================================
  // 4. LOGIQUE D'ENVOI (Google Sheets)
  // ===================================

  function getUtmParams() {
    const params = new URLSearchParams(location.search);
    return {
      utm_source: params.get("utm_source") || "",
      utm_campaign: params.get("utm_campaign") || "",
      utm_term: params.get("utm_term") || "",
    };
  }

  function commonMeta() {
    return {
      pageUrl: location.href,
      ua: navigator.userAgent || "",
    };
  }

  /**
   * Envoie les données de simulation et de contact à Google Sheets.
   * Utilise la variable partagée `currentSimulationResult`.
   */
  async function postToSheets(phase, contactInfo = {}) {
    if (!currentSimulationResult) {
      console.warn("Aucune donnée de simulation à envoyer.");
      return;
    }

    const utm = getUtmParams();
    const meta = commonMeta();

    const payload = {
      phase: phase,
      source: G_SHEETS_SOURCE,
      foyer: currentSimulationResult.foyerVal,
      peau_seche: currentSimulationResult.peau ? "1" : "0",
      annual: String(currentSimulationResult.annual),
      tenYears: String(currentSimulationResult.tenYears),
      model: currentSimulationResult.model,
      price: String(currentSimulationResult.price),
      email: contactInfo.email || "",
      phone: contactInfo.phone || "",
      ...meta,
      ...utm,
    };

    try {
      const fd = new FormData();
      for (const key in payload) {
        fd.append(key, payload[key]);
      }
      await fetch(G_SHEETS_ENDPOINT, { method: "POST", body: fd, mode: "no-cors" });
    } catch (err) {
      console.warn("⚠️ Envoi Sheets échoué:", err);
    }
  }

  // ===================================
  // 5. LOGIQUE DE SIMULATION (Formulaire principal)
  // ===================================

  /**
   * Gère la soumission du formulaire principal de simulation.
   */
  function handleSimulationSubmit(ev) {
    ev.preventDefault();

    // --- Constantes de Financement ---
    const DUREE_MOIS = 84;
    const TAEG_PCT = 5.96;
    const financeTable = {
      2200: { mensu: 31.93, total: 2682.08 },
      2400: { mensu: 34.84, total: 2925.76 },
      2600: { mensu: 37.74, total: 3169.68 },
    };

    // --- Entrées ---
    const foyerEl = document.getElementById("foyer");
    const foyerVal = (foyerEl?.value || "").trim();
    const n =
      foyerVal === "1-2" ? 2 : foyerVal === "3-4" ? 4 : foyerVal === "5+" ? 5 : 0;
    const peau = !!document.getElementById("peau")?.checked;

    if (!n) {
      alert("Sélectionnez la taille du foyer.");
      foyerEl?.focus();
      return;
    }

    // --- Hypothèses ---
    const PRIX_KWH = 0.27,
      ECS_KWH_PP = 800,
      TAUX_GAIN_ECS = 0.1;
    const DEPENSE_PROD_PP = 220,
      TAUX_ECO_PROD = peau ? 0.45 : 0.35;
    const SAVE_MAT_FOYER = 80;

    // --- Calculs ---
    const baseProduits = n * DEPENSE_PROD_PP;
    const sProd = Math.round(baseProduits * TAUX_ECO_PROD);
    const sEnergie = Math.round(n * ECS_KWH_PP * PRIX_KWH * TAUX_GAIN_ECS);
    const sMateriel = SAVE_MAT_FOYER;
    const total = sProd + sEnergie + sMateriel;

    const r = 1.05,
      years = 10;
    const sommeGeo = (Math.pow(r, years) - 1) / (r - 1);
    const total10 = Math.round(sProd * 10 + sMateriel * 10 + sEnergie * sommeGeo);

    // --- Sélection modèle ---
    let modele, tarif;
    if (n <= 2) {
      modele = "Adoucisseur d’eau 10 L";
      tarif = 2200;
    } else if (n <= 4) {
      modele = "Adoucisseur d’eau 15 L";
      tarif = 2400;
    } else {
      modele = "Adoucisseur d’eau 20 L";
      tarif = 2600;
    }

    // *** STOCKE LE RÉSULTAT DANS L'ÉTAT PARTAGÉ ***
    currentSimulationResult = {
      foyerVal,
      peau,
      annual: total,
      tenYears: total10,
      model: modele,
      price: tarif,
      sProd,
      sEnergie,
      sMateriel,
    };

    // --- Affichage des résultats ---
    const recap = document.getElementById("recap");
    if (recap) recap.style.display = "block";

    const rc = document.getElementById("resume-cout");
    const rcAnnual = document.getElementById("rc-annual");
    const rc10 = document.getElementById("rc-10ans");
    if (rc && rcAnnual && rc10) {
      rcAnnual.textContent = `${total.toLocaleString("fr-FR")} €`;
      rc10.textContent = `${total10.toLocaleString("fr-FR")} €`;
      rc.style.display = "block";
    }

    // --- Affichage cartes détail ---
    ["rc-val-prod", "rc-val-energie", "rc-val-materiel"].forEach((id, i) => {
      const el = document.getElementById(id);
      if (el)
        el.textContent = Math.round(
          [sProd, sEnergie, sMateriel][i]
        ).toLocaleString("fr-FR");
    });

    // --- Affichage bloc produit ---
    const prod = document.getElementById("prod");
    if (prod) {
      prod.style.display = "block";
      const prixSpan = document.getElementById("prod-prix");
      if (prixSpan) prixSpan.textContent = tarif.toLocaleString("fr-FR") + " €";

      // Mettre à jour le titre et les spécifications du produit
      const prodTitle = prod.querySelector(".prod__title");
      if (prodTitle) prodTitle.textContent = modele;

      const prodSpecs = prod.querySelector(".prod__specs");
      if (prodSpecs && prodSpecs.children.length > 2) {
        prodSpecs.children[2].textContent = `${modele.match(/\d+L/)[0]} de résine`;
      }
    }

    // --- Affichage bloc autofinancement ---
    const af = document.getElementById("autofin");
    if (af) {
      const afTotal = document.getElementById("af-total");
      if (afTotal) afTotal.textContent = total.toLocaleString("fr-FR") + " €";

      const fin = financeTable[tarif];
      if (fin) {
        const fmt2 = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
        document.getElementById("fin-capital").textContent =
          tarif.toLocaleString("fr-FR");
        document.getElementById("fin-mensu").textContent =
          fin.mensu.toLocaleString("fr-FR", fmt2);
        document.getElementById("fin-duree").textContent = String(DUREE_MOIS);
        document.getElementById("fin-taeg").textContent =
          TAEG_PCT.toLocaleString("fr-FR", fmt2);
        document.getElementById("fin-total").textContent =
          fin.total.toLocaleString("fr-FR", fmt2);
      }
      af.style.display = "block";
    }

    // --- Masquer le contenu pré-simulation ---
    document
      .querySelectorAll('[data-hide-after-sim="1"]')
      .forEach((el) => {
        el.style.display = "none";
      });

    // --- Scroll ---
    recap?.scrollIntoView({ behavior: "smooth", block: "start" });

    // --- Envoyer à Google Sheets (phase "simu") ---
    postToSheets("simu");

    // --- Activer l'overlay (si non débloqué) ---
    if (location.search.includes('lock=test')) {
       localStorage.removeItem(STORAGE_KEY);
       console.log('%c🔁 Mode test activé : clé overlayResultsUnlocked supprimée', 'color:#0bf;font-weight:bold;');
    }
    
    if (!isUnlocked()) {
      initGate(); // Remplace l'ancien appel global
    }
  }

  // ===================================
  // 6. INITIALISATION
  // ===================================

  // Attacher l'écouteur au formulaire de simulation principal
  const mainForm = document.getElementById("form-estimation");
  if (mainForm) {
    mainForm.addEventListener("submit", handleSimulationSubmit);
  }

}); // Fin de DOMContentLoaded
