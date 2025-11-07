// ===============================================
// LOGIQUE DE CONSENTEMENT RGPD (À AJOUTER AU DÉBUT DE adou.js)
// Gère l'affichage du bandeau et le chargement des traceurs.
// ===============================================

(function () {
    const CONSENT_BANNER_ID = "consent-banner";
    const STORAGE_KEY = "user_cookie_consent";
    // Si vous utilisez le script AW-11242044118 (Google Adwords)
    const TRACKING_ID = "AW-11242044118"; 

    function getConsent() {
        try {
            return localStorage.getItem(STORAGE_KEY);
        } catch (e) {
            return null;
        }
    }

    function setConsent(choice) {
        try {
            localStorage.setItem(STORAGE_KEY, choice);
        } catch (e) {}
        hideBanner();
        
        // Si accepté, charge les scripts de suivi
        if (choice === 'accepted') {
            loadThirdPartyScripts();
        }
    }

    function showBanner() {
        const banner = document.getElementById(CONSENT_BANNER_ID);
        if (banner) {
            // Utilise 'flex' pour le CSS et ajoute la classe de blocage de scroll
            banner.style.display = 'flex'; 
            document.body.classList.add('has-consent-banner'); 
        }
    }

    function hideBanner() {
        const banner = document.getElementById(CONSENT_BANNER_ID);
        if (banner) {
            banner.style.display = 'none';
            document.body.classList.remove('has-consent-banner');
        }
    }

    // Initialisation des scripts de suivi (UNiquement après acceptation)
    function loadThirdPartyScripts() {
        // Cette fonction doit contenir la configuration de TOUS vos traceurs non essentiels
        
        // 1. Déclenchement de Google Adwords (AW)
        if (typeof window.gtag === 'function') {
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', TRACKING_ID);
            console.log("✅ Scripts de suivi tiers chargés (Consentement donné)");
        }
        
        // 2. Ajoutez ici tout autre code de suivi (ex: Facebook Pixel, Google Analytics non-anonyme, etc.)
    }

    document.addEventListener("DOMContentLoaded", () => {
        const consent = getConsent();
        const acceptBtn = document.getElementById('consent-accept');
        const rejectBtn = document.getElementById('consent-reject');

        if (consent === 'accepted') {
            loadThirdPartyScripts();
        } else if (!consent) {
            // Si pas de choix enregistré, afficher le bandeau
            showBanner();
        }
        
        // Ajout des écouteurs d'événements
        acceptBtn?.addEventListener('click', () => setConsent('accepted'));
        rejectBtn?.addEventListener('click', () => setConsent('rejected'));
    });
})();

// ===============================================
// VOTRE CODE EXISTANT COMMENCE ICI (FAQ, CALCUL, ETC.)
// ===============================================
// (Laissez le reste de votre adou.js tel quel)


// ========= FAQ TOGGLE =========
(function () {
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
  window.addEventListener("load", () => {
    const firstBtn = document.querySelector(".faq__btn");
    if (firstBtn) openItem(firstBtn);
  });
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

// ===== Mentions légales (ouverture/fermeture) =====
document.addEventListener("DOMContentLoaded", function () {
  const link = document.getElementById("mentions-legales-link");
  const popup = document.getElementById("mentions-popup");
  const close = document.getElementById("close-mentions");
  if (!popup || !close) return;

  function openPopup(e) {
    if (e) e.preventDefault();
    popup.style.display = "block";
    close.focus();
  }
  function closePopup(e) {
    if (e) e.preventDefault();
    popup.style.display = "none";
  }

  if (link) {
    link.addEventListener("click", openPopup);
  }
  close.addEventListener("click", closePopup);

  document.addEventListener("keydown", (ev) => {
    if (ev.key === "Escape" && popup.style.display === "block") {
      closePopup();
    }
  });
});

// ====== Calcul + affichage ======
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form-estimation");
  if (!form) return;

  form.addEventListener("submit", function (ev) {
    ev.preventDefault();

    // --- Financement : constantes accessibles partout dans le handler
    const DUREE_MOIS = 84;
    const TAEG_PCT = 5.96;
    const financeTable = {
      2200: { mensu: 31.93, total: 2682.08 },
      2400: { mensu: 34.84, total: 2925.76 },
      2600: { mensu: 37.74, total: 3169.68 },
    };

    // Entrées
    const foyerVal = (document.getElementById("foyer")?.value || "").trim();
    const n =
      foyerVal === "1-2" ? 2 : foyerVal === "3-4" ? 4 : foyerVal === "5+" ? 5 : 0;
    const peau = !!document.getElementById("peau")?.checked;
    if (!n) {
      alert("Sélectionnez la taille du foyer.");
      document.getElementById("foyer")?.focus();
      return;
    }

    // Hypothèses
    const PRIX_KWH = 0.27,
      ECS_KWH_PP = 800,
      TAUX_GAIN_ECS = 0.1;
    const DEPENSE_PROD_PP = 220,
      TAUX_ECO_PROD = peau ? 0.45 : 0.35;
    const SAVE_MAT_FOYER = 80;

    // Calculs
    const baseProduits = n * DEPENSE_PROD_PP;
    const sProd = Math.round(baseProduits * TAUX_ECO_PROD);
    const sEnergie = Math.round(n * ECS_KWH_PP * PRIX_KWH * TAUX_GAIN_ECS);
    const sMateriel = SAVE_MAT_FOYER;
    const total = sProd + sEnergie + sMateriel;

    const r = 1.05,
      years = 10;
    const sommeGeo = (Math.pow(r, years) - 1) / (r - 1);
    const total10 = Math.round(sProd * 10 + sMateriel * 10 + sEnergie * sommeGeo);

    // Affichage résultats
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

    const valeurs = [sProd, sEnergie, sMateriel];
    ["rc-val-prod", "rc-val-energie", "rc-val-materiel"].forEach((id, i) => {
      const el = document.getElementById(id);
      if (el) el.textContent = Math.round(valeurs[i]).toLocaleString("fr-FR");
    });

    // === Sélection du modèle et tarif ===
    let modele, tarif;
    if (n <= 2) {
      modele = "Adoucisseur d’eau 10 L de résine";
      tarif = 2200;
    } else if (n <= 4) {
      modele = "Adoucisseur d’eau 15 L de résine";
      tarif = 2400;
    } else {
      modele = "Adoucisseur d’eau 20 L de résine";
      tarif = 2600;
    }

    // === Mise à jour du bloc produit ===
    const prod = document.getElementById("prod");
    if (prod) {
      prod.style.display = "block";
      const capSpan = document.getElementById("prod-capacite");
      const modSpan = document.getElementById("prod-modele");
      const prixSpan = document.getElementById("prod-prix");
      if (capSpan)
        capSpan.textContent = modele.match(/\d+\s?L/)?.[0] || "";
      if (modSpan) modSpan.textContent = "Vanne volumétrique Fleck";
      if (prixSpan) prixSpan.textContent = tarif.toLocaleString("fr-FR") + " €";
    }

    // === Bloc "Autofinancement" (texte 2 lignes + carte financement) ===
    const af = document.getElementById("autofin");
    if (af) {
      // Valeur dynamique = économies totales / an
      const afTotal = document.getElementById("af-total");
      if (afTotal) afTotal.textContent = total.toLocaleString("fr-FR") + " €";

      // Renseigner la carte financement selon le tarif choisi
      const fin = financeTable[tarif];
      const elCap = document.getElementById("fin-capital");
      const elMen = document.getElementById("fin-mensu");
      const elDur = document.getElementById("fin-duree");
      const elT = document.getElementById("fin-taeg");
      const elTot = document.getElementById("fin-total");

      if (fin && elCap && elMen && elDur && elT && elTot) {
        const fmt2 = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
        elCap.textContent = tarif.toLocaleString("fr-FR");
        elMen.textContent = fin.mensu.toLocaleString("fr-FR", fmt2);
        elDur.textContent = String(DUREE_MOIS);
        elT.textContent = TAEG_PCT.toLocaleString("fr-FR", fmt2);
        elTot.textContent = fin.total.toLocaleString("fr-FR", fmt2);
      }

      af.style.display = "block";
    }

    // Texte brut (masqué)
    const out = document.getElementById("recap-content");
    if (out) {
      const fin = financeTable[tarif],
        fmt2 = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
      const finBloc = fin
        ? `\nFinancement (facultatif) :\nPour ${tarif.toLocaleString(
            "fr-FR"
          )} €\nMensualité : ${fin.mensu.toLocaleString(
            "fr-FR",
            fmt2
          )} € (Hors assurance facultative)\nDurée : ${DUREE_MOIS} mois\nTAEG : ${TAEG_PCT.toLocaleString(
            "fr-FR",
            fmt2
          )}%\nMontant total dû (Hors assurance facultative) : ${fin.total.toLocaleString(
            "fr-FR",
            fmt2
          )} €\n\nUn crédit vous engage et doit être remboursé. Vérifiez vos capacités de remboursement avant de vous engager.\n`
        : "";
      out.textContent =
        `Taille du foyer : ${foyerVal}  (≈ ${n} pers)\n` +
        `Peau sèche : ${peau ? "Oui" : "Non"}\n` +
        `Modèle recommandé : ${modele}\n` +
        `Prix installé & mis en service : ${tarif.toLocaleString("fr-FR")} € TTC\n\n` +
        `Économies Produits : ${sProd.toLocaleString("fr-FR")} € / an\n` +
        `Économies Énergie  : ${sEnergie.toLocaleString("fr-FR")} € / an\n` +
        `Entretien/Matériel : ${sMateriel.toLocaleString("fr-FR")} € / an\n` +
        `--------------------------------------------\n` +
        `TOTAL estimé       : ${total.toLocaleString("fr-FR")} € / an\n` +
        `Projection 10 ans  : ${total10.toLocaleString("fr-FR")} €\n` +
        finBloc +
        `\nNos estimations sont basées sur les consommations moyennes observées en France.`;
    }

    // Masquer toutes les sections marquées après simulation (on garde le haut de page + bloc résultats + footer)
    document
      .querySelectorAll('[data-hide-after-sim="1"]')
      .forEach((el) => {
        el.style.display = "none";
      });

    // Scroll sur le bloc résultats
    recap?.scrollIntoView({ behavior: "smooth", block: "start" });
    // Active l’overlay de déverrouillage (si pas déjà débloqué)
    try {
      if (
        !localStorage.getItem("overlayResultsUnlocked") &&
        typeof window.__initOverlayResults === "function"
      ) {
        window.__initOverlayResults();
      }
    } catch (e) {}
  });
});

// ===== Overlay résultats (masque sous le 1er bloc) =====
(function () {
  if (location.search.includes("lock=test")) {
    localStorage.removeItem("overlayResultsUnlocked");
    console.log(
      "%c🔁 Mode test activé : clé overlayResultsUnlocked supprimée",
      "color:#0bf;font-weight:bold;"
    );
  }

  const STORAGE_KEY = "overlayResultsUnlocked";

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
    } catch (e) {}
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

  function initGate() {
    const gate = document.getElementById("gate-overlay");
    const recap = document.getElementById("recap");
    const first = document.getElementById("resume-cout");
    if (!gate || !recap || !first) return;

    if (isUnlocked()) {
      hideOverlay();
      return;
    }
    showOverlay();

    const form = document.getElementById("gate-form");
    const phone = document.getElementById("gate-phone");
    // --- Format FR "00 00 00 00 00" en saisie ---
    function formatFR(val) {
      if (!val) return "";
      // normaliser +33 -> 0 et retirer tout hors chiffres
      let d = val
        .replace(/[^\d+]/g, "")
        .replace(/^\+33/, "0")
        .replace(/\D/g, "");
      d = d.slice(0, 10);
      return d.replace(/(\d{2})(?=\d)/g, "$1 ").trim();
    }

    // Accessibilité + contraintes douces
    try {
      phone.setAttribute("inputmode", "tel");
      phone.setAttribute("autocomplete", "tel");
      phone.setAttribute("maxlength", "14"); // 10 chiffres + 4 espaces = 14
      phone.placeholder = "06 12 34 56 78";
    } catch (e) {}

    // Gestion du curseur pour ne pas “sauter” à la fin
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

    // Formatage en live + en sortie de champ
    phone.addEventListener("input", onPhoneInput);
    phone.addEventListener("blur", () => {
      phone.value = formatFR(phone.value);
    });

    if (form && phone) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!phoneValid(phone.value)) {
          phone.focus();
          phone.setCustomValidity("Numéro invalide (FR, 10 chiffres).");
          phone.reportValidity();
          setTimeout(() => phone.setCustomValidity(""), 2000);
          return;
        }

        // ✅ déverrouille les résultats
        setUnlocked();
        hideOverlay();

        const next =
          document.getElementById("rc-cards") ||
          document.getElementById("prod") ||
          recap;
        next && next.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }

    window.addEventListener("resize", placeOverlay);
    setTimeout(placeOverlay, 50);
    setTimeout(placeOverlay, 250);
  }
  // Expose seulement la fonction d'initialisation (aucun appel ici)
  window.__initOverlayResults = initGate;
})();

// =========================
// BLOC D’INJECTION ENVOI SHEETS
// (aucune modification du calcul/DOM existant)
// =========================
(function () {
  "use strict";

  // === CONFIG ===
  const ENDPOINT =
    "https://script.google.com/macros/s/AKfycbyHYz40LwNcC0lYeymn_93CLK-LBfObF6reZPSjWLH4QDlzUb4dnkfpIkg1lWCTtTwL/exec";
  const SOURCE = "LP Adoucisseur";

  // --- Utils UTM / UA / URL
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

  // --- Calcul “miroir” minimal (ne touche pas au calcul existant)
  function computeSnapshot() {
    const foyerVal = (document.getElementById("foyer")?.value || "").trim();
    const n =
      foyerVal === "1-2" ? 2 : foyerVal === "3-4" ? 4 : foyerVal === "5+" ? 5 : 0;
    const peau = !!document.getElementById("peau")?.checked;

    if (!n) return null;

    // mêmes hypothèses que le script principal
    const PRIX_KWH = 0.27,
      ECS_KWH_PP = 800,
      TAUX_GAIN_ECS = 0.1;
    const DEPENSE_PROD_PP = 220,
      TAUX_ECO_PROD = peau ? 0.45 : 0.35;
    const SAVE_MAT_FOYER = 80;

    const baseProduits = n * DEPENSE_PROD_PP;
    const sProd = Math.round(baseProduits * TAUX_ECO_PROD);
    const sEnergie = Math.round(n * ECS_KWH_PP * PRIX_KWH * TAUX_GAIN_ECS);
    const sMateriel = SAVE_MAT_FOYER;
    const total = sProd + sEnergie + sMateriel;

    const r = 1.05,
      years = 10;
    const sommeGeo = (Math.pow(r, years) - 1) / (r - 1);
    const total10 = Math.round(sProd * 10 + sMateriel * 10 + sEnergie * sommeGeo);

    let modele, tarif;
    if (n <= 2) {
      modele = "Adoucisseur d’eau 10 L de résine";
      tarif = 2200;
    } else if (n <= 4) {
      modele = "Adoucisseur d’eau 15 L de résine";
      tarif = 2400;
    } else {
      modele = "Adoucisseur d’eau 20 L de résine";
      tarif = 2600;
    }

    return {
      foyerVal,
      peau,
      annual: total,
      tenYears: total10,
      model: modele,
      price: tarif,
    };
  }

  // --- POST helper (FormData, no-cors)
  async function postLead(payload) {
    try {
      const fd = new FormData();
      fd.append("phase", payload.phase || "simu");
      fd.append("source", SOURCE);

      fd.append("foyer", payload.foyer ?? "");
      fd.append("peau_seche", payload.peau_seche ?? "");
      fd.append("annual", payload.annual ?? "");
      fd.append("tenYears", payload.tenYears ?? "");
      fd.append("model", payload.model ?? "");
      fd.append("price", payload.price ?? "");

      fd.append("email", payload.email ?? "");
      fd.append("phone", payload.phone ?? "");

      fd.append("pageUrl", payload.pageUrl ?? "");
      fd.append("ua", payload.ua ?? "");
      fd.append("utm_source", payload.utm_source ?? "");
      fd.append("utm_campaign", payload.utm_campaign ?? "");
      fd.append("utm_term", payload.utm_term ?? "");

      await fetch(ENDPOINT, { method: "POST", body: fd, mode: "no-cors" });
    } catch (err) {
      console.warn("⚠️ Envoi Sheets échoué:", err);
    }
  }

  // === Hook 1 : soumission de la simulation (trace “simu”) ===
  document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form-estimation");
    if (!form) return;

    form.addEventListener("submit", function () {
      // Laisse le handler existant faire le calcul/affichage.
      // On prend un snapshot identique en parallèle pour envoi.
      setTimeout(() => {
        const snap = computeSnapshot();
        if (!snap) return;

        const utm = getUtmParams();
        const meta = commonMeta();

        postLead({
          phase: "simu",
          foyer: snap.foyerVal,
          peau_seche: snap.peau ? "1" : "0",
          annual: String(snap.annual),
          tenYears: String(snap.tenYears),
          model: snap.model,
          price: String(snap.price),
          email: "",
          phone: "",
          ...meta,
          ...utm,
        });
      }, 0);
    });
  });

  // === Hook 2 : déverrouillage (trace “unlock”) ===
  document.addEventListener("DOMContentLoaded", function () {
    const gform = document.getElementById("gate-form");
    if (!gform) return;

    gform.addEventListener("submit", function () {
      setTimeout(() => {
        const snap = computeSnapshot(); // reprend les mêmes valeurs de la simu
        const email = (
          document.getElementById("gate-email")?.value || ""
        ).trim();
        const phone = (
          document.getElementById("gate-phone")?.value || ""
        ).trim();

        if (!snap) return;

        const utm = getUtmParams();
        const meta = commonMeta();

        postLead({
          phase: "unlock",
          foyer: snap.foyerVal,
          peau_seche: snap.peau ? "1" : "0",
          annual: String(snap.annual),
          tenYears: String(snap.tenYears),
          model: snap.model,
          price: String(snap.price),
          email,
          phone,
          ...meta,
          ...utm,
        });
      }, 0);
    });
  });
})();
